import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DomainFormVersionService } from '../../domain/form/form-version.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, DocumentFilterDto } from './dtos/document.dto';
import { DocumentStatus } from '../../../common/enums/approval.enum';
import { withTransaction } from '../../../common/utils/transaction.util';

/**
 * 문서 컨텍스트
 *
 * 역할:
 * - 문서 작성, 수정, 삭제 (CRUD)
 * - 문서 임시저장 (초안)
 * - 문서 기안 (상신)
 * - 문서 조회 및 검색
 * - 문서 번호 자동 생성
 */
@Injectable()
export class DocumentContext {
    private readonly logger = new Logger(DocumentContext.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly documentService: DomainDocumentService,
        private readonly formVersionService: DomainFormVersionService,
        private readonly employeeService: DomainEmployeeService,
    ) {}

    /**
     * 1. 문서 생성 (임시저장)
     */
    async createDocument(dto: CreateDocumentDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 생성 시작: ${dto.title}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) FormVersion 존재 확인 (formVersionId가 있는 경우에만)
                if (dto.formVersionId) {
                    const formVersion = await this.formVersionService.findOne({
                        where: { id: dto.formVersionId },
                        queryRunner,
                    });

                    if (!formVersion) {
                        throw new NotFoundException(`문서양식 버전을 찾을 수 없습니다: ${dto.formVersionId}`);
                    }
                }

                // 2) 기안자 확인
                const drafter = await this.employeeService.findOne({
                    where: { id: dto.drafterId },
                    queryRunner,
                });

                if (!drafter) {
                    throw new NotFoundException(`기안자를 찾을 수 없습니다: ${dto.drafterId}`);
                }

                // 3) 문서 번호 생성 (임시: DRAFT-{timestamp})
                const documentNumber = `DRAFT-${Date.now()}`;

                // 4) Document 생성
                const documentEntity = await this.documentService.create(
                    {
                        documentNumber,
                        formVersionId: dto.formVersionId || null, // null 허용
                        title: dto.title,
                        content: dto.content,
                        drafterId: dto.drafterId,
                        status: DocumentStatus.DRAFT, // 임시저장 상태
                        metadata: dto.metadata,
                    },
                    { queryRunner },
                );

                const document = await this.documentService.save(documentEntity, { queryRunner });

                this.logger.log(`문서 생성 완료: ${document.id}`);
                return document;
            },
            externalQueryRunner,
        );
    }

    /**
     * 2. 문서 수정 (임시저장 상태만 가능)
     */
    async updateDocument(documentId: string, dto: UpdateDocumentDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 수정 시작: ${documentId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Document 조회
                const document = await this.documentService.findOne({
                    where: { id: documentId },
                    queryRunner,
                });

                if (!document) {
                    throw new NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
                }

                // 2) 상태 체크 (DRAFT에서 PENDING으로 변경하는 경우는 허용)
                if (document.status !== DocumentStatus.DRAFT && dto.status !== DocumentStatus.PENDING) {
                    throw new BadRequestException('임시저장 상태의 문서만 수정할 수 있습니다.');
                }

                // 3) 업데이트
                const updatedDocument = await this.documentService.update(
                    documentId,
                    {
                        title: dto.title ?? document.title,
                        content: dto.content ?? document.content,
                        metadata: dto.metadata ?? document.metadata,
                        approvalLineSnapshotId: dto.approvalLineSnapshotId ?? document.approvalLineSnapshotId,
                        status: dto.status ?? document.status,
                    },
                    { queryRunner },
                );

                this.logger.log(`문서 수정 완료: ${documentId}`);
                return updatedDocument;
            },
            externalQueryRunner,
        );
    }

    /**
     * 3. 문서 기안 (상신)
     *
     * 주의: 실제 스냅샷 생성은 approval-flow context의 createApprovalSnapshot을 호출해야 함
     * 여기서는 Document 상태만 PENDING으로 변경
     */
    async submitDocument(dto: SubmitDocumentDto, approvalLineSnapshotId: string, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 기안 시작: ${dto.documentId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Document 조회
                const document = await this.documentService.findOne({
                    where: { id: dto.documentId },
                    queryRunner,
                });

                if (!document) {
                    throw new NotFoundException(`문서를 찾을 수 없습니다: ${dto.documentId}`);
                }

                // 2) 임시저장 상태인지 확인
                if (document.status !== DocumentStatus.DRAFT) {
                    throw new BadRequestException('임시저장 상태의 문서만 기안할 수 있습니다.');
                }

                // 3) 문서 번호 재생성 (정식 번호)
                let documentNumber: string;
                if (document.formVersionId) {
                    documentNumber = await this.generateDocumentNumber(document.formVersionId, queryRunner);
                } else {
                    // 양식이 없는 외부 문서의 경우 기본 번호 생성
                    const today = new Date();
                    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
                    const countResult = await queryRunner.query(
                        `SELECT COUNT(*) as count FROM documents 
                         WHERE "documentNumber" LIKE $1 
                         AND "createdAt" >= $2`,
                        [`EXT-${dateStr}-%`, today.toISOString().slice(0, 10)],
                    );
                    const seq = parseInt(countResult[0]?.count || '0') + 1;
                    const seqStr = seq.toString().padStart(4, '0');
                    documentNumber = `EXT-${dateStr}-${seqStr}`;
                }

                // 4) Document 업데이트
                const submittedDocument = await this.documentService.update(
                    dto.documentId,
                    {
                        documentNumber,
                        approvalLineSnapshotId,
                        status: DocumentStatus.PENDING, // 결재 진행중
                        submittedAt: new Date(),
                    },
                    { queryRunner },
                );

                this.logger.log(`문서 기안 완료: ${dto.documentId}, 문서번호: ${documentNumber}`);
                return submittedDocument;
            },
            externalQueryRunner,
        );
    }

    /**
     * 4. 문서 삭제 (임시저장 상태만 가능)
     */
    async deleteDocument(documentId: string, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 삭제 시작: ${documentId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Document 조회
                const document = await this.documentService.findOne({
                    where: { id: documentId },
                    queryRunner,
                });

                if (!document) {
                    throw new NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
                }

                // 2) 임시저장 상태인지 확인
                if (document.status !== DocumentStatus.DRAFT) {
                    throw new BadRequestException('임시저장 상태의 문서만 삭제할 수 있습니다.');
                }

                // 3) 삭제
                await this.documentService.delete(documentId, { queryRunner });

                this.logger.log(`문서 삭제 완료: ${documentId}`);
                return { deleted: true, documentId };
            },
            externalQueryRunner,
        );
    }

    /**
     * 5. 문서 조회 (단건)
     */
    async getDocument(documentId: string, queryRunner?: QueryRunner) {
        const document = await this.documentService.findOne({
            where: { id: documentId },
            relations: ['formVersion', 'drafter', 'approvalLineSnapshot'],
            queryRunner,
        });

        if (!document) {
            throw new NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
        }

        return document;
    }

    /**
     * 6. 문서 목록 조회 (필터링)
     */
    async getDocuments(filter: DocumentFilterDto, queryRunner?: QueryRunner) {
        const where: any = {};

        if (filter.status) where.status = filter.status;
        if (filter.drafterId) where.drafterId = filter.drafterId;
        if (filter.formVersionId) where.formVersionId = filter.formVersionId;

        // TODO: 날짜 범위, 검색어 처리는 더 정교한 쿼리 빌더 필요

        return await this.documentService.findAll({
            where,
            relations: ['formVersion', 'drafter'],
            order: { createdAt: 'DESC' },
            queryRunner,
        });
    }

    /**
     * 헬퍼: 문서 번호 생성
     * 형식: {FORM_CODE}-{YYYYMMDD}-{SEQ}
     * 예: VAC-20250121-0001
     */
    private async generateDocumentNumber(formVersionId: string, queryRunner: QueryRunner): Promise<string> {
        if (!formVersionId) {
            throw new BadRequestException('문서양식 버전 ID가 필요합니다.');
        }

        const formVersion = await this.formVersionService.findOne({
            where: { id: formVersionId },
            relations: ['form'],
            queryRunner,
        });

        if (!formVersion || !formVersion.form) {
            throw new NotFoundException('문서양식을 찾을 수 없습니다.');
        }

        const formCode = (formVersion.form as any).code || 'DOC';
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

        // 오늘 생성된 문서 수 조회
        const countResult = await queryRunner.query(
            `SELECT COUNT(*) as count FROM documents 
             WHERE "documentNumber" LIKE $1 
             AND "createdAt" >= $2`,
            [`${formCode}-${dateStr}-%`, today.toISOString().slice(0, 10)],
        );

        const seq = parseInt(countResult[0]?.count || '0') + 1;
        const seqStr = seq.toString().padStart(4, '0');

        return `${formCode}-${dateStr}-${seqStr}`;
    }
}
