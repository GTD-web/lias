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
var ApprovalStepSnapshotContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalStepSnapshotContext = void 0;
const common_1 = require("@nestjs/common");
const approval_step_snapshot_service_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let ApprovalStepSnapshotContext = ApprovalStepSnapshotContext_1 = class ApprovalStepSnapshotContext {
    constructor(approvalStepSnapshotService, employeeService) {
        this.approvalStepSnapshotService = approvalStepSnapshotService;
        this.employeeService = employeeService;
        this.logger = new common_1.Logger(ApprovalStepSnapshotContext_1.name);
    }
    async createApprovalStepSnapshots(documentId, approvalSteps, queryRunner) {
        if (!approvalSteps || approvalSteps.length === 0)
            return;
        for (const step of approvalSteps) {
            const approverSnapshot = await this.buildApproverSnapshot(step.approverId, queryRunner);
            await this.approvalStepSnapshotService.createApprovalStepSnapshot({
                documentId,
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
                approverSnapshot,
            }, queryRunner);
        }
        this.logger.debug(`결재단계 스냅샷 ${approvalSteps.length}개 생성 완료: 문서 ${documentId}`);
    }
    async updateApprovalStepSnapshots(documentId, approvalSteps, queryRunner) {
        if (approvalSteps === undefined)
            return;
        const existingSnapshots = await this.approvalStepSnapshotService.findAll({
            where: { documentId },
            queryRunner,
        });
        const existingSnapshotIds = new Set(existingSnapshots.map((s) => s.id));
        const requestedSnapshotIds = new Set(approvalSteps.filter((step) => step.id).map((step) => step.id));
        const snapshotsToDelete = existingSnapshots.filter((s) => !requestedSnapshotIds.has(s.id));
        for (const snapshot of snapshotsToDelete) {
            await this.approvalStepSnapshotService.delete(snapshot.id, { queryRunner });
        }
        for (const step of approvalSteps) {
            const approverSnapshot = await this.buildApproverSnapshot(step.approverId, queryRunner);
            if (step.id && existingSnapshotIds.has(step.id)) {
                const existingSnapshot = existingSnapshots.find((s) => s.id === step.id);
                if (existingSnapshot) {
                    await this.approvalStepSnapshotService.updateApprovalStepSnapshot(existingSnapshot, {
                        stepOrder: step.stepOrder,
                        stepType: step.stepType,
                        approverId: step.approverId,
                        approverSnapshot,
                    }, queryRunner);
                }
            }
            else {
                await this.approvalStepSnapshotService.createApprovalStepSnapshot({
                    documentId,
                    stepOrder: step.stepOrder,
                    stepType: step.stepType,
                    approverId: step.approverId,
                    approverSnapshot,
                }, queryRunner);
            }
        }
        this.logger.debug(`결재단계 스냅샷 업데이트 완료: 문서 ${documentId}, ${approvalSteps.length}개 처리, ${snapshotsToDelete.length}개 삭제`);
    }
    async validateAndProcessApprovalSteps(documentId, approvalSteps, queryRunner) {
        if (approvalSteps && approvalSteps.length > 0) {
            const approvalTypeSteps = approvalSteps.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
            const implementationTypeSteps = approvalSteps.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION);
            if (approvalTypeSteps.length < 1 || implementationTypeSteps.length < 1) {
                throw new common_1.BadRequestException('결재 하나와 시행 하나는 필수로 필요합니다.');
            }
            await this.updateApprovalStepSnapshots(documentId, approvalSteps, queryRunner);
        }
        else {
            const existingSnapshots = await this.approvalStepSnapshotService.findAll({
                where: { documentId },
                queryRunner,
            });
            if (existingSnapshots.length === 0) {
                throw new common_1.BadRequestException('기안 시 결재선이 필요합니다.');
            }
            const approvalTypeSteps = existingSnapshots.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
            const implementationTypeSteps = existingSnapshots.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION);
            if (approvalTypeSteps.length < 1 || implementationTypeSteps.length < 1) {
                throw new common_1.BadRequestException('기존 결재선에 결재 하나와 시행 하나는 필수로 필요합니다.');
            }
        }
    }
    async buildApproverSnapshot(approverId, queryRunner) {
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
            throw new common_1.NotFoundException(`결재자를 찾을 수 없습니다: ${approverId}`);
        }
        const currentDepartmentPosition = employee.departmentPositions?.find((dp) => dp.isManager) || employee.departmentPositions?.[0];
        const snapshot = {
            employeeName: employee.name,
            employeeNumber: employee.employeeNumber,
        };
        if (currentDepartmentPosition?.department) {
            snapshot.departmentId = currentDepartmentPosition.department.id;
            snapshot.departmentName = currentDepartmentPosition.department.departmentName;
        }
        if (currentDepartmentPosition?.position) {
            snapshot.positionId = currentDepartmentPosition.position.id;
            snapshot.positionTitle = currentDepartmentPosition.position.positionTitle;
        }
        if (employee.currentRank) {
            snapshot.rankId = employee.currentRank.id;
            snapshot.rankTitle = employee.currentRank.rankTitle;
        }
        return snapshot;
    }
};
exports.ApprovalStepSnapshotContext = ApprovalStepSnapshotContext;
exports.ApprovalStepSnapshotContext = ApprovalStepSnapshotContext = ApprovalStepSnapshotContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_snapshot_service_1.DomainApprovalStepSnapshotService,
        employee_service_1.DomainEmployeeService])
], ApprovalStepSnapshotContext);
//# sourceMappingURL=approval-step-snapshot.context.js.map