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
exports.GetApprovalListUseCase = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("../../../../domain/document/document.service");
const typeorm_1 = require("typeorm");
let GetApprovalListUseCase = class GetApprovalListUseCase {
    constructor(domainDocumentService) {
        this.domainDocumentService = domainDocumentService;
    }
    async execute(user, query, status, stepType) {
        const offset = (query.page - 1) * query.limit;
        console.log(user.employeeId);
        const [documents, total] = await this.domainDocumentService.findAndCount({
            where: {
                ...(status
                    ? {
                        status: (0, typeorm_1.In)(Array.isArray(status) ? status : [status]),
                    }
                    : {}),
                ...(stepType
                    ? {
                        approvalSteps: {
                            type: (0, typeorm_1.In)(Array.isArray(stepType) ? stepType : [stepType]),
                            approverId: user.employeeId,
                        },
                    }
                    : {}),
            },
            relations: ['drafter', 'approvalSteps', 'parentDocument', 'files', 'approvalSteps.approver'],
            skip: offset,
            take: query.limit,
            order: {
                createdAt: 'DESC',
            },
        });
        console.log(JSON.stringify(documents.map((document) => {
            console.log(document.approvalSteps
                .map((step) => {
                return {
                    approverId: step.approver.employeeId,
                    approver: step.approver.name,
                    type: step.type,
                    isApproved: step.isApproved,
                    approvedDate: step.approvedDate,
                };
            })
                .filter((step) => step.approverId === user.employeeId));
            return {
                documentId: document.documentId,
                title: document.title,
                status: document.status,
                createdAt: document.createdAt,
                drafter: document.drafter.name,
                approver: document.approvalSteps
                    .map((step) => {
                    return {
                        approverId: step.approver.employeeId,
                        approver: step.approver.name,
                        type: step.type,
                        isApproved: step.isApproved,
                        approvedDate: step.approvedDate,
                    };
                })
                    .filter((step) => step.approverId === user.employeeId),
            };
        }), null, 2));
        return {
            items: documents,
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }
};
exports.GetApprovalListUseCase = GetApprovalListUseCase;
exports.GetApprovalListUseCase = GetApprovalListUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_service_1.DomainDocumentService])
], GetApprovalListUseCase);
//# sourceMappingURL=get-approval-list.usecase.js.map