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
var SubmitDocumentUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitDocumentUsecase = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("../../../context/document/document.context");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
const form_version_service_1 = require("../../../domain/form/form-version.service");
const employee_department_position_service_1 = require("../../../domain/employee-department-position/employee-department-position.service");
let SubmitDocumentUsecase = SubmitDocumentUsecase_1 = class SubmitDocumentUsecase {
    constructor(documentContext, approvalFlowContext, formVersionService, employeeDepartmentPositionService) {
        this.documentContext = documentContext;
        this.approvalFlowContext = approvalFlowContext;
        this.formVersionService = formVersionService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.logger = new common_1.Logger(SubmitDocumentUsecase_1.name);
    }
    async execute(drafterId, documentId, dto) {
        this.logger.log(`문서 제출 요청 (기안자: ${drafterId}): ${documentId}`);
        const document = await this.documentContext.getDocument(documentId);
        if (!document) {
            throw new common_1.NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
        }
        if (document.status !== 'DRAFT') {
            throw new common_1.BadRequestException('임시저장 상태의 문서만 제출할 수 있습니다.');
        }
        let drafterDepartmentId = dto.draftContext.drafterDepartmentId;
        if (!drafterDepartmentId) {
            this.logger.debug(`기안 부서 미입력 → 직원의 주 소속 부서 자동 조회: ${drafterId}`);
            const edp = await this.employeeDepartmentPositionService.findOne({
                where: { employeeId: drafterId },
            });
            if (!edp) {
                const anyEdp = await this.employeeDepartmentPositionService.findOne({
                    where: { employeeId: drafterId },
                });
                if (!anyEdp) {
                    throw new common_1.BadRequestException('기안자의 부서 정보를 찾을 수 없습니다. 관리자에게 문의하세요.');
                }
                drafterDepartmentId = anyEdp.departmentId;
                this.logger.debug(`주 소속 부서 없음 → 첫 번째 소속 부서 사용: ${drafterDepartmentId}`);
            }
            else {
                drafterDepartmentId = edp.departmentId;
                this.logger.debug(`주 소속 부서 조회 성공: ${drafterDepartmentId}`);
            }
        }
        if (dto.customApprovalSteps && dto.customApprovalSteps.length > 0) {
            this.validateApprovalSteps(dto.customApprovalSteps);
        }
        this.logger.log(`제출 요청 - customApprovalSteps: ${JSON.stringify(dto.customApprovalSteps)}`);
        this.logger.log(`기존 approvalLineSnapshotId: ${document.approvalLineSnapshotId}`);
        this.logger.log(`새로운 결재선 스냅샷 생성 - customApprovalSteps: ${JSON.stringify(dto.customApprovalSteps)}`);
        const snapshot = await this.approvalFlowContext.createApprovalSnapshot({
            documentId,
            formVersionId: document.formVersionId,
            draftContext: {
                drafterId,
                drafterDepartmentId,
                ...dto.draftContext,
            },
            customApprovalSteps: dto.customApprovalSteps,
        });
        const updatedDocument = await this.documentContext.submitDocument({
            documentId,
            draftContext: {
                drafterId,
                drafterDepartmentId,
                ...dto.draftContext,
            },
        }, snapshot.id);
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
    validateApprovalSteps(customApprovalSteps) {
        const seenEmployees = new Map();
        for (const step of customApprovalSteps) {
            const stepType = step.stepType;
            const employeeId = step.employeeId;
            if (employeeId) {
                if (!seenEmployees.has(stepType)) {
                    seenEmployees.set(stepType, new Set());
                }
                const stepTypeEmployees = seenEmployees.get(stepType);
                if (stepTypeEmployees.has(employeeId)) {
                    throw new common_1.BadRequestException(`${stepType} 단계에서 직원 ${step.employeeName || employeeId}이 중복되었습니다. 동일한 유형에서는 같은 직원을 여러 번 선택할 수 없습니다.`);
                }
                stepTypeEmployees.add(employeeId);
            }
        }
        this.logger.log(`결재선 중복 검증 완료: ${customApprovalSteps.length}개 단계`);
    }
};
exports.SubmitDocumentUsecase = SubmitDocumentUsecase;
exports.SubmitDocumentUsecase = SubmitDocumentUsecase = SubmitDocumentUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_context_1.DocumentContext,
        approval_flow_context_1.ApprovalFlowContext,
        form_version_service_1.DomainFormVersionService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService])
], SubmitDocumentUsecase);
//# sourceMappingURL=submit-document.usecase.js.map