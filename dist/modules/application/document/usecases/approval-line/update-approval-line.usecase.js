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
exports.UpdateApprovalLineUseCase = void 0;
const common_1 = require("@nestjs/common");
const form_approval_line_service_1 = require("../../../../domain/form-approval-line/form-approval-line.service");
const form_approval_step_service_1 = require("../../../../domain/form-approval-step/form-approval-step.service");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
let UpdateApprovalLineUseCase = class UpdateApprovalLineUseCase {
    constructor(formApprovalLineService, formApprovalStepService) {
        this.formApprovalLineService = formApprovalLineService;
        this.formApprovalStepService = formApprovalStepService;
    }
    async execute(user, dto) {
        if (dto.type === approval_enum_1.ApprovalLineType.CUSTOM) {
            dto['employeeId'] = user.employeeId;
        }
        const { formApprovalSteps, ...updateData } = dto;
        const approvalLine = await this.formApprovalLineService.update(dto.formApprovalLineId, updateData);
        for (const stepDto of formApprovalSteps) {
            if (stepDto.formApprovalStepId) {
                await this.formApprovalStepService.update(stepDto.formApprovalStepId, stepDto);
            }
            else {
                await this.formApprovalStepService.save({
                    ...stepDto,
                    formApprovalLine: approvalLine,
                });
            }
        }
        return approvalLine;
    }
};
exports.UpdateApprovalLineUseCase = UpdateApprovalLineUseCase;
exports.UpdateApprovalLineUseCase = UpdateApprovalLineUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_approval_line_service_1.DomainFormApprovalLineService,
        form_approval_step_service_1.DomainFormApprovalStepService])
], UpdateApprovalLineUseCase);
//# sourceMappingURL=update-approval-line.usecase.js.map