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
exports.CheckStepsUseCase = void 0;
const common_1 = require("@nestjs/common");
const approval_step_service_1 = require("../../../../domain/approval-step/approval-step.service");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
const typeorm_1 = require("typeorm");
let CheckStepsUseCase = class CheckStepsUseCase {
    constructor(approvalStepService) {
        this.approvalStepService = approvalStepService;
    }
    async execute(documentId) {
        const [steps, total] = await this.approvalStepService.findAndCount({
            where: {
                documentId,
                isApproved: false,
                type: (0, typeorm_1.In)([approval_enum_1.ApprovalStepType.APPROVAL, approval_enum_1.ApprovalStepType.AGREEMENT]),
            },
        });
        return [
            steps.sort((a, b) => {
                if (a.type === approval_enum_1.ApprovalStepType.AGREEMENT && b.type === approval_enum_1.ApprovalStepType.APPROVAL)
                    return -1;
                if (a.type === approval_enum_1.ApprovalStepType.APPROVAL && b.type === approval_enum_1.ApprovalStepType.AGREEMENT)
                    return 1;
                return a.order - b.order;
            }),
            total,
        ];
    }
};
exports.CheckStepsUseCase = CheckStepsUseCase;
exports.CheckStepsUseCase = CheckStepsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_service_1.DomainApprovalStepService])
], CheckStepsUseCase);
//# sourceMappingURL=check-steps.usecase.js.map