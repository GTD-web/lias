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
exports.FindApprovalLinesUseCase = void 0;
const common_1 = require("@nestjs/common");
const form_approval_line_service_1 = require("../../../../domain/form-approval-line/form-approval-line.service");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
let FindApprovalLinesUseCase = class FindApprovalLinesUseCase {
    constructor(formApprovalLineService) {
        this.formApprovalLineService = formApprovalLineService;
    }
    async execute(page, limit, type) {
        console.log('page', page);
        console.log('limit', limit);
        console.log('type', type);
        const [approvalLines, total] = await this.formApprovalLineService.findAndCount({
            where: {
                type: type || approval_enum_1.ApprovalLineType.COMMON,
            },
            relations: ['formApprovalSteps', 'formApprovalSteps.defaultApprover'],
            order: {
                formApprovalSteps: {
                    order: 'ASC',
                },
            },
            skip: (page - 1) * limit,
            take: limit,
        });
        const meta = {
            total,
            page,
            limit,
            hasNext: total > page * limit,
        };
        return {
            items: approvalLines,
            meta,
        };
    }
};
exports.FindApprovalLinesUseCase = FindApprovalLinesUseCase;
exports.FindApprovalLinesUseCase = FindApprovalLinesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_approval_line_service_1.DomainFormApprovalLineService])
], FindApprovalLinesUseCase);
//# sourceMappingURL=find-approval-lines.usecase.js.map