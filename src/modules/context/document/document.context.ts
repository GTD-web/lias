import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import { Document } from '../../domain/document/document.entity';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, DocumentFilterDto } from './dtos/document.dto';
import { DocumentStatus, ApprovalStatus, ApprovalStepType } from '../../../common/enums/approval.enum';
import { withTransaction } from '../../../common/utils/transaction.util';
import {
    ApprovalStepSnapshot,
    ApproverSnapshotMetadata,
} from '../../domain/approval-step-snapshot/approval-step-snapshot.entity';

/**
 * 문서 수정 이력 항목 인터페이스
 */
export interface DocumentModificationHistoryItem {
    previousTitle: string;
    previousContent: string;
    modifiedAt: string;
    modificationComment: string;
    documentStatus: DocumentStatus;
}

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
        private readonly documentTemplateService: DomainDocumentTemplateService,
        private readonly employeeService: DomainEmployeeService,
        private readonly approvalStepSnapshotService: DomainApprovalStepSnapshotService,
    ) {}

    /**
     * 1. 문서 생성 (임시저장)
     */
    async createDocument(dto: CreateDocumentDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 생성 시작: ${dto.title}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) DocumentTemplate 존재 확인 (documentTemplateId가 있는 경우에만)
                if (dto.documentTemplateId) {
                    const documentTemplate = await this.documentTemplateService.findOne({
                        where: { id: dto.documentTemplateId },
                        queryRunner,
                    });

                    if (!documentTemplate) {
                        throw new NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${dto.documentTemplateId}`);
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

                // 3) Document 생성 (임시저장 시 문서 번호는 생성하지 않음)
                const documentEntity = await this.documentService.create(
                    {
                        documentNumber: null, // 임시저장 시 문서 번호 없음 (기안 시 생성)
                        title: dto.title,
                        content: dto.content,
                        drafterId: dto.drafterId,
                        documentTemplateId: dto.documentTemplateId, // 문서 템플릿 ID 저장
                        status: DocumentStatus.DRAFT, // 임시저장 상태
                        metadata: dto.metadata,
                    },
                    { queryRunner },
                );

                const document = await this.documentService.save(documentEntity, { queryRunner });

                // 4) 결재단계 스냅샷 생성 (제공된 경우)
                if (dto.approvalSteps && dto.approvalSteps.length > 0) {
                    await this.createApprovalStepSnapshots(document.id, dto.approvalSteps, queryRunner);
                }

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

                // 2) 상태 체크
                // 결재선을 수정하는 경우: DRAFT 상태만 가능
                if (dto.approvalSteps !== undefined && document.status !== DocumentStatus.DRAFT) {
                    throw new BadRequestException('결재선은 임시저장 상태의 문서만 수정할 수 있습니다.');
                }
                // 타이틀과 컨텐츠 수정은 모든 상태에서 가능

                // 3) 타이틀/컨텐츠가 수정된 경우 메타데이터에 수정 이력 추가
                const isTitleOrContentUpdated = dto.title !== undefined || dto.content !== undefined;
                let updatedMetadata = document.metadata;

                if (isTitleOrContentUpdated) {
                    // 기존 수정 이력 배열 가져오기 (없으면 빈 배열)
                    const existingHistory =
                        (document.metadata?.modificationHistory as DocumentModificationHistoryItem[]) || [];

                    // 새로운 수정 이력 항목 생성
                    const newHistoryItem: DocumentModificationHistoryItem = {
                        previousTitle: document.title,
                        previousContent: document.content,
                        modifiedAt: new Date().toISOString(),
                        modificationComment: dto.comment || '수정 사유 없음',
                        documentStatus: document.status,
                    };

                    // 기존 메타데이터 유지하면서 수정 이력 배열에 추가
                    updatedMetadata = {
                        ...(document.metadata || {}),
                        modificationHistory: [...existingHistory, newHistoryItem],
                    };
                }

                // 4) 업데이트
                const updatedDocument = await this.documentService.update(
                    documentId,
                    {
                        title: dto.title ?? document.title,
                        content: dto.content ?? document.content,
                        comment: dto.comment ?? document.comment,
                        metadata: updatedMetadata,
                        status: dto.status ?? document.status,
                    },
                    { queryRunner },
                );

                // 5) 결재단계 스냅샷 수정 (제공된 경우)
                if (dto.approvalSteps !== undefined) {
                    await this.updateApprovalStepSnapshots(documentId, dto.approvalSteps, queryRunner);
                }

                this.logger.log(`문서 수정 완료: ${documentId}`);
                return updatedDocument;
            },
            externalQueryRunner,
        );
    }

    /**
     * 3. 문서 기안 (상신)
     *
     * 임시저장된 문서를 기안합니다.
     * 문서 번호는 기안 시 생성되며, 양식은 "템플릿코드-연도-기안문서순번"으로 구성
     */
    async submitDocument(dto: SubmitDocumentDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 기안 시작: ${dto.documentId}`);

        if (!dto.documentId) {
            throw new BadRequestException('기안할 문서 ID가 필요합니다.');
        }

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) 임시저장된 문서 조회
                const document = await this.documentService.findOne({
                    where: { id: dto.documentId },
                    queryRunner,
                });

                if (!document) {
                    throw new NotFoundException(`문서를 찾을 수 없습니다: ${dto.documentId}`);
                }

                // 2) 상태 체크 (임시저장 상태만 기안 가능)
                if (document.status !== DocumentStatus.DRAFT) {
                    throw new BadRequestException('임시저장 상태의 문서만 기안할 수 있습니다.');
                }

                // 3) 템플릿 ID 확인 (기안 시점에 전달받은 값 사용, 없으면 문서의 기존 값 사용)
                const documentTemplateId = dto.documentTemplateId || document.documentTemplateId || null;

                // 템플릿 확인 (있는 경우)
                if (documentTemplateId) {
                    const template = await this.documentTemplateService.findOne({
                        where: { id: documentTemplateId },
                        queryRunner,
                    });

                    if (!template) {
                        throw new NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${documentTemplateId}`);
                    }
                }

                // 4) 문서 번호 생성 (템플릿코드-연도-기안문서순번)
                const documentNumber = await this.generateDocumentNumber(documentTemplateId, queryRunner);
                // 5) 결재단계 스냅샷 생성/업데이트
                if (dto.approvalSteps && dto.approvalSteps.length > 0) {
                    // 기안 시 제공된 결재선으로 스냅샷 생성/업데이트
                    await this.updateApprovalStepSnapshots(dto.documentId, dto.approvalSteps, queryRunner);
                } else {
                    // 기존 스냅샷이 없으면 에러 (기안 시 결재선 필수)
                    const existingSnapshots = await this.approvalStepSnapshotService.findAll({
                        where: { documentId: dto.documentId },
                        queryRunner,
                    });
                    if (existingSnapshots.length === 0) {
                        throw new BadRequestException('기안 시 결재선이 필요합니다.');
                    }
                }

                // 6) Document 업데이트 (기안 처리)
                const submittedDocument = await this.documentService.update(
                    dto.documentId,
                    {
                        documentNumber,
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
     * 헬퍼: 문서 번호 생성
     * 형식: {템플릿코드}-{연도}-{순번}
     * 예: VAC-2025-0001, EXT-2025-0001 (템플릿 없는 경우)
     */
    private async generateDocumentNumber(documentTemplateId: string | null, queryRunner: QueryRunner): Promise<string> {
        let templateCode = 'EXT'; // 기본값: 외부 문서

        // 템플릿이 있는 경우 템플릿 코드 사용
        if (documentTemplateId) {
            const documentTemplate = await this.documentTemplateService.findOne({
                where: { id: documentTemplateId },
                queryRunner,
            });

            if (documentTemplate) {
                templateCode = documentTemplate.code;
            }
        }

        // 현재 연도
        const currentYear = new Date().getFullYear().toString();

        // 해당 템플릿의 같은 연도 기안 문서 수 조회 (문서 번호가 있는 문서만)
        const yearStart = `${currentYear}-01-01`;
        const yearEnd = `${currentYear}-12-31`;

        const countResult = await queryRunner.query(
            `SELECT COUNT(*) as count FROM documents 
             WHERE "documentNumber" LIKE $1 
             AND "submittedAt" >= $2 
             AND "submittedAt" <= $3
             AND "documentNumber" IS NOT NULL`,
            [`${templateCode}-${currentYear}-%`, yearStart, yearEnd],
        );

        const seq = parseInt(countResult[0]?.count || '0') + 1;
        const seqStr = seq.toString().padStart(4, '0');

        return `${templateCode}-${currentYear}-${seqStr}`;
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
            relations: ['drafter', 'approvalSteps'],
            order: {
                approvalSteps: {
                    stepOrder: 'ASC',
                },
            },
            queryRunner,
        });

        if (!document) {
            throw new NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
        }

        return document;
    }

    /**
     * 6. 문서 목록 조회 (필터링)
     *
     * 조회 모드:
     * 1. 내가 기안한 문서 (drafterId 지정)
     * 2. 내가 참조자로 있는 문서 (referenceUserId 지정)
     *
     * 두 모드는 상호 배타적이며, referenceUserId가 우선됩니다.
     */
    async getDocuments(filter: DocumentFilterDto, queryRunner?: QueryRunner) {
        const qb = queryRunner
            ? queryRunner.manager.getRepository(Document).createQueryBuilder('document')
            : this.documentService.createQueryBuilder('document');

        qb.leftJoinAndSelect('document.drafter', 'drafter')
            .leftJoinAndSelect('document.approvalSteps', 'approvalSteps')
            .orderBy('document.createdAt', 'DESC')
            .addOrderBy('approvalSteps.stepOrder', 'ASC');

        // 조회 모드 결정: 참조자 모드 vs 기안자 모드
        if (filter.referenceUserId) {
            // === 모드 1: 내가 참조자로 있는 문서 ===
            // 기안자 상관없음, 임시저장 제외 (기안된 문서만)
            // 단계 타입이 REFERENCE이고 approverId가 나인 문서
            qb.andWhere(
                `document.id IN (
                    SELECT DISTINCT d.id
                    FROM documents d
                    INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                    WHERE ass."stepType" = :referenceStepType
                    AND ass."approverId" = :referenceUserId
                    AND d.status != :draftStatus
                )`,
                {
                    referenceStepType: ApprovalStepType.REFERENCE,
                    referenceUserId: filter.referenceUserId,
                    draftStatus: DocumentStatus.DRAFT,
                },
            );
        } else if (filter.drafterId) {
            // === 모드 2: 내가 기안한 문서 ===
            qb.andWhere('document.drafterId = :drafterId', { drafterId: filter.drafterId });

            // 1. 기본 필터
            if (filter.status) {
                qb.andWhere('document.status = :status', { status: filter.status });
            }

            // 2. PENDING 상태의 문서 중 현재 단계 타입별 필터링
            // 현재 진행 중인 단계(가장 작은 stepOrder의 PENDING 단계)의 타입으로 필터링
            if (filter.status === DocumentStatus.PENDING && filter.pendingStepType) {
                qb.andWhere(
                    `document.id IN (
                        SELECT document_id
                        FROM (
                            SELECT DISTINCT ON (d.id)
                                d.id as document_id,
                                ass."stepType"
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE d.status = :pendingStatus
                            AND ass.status = :pendingStepStatus
                            AND d."drafterId" = :drafterId
                            ORDER BY d.id, ass."stepOrder" ASC
                        ) current_steps
                        WHERE "stepType" = :stepType
                    )`,
                    {
                        pendingStatus: DocumentStatus.PENDING,
                        pendingStepStatus: ApprovalStatus.PENDING,
                        stepType: filter.pendingStepType,
                    },
                );
            }
        }

        // 공통 필터 (모든 모드에 적용)
        if (filter.documentTemplateId) {
            qb.andWhere('document.documentTemplateId = :documentTemplateId', {
                documentTemplateId: filter.documentTemplateId,
            });
        }

        // 3. 카테고리 필터 (문서 템플릿을 통해 조인)
        if (filter.categoryId) {
            qb.leftJoin('document_templates', 'template', 'document.documentTemplateId = template.id');
            qb.andWhere('template.categoryId = :categoryId', { categoryId: filter.categoryId });
        }

        // 4. 검색어 (제목)
        if (filter.searchKeyword) {
            qb.andWhere('document.title LIKE :keyword', { keyword: `%${filter.searchKeyword}%` });
        }

        // 5. 날짜 범위
        if (filter.startDate) {
            qb.andWhere('document.createdAt >= :startDate', { startDate: filter.startDate });
        }

        if (filter.endDate) {
            qb.andWhere('document.createdAt <= :endDate', { endDate: filter.endDate });
        }

        // 6. 페이징 처리
        const page = filter.page || 1;
        const limit = filter.limit || 20;
        const skip = (page - 1) * limit;

        // 전체 개수 조회
        const totalItems = await qb.getCount();

        // 데이터 조회
        const documents = await qb.skip(skip).take(limit).getMany();

        // 페이징 메타데이터 계산
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: documents,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    /**
     * 결재단계 스냅샷 생성
     */
    private async createApprovalStepSnapshots(
        documentId: string,
        approvalSteps: CreateDocumentDto['approvalSteps'],
        queryRunner: QueryRunner,
    ) {
        if (!approvalSteps || approvalSteps.length === 0) return;

        for (const step of approvalSteps) {
            // approverId를 기반으로 스냅샷 메타데이터 자동 생성
            const approverSnapshot = await this.buildApproverSnapshot(step.approverId, queryRunner);

            const snapshotEntity = await this.approvalStepSnapshotService.create(
                {
                    documentId,
                    stepOrder: step.stepOrder,
                    stepType: step.stepType,
                    approverId: step.approverId,
                    approverSnapshot,
                    status: ApprovalStatus.PENDING, // 항상 PENDING으로 시작
                },
                { queryRunner },
            );

            await this.approvalStepSnapshotService.save(snapshotEntity, { queryRunner });
        }

        this.logger.debug(`결재단계 스냅샷 ${approvalSteps.length}개 생성 완료: 문서 ${documentId}`);
    }

    /**
     * 결재단계 스냅샷 수정 (생성/수정/삭제)
     */
    private async updateApprovalStepSnapshots(
        documentId: string,
        approvalSteps: UpdateDocumentDto['approvalSteps'],
        queryRunner: QueryRunner,
    ) {
        if (approvalSteps === undefined) return;

        // 기존 스냅샷 조회
        const existingSnapshots = await this.approvalStepSnapshotService.findAll({
            where: { documentId },
            queryRunner,
        });

        const existingSnapshotIds = new Set(existingSnapshots.map((s) => s.id));
        const requestedSnapshotIds = new Set(approvalSteps.filter((step) => step.id).map((step) => step.id!));

        // 삭제할 스냅샷들 (기존에 있지만 요청에 없는 것)
        const snapshotsToDelete = existingSnapshots.filter((s) => !requestedSnapshotIds.has(s.id));
        for (const snapshot of snapshotsToDelete) {
            await this.approvalStepSnapshotService.delete(snapshot.id, { queryRunner });
        }

        // 수정 및 생성
        for (const step of approvalSteps) {
            // approverId를 기반으로 스냅샷 메타데이터 자동 생성
            const approverSnapshot = await this.buildApproverSnapshot(step.approverId, queryRunner);

            if (step.id && existingSnapshotIds.has(step.id)) {
                // 기존 스냅샷 수정 (status는 변경하지 않음 - 결재 프로세스에서 관리)
                await this.approvalStepSnapshotService.update(
                    step.id,
                    {
                        stepOrder: step.stepOrder,
                        stepType: step.stepType,
                        approverId: step.approverId,
                        approverSnapshot,
                    },
                    { queryRunner },
                );
            } else {
                // 새 스냅샷 생성
                const snapshotEntity = await this.approvalStepSnapshotService.create(
                    {
                        documentId,
                        stepOrder: step.stepOrder,
                        stepType: step.stepType,
                        approverId: step.approverId,
                        approverSnapshot,
                        status: ApprovalStatus.PENDING, // 항상 PENDING으로 시작
                    },
                    { queryRunner },
                );

                await this.approvalStepSnapshotService.save(snapshotEntity, { queryRunner });
            }
        }

        this.logger.debug(
            `결재단계 스냅샷 업데이트 완료: 문서 ${documentId}, ${approvalSteps.length}개 처리, ${snapshotsToDelete.length}개 삭제`,
        );
    }

    /**
     * 결재자 스냅샷 메타데이터 자동 생성
     * approverId를 기반으로 직원의 현재 부서, 직책, 직급 정보를 조회하여 스냅샷 생성
     */
    private async buildApproverSnapshot(
        approverId: string,
        queryRunner: QueryRunner,
    ): Promise<ApproverSnapshotMetadata> {
        // 직원 정보 조회 (부서, 직책, 직급 포함)
        const employee = await this.employeeService.findOne({
            where: { id: approverId },
            relations: [
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
                'currentRank',
            ],
            queryRunner,
        });

        if (!employee) {
            throw new NotFoundException(`결재자를 찾을 수 없습니다: ${approverId}`);
        }

        // 현재 부서 및 직책 정보 (isManager가 true이거나 첫 번째 것)
        const currentDepartmentPosition =
            employee.departmentPositions?.find((dp) => dp.isManager) || employee.departmentPositions?.[0];

        const snapshot: ApproverSnapshotMetadata = {
            employeeName: employee.name,
            employeeNumber: employee.employeeNumber,
        };

        // 부서 정보
        if (currentDepartmentPosition?.department) {
            snapshot.departmentId = currentDepartmentPosition.department.id;
            snapshot.departmentName = currentDepartmentPosition.department.departmentName;
        }

        // 직책 정보
        if (currentDepartmentPosition?.position) {
            snapshot.positionId = currentDepartmentPosition.position.id;
            snapshot.positionTitle = currentDepartmentPosition.position.positionTitle;
        }

        // 직급 정보
        if (employee.currentRank) {
            snapshot.rankId = employee.currentRank.id;
            snapshot.rankTitle = employee.currentRank.rankTitle;
        }

        return snapshot;
    }

    /**
     * 9. 문서 통계 조회
     * 내가 기안한 문서와 참조 문서의 상태별 통계를 반환합니다.
     */
    async getDocumentStatistics(userId: string) {
        this.logger.debug(`문서 통계 조회: 사용자 ${userId}`);

        // 1. 내가 기안한 문서 통계
        const myDocumentsStats = await this.dataSource.query(
            `
            SELECT
                COUNT(*) FILTER (WHERE status = $1) as draft,
                COUNT(*) FILTER (WHERE "submittedAt" IS NOT NULL) as submitted,
                COUNT(*) FILTER (WHERE status = $2) as "pending",
                COUNT(*) FILTER (WHERE status = $3) as approved,
                COUNT(*) FILTER (WHERE status = $4) as rejected,
                COUNT(*) FILTER (WHERE status = $5) as implemented
            FROM documents
            WHERE "drafterId" = $6
            `,
            [
                DocumentStatus.DRAFT,
                DocumentStatus.PENDING,
                DocumentStatus.APPROVED,
                DocumentStatus.REJECTED,
                DocumentStatus.IMPLEMENTED,
                userId,
            ],
        );

        // 2. PENDING 상태의 문서 중 현재 단계 타입별 통계
        // 현재 진행 중인 단계(가장 작은 stepOrder의 PENDING 단계)의 타입으로 분류
        const pendingStepStats = await this.dataSource.query(
            `
            WITH current_steps AS (
                SELECT DISTINCT ON (d.id)
                    d.id as document_id,
                    ass."stepType"
                FROM documents d
                INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                WHERE d."drafterId" = $1
                AND d.status = $2
                AND ass.status = $3
                ORDER BY d.id, ass."stepOrder" ASC
            )
            SELECT
                COUNT(*) FILTER (WHERE "stepType" = $4) as agreement,
                COUNT(*) FILTER (WHERE "stepType" = $5) as approval
            FROM current_steps
            `,
            [
                userId,
                DocumentStatus.PENDING,
                ApprovalStatus.PENDING,
                ApprovalStepType.AGREEMENT,
                ApprovalStepType.APPROVAL,
            ],
        );

        // 3. 내가 참조자로 있는 문서 통계
        // 기안자 상관없음, 임시저장 제외 (기안된 문서만)
        // 단계 타입이 REFERENCE이고 approverId가 나인 문서
        const referenceStats = await this.dataSource.query(
            `
            SELECT COUNT(DISTINCT d.id) as reference
            FROM documents d
            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
            WHERE ass."stepType" = $1
            AND ass."approverId" = $2
            AND d.status != $3
            `,
            [ApprovalStepType.REFERENCE, userId, DocumentStatus.DRAFT],
        );

        const myStats = myDocumentsStats[0];
        const pendingStats = pendingStepStats[0];
        const refStats = referenceStats[0];

        return {
            myDocuments: {
                draft: parseInt(myStats.draft || '0'),
                submitted: parseInt(myStats.submitted || '0'),
                agreement: parseInt(pendingStats.agreement || '0'),
                approval: parseInt(pendingStats.approval || '0'),
                approved: parseInt(myStats.approved || '0'),
                rejected: parseInt(myStats.rejected || '0'),
                implemented: parseInt(myStats.implemented || '0'),
            },
            othersDocuments: {
                reference: parseInt(refStats.reference || '0'),
            },
        };
    }

    /**
     * 10. 내 전체 문서 통계 조회 (작성 + 결재라인)
     * 사이드바 표시용 통계
     * - getMyAllDocuments와 동일한 조건을 사용하여 데이터 정합성 보장
     */
    async getMyAllDocumentsStatistics(userId: string) {
        this.logger.debug(`내 전체 문서 통계 조회: 사용자 ${userId}`);

        const filterTypes = [
            'DRAFT',
            'RECEIVED',
            'PENDING',
            'PENDING_AGREEMENT',
            'PENDING_APPROVAL',
            'IMPLEMENTATION',
            'APPROVED',
            'REJECTED',
            'RECEIVED_REFERENCE',
        ];

        const statistics: Record<string, number> = {};

        // 각 필터 타입별로 동일한 조건을 사용하여 개수 조회
        for (const filterType of filterTypes) {
            const qb = this.documentService.createQueryBuilder('document');

            // 공통 조건 적용 (getMyAllDocuments와 동일한 메서드 사용)
            this.applyFilterTypeCondition(qb, filterType, userId);

            // count 조회
            const count = await qb.getCount();
            statistics[filterType] = count;
        }

        return statistics;
    }

    /**
     * 11. 내 전체 문서 목록 조회 (작성 + 결재라인)
     * 통계와 동일한 필터 타입으로 문서 목록 조회
     * - getMyAllDocumentsStatistics와 동일한 조건을 사용하여 데이터 정합성 보장
     */
    async getMyAllDocuments(params: {
        userId: string;
        filterType?: string;
        receivedStepType?: string;
        drafterFilter?: string;
        referenceReadStatus?: string;
        searchKeyword?: string;
        categoryId?: string;
        startDate?: Date;
        endDate?: Date;
        sortOrder?: string;
        page?: number;
        limit?: number;
    }) {
        const page = params.page || 1;
        const limit = params.limit || 20;
        const skip = (page - 1) * limit;
        const sortOrder = params.sortOrder || 'LATEST';

        // 조인 없이 필터 조건만 적용한 쿼리빌더 생성 (ID 조회 및 카운트용)
        const baseQb = this.documentService.createQueryBuilder('document');

        // 정렬 순서 적용
        if (sortOrder === 'OLDEST') {
            baseQb.orderBy('document.createdAt', 'ASC');
        } else {
            baseQb.orderBy('document.createdAt', 'DESC');
        }

        // 필터 타입별 조건 적용 (통계와 동일한 메서드 사용)
        this.applyFilterTypeCondition(
            baseQb,
            params.filterType || 'ALL',
            params.userId,
            params.receivedStepType,
            params.drafterFilter,
            params.referenceReadStatus,
        );

        // 추가 필터링 조건
        if (params.searchKeyword) {
            baseQb.andWhere('document.title LIKE :keyword', { keyword: `%${params.searchKeyword}%` });
        }

        if (params.categoryId) {
            baseQb.leftJoin('document_templates', 'template', 'document.documentTemplateId = template.id');
            baseQb.andWhere('template.categoryId = :categoryId', { categoryId: params.categoryId });
        }

        if (params.startDate) {
            baseQb.andWhere('document.submittedAt >= :startDate', { startDate: params.startDate });
        }

        if (params.endDate) {
            baseQb.andWhere('document.submittedAt <= :endDate', { endDate: params.endDate });
        }

        // 1단계: 전체 개수 조회
        const totalItems = await baseQb.getCount();

        // 2단계: 페이지네이션 적용하여 document ID만 조회 (중복 없이)
        const documentIds = await baseQb.clone().select('document.id').skip(skip).take(limit).getRawMany();

        this.logger.debug(
            `페이지네이션 적용: skip=${skip}, limit=${limit}, 조회된 ID 개수=${documentIds.length}, 전체=${totalItems}`,
        );

        // 3단계: ID 기준으로 전체 데이터 조회 (approvalSteps 포함)
        let documents = [];
        if (documentIds.length > 0) {
            const ids = documentIds.map((item) => item.document_id);

            const documentsMap = await this.documentService
                .createQueryBuilder('document')
                .leftJoinAndSelect('document.drafter', 'drafter')
                .leftJoinAndSelect('document.approvalSteps', 'approvalSteps')
                .whereInIds(ids)
                .addOrderBy('approvalSteps.stepOrder', 'ASC')
                .getMany();

            // DocumentTemplate과 Category 정보를 별도로 조회
            const templateIds = [...new Set(documentsMap.map((doc) => doc.documentTemplateId).filter(Boolean))];
            let templatesWithCategory = [];

            if (templateIds.length > 0) {
                const templateResults = await this.dataSource
                    .createQueryBuilder()
                    .select([
                        'dt.id as template_id',
                        'dt.name as template_name',
                        'dt.code as template_code',
                        'c.id as category_id',
                        'c.name as category_name',
                        'c.code as category_code',
                        'c.description as category_description',
                        'c.order as category_order',
                    ])
                    .from('document_templates', 'dt')
                    .leftJoin('categories', 'c', 'dt.categoryId = c.id')
                    .where('dt.id IN (:...templateIds)', { templateIds })
                    .getRawMany();

                templatesWithCategory = templateResults.map((row) => ({
                    id: row.template_id,
                    name: row.template_name,
                    code: row.template_code,
                    category: row.category_id
                        ? {
                              id: row.category_id,
                              name: row.category_name,
                              code: row.category_code,
                              description: row.category_description,
                              order: row.category_order,
                          }
                        : undefined,
                }));
            }

            // Template 정보를 Document에 매핑
            const templateMap = new Map(templatesWithCategory.map((t) => [t.id, t]));
            const documentsWithTemplate = documentsMap.map((doc) => ({
                ...doc,
                documentTemplate: doc.documentTemplateId ? templateMap.get(doc.documentTemplateId) : undefined,
            }));

            // ID 순서대로 정렬 (페이지네이션 순서 유지)
            const docMap = new Map(documentsWithTemplate.map((doc) => [doc.id, doc]));
            documents = ids.map((id) => docMap.get(id)).filter((doc) => doc !== undefined);
        }

        // 페이징 메타데이터 계산
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: documents,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    /**
     * 헬퍼: 필터 타입별 조건 적용 (통계 & 목록 조회 공통 사용)
     */
    private applyFilterTypeCondition(
        qb: SelectQueryBuilder<Document>,
        filterType: string,
        userId: string,
        receivedStepType?: string,
        drafterFilter?: string,
        referenceReadStatus?: string,
    ): void {
        switch (filterType) {
            case 'DRAFT':
                // 임시저장 (내가 임시 저장한 문서)
                qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status = :status', {
                    status: DocumentStatus.DRAFT,
                });
                break;

            case 'PENDING':
                // 결재 진행중 문서 (내가 상신한 문서)
                qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status = :status', {
                    status: DocumentStatus.PENDING,
                });
                break;

            case 'RECEIVED':
                // 수신함: 내가 결재라인에 있지만 현재 내 차례가 아닌 문서들
                // - 아직 내 차례가 아닌 것 (SCHEDULED): 내 앞에 PENDING 단계가 있음
                // - 이미 처리한 것 (COMPLETED): 내 단계가 APPROVED 상태
                // 합의(AGREEMENT)와 결재(APPROVAL)만 포함, 시행(IMPLEMENTATION)과 참조(REFERENCE)는 제외
                // receivedStepType으로 AGREEMENT 또는 APPROVAL만 필터링 가능
                const receivedStepTypes = receivedStepType
                    ? [receivedStepType === 'AGREEMENT' ? ApprovalStepType.AGREEMENT : ApprovalStepType.APPROVAL]
                    : [ApprovalStepType.AGREEMENT, ApprovalStepType.APPROVAL];

                qb.andWhere('document.drafterId != :userId', { userId })
                    .andWhere('document.status = :pendingStatus', { pendingStatus: DocumentStatus.PENDING })
                    .andWhere(
                        `document.id IN (
                        SELECT DISTINCT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots my_step ON d.id = my_step."documentId"
                        WHERE d.status = :pendingStatus
                        AND d."drafterId" != :userId
                        AND my_step."approverId" = :userId
                        AND my_step."stepType" IN (:...receivedStepTypes)
                        AND (
                            -- 아직 내 차례가 아닌 것 (앞에 PENDING 단계가 있음)
                            EXISTS (
                                SELECT 1
                                FROM approval_step_snapshots prior_step
                                WHERE prior_step."documentId" = my_step."documentId"
                                AND prior_step."stepOrder" < my_step."stepOrder"
                                AND prior_step.status = :pendingStepStatus
                            )
                            OR
                            -- 내 차례가 지나간 것 (내 단계가 APPROVED)
                            my_step.status = :approvedStepStatus
                        )
                    )`,
                        {
                            receivedStepTypes,
                            pendingStepStatus: ApprovalStatus.PENDING,
                            approvedStepStatus: ApprovalStatus.APPROVED,
                        },
                    );
                break;

            case 'PENDING_AGREEMENT':
                // 합의함: 현재 내가 협의해야 하는 문서
                qb.andWhere('document.drafterId != :userId', { userId }).andWhere(
                    `document.id IN (
                        SELECT DISTINCT my_step."documentId"
                        FROM approval_step_snapshots my_step
                        INNER JOIN documents d ON my_step."documentId" = d.id
                        WHERE my_step."approverId" = :userId
                        AND my_step."stepType" = :agreementType
                        AND d.status = :pendingStatus
                        AND d."drafterId" != :userId
                        AND my_step.status = :pendingStepStatus
                        AND NOT EXISTS (
                            SELECT 1
                            FROM approval_step_snapshots prior_step
                            WHERE prior_step."documentId" = my_step."documentId"
                            AND prior_step."stepOrder" < my_step."stepOrder"
                            AND prior_step.status = :pendingStepStatus
                        )
                    )`,
                    {
                        pendingStatus: DocumentStatus.PENDING,
                        agreementType: ApprovalStepType.AGREEMENT,
                        pendingStepStatus: ApprovalStatus.PENDING,
                    },
                );
                break;

            case 'PENDING_APPROVAL':
                // 결재함: 현재 내가 결재해야 하는 문서
                qb.andWhere('document.drafterId != :userId', { userId }).andWhere(
                    `document.id IN (
                        SELECT DISTINCT my_step."documentId"
                        FROM approval_step_snapshots my_step
                        INNER JOIN documents d ON my_step."documentId" = d.id
                        WHERE my_step."approverId" = :userId
                        AND my_step."stepType" = :approvalType
                        AND d.status = :pendingStatus
                        AND d."drafterId" != :userId
                        AND my_step.status = :pendingStepStatus
                        AND NOT EXISTS (
                            SELECT 1
                            FROM approval_step_snapshots prior_step
                            WHERE prior_step."documentId" = my_step."documentId"
                            AND prior_step."stepOrder" < my_step."stepOrder"
                            AND prior_step.status = :pendingStepStatus
                        )
                    )`,
                    {
                        pendingStatus: DocumentStatus.PENDING,
                        approvalType: ApprovalStepType.APPROVAL,
                        pendingStepStatus: ApprovalStatus.PENDING,
                    },
                );
                break;

            case 'IMPLEMENTATION':
                // 시행함: 현재 내가 시행해야 하는 문서
                // - 문서 상태가 APPROVED (결재 완료)
                // - 내가 시행자로 있으면서 아직 시행하지 않은 것 (PENDING 상태)
                qb.andWhere('document.drafterId != :userId', { userId }).andWhere(
                    `document.id IN (
                        SELECT DISTINCT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                        WHERE d.status = :approvedStatus
                        AND d."drafterId" != :userId
                        AND ass."approverId" = :userId
                        AND ass."stepType" = :implementationType
                        AND ass.status = :pendingStepStatus
                    )`,
                    {
                        approvedStatus: DocumentStatus.APPROVED,
                        implementationType: ApprovalStepType.IMPLEMENTATION,
                        pendingStepStatus: ApprovalStatus.PENDING,
                    },
                );
                break;

            case 'APPROVED':
                // 기결함: 모든 결재가 끝난 문서
                // - drafterFilter로 내가 기안한 것 또는 참여한 것만 필터링 가능
                if (drafterFilter === 'MY_DRAFT') {
                    // 내가 기안한 문서만
                    qb.andWhere('document.drafterId = :userId', { userId }).andWhere(
                        'document.status IN (:...completedStatuses)',
                        {
                            completedStatuses: [DocumentStatus.APPROVED, DocumentStatus.IMPLEMENTED],
                        },
                    );
                } else if (drafterFilter === 'PARTICIPATED') {
                    // 내가 참여한 문서만 (기안자가 아닌 경우)
                    qb.andWhere('document.drafterId != :userId', { userId }).andWhere(
                        `document.id IN (
                            SELECT DISTINCT d.id
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE ass."approverId" = :userId
                            AND d.status IN (:...completedStatuses)
                        )`,
                        {
                            completedStatuses: [DocumentStatus.APPROVED, DocumentStatus.IMPLEMENTED],
                        },
                    );
                } else {
                    // 기본: 모든 문서 (기안 + 참여)
                    qb.andWhere(
                        `(
                            (document.drafterId = :userId AND document.status IN (:...completedStatuses))
                            OR
                            (document.drafterId != :userId AND document.id IN (
                                SELECT DISTINCT d.id
                                FROM documents d
                                INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                                WHERE ass."approverId" = :userId
                                AND d.status IN (:...completedStatuses2)
                            ))
                        )`,
                        {
                            userId,
                            completedStatuses: [DocumentStatus.APPROVED, DocumentStatus.IMPLEMENTED],
                            completedStatuses2: [DocumentStatus.APPROVED, DocumentStatus.IMPLEMENTED],
                        },
                    );
                }
                break;

            case 'REJECTED':
                // 반려함: 반려된 문서
                // - drafterFilter로 내가 기안한 것 또는 참여한 것만 필터링 가능
                if (drafterFilter === 'MY_DRAFT') {
                    // 내가 기안한 문서만
                    qb.andWhere('document.drafterId = :userId', { userId }).andWhere(
                        'document.status = :rejectedStatus',
                        {
                            rejectedStatus: DocumentStatus.REJECTED,
                        },
                    );
                } else if (drafterFilter === 'PARTICIPATED') {
                    // 내가 참여한 문서만 (기안자가 아닌 경우)
                    qb.andWhere('document.drafterId != :userId', { userId }).andWhere(
                        `document.id IN (
                            SELECT DISTINCT d.id
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE ass."approverId" = :userId
                            AND d.status = :rejectedStatus
                        )`,
                        {
                            rejectedStatus: DocumentStatus.REJECTED,
                        },
                    );
                } else {
                    // 기본: 모든 문서 (기안 + 참여)
                    qb.andWhere(
                        `(
                            (document.drafterId = :userId AND document.status = :rejectedStatus)
                            OR
                            (document.drafterId != :userId AND document.id IN (
                                SELECT DISTINCT d.id
                                FROM documents d
                                INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                                WHERE ass."approverId" = :userId
                                AND d.status = :rejectedStatus2
                            ))
                        )`,
                        {
                            userId,
                            rejectedStatus: DocumentStatus.REJECTED,
                            rejectedStatus2: DocumentStatus.REJECTED,
                        },
                    );
                }
                break;

            case 'RECEIVED_REFERENCE':
                // 수신참조함 (내가 참조자로 있는 문서, 내가 기안한 문서 제외, IMPLEMENTED 상태만)
                qb.andWhere('document.drafterId != :userId', { userId }).andWhere(
                    'document.status = :implementedStatus',
                    { implementedStatus: DocumentStatus.IMPLEMENTED },
                );

                // 기본 조건: 내가 참조자로 있는 문서
                if (referenceReadStatus) {
                    // 열람 여부 필터링
                    const statusCondition =
                        referenceReadStatus === 'READ' ? ApprovalStatus.APPROVED : ApprovalStatus.PENDING;

                    qb.andWhere(
                        `document.id IN (
                        SELECT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                        WHERE ass."stepType" = :referenceType
                        AND ass."approverId" = :userId
                        AND ass."status" = :referenceStatus
                        AND d.status = :implementedStatus
                    )`,
                        {
                            referenceType: ApprovalStepType.REFERENCE,
                            referenceStatus: statusCondition,
                        },
                    );
                } else {
                    // 열람 여부 필터링 없이 모든 참조 문서
                    qb.andWhere(
                        `document.id IN (
                        SELECT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                        WHERE ass."stepType" = :referenceType
                        AND ass."approverId" = :userId
                        AND d.status = :implementedStatus
                    )`,
                        {
                            referenceType: ApprovalStepType.REFERENCE,
                        },
                    );
                }
                break;

            case 'ALL':
            default:
                // 필터 타입이 없으면 내가 기안한 문서 + 내가 참여하는 문서 모두
                qb.andWhere(
                    `(
                        document.drafterId = :userId
                        OR
                        document.id IN (
                            SELECT d.id
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE ass."approverId" = :userId
                            AND d.status != :draftStatus
                        )
                    )`,
                    {
                        userId,
                        draftStatus: DocumentStatus.DRAFT,
                    },
                );
                break;
        }
    }

    /**
     * 12. 내가 작성한 문서 전체 조회 (상태 무관)
     */
    async getMyDrafts(drafterId: string, page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const qb = this.documentService
            .createQueryBuilder('document')
            .leftJoinAndSelect('document.drafter', 'drafter')
            .leftJoinAndSelect('document.approvalSteps', 'approvalSteps')
            .where('document.drafterId = :drafterId', { drafterId })
            .orderBy('document.createdAt', 'DESC')
            .addOrderBy('approvalSteps.stepOrder', 'ASC');

        // 전체 개수 조회
        const totalItems = await qb.getCount();

        // 데이터 조회
        const documents = await qb.skip(skip).take(limit).getMany();

        // 페이징 메타데이터 계산
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: documents,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
}
