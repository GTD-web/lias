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
exports.ApproveStepUseCase = void 0;
const common_1 = require("@nestjs/common");
const approval_step_service_1 = require("../../../../domain/approval-step/approval-step.service");
let ApproveStepUseCase = class ApproveStepUseCase {
    constructor(approvalStepService) {
        this.approvalStepService = approvalStepService;
    }
    async execute(approvalStepId, queryRunner) {
        return await this.approvalStepService.approve(approvalStepId, queryRunner);
    }
};
exports.ApproveStepUseCase = ApproveStepUseCase;
exports.ApproveStepUseCase = ApproveStepUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_service_1.DomainApprovalStepService])
], ApproveStepUseCase);
//# sourceMappingURL=approve-step.usecase.js.map