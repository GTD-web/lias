"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GetApprovalStatusUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetApprovalStatusUsecase = void 0;
const common_1 = require("@nestjs/common");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
const document_service_1 = require("../../../domain/document/document.service");
const employee_service_1 = require("../../../domain/employee/employee.service");
const department_service_1 = require("../../../domain/department/department.service");
const employee_department_position_service_1 = require("../../../domain/employee-department-position/employee-department-position.service");
let GetApprovalStatusUsecase = GetApprovalStatusUsecase_1 = class GetApprovalStatusUsecase {
    constructor(approvalProcessContext, documentService, employeeService, departmentService, employeeDepartmentPositionService) {
        this.approvalProcessContext = approvalProcessContext;
        this.documentService = documentService;
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.logger = new common_1.Logger(GetApprovalStatusUsecase_1.name);
    }
    async getMyPendingApprovals(approverId) {
        this.logger.log(`결재 대기 목록 조회: ${approverId}`);
        const steps = await this.approvalProcessContext.getMyPendingApprovals(approverId);
        const result = [];
        for (const step of steps) {
            const document = await this.documentService.findOne({
                where: { approvalLineSnapshotId: step.snapshotId },
            });
            let drafterName;
            let drafterDepartmentName;
            if (document) {
                const drafter = await this.employeeService.findOne({
                    where: { id: document.drafterId },
                });
                drafterName = drafter?.name;
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
    async getApprovalSteps(documentId) {
        this.logger.log(`문서 결재 단계 조회: ${documentId}`);
        const steps = await this.approvalProcessContext.getApprovalSteps(documentId);
        const totalSteps = steps.length;
        const completedSteps = steps.filter((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED).length;
        const stepsDto = steps.map((step) => ({
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
};
exports.GetApprovalStatusUsecase = GetApprovalStatusUsecase;
exports.GetApprovalStatusUsecase = GetApprovalStatusUsecase = GetApprovalStatusUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_process_context_1.ApprovalProcessContext,
        document_service_1.DomainDocumentService,
        employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService])
], GetApprovalStatusUsecase);
//# sourceMappingURL=get-approval-status.usecase.js.map