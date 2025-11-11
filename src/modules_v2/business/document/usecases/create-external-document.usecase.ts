import { Injectable, Logger } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';
import { DocumentStatus } from '../../../../common/enums/approval.enum';
import { CreateExternalDocumentRequestDto, DocumentResponseDto } from '../dtos';
import { DataSource } from 'typeorm';
import { withTransaction } from '../../../../common/utils/transaction.util';

/**
 * 외부 문서 생성 유스케이스
 * 양식 선택 없이 외부 시스템에서 문서를 생성하는 전용 유스케이스
 */
@Injectable()
export class CreateExternalDocumentUsecase {
    private readonly logger = new Logger(CreateExternalDocumentUsecase.name);

    constructor(
        private readonly documentContext: DocumentContext,
        private readonly approvalFlowContext: ApprovalFlowContext,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(drafterId: string, dto: CreateExternalDocumentRequestDto): Promise<DocumentResponseDto> {
        this.logger.log(`외부 문서 생성 요청 (기안자: ${drafterId}): ${dto.title}`);

        return await withTransaction(this.dataSource, async (queryRunner) => {
            // 1. 외부 문서 생성 (formVersionId 없이)
            const document = await this.documentContext.createDocument(
                {
                    formVersionId: undefined, // 외부 문서는 항상 양식 없음
                    title: dto.title,
                    drafterId,
                    content: dto.content,
                    metadata: dto.metadata,
                },
                queryRunner,
            );

            this.logger.log(`외부 문서 생성 완료: ${document.id}`);

            // 2. 결재선 스냅샷 생성 (customApprovalSteps가 있으면 사용자 정의, 없으면 자동 계층적)
            let finalDocument = document;

            // 기안 부서 자동 조회
            let drafterDepartmentId: string | undefined;
            const edp = await this.employeeDepartmentPositionService.findOne({
                where: { employeeId: drafterId },
                queryRunner,
            });

            if (!edp) {
                const anyEdp = await this.employeeDepartmentPositionService.findOne({
                    where: { employeeId: drafterId },
                    queryRunner,
                });
                if (anyEdp) {
                    drafterDepartmentId = anyEdp.departmentId;
                }
            } else {
                drafterDepartmentId = edp.departmentId;
            }

            if (!drafterDepartmentId) {
                throw new Error(`기안자의 부서 정보를 찾을 수 없습니다: ${drafterId}`);
            }

            // 외부 문서용 결재선 스냅샷 생성
            const snapshot = await this.approvalFlowContext.createApprovalSnapshotWithoutForm(
                {
                    documentId: document.id,
                    drafterId,
                    drafterDepartmentId,
                    customApprovalSteps: dto.customApprovalSteps,
                },
                queryRunner,
            );

            // 문서에 스냅샷 ID 업데이트 및 상태를 PENDING으로 변경
            finalDocument = await this.documentContext.updateDocument(
                document.id,
                {
                    approvalLineSnapshotId: snapshot.id,
                    status: DocumentStatus.PENDING,
                },
                queryRunner,
            );

            this.logger.log(`외부 문서 결재선 스냅샷 생성 완료: ${snapshot.id}, 상태: PENDING`);

            return {
                id: finalDocument.id,
                formId: finalDocument.formVersion?.formId || '',
                formVersionId: finalDocument.formVersionId,
                title: finalDocument.title,
                drafterId: finalDocument.drafterId,
                drafterDepartmentId: undefined,
                status: finalDocument.status,
                content: finalDocument.content,
                metadata: finalDocument.metadata,
                documentNumber: finalDocument.documentNumber,
                approvalLineSnapshotId: finalDocument.approvalLineSnapshotId,
                submittedAt: finalDocument.submittedAt,
                cancelReason: finalDocument.cancelReason,
                cancelledAt: finalDocument.cancelledAt,
                createdAt: finalDocument.createdAt,
                updatedAt: finalDocument.updatedAt,
            };
        });
    }
}
