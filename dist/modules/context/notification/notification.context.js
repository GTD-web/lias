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
var NotificationContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContext = void 0;
const common_1 = require("@nestjs/common");
const sso_service_1 = require("../../integrations/sso/sso.service");
const notification_service_1 = require("../../integrations/notification/notification.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let NotificationContext = NotificationContext_1 = class NotificationContext {
    constructor(ssoService, notificationService) {
        this.ssoService = ssoService;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(NotificationContext_1.name);
    }
    async sendNotification(dto) {
        this.logger.log(`알림 전송 시작: ${dto.recipientEmployeeIds.length}명, 제목: ${dto.title}`);
        this.validateSendNotificationDto(dto);
        try {
            const fcmResponse = await this.ssoService.getMultipleFcmTokens({
                employeeIds: dto.recipientEmployeeIds,
            });
            this.logger.debug(`FCM 토큰 조회 완료: ${fcmResponse.totalTokens || 0}개`);
            if (!fcmResponse.allTokens || fcmResponse.allTokens.length === 0) {
                this.logger.warn('알림을 받을 수 있는 FCM 토큰이 없습니다.');
                return {
                    success: false,
                    message: '알림을 받을 수 있는 FCM 토큰이 없습니다.',
                    notificationIds: [],
                    successCount: 0,
                    failureCount: dto.recipientEmployeeIds.length,
                };
            }
            const { byEmployee } = fcmResponse;
            const recipients = byEmployee
                .map((employee) => {
                const prodTokens = employee.tokens
                    .filter((token) => token.deviceType === 'prod')
                    .map((token) => token.fcmToken);
                if (prodTokens.length > 0) {
                    return {
                        employeeNumber: employee.employeeNumber,
                        tokens: prodTokens,
                    };
                }
                return null;
            })
                .filter((recipient) => recipient !== null);
            const notificationDto = {
                sender: dto.sender,
                title: dto.title,
                content: dto.content,
                recipients: recipients,
                sourceSystem: 'LIAS',
                linkUrl: dto.linkUrl,
                metadata: dto.metadata,
            };
            const result = await this.notificationService.sendNotification(notificationDto, dto.authorization);
            this.logger.log(`알림 전송 완료: 성공 ${result.successCount}건, 실패 ${result.failureCount}건`);
            return result;
        }
        catch (error) {
            this.logger.error('알림 전송 실패', error);
            throw error;
        }
    }
    async sendNotificationToEmployee(dto) {
        this.logger.log(`단일 알림 전송 시작: ${dto.recipientEmployeeId}, 제목: ${dto.title}`);
        this.validateSendNotificationToEmployeeDto(dto);
        try {
            const fcmResponse = await this.ssoService.getFcmToken({
                employeeId: dto.recipientEmployeeId,
            });
            this.logger.debug(`FCM 토큰 조회 완료: ${fcmResponse.tokens?.length || 0}개`);
            if (!fcmResponse.tokens || fcmResponse.tokens.length === 0) {
                this.logger.warn(`FCM 토큰이 등록되지 않음: ${dto.recipientEmployeeId}`);
                return {
                    success: false,
                    message: 'FCM 토큰이 등록되지 않음',
                    notificationIds: [],
                    successCount: 0,
                    failureCount: 1,
                };
            }
            const employeeTokens = fcmResponse;
            const prodTokens = employeeTokens.tokens
                .filter((token) => token.deviceType === 'prod')
                .map((token) => token.fcmToken);
            const notificationDto = {
                sender: dto.sender,
                title: dto.title,
                content: dto.content,
                recipients: [
                    {
                        employeeNumber: employeeTokens.employeeNumber,
                        tokens: prodTokens,
                    },
                ],
                sourceSystem: 'LIAS',
                linkUrl: dto.linkUrl,
                metadata: dto.metadata,
            };
            const result = await this.notificationService.sendNotification(notificationDto, dto.authorization);
            this.logger.log(`단일 알림 전송 완료: ${result.successCount > 0 ? '성공' : '실패'}`);
            return result;
        }
        catch (error) {
            this.logger.error('단일 알림 전송 실패', error);
            throw error;
        }
    }
    validateSendNotificationDto(dto) {
        if (!dto.sender || dto.sender.trim().length === 0) {
            throw new common_1.BadRequestException('발신자(sender)는 필수입니다.');
        }
        if (!dto.title || dto.title.trim().length === 0) {
            throw new common_1.BadRequestException('제목(title)은 필수입니다.');
        }
        if (!dto.content || dto.content.trim().length === 0) {
            throw new common_1.BadRequestException('본문(content)은 필수입니다.');
        }
        if (!dto.recipientEmployeeIds || dto.recipientEmployeeIds.length === 0) {
            throw new common_1.BadRequestException('수신자(recipientEmployeeIds)는 최소 1명 이상이어야 합니다.');
        }
        const uniqueRecipients = [...new Set(dto.recipientEmployeeIds)];
        if (uniqueRecipients.length !== dto.recipientEmployeeIds.length) {
            this.logger.warn('중복된 수신자가 있어 제거되었습니다.');
            dto.recipientEmployeeIds = uniqueRecipients;
        }
    }
    validateSendNotificationToEmployeeDto(dto) {
        if (!dto.sender || dto.sender.trim().length === 0) {
            throw new common_1.BadRequestException('발신자(sender)는 필수입니다.');
        }
        if (!dto.title || dto.title.trim().length === 0) {
            throw new common_1.BadRequestException('제목(title)은 필수입니다.');
        }
        if (!dto.content || dto.content.trim().length === 0) {
            throw new common_1.BadRequestException('본문(content)은 필수입니다.');
        }
        if (!dto.recipientEmployeeId || dto.recipientEmployeeId.trim().length === 0) {
            throw new common_1.BadRequestException('수신자(recipientEmployeeId)는 필수입니다.');
        }
    }
    getSenderName(employee) {
        return employee.name || employee.employeeNumber || '시스템';
    }
    getAuthorizationHeader(accessToken) {
        if (accessToken.startsWith('Bearer ')) {
            return accessToken;
        }
        return `Bearer ${accessToken}`;
    }
    async sendNotificationAfterSubmit(params) {
        this.logger.log(`문서 기안 후 알림 전송: ${params.document.id}`);
        try {
            const { document, allSteps, drafterEmployeeNumber } = params;
            const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
            if (agreementSteps.length > 0) {
                await this.sendApprovalStepNotifications({
                    steps: agreementSteps,
                    document,
                    senderEmployeeNumber: drafterEmployeeNumber,
                    stepTypeText: '협의',
                });
            }
            else {
                const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
                const firstApprovalStep = approvalSteps.find((s) => s.status === approval_enum_1.ApprovalStatus.PENDING);
                if (firstApprovalStep && firstApprovalStep.approverId !== document.drafterId) {
                    await this.sendApprovalStepNotifications({
                        steps: [firstApprovalStep],
                        document,
                        senderEmployeeNumber: drafterEmployeeNumber,
                        stepTypeText: '결재',
                    });
                }
                else if (!firstApprovalStep) {
                    const implementationSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION && s.status === approval_enum_1.ApprovalStatus.PENDING);
                    if (implementationSteps.length > 0) {
                        await this.sendApprovalStepNotifications({
                            steps: implementationSteps,
                            document,
                            senderEmployeeNumber: drafterEmployeeNumber,
                            stepTypeText: '시행',
                        });
                    }
                }
            }
        }
        catch (error) {
            this.logger.error(`문서 기안 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }
    async sendApprovalStepNotifications(params) {
        const { steps, document, senderEmployeeNumber, stepTypeText } = params;
        if (steps.length === 0) {
            this.logger.debug('알림을 보낼 승인자가 없습니다.');
            return;
        }
        const approverIds = steps.map((step) => step.approverId);
        if (approverIds.length === 1) {
            await this.sendNotificationToEmployee({
                sender: senderEmployeeNumber,
                title: `[${stepTypeText}] ${document.title}`,
                content: `${document.drafter?.name || '기안자'}님이 작성한 문서가 ${stepTypeText} 대기 중입니다.`,
                recipientEmployeeId: approverIds[0],
                linkUrl: `/approval/document/${document.id}`,
                metadata: {
                    documentId: document.id,
                    stepId: steps[0].id,
                    stepType: steps[0].stepType,
                },
            });
        }
        else {
            await this.sendNotification({
                sender: senderEmployeeNumber,
                title: `[${stepTypeText}] ${document.title}`,
                content: `${document.drafter?.name || '기안자'}님이 작성한 문서가 ${stepTypeText} 대기 중입니다.`,
                recipientEmployeeIds: approverIds,
                linkUrl: `/approval/document/${document.id}`,
                metadata: {
                    documentId: document.id,
                    stepType: steps[0].stepType,
                    stepIds: steps.map((step) => step.id),
                },
            });
        }
        this.logger.log(`${stepTypeText} 알림 전송 완료: ${approverIds.length}명`);
    }
    async sendNotificationAfterCompleteAgreement(params) {
        this.logger.log(`협의 완료 후 알림 전송: ${params.document.id}`);
        try {
            const { document, allSteps, agreerEmployeeNumber } = params;
            const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
            if (!allAgreementsCompleted) {
                this.logger.debug('아직 완료되지 않은 협의가 있습니다.');
                return;
            }
            const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
            const firstApprovalStep = approvalSteps.find((s) => s.status === approval_enum_1.ApprovalStatus.PENDING);
            if (firstApprovalStep) {
                await this.sendApprovalStepNotifications({
                    steps: [firstApprovalStep],
                    document,
                    senderEmployeeNumber: agreerEmployeeNumber,
                    stepTypeText: '결재',
                });
            }
        }
        catch (error) {
            this.logger.error(`협의 완료 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }
    async sendNotificationAfterApprove(params) {
        this.logger.log(`결재 승인 후 알림 전송: ${params.document.id}`);
        try {
            const { document, allSteps, currentStepId, approverEmployeeNumber } = params;
            const currentStep = allSteps.find((step) => step.id === currentStepId);
            if (!currentStep) {
                this.logger.warn(`현재 단계를 찾을 수 없습니다: ${currentStepId}`);
                return;
            }
            const nextPendingStep = this.findNextPendingStep(allSteps, currentStep.stepOrder);
            if (nextPendingStep) {
                if (nextPendingStep.stepType === approval_enum_1.ApprovalStepType.APPROVAL) {
                    await this.sendApprovalStepNotifications({
                        steps: [nextPendingStep],
                        document,
                        senderEmployeeNumber: approverEmployeeNumber,
                        stepTypeText: '결재',
                    });
                }
                else if (nextPendingStep.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION) {
                    const implementationSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION && s.status === approval_enum_1.ApprovalStatus.PENDING);
                    await this.sendApprovalStepNotifications({
                        steps: implementationSteps,
                        document,
                        senderEmployeeNumber: approverEmployeeNumber,
                        stepTypeText: '시행',
                    });
                }
            }
            else {
                await this.sendReferenceNotifications({
                    document,
                    allSteps,
                    senderEmployeeNumber: approverEmployeeNumber,
                });
                await this.sendDrafterNotification({
                    document,
                    status: approval_enum_1.DocumentStatus.APPROVED,
                    senderEmployeeNumber: approverEmployeeNumber,
                });
            }
        }
        catch (error) {
            this.logger.error(`결재 승인 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }
    async sendNotificationAfterReject(params) {
        this.logger.log(`결재 반려 후 알림 전송: ${params.document.id}`);
        try {
            const { document, rejectReason, rejecterEmployeeNumber } = params;
            await this.sendDrafterNotification({
                document,
                status: approval_enum_1.DocumentStatus.REJECTED,
                senderEmployeeNumber: rejecterEmployeeNumber,
                additionalInfo: { reason: rejectReason },
            });
        }
        catch (error) {
            this.logger.error(`결재 반려 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }
    async sendNotificationAfterCompleteImplementation(params) {
        this.logger.log(`시행 완료 후 알림 전송: ${params.document.id}`);
        try {
            const { document, allSteps, implementerEmployeeNumber } = params;
            await this.sendReferenceNotifications({
                document,
                allSteps,
                senderEmployeeNumber: implementerEmployeeNumber,
            });
            await this.sendDrafterNotification({
                document,
                status: approval_enum_1.DocumentStatus.IMPLEMENTED,
                senderEmployeeNumber: implementerEmployeeNumber,
            });
        }
        catch (error) {
            this.logger.error(`시행 완료 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }
    async sendReferenceNotifications(params) {
        const { document, allSteps, senderEmployeeNumber } = params;
        const referenceSteps = allSteps.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.REFERENCE);
        if (referenceSteps.length === 0) {
            this.logger.debug('참조자가 없습니다.');
            return;
        }
        const referenceIds = referenceSteps.map((step) => step.approverId);
        await this.sendNotification({
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
    async sendDrafterNotification(params) {
        const { document, status, senderEmployeeNumber, additionalInfo } = params;
        const { title, content } = this.getDrafterNotificationMessage(status, document.title, additionalInfo);
        await this.sendNotificationToEmployee({
            sender: senderEmployeeNumber,
            title,
            content,
            recipientEmployeeId: document.drafterId,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                status: status,
                ...additionalInfo,
            },
        });
        this.logger.log(`기안자 알림 전송 완료 (${status}): ${document.drafterId}`);
    }
    getDrafterNotificationMessage(status, documentTitle, additionalInfo) {
        switch (status) {
            case approval_enum_1.DocumentStatus.REJECTED:
                return {
                    title: `[반려] ${documentTitle}`,
                    content: `작성하신 문서가 반려되었습니다.\n사유: ${additionalInfo?.reason || '사유 없음'}`,
                };
            case approval_enum_1.DocumentStatus.APPROVED:
                return {
                    title: `[완료] ${documentTitle}`,
                    content: `작성하신 문서의 결재가 완료되었습니다.`,
                };
            case approval_enum_1.DocumentStatus.IMPLEMENTED:
                return {
                    title: `[시행완료] ${documentTitle}`,
                    content: `작성하신 문서의 시행이 완료되었습니다.`,
                };
            case approval_enum_1.DocumentStatus.CANCELLED:
                return {
                    title: `[취소] ${documentTitle}`,
                    content: `문서가 취소되었습니다.`,
                };
            default:
                return {
                    title: `[알림] ${documentTitle}`,
                    content: `문서 상태가 변경되었습니다.`,
                };
        }
    }
    findNextPendingStep(allSteps, currentStepOrder) {
        const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
        const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
        const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
        if (!allApprovalsCompleted) {
            const nextApprovalStep = approvalSteps.find((step) => step.stepOrder > currentStepOrder && step.status === approval_enum_1.ApprovalStatus.PENDING);
            if (nextApprovalStep && allAgreementsCompleted) {
                return nextApprovalStep;
            }
        }
        if (allApprovalsCompleted) {
            const implementationStep = allSteps.find((step) => step.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION && step.status === approval_enum_1.ApprovalStatus.PENDING);
            return implementationStep || null;
        }
        return null;
    }
    getStepTypeText(stepType) {
        switch (stepType) {
            case approval_enum_1.ApprovalStepType.AGREEMENT:
                return '협의';
            case approval_enum_1.ApprovalStepType.APPROVAL:
                return '결재';
            case approval_enum_1.ApprovalStepType.IMPLEMENTATION:
                return '시행';
            case approval_enum_1.ApprovalStepType.REFERENCE:
                return '참조';
            default:
                return '처리';
        }
    }
};
exports.NotificationContext = NotificationContext;
exports.NotificationContext = NotificationContext = NotificationContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sso_service_1.SSOService,
        notification_service_1.NotificationService])
], NotificationContext);
//# sourceMappingURL=notification.context.js.map