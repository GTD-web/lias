import { Injectable, Logger } from '@nestjs/common';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { ApprovalStatus } from '../../../../common/enums/approval.enum';
import { ApprovalStepResponseDto } from '../dtos/approval-process-response.dto';
import { DomainDocumentService } from '../../../domain/document/document.service';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../../domain/department/department.service';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';

/**
 * 결재 상태 조회 유스케이스
 */
@Injectable()
export class GetApprovalStatusUsecase {
    private readonly logger = new Logger(GetApprovalStatusUsecase.name);

    constructor(
        private readonly approvalProcessContext: ApprovalProcessContext,
        private readonly documentService: DomainDocumentService,
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
    ) {}

    /**
     * 내 결재 대기 목록 조회
     */
    async getMyPendingApprovals(approverId: string): Promise<ApprovalStepResponseDto[]> {
        this.logger.log(`결재 대기 목록 조회: ${approverId}`);
        const steps = await this.approvalProcessContext.getMyPendingApprovals(approverId);

        // ApprovalStepSnapshot을 ApprovalStepResponseDto로 변환하면서 문서 정보도 함께 조회
        const result: ApprovalStepResponseDto[] = [];

        for (const step of steps) {
            // snapshot을 통해 문서 조회
            const document = await this.documentService.findOne({
                where: { approvalLineSnapshotId: step.snapshotId },
            });

            let drafterName: string | undefined;
            let drafterDepartmentName: string | undefined;

            if (document) {
                // 기안자 정보 조회
                const drafter = await this.employeeService.findOne({
                    where: { id: document.drafterId },
                });
                drafterName = drafter?.name;

                // 기안자 부서 조회
                const edp = await this.employeeDepartmentPositionService.findOne({
                    where: { employeeId: document.drafterId },
                });
                if (edp?.departmentId) {
                    const department = await this.departmentService.findOne({
                        where: { id: edp.departmentId },
                    });
                    drafterDepartmentName = department?.departmentName;
                }
            }

            result.push({
                id: step.id,
                snapshotId: step.snapshotId,
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
                approverName: step.approver?.name,
                approverDepartmentId: step.approverDepartmentId,
                approverDepartmentName: step.approverDepartment?.departmentName,
                approverPositionId: step.approverPositionId,
                approverPositionTitle: step.approverPosition?.positionTitle,
                assigneeRule: step.assigneeRule || '',
                status: step.status,
                comment: step.comment,
                approvedAt: step.approvedAt,
                isRequired: step.required,
                description: step.description,
                createdAt: step.createdAt,
                // 문서 정보
                documentId: document?.id,
                documentTitle: document?.title,
                documentNumber: document?.documentNumber,
                drafterId: document?.drafterId,
                drafterName,
                drafterDepartmentName,
                documentStatus: document?.status,
                submittedAt: document?.submittedAt,
            });
        }

        return result;
    }

    /**
     * 문서의 결재 단계 조회
     */
    async getApprovalSteps(documentId: string) {
        this.logger.log(`문서 결재 단계 조회: ${documentId}`);
        const steps = await this.approvalProcessContext.getApprovalSteps(documentId);

        const totalSteps = steps.length;
        const completedSteps = steps.filter((s) => s.status === ApprovalStatus.APPROVED).length;

        // ApprovalStepSnapshot을 ApprovalStepResponseDto로 변환하면서 이름 정보 추가
        const stepsDto: ApprovalStepResponseDto[] = steps.map((step) => ({
            id: step.id,
            snapshotId: step.snapshotId,
            stepOrder: step.stepOrder,
            stepType: step.stepType,
            approverId: step.approverId,
            approverName: step.approver?.name,
            approverDepartmentId: step.approverDepartmentId,
            approverDepartmentName: step.approverDepartment?.departmentName,
            approverPositionId: step.approverPositionId,
            approverPositionTitle: step.approverPosition?.positionTitle,
            assigneeRule: step.assigneeRule || '',
            status: step.status,
            comment: step.comment,
            approvedAt: step.approvedAt,
            isRequired: step.required,
            description: step.description,
            createdAt: step.createdAt,
        }));

        return {
            documentId,
            steps: stepsDto,
            totalSteps,
            completedSteps,
        };
    }
}
