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
const create_draft_usecase_1 = require("./usecases/approval/create-draft.usecase");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const approve_step_usecase_1 = require("./usecases/approval/approve-step.usecase");
const approve_document_usecase_1 = require("./usecases/approval/approve-document.usecase");
const check_steps_usecase_1 = require("./usecases/approval/check-steps.usecase");
const get_my_step_usecase_1 = require("./usecases/approval/get-my-step.usecase");
const reject_step_usecase_1 = require("./usecases/approval/reject-step.usecase");
const reject_document_usecase_1 = require("./usecases/approval/reject-document.usecase");
const set_step_current_usecase_1 = require("./usecases/approval/set-step-current.usecase");
const get_approval_documents_usecase_1 = require("./usecases/approval/get-approval-documents.usecase");
const typeorm_1 = require("typeorm");
const create_approve_step_usecase_1 = require("./usecases/approval/create-approve-step.usecase");
let ApprovalService = class ApprovalService {
    constructor(dataSource, createDraftUseCase, approveStepUseCase, approveDocumentUseCase, checkStepsUseCase, getMyStepUseCase, rejectStepUseCase, rejectDocumentUseCase, setStepCurrentUseCase, getApprovalDocumentsUseCase, createApproveStepUseCase) {
        this.dataSource = dataSource;
        this.createDraftUseCase = createDraftUseCase;
        this.approveStepUseCase = approveStepUseCase;
        this.approveDocumentUseCase = approveDocumentUseCase;
        this.checkStepsUseCase = checkStepsUseCase;
        this.getMyStepUseCase = getMyStepUseCase;
        this.rejectStepUseCase = rejectStepUseCase;
        this.rejectDocumentUseCase = rejectDocumentUseCase;
        this.setStepCurrentUseCase = setStepCurrentUseCase;
        this.getApprovalDocumentsUseCase = getApprovalDocumentsUseCase;
        this.createApproveStepUseCase = createApproveStepUseCase;
    }
    async createDraft(user, draftData) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const document = await this.createDraftUseCase.execute(user, draftData, queryRunner);
            const approvalSteps = [];
            if (draftData.approvalSteps && draftData.approvalSteps.length > 0) {
                for (const step of draftData.approvalSteps) {
                    const approvalStep = await this.createApproveStepUseCase.execute(document.documentId, step, queryRunner);
                    approvalSteps.push(approvalStep);
                }
            }
            await queryRunner.commitTransaction();
            return document.documentId;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
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
            await this.setStepCurrentUseCase.execute(nextStep.approvalStepId);
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
        const [allStepsApproved, total] = await this.checkStepsUseCase.execute(documentId);
        if (total > 0) {
            throw new common_1.BadRequestException('모든 결재단계가 승인되지 않았습니다.');
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
    async getApprovalDocuments(user, query, listType) {
        return this.getApprovalDocumentsUseCase.execute(user, query, listType);
    }
    async createTestData() {
        throw new common_1.BadRequestException('랜덤 문서 생성은 /api/v2/approval/random-documents 엔드포인트를 사용하세요.');
    }
};
exports.ApprovalService = ApprovalService;
exports.ApprovalService = ApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        create_draft_usecase_1.CreateDraftUseCase,
        approve_step_usecase_1.ApproveStepUseCase,
        approve_document_usecase_1.ApproveDocumentUseCase,
        check_steps_usecase_1.CheckStepsUseCase,
        get_my_step_usecase_1.GetMyStepUseCase,
        reject_step_usecase_1.RejectStepUseCase,
        reject_document_usecase_1.RejectDocumentUseCase,
        set_step_current_usecase_1.SetStepCurrentUseCase,
        get_approval_documents_usecase_1.GetApprovalDocumentsUseCase,
        create_approve_step_usecase_1.CreateApproveStepUseCase])
], ApprovalService);
//# sourceMappingURL=approval.service.js.map