import { Injectable, Logger } from '@nestjs/common';
import { In } from 'typeorm';
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

        if (steps.length === 0) {
            return [];
        }

        // 모든 스냅샷 ID 수집
        const snapshotIds = [...new Set(steps.map((step) => step.snapshotId))];

        // 모든 문서를 한 번에 조회
        const documents = await this.documentService.findAll({
            where: { approvalLineSnapshotId: In(snapshotIds) },
        });
        const documentsBySnapshotId = new Map();
        documents.forEach((doc) => {
            documentsBySnapshotId.set(doc.approvalLineSnapshotId, doc);
        });

        // 모든 기안자 ID 수집
        const drafterIds = [...new Set(documents.map((doc) => doc.drafterId).filter(Boolean))];

        // 모든 기안자 정보를 한 번에 조회
        const drafters = await this.employeeService.findAll({
            where: { id: In(drafterIds) },
        });
        const draftersById = new Map();
        drafters.forEach((drafter) => {
            draftersById.set(drafter.id, drafter);
        });

        // 모든 기안자 부서 정보를 한 번에 조회
        const edps = await this.employeeDepartmentPositionService.findAll({
            where: { employeeId: In(drafterIds) },
        });
        const edpsByEmployeeId = new Map();
        edps.forEach((edp) => {
            edpsByEmployeeId.set(edp.employeeId, edp);
        });

        // 모든 부서 정보를 한 번에 조회
        const departmentIds = [...new Set(edps.map((edp) => edp.departmentId).filter(Boolean))];
        const departments = await this.departmentService.findAll({
            where: { id: In(departmentIds) },
        });
        const departmentsById = new Map();
        departments.forEach((dept) => {
            departmentsById.set(dept.id, dept);
        });

        // ApprovalStepSnapshot을 ApprovalStepResponseDto로 변환
        const result: ApprovalStepResponseDto[] = [];

        for (const step of steps) {
            const document = documentsBySnapshotId.get(step.snapshotId);

            let drafterName: string | undefined;
            let drafterDepartmentName: string | undefined;

            if (document) {
                const drafter = draftersById.get(document.drafterId);
                drafterName = drafter?.name;

                const edp = edpsByEmployeeId.get(document.drafterId);
                if (edp?.departmentId) {
                    const department = departmentsById.get(edp.departmentId);
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
