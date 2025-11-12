import { Injectable, Logger } from '@nestjs/common';
import { NotificationContext } from '../../../context/notification/notification.context';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { DocumentContext } from '../../../context/document/document.context';
import { ApprovalStepSnapshot } from '../../../domain/approval-step-snapshot/approval-step-snapshot.entity';
import { Document } from '../../../domain/document/document.entity';
import { ApprovalStepType, ApprovalStatus, DocumentStatus } from '../../../../common/enums/approval.enum';

/**
 * 결재 알림 서비스
 *
 * 역할:
 * - 결재 승인/반려/협의/시행 완료 후 관련자에게 알림 전송
 * - 다음 처리자 자동 탐지 및 알림
 * - 기안자 및 참조자에게 완료 알림
 */
@Injectable()
export class ApprovalNotificationService {
    private readonly logger = new Logger(ApprovalNotificationService.name);

    constructor(
        private readonly notificationContext: NotificationContext,
        private readonly approvalProcessContext: ApprovalProcessContext,
        private readonly documentContext: DocumentContext,
    ) {}

    /**
     * 결재 승인 후 알림 전송
     */
    async sendNotificationAfterApprove(
        documentId: string,
        currentStepId: string,
        approverEmployeeNumber: string,
    ): Promise<void> {
        this.logger.log(`결재 승인 후 알림 전송: ${documentId}`);

        try {
            // 1. 문서 정보 조회
            const document = await this.documentContext.getDocument(documentId);

            // 2. 모든 결재 단계 조회
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);

            // 3. 현재 승인한 단계
            const currentStep = allSteps.find((step) => step.id === currentStepId);
            if (!currentStep) {
                this.logger.warn(`현재 단계를 찾을 수 없습니다: ${currentStepId}`);
                return;
            }

            // 4. 다음 처리해야 할 단계 찾기
            const nextPendingStep = this.findNextPendingStep(allSteps, currentStep.stepOrder);

            if (nextPendingStep) {
                // 4-1. 다음 단계가 있으면 해당 담당자에게 알림
                await this.sendNotificationToApprover(nextPendingStep, document, approverEmployeeNumber);
            } else {
                // 4-2. 다음 단계가 없으면 문서 완료
                // 참조자들에게 알림
                await this.sendNotificationToReferences(document, approverEmployeeNumber);

                // 기안자에게 최종 완료 알림
                await this.sendCompletionNotificationToDrafter(document, approverEmployeeNumber);
            }
        } catch (error) {
            this.logger.error(`결재 승인 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }

    /**
     * 결재 반려 후 알림 전송
     */
    async sendNotificationAfterReject(
        documentId: string,
        rejectReason: string,
        rejecterEmployeeNumber: string,
    ): Promise<void> {
        this.logger.log(`결재 반려 후 알림 전송: ${documentId}`);

        try {
            // 1. 문서 정보 조회
            const document = await this.documentContext.getDocument(documentId);

            // 2. 기안자에게 반려 알림 전송
            await this.notificationContext.sendNotificationToEmployee({
                sender: rejecterEmployeeNumber,
                title: `[반려] ${document.title}`,
                content: `작성하신 문서가 반려되었습니다.\n사유: ${rejectReason}`,
                recipientEmployeeId: document.drafterId,
                linkUrl: `/approval/document/${document.id}`,
                metadata: {
                    documentId: document.id,
                    status: DocumentStatus.REJECTED,
                    reason: rejectReason,
                },
            });

            this.logger.log(`기안자 반려 알림 전송 완료: ${document.drafterId}`);
        } catch (error) {
            this.logger.error(`결재 반려 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }

    /**
     * 협의 완료 후 알림 전송
     */
    async sendNotificationAfterCompleteAgreement(documentId: string, agreerEmployeeNumber: string): Promise<void> {
        this.logger.log(`협의 완료 후 알림 전송: ${documentId}`);

        try {
            // 1. 문서 정보 조회
            const document = await this.documentContext.getDocument(documentId);

            // 2. 모든 결재 단계 조회
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);

            // 3. 모든 협의가 완료되었는지 확인
            const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);

            if (!allAgreementsCompleted) {
                this.logger.debug('아직 완료되지 않은 협의가 있습니다.');
                return;
            }

            // 4. 모든 협의가 완료되었으면 첫 번째 결재자에게 알림
            const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
            const firstApprovalStep = approvalSteps.find((s) => s.status === ApprovalStatus.PENDING);

            if (firstApprovalStep) {
                await this.sendNotificationToApprover(firstApprovalStep, document, agreerEmployeeNumber);
            }
        } catch (error) {
            this.logger.error(`협의 완료 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }

    /**
     * 시행 완료 후 알림 전송
     */
    async sendNotificationAfterCompleteImplementation(
        documentId: string,
        implementerEmployeeNumber: string,
    ): Promise<void> {
        this.logger.log(`시행 완료 후 알림 전송: ${documentId}`);

        try {
            // 1. 문서 정보 조회
            const document = await this.documentContext.getDocument(documentId);

            // 2. 참조자들에게 시행 완료 알림
            await this.sendNotificationToReferences(document, implementerEmployeeNumber);

            // 3. 기안자에게 시행 완료 알림
            await this.notificationContext.sendNotificationToEmployee({
                sender: implementerEmployeeNumber,
                title: `[시행완료] ${document.title}`,
                content: `작성하신 문서의 시행이 완료되었습니다.`,
                recipientEmployeeId: document.drafterId,
                linkUrl: `/approval/document/${document.id}`,
                metadata: {
                    documentId: document.id,
                    status: DocumentStatus.IMPLEMENTED,
                },
            });

            this.logger.log(`시행 완료 알림 전송 완료`);
        } catch (error) {
            this.logger.error(`시행 완료 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }

    /**
     * 문서 기안 시 초기 알림 전송
     * - 협의자가 있으면 협의자들에게 알림
     * - 협의자가 없고 첫 번째 결재자가 기안자가 아니면 첫 번째 결재자에게 알림
     */
    async sendNotificationAfterSubmit(documentId: string, drafterEmployeeNumber: string): Promise<void> {
        this.logger.log(`문서 기안 후 알림 전송: ${documentId}`);

        try {
            // 1. 문서 정보 조회
            const document = await this.documentContext.getDocument(documentId);

            // 2. 모든 결재 단계 조회
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);

            // 3. 협의 단계 확인
            const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);

            if (agreementSteps.length > 0) {
                // 3-1. 협의자가 있으면 모든 협의자에게 알림
                const agreementIds = agreementSteps.map((step) => step.approverId);

                await this.notificationContext.sendNotification({
                    sender: drafterEmployeeNumber,
                    title: `[협의요청] ${document.title}`,
                    content: `${document.drafter?.name || '기안자'}님이 작성한 문서의 협의가 요청되었습니다.`,
                    recipientEmployeeIds: agreementIds,
                    linkUrl: `/approval/document/${document.id}`,
                    metadata: {
                        documentId: document.id,
                        stepType: ApprovalStepType.AGREEMENT,
                    },
                });

                this.logger.log(`협의자 알림 전송 완료: ${agreementIds.length}명`);
            } else {
                // 3-2. 협의자가 없으면 첫 번째 결재자에게 알림
                const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
                const firstApprovalStep = approvalSteps.find((s) => s.status === ApprovalStatus.PENDING);

                if (firstApprovalStep && firstApprovalStep.approverId !== document.drafterId) {
                    await this.sendNotificationToApprover(firstApprovalStep, document, drafterEmployeeNumber);
                } else if (!firstApprovalStep) {
                    // 결재자가 없으면 시행자에게 알림
                    const implementationStep = allSteps.find(
                        (s) => s.stepType === ApprovalStepType.IMPLEMENTATION && s.status === ApprovalStatus.PENDING,
                    );

                    if (implementationStep) {
                        await this.sendNotificationToApprover(implementationStep, document, drafterEmployeeNumber);
                    }
                }
            }
        } catch (error) {
            this.logger.error(`문서 기안 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }

    /**
     * 다음 처리 가능한 단계 찾기
     */
    private findNextPendingStep(
        allSteps: ApprovalStepSnapshot[],
        currentStepOrder: number,
    ): ApprovalStepSnapshot | null {
        // 협의가 모두 완료되었는지 확인
        const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
        const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);

        // 결재가 모두 완료되었는지 확인
        const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === ApprovalStatus.APPROVED);

        // 다음 결재자 찾기
        if (!allApprovalsCompleted) {
            // 순서대로 다음 PENDING 상태의 결재자 찾기
            const nextApprovalStep = approvalSteps.find(
                (step) => step.stepOrder > currentStepOrder && step.status === ApprovalStatus.PENDING,
            );

            // 협의가 완료되었을 때만 결재자에게 알림
            if (nextApprovalStep && allAgreementsCompleted) {
                return nextApprovalStep;
            }
        }

        // 결재가 모두 완료되었으면 시행자 찾기
        if (allApprovalsCompleted) {
            const implementationStep = allSteps.find(
                (step) => step.stepType === ApprovalStepType.IMPLEMENTATION && step.status === ApprovalStatus.PENDING,
            );
            return implementationStep || null;
        }

        return null;
    }

    /**
     * 특정 결재자에게 알림 전송
     */
    private async sendNotificationToApprover(
        step: ApprovalStepSnapshot,
        document: Document,
        senderEmployeeNumber: string,
    ): Promise<void> {
        const stepTypeText = this.getStepTypeText(step.stepType);

        await this.notificationContext.sendNotificationToEmployee({
            sender: senderEmployeeNumber,
            title: `[${stepTypeText}] ${document.title}`,
            content: `${document.drafter?.name || '기안자'}님이 작성한 문서가 ${stepTypeText} 대기 중입니다.`,
            recipientEmployeeId: step.approverId,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                stepId: step.id,
                stepType: step.stepType,
            },
        });

        this.logger.log(`${stepTypeText} 알림 전송 완료: ${step.approverId}`);
    }

    /**
     * 참조자들에게 알림 전송
     */
    private async sendNotificationToReferences(document: Document, senderEmployeeNumber: string): Promise<void> {
        // 참조자 목록 조회 (REFERENCE 타입 단계)
        const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(document.id);
        const referenceSteps = allSteps.filter((step) => step.stepType === ApprovalStepType.REFERENCE);

        if (referenceSteps.length === 0) {
            this.logger.debug('참조자가 없습니다.');
            return;
        }

        const referenceIds = referenceSteps.map((step) => step.approverId);

        await this.notificationContext.sendNotification({
            sender: senderEmployeeNumber,
            title: `[참조] ${document.title}`,
            content: `${document.drafter?.name || '기안자'}님의 문서가 최종 승인 완료되었습니다.`,
            recipientEmployeeIds: referenceIds,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                status: document.status,
            },
        });

        this.logger.log(`참조자 알림 전송 완료: ${referenceIds.length}명`);
    }

    /**
     * 기안자에게 완료 알림 전송
     */
    private async sendCompletionNotificationToDrafter(document: Document, senderEmployeeNumber: string): Promise<void> {
        await this.notificationContext.sendNotificationToEmployee({
            sender: senderEmployeeNumber,
            title: `[완료] ${document.title}`,
            content: `작성하신 문서의 결재가 완료되었습니다.`,
            recipientEmployeeId: document.drafterId,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                status: document.status,
            },
        });

        this.logger.log(`기안자 완료 알림 전송: ${document.drafterId}`);
    }

    /**
     * 결재 단계 타입을 한글 텍스트로 변환
     */
    private getStepTypeText(stepType: ApprovalStepType): string {
        switch (stepType) {
            case ApprovalStepType.AGREEMENT:
                return '협의';
            case ApprovalStepType.APPROVAL:
                return '결재';
            case ApprovalStepType.IMPLEMENTATION:
                return '시행';
            case ApprovalStepType.REFERENCE:
                return '참조';
            default:
                return '처리';
        }
    }
}
