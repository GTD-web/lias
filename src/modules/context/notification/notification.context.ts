import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { SSOService } from '../../integrations/sso/sso.service';
import { NotificationService } from '../../integrations/notification/notification.service';
import {
    SendNotificationDto,
    SendNotificationResponseDto,
    SendNotificationToEmployeeDto,
} from './dtos/notification.dto';
import { SendNotificationDto as IntegrationSendNotificationDto } from '../../integrations/notification/dtos/send-notification.dto';
import { ApprovalStepType, ApprovalStatus, DocumentStatus } from '../../../common/enums/approval.enum';

/**
 * 알림 컨텍스트
 *
 * SSO 모듈과 Notification 모듈을 조합하여
 * FCM 토큰을 자동으로 조회하고 알림을 전송합니다.
 *
 * 역할:
 * - 직원 ID로부터 FCM 토큰 자동 조회
 * - 단일/다수 직원에게 알림 전송
 * - 결재 프로세스 알림 관리
 * - Authorization 헤더 자동 전달
 * - 에러 핸들링 및 로깅
 */
@Injectable()
export class NotificationContext {
    private readonly logger = new Logger(NotificationContext.name);

    constructor(
        private readonly ssoService: SSOService,
        private readonly notificationService: NotificationService,
    ) {}

    /**
     * 여러 직원에게 알림 전송
     *
     * @param dto 알림 전송 요청 데이터
     * @returns 알림 전송 결과
     */
    async sendNotification(dto: SendNotificationDto): Promise<SendNotificationResponseDto> {
        this.logger.log(`알림 전송 시작: ${dto.recipientEmployeeIds.length}명, 제목: ${dto.title}`);

        // 1) 유효성 검증
        this.validateSendNotificationDto(dto);

        try {
            // 2) FCM 토큰 조회
            const fcmResponse = await this.ssoService.getMultipleFcmTokens({
                employeeIds: dto.recipientEmployeeIds,
            });

            this.logger.debug(`FCM 토큰 조회 완료: ${fcmResponse.totalTokens || 0}개`);

            // 3) FCM 토큰이 없는 경우 처리
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

            // 4) FCM 토큰을 수신자별로 그룹화
            const { byEmployee } = fcmResponse;

            // 각 직원별로 토큰 매핑
            const recipients = byEmployee
                .map((employee) => {
                    // prod 환경의 토큰만 필터링
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

            // 5) 알림 전송 요청 DTO 생성
            const notificationDto: IntegrationSendNotificationDto = {
                sender: dto.sender,
                title: dto.title,
                content: dto.content,
                recipients: recipients,
                sourceSystem: 'LIAS',
                linkUrl: dto.linkUrl,
                metadata: dto.metadata,
            };

            // 6) 알림 전송
            const result = await this.notificationService.sendNotification(notificationDto, dto.authorization);

            this.logger.log(`알림 전송 완료: 성공 ${result.successCount}건, 실패 ${result.failureCount}건`);

            return result;
        } catch (error) {
            this.logger.error('알림 전송 실패', error);
            throw error;
        }
    }

    /**
     * 단일 직원에게 알림 전송
     *
     * @param dto 알림 전송 요청 데이터
     * @returns 알림 전송 결과
     */
    async sendNotificationToEmployee(dto: SendNotificationToEmployeeDto): Promise<SendNotificationResponseDto> {
        this.logger.log(`단일 알림 전송 시작: ${dto.recipientEmployeeId}, 제목: ${dto.title}`);

        // 1) 유효성 검증
        this.validateSendNotificationToEmployeeDto(dto);

        try {
            // 2) FCM 토큰 조회
            const fcmResponse = await this.ssoService.getFcmToken({
                employeeId: dto.recipientEmployeeId,
            });

            this.logger.debug(`FCM 토큰 조회 완료: ${fcmResponse.tokens?.length || 0}개`);

            // 3) FCM 토큰이 없는 경우 처리
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

            // 4) FCM 토큰 추출
            const employeeTokens = fcmResponse;
            const prodTokens = employeeTokens.tokens
                .filter((token) => token.deviceType === 'prod')
                .map((token) => token.fcmToken);

            // 5) 알림 전송 요청 DTO 생성
            const notificationDto: IntegrationSendNotificationDto = {
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

            // 6) 알림 전송
            const result = await this.notificationService.sendNotification(notificationDto, dto.authorization);

            this.logger.log(`단일 알림 전송 완료: ${result.successCount > 0 ? '성공' : '실패'}`);

            return result;
        } catch (error) {
            this.logger.error('단일 알림 전송 실패', error);
            throw error;
        }
    }

    /**
     * 헬퍼: 여러 직원 알림 전송 DTO 유효성 검증
     */
    private validateSendNotificationDto(dto: SendNotificationDto): void {
        if (!dto.sender || dto.sender.trim().length === 0) {
            throw new BadRequestException('발신자(sender)는 필수입니다.');
        }

        if (!dto.title || dto.title.trim().length === 0) {
            throw new BadRequestException('제목(title)은 필수입니다.');
        }

        if (!dto.content || dto.content.trim().length === 0) {
            throw new BadRequestException('본문(content)은 필수입니다.');
        }

        if (!dto.recipientEmployeeIds || dto.recipientEmployeeIds.length === 0) {
            throw new BadRequestException('수신자(recipientEmployeeIds)는 최소 1명 이상이어야 합니다.');
        }

        // 중복 제거
        const uniqueRecipients = [...new Set(dto.recipientEmployeeIds)];
        if (uniqueRecipients.length !== dto.recipientEmployeeIds.length) {
            this.logger.warn('중복된 수신자가 있어 제거되었습니다.');
            dto.recipientEmployeeIds = uniqueRecipients;
        }
    }

    /**
     * 헬퍼: 단일 직원 알림 전송 DTO 유효성 검증
     */
    private validateSendNotificationToEmployeeDto(dto: SendNotificationToEmployeeDto): void {
        if (!dto.sender || dto.sender.trim().length === 0) {
            throw new BadRequestException('발신자(sender)는 필수입니다.');
        }

        if (!dto.title || dto.title.trim().length === 0) {
            throw new BadRequestException('제목(title)은 필수입니다.');
        }

        if (!dto.content || dto.content.trim().length === 0) {
            throw new BadRequestException('본문(content)은 필수입니다.');
        }

        if (!dto.recipientEmployeeId || dto.recipientEmployeeId.trim().length === 0) {
            throw new BadRequestException('수신자(recipientEmployeeId)는 필수입니다.');
        }
    }

    /**
     * 헬퍼: 직원 정보로부터 알림 발신자 이름 생성
     *
     * @param employee 직원 정보 (JWT에서 추출된 정보)
     * @returns 발신자 이름
     */
    getSenderName(employee: { name?: string; employeeNumber?: string }): string {
        return employee.name || employee.employeeNumber || '시스템';
    }

    /**
     * 헬퍼: Authorization 헤더 생성
     *
     * @param accessToken 액세스 토큰
     * @returns Bearer 형식의 Authorization 헤더
     */
    getAuthorizationHeader(accessToken: string): string {
        if (accessToken.startsWith('Bearer ')) {
            return accessToken;
        }
        return `Bearer ${accessToken}`;
    }

    /**
     * ============================================
     * 결재 프로세스 알림 메서드
     * ============================================
     */

    /**
     * 문서 기안 시 초기 알림 전송
     * - 협의자가 있으면 협의자들에게 알림
     * - 협의자가 없고 첫 번째 결재자가 기안자가 아니면 첫 번째 결재자에게 알림
     */
    async sendNotificationAfterSubmit(params: {
        document: any; // Document entity
        allSteps: any[]; // ApprovalStepSnapshot[]
        drafterEmployeeNumber: string;
    }): Promise<void> {
        this.logger.log(`문서 기안 후 알림 전송: ${params.document.id}`);

        try {
            const { document, allSteps, drafterEmployeeNumber } = params;

            // 1. 협의 단계 확인
            const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);

            if (agreementSteps.length > 0) {
                // 케이스 1: 협의자들에게 알림
                await this.sendApprovalStepNotifications({
                    steps: agreementSteps,
                    document,
                    senderEmployeeNumber: drafterEmployeeNumber,
                    stepTypeText: '협의',
                });
            } else {
                // 협의자가 없으면 첫 번째 결재자 또는 시행자에게 알림
                const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
                const firstApprovalStep = approvalSteps.find((s) => s.status === ApprovalStatus.PENDING);

                if (firstApprovalStep && firstApprovalStep.approverId !== document.drafterId) {
                    // 케이스 2: 결재자에게 알림
                    await this.sendApprovalStepNotifications({
                        steps: [firstApprovalStep],
                        document,
                        senderEmployeeNumber: drafterEmployeeNumber,
                        stepTypeText: '결재',
                    });
                } else if (!firstApprovalStep) {
                    // 결재자가 없으면 시행자에게 알림
                    const implementationSteps = allSteps.filter(
                        (s) => s.stepType === ApprovalStepType.IMPLEMENTATION && s.status === ApprovalStatus.PENDING,
                    );

                    if (implementationSteps.length > 0) {
                        // 케이스 5: 시행자들에게 알림
                        await this.sendApprovalStepNotifications({
                            steps: implementationSteps,
                            document,
                            senderEmployeeNumber: drafterEmployeeNumber,
                            stepTypeText: '시행',
                        });
                    }
                }
            }
        } catch (error) {
            this.logger.error(`문서 기안 후 알림 전송 실패: ${params.document.id}`, error);
            // 알림 실패는 전체 프로세스를 중단시키지 않음
        }
    }

    /**
     * 결재 단계 승인자들에게 알림 전송 (공통)
     */
    private async sendApprovalStepNotifications(params: {
        steps: any[]; // ApprovalStepSnapshot[]
        document: any; // Document
        senderEmployeeNumber: string;
        stepTypeText: string;
    }): Promise<void> {
        const { steps, document, senderEmployeeNumber, stepTypeText } = params;

        if (steps.length === 0) {
            this.logger.debug('알림을 보낼 승인자가 없습니다.');
            return;
        }

        const approverIds = steps.map((step) => step.approverId);

        if (approverIds.length === 1) {
            // 단일 승인자
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
        } else {
            // 다수 승인자
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

    /**
     * 협의 완료 후 알림 전송
     */
    async sendNotificationAfterCompleteAgreement(params: {
        document: any;
        allSteps: any[];
        agreerEmployeeNumber: string;
    }): Promise<void> {
        this.logger.log(`협의 완료 후 알림 전송: ${params.document.id}`);

        try {
            const { document, allSteps, agreerEmployeeNumber } = params;

            // 모든 협의가 완료되었는지 확인
            const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);

            if (!allAgreementsCompleted) {
                this.logger.debug('아직 완료되지 않은 협의가 있습니다.');
                return;
            }

            // 모든 협의가 완료되었으면 첫 번째 결재자에게 알림
            const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
            const firstApprovalStep = approvalSteps.find((s) => s.status === ApprovalStatus.PENDING);

            if (firstApprovalStep) {
                await this.sendApprovalStepNotifications({
                    steps: [firstApprovalStep],
                    document,
                    senderEmployeeNumber: agreerEmployeeNumber,
                    stepTypeText: '결재',
                });
            }
        } catch (error) {
            this.logger.error(`협의 완료 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }

    /**
     * 결재 승인 후 알림 전송
     */
    async sendNotificationAfterApprove(params: {
        document: any;
        allSteps: any[];
        currentStepId: string;
        approverEmployeeNumber: string;
    }): Promise<void> {
        this.logger.log(`결재 승인 후 알림 전송: ${params.document.id}`);

        try {
            const { document, allSteps, currentStepId, approverEmployeeNumber } = params;

            // 현재 승인한 단계
            const currentStep = allSteps.find((step) => step.id === currentStepId);
            if (!currentStep) {
                this.logger.warn(`현재 단계를 찾을 수 없습니다: ${currentStepId}`);
                return;
            }

            // 다음 처리해야 할 단계 찾기
            const nextPendingStep = this.findNextPendingStep(allSteps, currentStep.stepOrder);

            if (nextPendingStep) {
                // 다음 단계가 결재자인지 시행자인지 확인
                if (nextPendingStep.stepType === ApprovalStepType.APPROVAL) {
                    await this.sendApprovalStepNotifications({
                        steps: [nextPendingStep],
                        document,
                        senderEmployeeNumber: approverEmployeeNumber,
                        stepTypeText: '결재',
                    });
                } else if (nextPendingStep.stepType === ApprovalStepType.IMPLEMENTATION) {
                    const implementationSteps = allSteps.filter(
                        (s) => s.stepType === ApprovalStepType.IMPLEMENTATION && s.status === ApprovalStatus.PENDING,
                    );
                    await this.sendApprovalStepNotifications({
                        steps: implementationSteps,
                        document,
                        senderEmployeeNumber: approverEmployeeNumber,
                        stepTypeText: '시행',
                    });
                }
            } else {
                // 모든 단계 완료 - 참조자들과 기안자에게 알림
                await this.sendReferenceNotifications({
                    document,
                    allSteps,
                    senderEmployeeNumber: approverEmployeeNumber,
                });
                await this.sendDrafterNotification({
                    document,
                    status: DocumentStatus.APPROVED,
                    senderEmployeeNumber: approverEmployeeNumber,
                });
            }
        } catch (error) {
            this.logger.error(`결재 승인 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }

    /**
     * 결재 반려 후 알림 전송
     */
    async sendNotificationAfterReject(params: {
        document: any;
        rejectReason: string;
        rejecterEmployeeNumber: string;
    }): Promise<void> {
        this.logger.log(`결재 반려 후 알림 전송: ${params.document.id}`);

        try {
            const { document, rejectReason, rejecterEmployeeNumber } = params;

            // 기안자에게 반려 알림
            await this.sendDrafterNotification({
                document,
                status: DocumentStatus.REJECTED,
                senderEmployeeNumber: rejecterEmployeeNumber,
                additionalInfo: { reason: rejectReason },
            });
        } catch (error) {
            this.logger.error(`결재 반려 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }

    /**
     * 시행 완료 후 알림 전송
     */
    async sendNotificationAfterCompleteImplementation(params: {
        document: any;
        allSteps: any[];
        implementerEmployeeNumber: string;
    }): Promise<void> {
        this.logger.log(`시행 완료 후 알림 전송: ${params.document.id}`);

        try {
            const { document, allSteps, implementerEmployeeNumber } = params;

            // 참조자들에게 알림
            await this.sendReferenceNotifications({
                document,
                allSteps,
                senderEmployeeNumber: implementerEmployeeNumber,
            });

            // 기안자에게 시행 완료 알림
            await this.sendDrafterNotification({
                document,
                status: DocumentStatus.IMPLEMENTED,
                senderEmployeeNumber: implementerEmployeeNumber,
            });
        } catch (error) {
            this.logger.error(`시행 완료 후 알림 전송 실패: ${params.document.id}`, error);
        }
    }

    /**
     * 참조자들에게 알림 전송
     */
    private async sendReferenceNotifications(params: {
        document: any;
        allSteps: any[];
        senderEmployeeNumber: string;
    }): Promise<void> {
        const { document, allSteps, senderEmployeeNumber } = params;

        const referenceSteps = allSteps.filter((step) => step.stepType === ApprovalStepType.REFERENCE);

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

    /**
     * 기안자에게 문서 상태별 알림 전송
     */
    private async sendDrafterNotification(params: {
        document: any;
        status: DocumentStatus;
        senderEmployeeNumber: string;
        additionalInfo?: { reason?: string };
    }): Promise<void> {
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

    /**
     * 문서 상태에 따른 기안자 알림 메시지 생성
     */
    private getDrafterNotificationMessage(
        status: DocumentStatus,
        documentTitle: string,
        additionalInfo?: { reason?: string },
    ): { title: string; content: string } {
        switch (status) {
            case DocumentStatus.REJECTED:
                return {
                    title: `[반려] ${documentTitle}`,
                    content: `작성하신 문서가 반려되었습니다.\n사유: ${additionalInfo?.reason || '사유 없음'}`,
                };
            case DocumentStatus.APPROVED:
                return {
                    title: `[완료] ${documentTitle}`,
                    content: `작성하신 문서의 결재가 완료되었습니다.`,
                };
            case DocumentStatus.IMPLEMENTED:
                return {
                    title: `[시행완료] ${documentTitle}`,
                    content: `작성하신 문서의 시행이 완료되었습니다.`,
                };
            case DocumentStatus.CANCELLED:
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

    /**
     * 다음 처리 가능한 단계 찾기
     */
    private findNextPendingStep(allSteps: any[], currentStepOrder: number): any | null {
        // 협의가 모두 완료되었는지 확인
        const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
        const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);

        // 결재가 모두 완료되었는지 확인
        const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === ApprovalStatus.APPROVED);

        // 다음 결재자 찾기
        if (!allApprovalsCompleted) {
            const nextApprovalStep = approvalSteps.find(
                (step) => step.stepOrder > currentStepOrder && step.status === ApprovalStatus.PENDING,
            );

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
     * 결재 단계 타입을 한글 텍스트로 변환
     */
    getStepTypeText(stepType: ApprovalStepType): string {
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
