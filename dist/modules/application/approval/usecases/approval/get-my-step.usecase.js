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
exports.GetMyStepUseCase = void 0;
const common_1 = require("@nestjs/common");
const approval_step_service_1 = require("../../../../domain/approval-step/approval-step.service");
let GetMyStepUseCase = class GetMyStepUseCase {
    constructor(approvalStepService) {
        this.approvalStepService = approvalStepService;
    }
    async execute(documentId, employeeId) {
        const myStep = await this.approvalStepService.findOne({
            where: {
                documentId,
                approverId: employeeId,
            },
        });
        if (!myStep) {
            throw new common_1.NotFoundException('결재 단계를 찾을 수 없습니다.');
        }
        if (myStep.approvedDate) {
            throw new common_1.BadRequestException('이미 승인된 결재 단계입니다.');
        }
        return myStep;
    }
};
exports.GetMyStepUseCase = GetMyStepUseCase;
exports.GetMyStepUseCase = GetMyStepUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_service_1.DomainApprovalStepService])
], GetMyStepUseCase);
//# sourceMappingURL=get-my-step.usecase.js.map