/**
 * 알림 전송 요청 DTO (컨텍스트용)
 */
export class SendNotificationDto {
    /**
     * 발신자 (시스템 또는 직원 이름)
     */
    sender: string;

    /**
     * 알림 제목
     */
    title: string;

    /**
     * 알림 본문
     */
    content: string;

    /**
     * 수신자 직원 ID 목록
     */
    recipientEmployeeIds: string[];

    /**
     * 소스 시스템 (기본값: 'lias')
     */
    sourceSystem?: string;

    /**
     * 링크 URL (알림 클릭 시 이동할 URL)
     */
    linkUrl?: string;

    /**
     * 메타데이터 (추가 정보)
     */
    metadata?: Record<string, any>;

    /**
     * Authorization 헤더 (액세스 토큰)
     */
    authorization?: string;
}

/**
 * 알림 전송 응답 DTO
 */
export class SendNotificationResponseDto {
    /**
     * 성공 여부
     */
    success: boolean;

    /**
     * 응답 메시지
     */
    message: string;

    /**
     * 생성된 알림 ID 목록
     */
    notificationIds: string[];

    /**
     * 성공 건수
     */
    successCount: number;

    /**
     * 실패 건수
     */
    failureCount: number;
}

/**
 * 단일 직원에게 알림 전송 DTO
 */
export class SendNotificationToEmployeeDto {
    /**
     * 발신자 (시스템 또는 직원 이름)
     */
    sender: string;

    /**
     * 알림 제목
     */
    title: string;

    /**
     * 알림 본문
     */
    content: string;

    /**
     * 수신자 직원 ID
     */
    recipientEmployeeId: string;

    /**
     * 소스 시스템 (기본값: 'lias')
     */
    sourceSystem?: string;

    /**
     * 링크 URL (알림 클릭 시 이동할 URL)
     */
    linkUrl?: string;

    /**
     * 메타데이터 (추가 정보)
     */
    metadata?: Record<string, any>;

    /**
     * Authorization 헤더 (액세스 토큰)
     */
    authorization?: string;
}
