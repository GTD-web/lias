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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetApprovalDocumentsUseCase = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("../../../../domain/document/document.service");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
const typeorm_1 = require("typeorm");
let GetApprovalDocumentsUseCase = class GetApprovalDocumentsUseCase {
    constructor(domainDocumentService) {
        this.domainDocumentService = domainDocumentService;
    }
    async execute(user, query, listType) {
        const offset = (query.page - 1) * query.limit;
        const [documents, total] = await this.domainDocumentService.findAndCount({
            where: this.getQueryCondition(listType, user),
            relations: ['approvalSteps'],
            skip: offset,
            take: query.limit,
        });
        const documentData = await this.domainDocumentService.findAll({
            where: {
                documentId: (0, typeorm_1.In)(documents.map((document) => document.documentId)),
            },
            relations: ['drafter', 'approvalSteps', 'approvalSteps.approver', 'parentDocument', 'files'],
            order: {
                createdAt: 'DESC',
                approvalSteps: {
                    order: 'ASC',
                },
            },
        });
        return {
            items: documentData.map((document) => {
                const currentStep = document.approvalSteps.find((step) => step.isCurrent);
                return {
                    ...document,
                    currentStep: currentStep,
                };
            }),
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }
    getQueryCondition(listType, user) {
        const conditions = {
            [approval_enum_1.DocumentListType.ASSIGNED]: {
                approvalSteps: {
                    approverId: user.id,
                },
            },
            [approval_enum_1.DocumentListType.DRAFTED]: { drafterId: user.id },
            [approval_enum_1.DocumentListType.PENDING_APPROVAL]: {
                status: approval_enum_1.ApprovalStatus.PENDING,
                approvalSteps: {
                    type: approval_enum_1.ApprovalStepType.APPROVAL,
                    approvedDate: (0, typeorm_1.IsNull)(),
                    approverId: user.id,
                    isCurrent: true,
                },
            },
            [approval_enum_1.DocumentListType.PENDING_AGREEMENT]: {
                status: approval_enum_1.ApprovalStatus.PENDING,
                approvalSteps: {
                    type: approval_enum_1.ApprovalStepType.AGREEMENT,
                    approvedDate: (0, typeorm_1.IsNull)(),
                    approverId: user.id,
                    isCurrent: true,
                },
            },
            [approval_enum_1.DocumentListType.APPROVED]: {
                drafterId: user.id,
                status: approval_enum_1.ApprovalStatus.APPROVED,
            },
            [approval_enum_1.DocumentListType.REJECTED]: {
                drafterId: user.id,
                status: approval_enum_1.ApprovalStatus.REJECTED,
            },
            [approval_enum_1.DocumentListType.RECEIVED_REFERENCE]: {
                approvalSteps: {
                    type: approval_enum_1.ApprovalStepType.REFERENCE,
                    approverId: user.id,
                },
            },
            [approval_enum_1.DocumentListType.IMPLEMENTATION]: {
                status: approval_enum_1.ApprovalStatus.APPROVED,
                approvalSteps: {
                    type: approval_enum_1.ApprovalStepType.IMPLEMENTATION,
                    approverId: user.id,
                },
            },
        };
        return conditions[listType];
    }
};
exports.GetApprovalDocumentsUseCase = GetApprovalDocumentsUseCase;
exports.GetApprovalDocumentsUseCase = GetApprovalDocumentsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_service_1.DomainDocumentService])
], GetApprovalDocumentsUseCase);
//# sourceMappingURL=get-approval-documents.usecase.js.map