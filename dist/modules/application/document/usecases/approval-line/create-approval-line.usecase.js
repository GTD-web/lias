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
exports.CreateApprovalLineUseCase = void 0;
const common_1 = require("@nestjs/common");
const form_approval_line_service_1 = require("../../../../domain/form-approval-line/form-approval-line.service");
const form_approval_step_service_1 = require("../../../../domain/form-approval-step/form-approval-step.service");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
let CreateApprovalLineUseCase = class CreateApprovalLineUseCase {
    constructor(formApprovalLineService, formApprovalStepService) {
        this.formApprovalLineService = formApprovalLineService;
        this.formApprovalStepService = formApprovalStepService;
    }
    async execute(user, dto) {
        if (dto.type === approval_enum_1.ApprovalLineType.CUSTOM) {
            dto['employeeId'] = user.employeeId;
        }
        let approvalLine = await this.formApprovalLineService.save(dto);
        for (const stepDto of dto.formApprovalSteps) {
            await this.formApprovalStepService.save({
                ...stepDto,
                formApprovalLine: approvalLine,
            });
        }
        approvalLine = await this.formApprovalLineService.findOne({
            where: {
                formApprovalLineId: approvalLine.formApprovalLineId,
            },
            relations: ['formApprovalSteps', 'formApprovalSteps.defaultApprover'],
        });
        return approvalLine;
    }
};
exports.CreateApprovalLineUseCase = CreateApprovalLineUseCase;
exports.CreateApprovalLineUseCase = CreateApprovalLineUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_approval_line_service_1.DomainFormApprovalLineService,
        form_approval_step_service_1.DomainFormApprovalStepService])
], CreateApprovalLineUseCase);
//# sourceMappingURL=create-approval-line.usecase.js.map