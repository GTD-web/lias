"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPolicyValidator = exports.ReceiverAction = exports.DrafterAction = void 0;
const common_1 = require("@nestjs/common");
const approval_enum_1 = require("../enums/approval.enum");
var DrafterAction;
(function (DrafterAction) {
    DrafterAction["UPDATE_CONTENT"] = "UPDATE_CONTENT";
    DrafterAction["UPDATE_APPROVAL_LINE"] = "UPDATE_APPROVAL_LINE";
    DrafterAction["DELETE"] = "DELETE";
    DrafterAction["SUBMIT"] = "SUBMIT";
    DrafterAction["CANCEL_SUBMIT"] = "CANCEL_SUBMIT";
})(DrafterAction || (exports.DrafterAction = DrafterAction = {}));
var ReceiverAction;
(function (ReceiverAction) {
    ReceiverAction["APPROVE"] = "APPROVE";
    ReceiverAction["REJECT"] = "REJECT";
    ReceiverAction["CANCEL"] = "CANCEL";
    ReceiverAction["COMPLETE_IMPLEMENTATION"] = "COMPLETE_IMPLEMENTATION";
    ReceiverAction["READ_REFERENCE"] = "READ_REFERENCE";
})(ReceiverAction || (exports.ReceiverAction = ReceiverAction = {}));
class DocumentPolicyValidator {
    static validateDrafterAction(documentStatus, action) {
        const allowedActions = this.DRAFTER_ALLOWED_ACTIONS[documentStatus] || [];
        if (!allowedActions.includes(action)) {
            const statusLabel = this.DOCUMENT_STATUS_LABELS[documentStatus];
            const actionLabel = this.DRAFTER_ACTION_LABELS[action];
            const allowedLabels = allowedActions.map((a) => this.DRAFTER_ACTION_LABELS[a]).join(', ');
            return {
                isValid: false,
                errorMessage: `'${statusLabel}' 상태의 문서에서는 '${actionLabel}'을(를) 수행할 수 없습니다.${allowedLabels ? ` 가능한 액션: ${allowedLabels}` : ' 가능한 액션이 없습니다.'}`,
            };
        }
        return { isValid: true };
    }
    static validateDrafterActionOrThrow(documentStatus, action) {
        const result = this.validateDrafterAction(documentStatus, action);
        if (!result.isValid) {
            throw new common_1.BadRequestException(result.errorMessage);
        }
    }
    static canUpdateContent(documentStatus) {
        return this.validateDrafterAction(documentStatus, DrafterAction.UPDATE_CONTENT).isValid;
    }
    static canUpdateApprovalLine(documentStatus) {
        return this.validateDrafterAction(documentStatus, DrafterAction.UPDATE_APPROVAL_LINE).isValid;
    }
    static canDelete(documentStatus) {
        return this.validateDrafterAction(documentStatus, DrafterAction.DELETE).isValid;
    }
    static canSubmit(documentStatus) {
        return this.validateDrafterAction(documentStatus, DrafterAction.SUBMIT).isValid;
    }
    static validateCancelSubmit(documentStatus, hasAnyApprovalProcessed) {
        if (documentStatus !== approval_enum_1.DocumentStatus.PENDING) {
            return {
                isValid: false,
                errorMessage: `'${this.DOCUMENT_STATUS_LABELS[documentStatus]}' 상태의 문서는 상신 취소할 수 없습니다. 결재진행중 상태에서만 상신 취소가 가능합니다.`,
            };
        }
        if (hasAnyApprovalProcessed) {
            return {
                isValid: false,
                errorMessage: '이미 결재자가 처리한 건이 있어 상신 취소할 수 없습니다.',
            };
        }
        return { isValid: true };
    }
    static validateCancelSubmitOrThrow(documentStatus, hasAnyApprovalProcessed) {
        const result = this.validateCancelSubmit(documentStatus, hasAnyApprovalProcessed);
        if (!result.isValid) {
            throw new common_1.BadRequestException(result.errorMessage);
        }
    }
    static validateReceiverAction(stepType, documentStatus, action) {
        const policy = this.RECEIVER_POLICY[stepType];
        if (!policy) {
            return {
                isValid: false,
                errorMessage: `알 수 없는 결재 단계 타입입니다: ${stepType}`,
            };
        }
        const stepTypeLabel = this.STEP_TYPE_LABELS[stepType];
        const documentStatusLabel = this.DOCUMENT_STATUS_LABELS[documentStatus];
        const actionLabel = this.RECEIVER_ACTION_LABELS[action];
        if (!policy.allowedDocumentStatuses.includes(documentStatus)) {
            const allowedStatusLabels = policy.allowedDocumentStatuses
                .map((s) => this.DOCUMENT_STATUS_LABELS[s])
                .join(', ');
            return {
                isValid: false,
                errorMessage: `'${stepTypeLabel}'는 '${documentStatusLabel}' 상태의 문서에서 처리할 수 없습니다. 허용되는 문서 상태: ${allowedStatusLabels}`,
            };
        }
        if (!policy.allowedActions.includes(action)) {
            const allowedActionLabels = policy.allowedActions.map((a) => this.RECEIVER_ACTION_LABELS[a]).join(', ');
            return {
                isValid: false,
                errorMessage: `'${stepTypeLabel}'는 '${actionLabel}'을(를) 수행할 수 없습니다. 가능한 액션: ${allowedActionLabels}`,
            };
        }
        return { isValid: true };
    }
    static validateReceiverActionOrThrow(stepType, documentStatus, action) {
        const result = this.validateReceiverAction(stepType, documentStatus, action);
        if (!result.isValid) {
            throw new common_1.BadRequestException(result.errorMessage);
        }
    }
    static validateCancelApproval(currentStepStatus, hasNextStepProcessed) {
        if (currentStepStatus !== approval_enum_1.ApprovalStatus.APPROVED) {
            return {
                isValid: false,
                errorMessage: '본인이 승인한 단계만 결재 취소할 수 있습니다.',
            };
        }
        if (hasNextStepProcessed) {
            return {
                isValid: false,
                errorMessage: '다음 단계가 이미 처리되어 결재 취소할 수 없습니다.',
            };
        }
        return { isValid: true };
    }
    static validateCancelApprovalOrThrow(currentStepStatus, hasNextStepProcessed) {
        const result = this.validateCancelApproval(currentStepStatus, hasNextStepProcessed);
        if (!result.isValid) {
            throw new common_1.BadRequestException(result.errorMessage);
        }
    }
    static validateApprovalOrder(currentStepType, currentStepOrder, allSteps) {
        if (currentStepType === approval_enum_1.ApprovalStepType.APPROVAL) {
            const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
            const pendingAgreements = agreementSteps.filter((s) => s.status === approval_enum_1.ApprovalStatus.PENDING);
            if (pendingAgreements.length > 0) {
                return {
                    isValid: false,
                    errorMessage: '모든 협의가 완료되어야 결재를 진행할 수 있습니다.',
                };
            }
        }
        const sameTypeSteps = allSteps.filter((s) => s.stepType === currentStepType && s.stepOrder < currentStepOrder);
        const pendingPreviousSteps = sameTypeSteps.filter((s) => s.status === approval_enum_1.ApprovalStatus.PENDING);
        if (pendingPreviousSteps.length > 0) {
            const stepTypeLabel = this.STEP_TYPE_LABELS[currentStepType];
            return {
                isValid: false,
                errorMessage: `이전 ${stepTypeLabel} 단계가 완료되어야 현재 단계를 처리할 수 있습니다.`,
            };
        }
        return { isValid: true };
    }
    static validateApprovalOrderOrThrow(currentStepType, currentStepOrder, allSteps) {
        const result = this.validateApprovalOrder(currentStepType, currentStepOrder, allSteps);
        if (!result.isValid) {
            throw new common_1.BadRequestException(result.errorMessage);
        }
    }
    static hasAnyApprovalProcessed(steps) {
        return steps.some((step) => step.stepType === approval_enum_1.ApprovalStepType.APPROVAL &&
            step.status !== approval_enum_1.ApprovalStatus.PENDING &&
            step.status !== approval_enum_1.ApprovalStatus.CANCELLED);
    }
    static hasNextStepProcessed(currentStepOrder, allSteps) {
        return allSteps.some((step) => step.stepOrder > currentStepOrder &&
            step.status !== approval_enum_1.ApprovalStatus.PENDING &&
            step.status !== approval_enum_1.ApprovalStatus.CANCELLED);
    }
    static isAllApprovalCompleted(steps) {
        const approvalSteps = steps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
        return approvalSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
    }
    static isAllAgreementCompleted(steps) {
        const agreementSteps = steps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
        return agreementSteps.length === 0 || agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
    }
    static isAllImplementationCompleted(steps) {
        const implementationSteps = steps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION);
        return (implementationSteps.length === 0 || implementationSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED));
    }
    static determineNextDocumentStatus(currentStatus, steps) {
        if (currentStatus === approval_enum_1.DocumentStatus.PENDING) {
            if (this.isAllAgreementCompleted(steps) && this.isAllApprovalCompleted(steps)) {
                return approval_enum_1.DocumentStatus.APPROVED;
            }
        }
        if (currentStatus === approval_enum_1.DocumentStatus.APPROVED) {
            if (this.isAllImplementationCompleted(steps)) {
                return approval_enum_1.DocumentStatus.IMPLEMENTED;
            }
        }
        return null;
    }
    static getAllowedDrafterActions(documentStatus) {
        return [...(this.DRAFTER_ALLOWED_ACTIONS[documentStatus] || [])];
    }
    static getAllowedDocumentStatuses(stepType) {
        const policy = this.RECEIVER_POLICY[stepType];
        return policy ? [...policy.allowedDocumentStatuses] : [];
    }
    static getAllowedReceiverActions(stepType) {
        const policy = this.RECEIVER_POLICY[stepType];
        return policy ? [...policy.allowedActions] : [];
    }
}
exports.DocumentPolicyValidator = DocumentPolicyValidator;
DocumentPolicyValidator.DRAFTER_ALLOWED_ACTIONS = {
    [approval_enum_1.DocumentStatus.DRAFT]: [
        DrafterAction.UPDATE_CONTENT,
        DrafterAction.UPDATE_APPROVAL_LINE,
        DrafterAction.DELETE,
        DrafterAction.SUBMIT,
    ],
    [approval_enum_1.DocumentStatus.PENDING]: [DrafterAction.UPDATE_CONTENT, DrafterAction.CANCEL_SUBMIT],
    [approval_enum_1.DocumentStatus.APPROVED]: [],
    [approval_enum_1.DocumentStatus.REJECTED]: [],
    [approval_enum_1.DocumentStatus.IMPLEMENTED]: [],
    [approval_enum_1.DocumentStatus.CANCELLED]: [],
};
DocumentPolicyValidator.RECEIVER_POLICY = {
    [approval_enum_1.ApprovalStepType.AGREEMENT]: {
        allowedDocumentStatuses: [approval_enum_1.DocumentStatus.PENDING],
        allowedActions: [ReceiverAction.APPROVE, ReceiverAction.REJECT],
    },
    [approval_enum_1.ApprovalStepType.APPROVAL]: {
        allowedDocumentStatuses: [approval_enum_1.DocumentStatus.PENDING],
        allowedActions: [ReceiverAction.APPROVE, ReceiverAction.REJECT, ReceiverAction.CANCEL],
    },
    [approval_enum_1.ApprovalStepType.IMPLEMENTATION]: {
        allowedDocumentStatuses: [approval_enum_1.DocumentStatus.APPROVED],
        allowedActions: [ReceiverAction.COMPLETE_IMPLEMENTATION],
    },
    [approval_enum_1.ApprovalStepType.REFERENCE]: {
        allowedDocumentStatuses: [approval_enum_1.DocumentStatus.IMPLEMENTED],
        allowedActions: [ReceiverAction.READ_REFERENCE],
    },
};
DocumentPolicyValidator.DOCUMENT_STATUS_LABELS = {
    [approval_enum_1.DocumentStatus.DRAFT]: '임시저장',
    [approval_enum_1.DocumentStatus.PENDING]: '결재진행중',
    [approval_enum_1.DocumentStatus.APPROVED]: '결재완료',
    [approval_enum_1.DocumentStatus.REJECTED]: '반려',
    [approval_enum_1.DocumentStatus.IMPLEMENTED]: '시행완료',
    [approval_enum_1.DocumentStatus.CANCELLED]: '취소',
};
DocumentPolicyValidator.STEP_TYPE_LABELS = {
    [approval_enum_1.ApprovalStepType.AGREEMENT]: '합의자',
    [approval_enum_1.ApprovalStepType.APPROVAL]: '결재자',
    [approval_enum_1.ApprovalStepType.IMPLEMENTATION]: '시행자',
    [approval_enum_1.ApprovalStepType.REFERENCE]: '참조자',
};
DocumentPolicyValidator.DRAFTER_ACTION_LABELS = {
    [DrafterAction.UPDATE_CONTENT]: '문서 내용 수정',
    [DrafterAction.UPDATE_APPROVAL_LINE]: '결재선 수정',
    [DrafterAction.DELETE]: '문서 삭제',
    [DrafterAction.SUBMIT]: '상신',
    [DrafterAction.CANCEL_SUBMIT]: '상신 취소',
};
DocumentPolicyValidator.RECEIVER_ACTION_LABELS = {
    [ReceiverAction.APPROVE]: '승인',
    [ReceiverAction.REJECT]: '반려',
    [ReceiverAction.CANCEL]: '결재 취소',
    [ReceiverAction.COMPLETE_IMPLEMENTATION]: '시행 완료',
    [ReceiverAction.READ_REFERENCE]: '참조 열람',
};
//# sourceMappingURL=document-policy.validator.js.map