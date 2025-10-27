import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { DomainFormVersionService } from '../../../domain/form/form-version.service';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';
import { SubmitDocumentRequestDto, DocumentResponseDto } from '../dtos';

/**
 * 문서 제출 유스케이스
 */
@Injectable()
export class SubmitDocumentUsecase {
    private readonly logger = new Logger(SubmitDocumentUsecase.name);

    constructor(
        private readonly documentContext: DocumentContext,
        private readonly approvalFlowContext: ApprovalFlowContext,
        private readonly formVersionService: DomainFormVersionService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
    ) {}

    async execute(drafterId: string, documentId: string, dto: SubmitDocumentRequestDto): Promise<DocumentResponseDto> {
        this.logger.log(`문서 제출 요청 (기안자: ${drafterId}): ${documentId}`);

        // 1. 문서 조회하여 formVersionId 가져오기
        const document = await this.documentContext.getDocument(documentId);
        if (!document) {
            throw new NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
        }

        // 1-1. 문서 상태 확인 (중복 제출 방지)
        if (document.status !== 'DRAFT') {
            throw new BadRequestException('임시저장 상태의 문서만 제출할 수 있습니다.');
        }

        // 2. 기안 부서 자동 조회 (미입력시)
        let drafterDepartmentId = dto.draftContext.drafterDepartmentId;
        if (!drafterDepartmentId) {
            this.logger.debug(`기안 부서 미입력 → 직원의 주 소속 부서 자동 조회: ${drafterId}`);
            const edp = await this.employeeDepartmentPositionService.findOne({
                where: { employeeId: drafterId },
            });

            if (!edp) {
                // isPrimary가 없는 경우, 첫 번째 소속 부서 사용
                const anyEdp = await this.employeeDepartmentPositionService.findOne({
                    where: { employeeId: drafterId },
                });
                if (!anyEdp) {
                    throw new BadRequestException('기안자의 부서 정보를 찾을 수 없습니다. 관리자에게 문의하세요.');
                }
                drafterDepartmentId = anyEdp.departmentId;
                this.logger.debug(`주 소속 부서 없음 → 첫 번째 소속 부서 사용: ${drafterDepartmentId}`);
            } else {
                drafterDepartmentId = edp.departmentId;
                this.logger.debug(`주 소속 부서 조회 성공: ${drafterDepartmentId}`);
            }
        }

        // 3. 결재선 중복 검증
        if (dto.customApprovalSteps && dto.customApprovalSteps.length > 0) {
            this.validateApprovalSteps(dto.customApprovalSteps);
        }

        // 4. 결재선 스냅샷 처리
        this.logger.log(`제출 요청 - customApprovalSteps: ${JSON.stringify(dto.customApprovalSteps)}`);
        this.logger.log(`기존 approvalLineSnapshotId: ${document.approvalLineSnapshotId}`);

        // 결재선 스냅샷 생성 (customApprovalSteps가 있으면 사용자 정의, 없으면 기본)
        this.logger.log(`새로운 결재선 스냅샷 생성 - customApprovalSteps: ${JSON.stringify(dto.customApprovalSteps)}`);
        const snapshot = await this.approvalFlowContext.createApprovalSnapshot({
            documentId,
            formVersionId: document.formVersionId,
            draftContext: {
                drafterId,
                drafterDepartmentId, // 자동 조회된 부서 ID 사용
                ...dto.draftContext,
            },
            customApprovalSteps: dto.customApprovalSteps,
        });

        // 5. 문서 제출 처리
        const updatedDocument = await this.documentContext.submitDocument(
            {
                documentId,
                draftContext: {
                    drafterId,
                    drafterDepartmentId,
                    ...dto.draftContext,
                },
            },
            snapshot.id,
        );

        this.logger.log(`문서 제출 완료: ${updatedDocument.id}`);

        return {
            id: updatedDocument.id,
            formId: updatedDocument.formVersion?.formId || '',
            formVersionId: updatedDocument.formVersionId,
            title: updatedDocument.title,
            drafterId: updatedDocument.drafterId,
            drafterDepartmentId: drafterDepartmentId,
            status: updatedDocument.status,
            content: updatedDocument.content,
            metadata: updatedDocument.metadata,
            documentNumber: updatedDocument.documentNumber,
            approvalLineSnapshotId: updatedDocument.approvalLineSnapshotId,
            submittedAt: updatedDocument.submittedAt,
            cancelReason: updatedDocument.cancelReason,
            cancelledAt: updatedDocument.cancelledAt,
            createdAt: updatedDocument.createdAt,
            updatedAt: updatedDocument.updatedAt,
        };
    }

    /**
     * 결재선 단계 중복 검증
     */
    private validateApprovalSteps(customApprovalSteps: any[]): void {
        const seenEmployees = new Map<string, Set<string>>(); // stepType별로 employeeId 추적

        for (const step of customApprovalSteps) {
            const stepType = step.stepType;
            const employeeId = step.employeeId;

            // employeeId가 있는 경우에만 중복 검사
            if (employeeId) {
                if (!seenEmployees.has(stepType)) {
                    seenEmployees.set(stepType, new Set());
                }

                const stepTypeEmployees = seenEmployees.get(stepType);

                if (stepTypeEmployees.has(employeeId)) {
                    throw new BadRequestException(
                        `${stepType} 단계에서 직원 ${step.employeeName || employeeId}이 중복되었습니다. 동일한 유형에서는 같은 직원을 여러 번 선택할 수 없습니다.`,
                    );
                }

                stepTypeEmployees.add(employeeId);
            }
        }

        this.logger.log(`결재선 중복 검증 완료: ${customApprovalSteps.length}개 단계`);
    }
}
