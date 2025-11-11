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
var CreateExternalDocumentUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExternalDocumentUsecase = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("../../../context/document/document.context");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
const employee_department_position_service_1 = require("../../../domain/employee-department-position/employee-department-position.service");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
const typeorm_1 = require("typeorm");
const transaction_util_1 = require("../../../../common/utils/transaction.util");
let CreateExternalDocumentUsecase = CreateExternalDocumentUsecase_1 = class CreateExternalDocumentUsecase {
    constructor(documentContext, approvalFlowContext, employeeDepartmentPositionService, dataSource) {
        this.documentContext = documentContext;
        this.approvalFlowContext = approvalFlowContext;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(CreateExternalDocumentUsecase_1.name);
    }
    async execute(drafterId, dto) {
        this.logger.log(`외부 문서 생성 요청 (기안자: ${drafterId}): ${dto.title}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const document = await this.documentContext.createDocument({
                formVersionId: undefined,
                title: dto.title,
                drafterId,
                content: dto.content,
                metadata: dto.metadata,
            }, queryRunner);
            this.logger.log(`외부 문서 생성 완료: ${document.id}`);
            let finalDocument = document;
            let drafterDepartmentId;
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
            }
            else {
                drafterDepartmentId = edp.departmentId;
            }
            if (!drafterDepartmentId) {
                throw new Error(`기안자의 부서 정보를 찾을 수 없습니다: ${drafterId}`);
            }
            const snapshot = await this.approvalFlowContext.createApprovalSnapshotWithoutForm({
                documentId: document.id,
                drafterId,
                drafterDepartmentId,
                customApprovalSteps: dto.customApprovalSteps,
            }, queryRunner);
            finalDocument = await this.documentContext.updateDocument(document.id, {
                approvalLineSnapshotId: snapshot.id,
                status: approval_enum_1.DocumentStatus.PENDING,
            }, queryRunner);
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
};
exports.CreateExternalDocumentUsecase = CreateExternalDocumentUsecase;
exports.CreateExternalDocumentUsecase = CreateExternalDocumentUsecase = CreateExternalDocumentUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_context_1.DocumentContext,
        approval_flow_context_1.ApprovalFlowContext,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService,
        typeorm_1.DataSource])
], CreateExternalDocumentUsecase);
//# sourceMappingURL=create-external-document.usecase.js.map