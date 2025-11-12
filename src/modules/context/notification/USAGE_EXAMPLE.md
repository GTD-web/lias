# 알림 컨텍스트 사용 예제

## 1. 결재 승인 요청 알림 전송

결재가 필요한 문서가 생성되었을 때, 결재자들에게 알림을 전송하는 예제입니다.

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { NotificationContext } from '@/modules/context/notification';
import { Employee } from '@/modules/domain/employee/employee.entity';

@Injectable()
export class DocumentService {
    private readonly logger = new Logger(DocumentService.name);

    constructor(private readonly notificationContext: NotificationContext) {}

    /**
     * 문서 기안 후 결재자들에게 알림 전송
     */
    async submitDocumentAndNotify(
        document: Document,
        approverIds: string[],
        drafter: Employee,
        authorization: string,
    ) {
        // 1) 문서 기안 처리 (생략)
        // ...

        // 2) 결재자들에게 알림 전송
        try {
            const result = await this.notificationContext.sendNotification({
                sender: this.notificationContext.getSenderName(drafter),
                title: '새로운 결재 요청',
                content: `${drafter.name}님이 "${document.title}" 문서의 결재를 요청했습니다.`,
                recipientEmployeeIds: approverIds,
                sourceSystem: 'lias',
                linkUrl: `/documents/${document.id}`,
                metadata: {
                    documentId: document.id,
                    type: 'approval_request',
                    requestedAt: new Date().toISOString(),
                },
                authorization,
            });

            this.logger.log(
                `결재 요청 알림 전송 완료: 성공 ${result.successCount}건, 실패 ${result.failureCount}건`,
            );
        } catch (error) {
            // 알림 전송 실패는 비즈니스 로직에 영향을 주지 않음
            this.logger.error('결재 요청 알림 전송 실패', error);
        }
    }
}
```

## 2. 결재 승인 완료 알림 전송

결재가 승인되었을 때, 기안자에게 알림을 전송하는 예제입니다.

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { NotificationContext } from '@/modules/context/notification';

@Injectable()
export class ApprovalProcessService {
    private readonly logger = new Logger(ApprovalProcessService.name);

    constructor(private readonly notificationContext: NotificationContext) {}

    /**
     * 결재 승인 후 기안자에게 알림 전송
     */
    async approveStepAndNotify(
        documentId: string,
        drafterId: string,
        approver: Employee,
        authorization: string,
    ) {
        // 1) 결재 승인 처리 (생략)
        // ...

        // 2) 기안자에게 알림 전송
        try {
            await this.notificationContext.sendNotificationToEmployee({
                sender: this.notificationContext.getSenderName(approver),
                title: '결재 승인 완료',
                content: `${approver.name}님이 귀하의 문서를 승인했습니다.`,
                recipientEmployeeId: drafterId,
                sourceSystem: 'lias',
                linkUrl: `/documents/${documentId}`,
                metadata: {
                    documentId,
                    type: 'approval_completed',
                    approvedBy: approver.id,
                    approvedAt: new Date().toISOString(),
                },
                authorization,
            });

            this.logger.log(`결재 승인 알림 전송 완료: ${drafterId}`);
        } catch (error) {
            this.logger.error('결재 승인 알림 전송 실패', error);
        }
    }
}
```

## 3. 컨트롤러에서 Authorization 헤더 활용

컨트롤러에서 JWT 인증 정보와 Authorization 헤더를 활용하는 예제입니다.

```typescript
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { NotificationContext } from '@/modules/context/notification';
import { Employee } from '@/modules/domain/employee/employee.entity';

@Controller('documents')
export class DocumentController {
    constructor(private readonly notificationContext: NotificationContext) {}

    @Post('submit')
    @UseGuards(JwtAuthGuard)
    async submitDocument(@Body() dto: SubmitDocumentDto, @Req() req: Request) {
        // JWT에서 추출된 사용자 정보
        const drafter = req.user as Employee;
        
        // Authorization 헤더
        const authorization = req.headers.authorization;

        // 문서 기안 처리 (생략)
        // ...

        // 알림 전송
        await this.notificationContext.sendNotification({
            sender: this.notificationContext.getSenderName(drafter),
            title: '새로운 결재 요청',
            content: `${drafter.name}님이 결재를 요청했습니다.`,
            recipientEmployeeIds: dto.approverIds,
            sourceSystem: 'lias',
            linkUrl: `/documents/${documentId}`,
            authorization: this.notificationContext.getAuthorizationHeader(authorization),
        });

        return { success: true, documentId };
    }
}
```

## 4. 결재 반려 알림 전송

결재가 반려되었을 때, 기안자에게 알림을 전송하는 예제입니다.

```typescript
async rejectStepAndNotify(
    documentId: string,
    document: Document,
    drafterId: string,
    approver: Employee,
    rejectReason: string,
    authorization: string,
) {
    // 1) 결재 반려 처리 (생략)
    // ...

    // 2) 기안자에게 알림 전송
    try {
        await this.notificationContext.sendNotificationToEmployee({
            sender: this.notificationContext.getSenderName(approver),
            title: '결재 반려',
            content: `${approver.name}님이 귀하의 문서를 반려했습니다. 사유: ${rejectReason}`,
            recipientEmployeeId: drafterId,
            sourceSystem: 'lias',
            linkUrl: `/documents/${documentId}`,
            metadata: {
                documentId,
                documentTitle: document.title,
                type: 'approval_rejected',
                rejectedBy: approver.id,
                reason: rejectReason,
                rejectedAt: new Date().toISOString(),
            },
            authorization,
        });

        this.logger.log(`결재 반려 알림 전송 완료: ${drafterId}`);
    } catch (error) {
        this.logger.error('결재 반려 알림 전송 실패', error);
    }
}
```

## 5. 다음 결재자 알림 전송

현재 결재자가 승인한 후, 다음 결재자에게 알림을 전송하는 예제입니다.

```typescript
async notifyNextApprover(
    documentId: string,
    document: Document,
    nextApproverId: string,
    currentApprover: Employee,
    authorization: string,
) {
    try {
        await this.notificationContext.sendNotificationToEmployee({
            sender: this.notificationContext.getSenderName(currentApprover),
            title: '결재 요청',
            content: `"${document.title}" 문서의 결재 순서가 되었습니다.`,
            recipientEmployeeId: nextApproverId,
            sourceSystem: 'lias',
            linkUrl: `/approval/${documentId}`,
            metadata: {
                documentId,
                documentTitle: document.title,
                type: 'next_approval_turn',
                previousApprover: currentApprover.id,
                notifiedAt: new Date().toISOString(),
            },
            authorization,
        });

        this.logger.log(`다음 결재자 알림 전송 완료: ${nextApproverId}`);
    } catch (error) {
        this.logger.error('다음 결재자 알림 전송 실패', error);
    }
}
```

## 6. 에러 처리 예제

알림 전송 실패 시 에러 처리 예제입니다.

```typescript
async sendNotificationWithErrorHandling(
    recipientIds: string[],
    title: string,
    content: string,
    authorization: string,
) {
    try {
        const result = await this.notificationContext.sendNotification({
            sender: '시스템',
            title,
            content,
            recipientEmployeeIds: recipientIds,
            sourceSystem: 'lias',
            authorization,
        });

        // 일부 실패 처리
        if (result.failureCount > 0) {
            this.logger.warn(
                `알림 전송 일부 실패: 성공 ${result.successCount}건, 실패 ${result.failureCount}건`,
            );
        }

        return result;
    } catch (error) {
        this.logger.error('알림 전송 중 오류 발생', error);
        
        // 비즈니스 로직에 영향을 주지 않도록 처리
        return {
            success: false,
            message: error.message || '알림 전송 실패',
            notificationIds: [],
            successCount: 0,
            failureCount: recipientIds.length,
        };
    }
}
```

## 7. 헬퍼 메서드 활용

컨텍스트의 헬퍼 메서드를 활용하는 예제입니다.

```typescript
import { Request } from 'express';

async sendNotificationHelper(@Req() req: Request) {
    const employee = req.user as Employee;
    const authorization = req.headers.authorization;

    // 발신자 이름 자동 생성
    const senderName = this.notificationContext.getSenderName(employee);
    // 결과: "홍길동" 또는 "E2023001" (이름이 없을 경우 사번)

    // Authorization 헤더 자동 변환
    const authHeader = this.notificationContext.getAuthorizationHeader(authorization);
    // 결과: "Bearer eyJhbGciOiJIUzI1NiIs..."

    await this.notificationContext.sendNotification({
        sender: senderName,
        title: '알림 제목',
        content: '알림 내용',
        recipientEmployeeIds: ['recipient-id-1', 'recipient-id-2'],
        authorization: authHeader,
    });
}
```

## 주의사항

1. **비동기 처리**: 알림 전송은 비동기로 처리되므로 `await`를 사용해야 합니다.
2. **에러 처리**: 알림 전송 실패가 비즈니스 로직에 영향을 주지 않도록 try-catch로 감싸세요.
3. **FCM 토큰**: 직원이 모바일 앱에 로그인하여 FCM 토큰을 등록해야 알림을 받을 수 있습니다.
4. **Authorization 헤더**: 가능한 경우 항상 `authorization` 파라미터를 전달하여 사용자별 권한을 체크하세요.
5. **로깅**: 알림 전송 결과를 로깅하여 문제 발생 시 추적할 수 있도록 하세요.

