import { DocumentStatus, ApprovalStepType, ApprovalStatus } from '../enums/approval.enum';
export declare enum DrafterAction {
    UPDATE_CONTENT = "UPDATE_CONTENT",
    UPDATE_APPROVAL_LINE = "UPDATE_APPROVAL_LINE",
    DELETE = "DELETE",
    SUBMIT = "SUBMIT",
    CANCEL_SUBMIT = "CANCEL_SUBMIT"
}
export declare enum ReceiverAction {
    APPROVE = "APPROVE",
    REJECT = "REJECT",
    CANCEL = "CANCEL",
    COMPLETE_IMPLEMENTATION = "COMPLETE_IMPLEMENTATION",
    READ_REFERENCE = "READ_REFERENCE"
}
export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}
export declare class DocumentPolicyValidator {
    private static readonly DRAFTER_ALLOWED_ACTIONS;
    private static readonly RECEIVER_POLICY;
    private static readonly DOCUMENT_STATUS_LABELS;
    private static readonly STEP_TYPE_LABELS;
    private static readonly DRAFTER_ACTION_LABELS;
    private static readonly RECEIVER_ACTION_LABELS;
    static validateDrafterAction(documentStatus: DocumentStatus, action: DrafterAction): ValidationResult;
    static validateDrafterActionOrThrow(documentStatus: DocumentStatus, action: DrafterAction): void;
    static canUpdateContent(documentStatus: DocumentStatus): boolean;
    static canUpdateApprovalLine(documentStatus: DocumentStatus): boolean;
    static canDelete(documentStatus: DocumentStatus): boolean;
    static canSubmit(documentStatus: DocumentStatus): boolean;
    static validateCancelSubmit(documentStatus: DocumentStatus, hasAnyApprovalProcessed: boolean): ValidationResult;
    static validateCancelSubmitOrThrow(documentStatus: DocumentStatus, hasAnyApprovalProcessed: boolean): void;
    static validateReceiverAction(stepType: ApprovalStepType, documentStatus: DocumentStatus, action: ReceiverAction): ValidationResult;
    static validateReceiverActionOrThrow(stepType: ApprovalStepType, documentStatus: DocumentStatus, action: ReceiverAction): void;
    static validateCancelApproval(currentStepStatus: ApprovalStatus, hasNextStepProcessed: boolean): ValidationResult;
    static validateCancelApprovalOrThrow(currentStepStatus: ApprovalStatus, hasNextStepProcessed: boolean): void;
    static validateApprovalOrder(currentStepType: ApprovalStepType, currentStepOrder: number, allSteps: Array<{
        stepType: ApprovalStepType;
        stepOrder: number;
        status: ApprovalStatus;
    }>): ValidationResult;
    static validateApprovalOrderOrThrow(currentStepType: ApprovalStepType, currentStepOrder: number, allSteps: Array<{
        stepType: ApprovalStepType;
        stepOrder: number;
        status: ApprovalStatus;
    }>): void;
    static hasAnyApprovalProcessed(steps: Array<{
        stepType: ApprovalStepType;
        status: ApprovalStatus;
    }>): boolean;
    static hasNextStepProcessed(currentStepOrder: number, allSteps: Array<{
        stepOrder: number;
        status: ApprovalStatus;
    }>): boolean;
    static isAllApprovalCompleted(steps: Array<{
        stepType: ApprovalStepType;
        status: ApprovalStatus;
    }>): boolean;
    static isAllAgreementCompleted(steps: Array<{
        stepType: ApprovalStepType;
        status: ApprovalStatus;
    }>): boolean;
    static isAllImplementationCompleted(steps: Array<{
        stepType: ApprovalStepType;
        status: ApprovalStatus;
    }>): boolean;
    static determineNextDocumentStatus(currentStatus: DocumentStatus, steps: Array<{
        stepType: ApprovalStepType;
        status: ApprovalStatus;
    }>): DocumentStatus | null;
    static getAllowedDrafterActions(documentStatus: DocumentStatus): DrafterAction[];
    static getAllowedDocumentStatuses(stepType: ApprovalStepType): DocumentStatus[];
    static getAllowedReceiverActions(stepType: ApprovalStepType): ReceiverAction[];
}
