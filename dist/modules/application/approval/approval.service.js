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
exports.ApprovalService = void 0;
const common_1 = require("@nestjs/common");
const create_draft_usecase_1 = require("./usecases/document/create-draft.usecase");
const get_approval_list_usecase_1 = require("./usecases/document/get-approval-list.usecase");
const get_draft_usecase_1 = require("./usecases/document/get-draft.usecase");
const update_draft_usecase_1 = require("./usecases/document/update-draft.usecase");
const delete_draft_usecase_1 = require("./usecases/document/delete-draft.usecase");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const approve_step_usecase_1 = require("./usecases/approval/approve-step.usecase");
const approve_document_usecase_1 = require("./usecases/approval/approve-document.usecase");
const check_steps_usecase_1 = require("./usecases/approval/check-steps.usecase");
const get_my_step_usecase_1 = require("./usecases/approval/get-my-step.usecase");
const reject_step_usecase_1 = require("./usecases/approval/reject-step.usecase");
const reject_document_usecase_1 = require("./usecases/approval/reject-document.usecase");
let ApprovalService = class ApprovalService {
    constructor(createDraftUseCase, getApprovalListUseCase, getDraftUseCase, updateDraftUseCase, deleteDraftUseCase, approveStepUseCase, approveDocumentUseCase, checkStepsUseCase, getMyStepUseCase, rejectStepUseCase, rejectDocumentUseCase) {
        this.createDraftUseCase = createDraftUseCase;
        this.getApprovalListUseCase = getApprovalListUseCase;
        this.getDraftUseCase = getDraftUseCase;
        this.updateDraftUseCase = updateDraftUseCase;
        this.deleteDraftUseCase = deleteDraftUseCase;
        this.approveStepUseCase = approveStepUseCase;
        this.approveDocumentUseCase = approveDocumentUseCase;
        this.checkStepsUseCase = checkStepsUseCase;
        this.getMyStepUseCase = getMyStepUseCase;
        this.rejectStepUseCase = rejectStepUseCase;
        this.rejectDocumentUseCase = rejectDocumentUseCase;
    }
    async createDraft(user, draftData) {
        return this.createDraftUseCase.execute(user, draftData);
    }
    async getDraftList(user, query, status, stepType) {
        return this.getApprovalListUseCase.execute(user, query, status, stepType);
    }
    async getDraft(id) {
        return this.getDraftUseCase.execute(id);
    }
    async updateDraft(id, draftData) {
        return this.updateDraftUseCase.execute(id, draftData);
    }
    async deleteDraft(id) {
        return this.deleteDraftUseCase.execute(id);
    }
    async approve(user, documentId) {
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);
        if (myStep.type === approval_enum_1.ApprovalStepType.IMPLEMENTATION || myStep.type === approval_enum_1.ApprovalStepType.REFERENCE) {
            throw new common_1.BadRequestException('결재 단계가 아닙니다.');
        }
        const approvalStep = await this.approveStepUseCase.execute(myStep.approvalStepId);
        console.log('approvalStep', approvalStep);
        const [allStepsApproved, total] = await this.checkStepsUseCase.execute(documentId);
        if (total > 0) {
            console.log('다음 단계로 알림보내기');
            const nextStep = allStepsApproved[0];
            console.log('nextStep', nextStep);
        }
        else {
            await this.approveDocumentUseCase.execute(documentId);
        }
    }
    async reject(user, documentId) {
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);
        if (myStep.type === approval_enum_1.ApprovalStepType.IMPLEMENTATION || myStep.type === approval_enum_1.ApprovalStepType.REFERENCE) {
            throw new common_1.BadRequestException('결재 단계가 아닙니다.');
        }
        await this.rejectStepUseCase.execute(myStep.approvalStepId);
        await this.rejectDocumentUseCase.execute(documentId);
    }
    async implementation(user, documentId) {
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);
        if (myStep.type !== approval_enum_1.ApprovalStepType.IMPLEMENTATION) {
            throw new common_1.BadRequestException('시행 단계가 아닙니다.');
        }
        await this.approveStepUseCase.execute(myStep.approvalStepId);
    }
    async reference(user, documentId) {
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);
        if (myStep.type !== approval_enum_1.ApprovalStepType.REFERENCE) {
            throw new common_1.BadRequestException('열람 단계가 아닙니다.');
        }
        await this.approveStepUseCase.execute(myStep.approvalStepId);
    }
};
exports.ApprovalService = ApprovalService;
exports.ApprovalService = ApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_draft_usecase_1.CreateDraftUseCase,
        get_approval_list_usecase_1.GetApprovalListUseCase,
        get_draft_usecase_1.GetDraftUseCase,
        update_draft_usecase_1.UpdateDraftUseCase,
        delete_draft_usecase_1.DeleteDraftUseCase,
        approve_step_usecase_1.ApproveStepUseCase,
        approve_document_usecase_1.ApproveDocumentUseCase,
        check_steps_usecase_1.CheckStepsUseCase,
        get_my_step_usecase_1.GetMyStepUseCase,
        reject_step_usecase_1.RejectStepUseCase,
        reject_document_usecase_1.RejectDocumentUseCase])
], ApprovalService);
//# sourceMappingURL=approval.service.js.map