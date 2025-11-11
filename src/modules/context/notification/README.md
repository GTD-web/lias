# 알림 컨텍스트 모듈 (Notification Context Module)

SSO 모듈과 Notification 모듈을 통합하여 FCM 토큰을 자동으로 조회하고 알림을 전송하는 컨텍스트 모듈입니다.

## 개요

이 모듈은 다음과 같은 역할을 수행합니다:

1. **FCM 토큰 자동 조회**: SSO 모듈을 통해 직원 ID로부터 FCM 토큰을 자동으로 조회
2. **알림 전송**: Notification 모듈을 통해 알림 전송
3. **Authorization 헤더 전달**: API 호출 시 사용자 인증 정보를 자동으로 전달
4. **에러 핸들링**: FCM 토큰이 없거나 전송 실패 시 적절한 에러 처리

## 설치

이미 `SSOModule`과 `NotificationModule`이 설치되어 있어야 합니다.

```bash
npm install @lumir-company/sso-sdk
npm install @nestjs/axios
```

## 사용법

### 1. 모듈 임포트

```typescript
import { NotificationContextModule } from '@/modules/context/notification';

@Module({
  imports: [NotificationContextModule],
})
export class YourModule {}
```

### 2. 여러 직원에게 알림 전송

```typescript
import { NotificationContext } from '@/modules/context/notification';

@Injectable()
export class YourService {
  constructor(private readonly notificationContext: NotificationContext) {}

  async sendApprovalNotification(documentId: string, approverIds: string[], authorization: string) {
    const result = await this.notificationContext.sendNotification({
      sender: '결재 시스템',
      title: '새로운 결재 요청',
      content: '결재가 필요한 문서가 있습니다.',
      recipientEmployeeIds: approverIds,
      sourceSystem: 'lias',
      linkUrl: `/documents/${documentId}`,
      metadata: {
        documentId,
        type: 'approval_request',
      },
      authorization, // Bearer 토큰 자동 처리
    });

    console.log(`알림 전송 완료: 성공 ${result.successCount}건, 실패 ${result.failureCount}건`);
  }
}
```

### 3. 단일 직원에게 알림 전송

```typescript
async sendSingleNotification(recipientId: string, authorization: string) {
  const result = await this.notificationContext.sendNotificationToEmployee({
    sender: '결재 시스템',
    title: '문서가 승인되었습니다',
    content: '귀하의 문서가 최종 승인되었습니다.',
    recipientEmployeeId: recipientId,
    sourceSystem: 'lias',
    linkUrl: '/documents/approved',
    authorization,
  });

  return result;
}
```

### 4. JWT 사용자 정보 활용

컨트롤러나 서비스에서 JWT 사용자 정보를 활용하여 발신자 이름을 설정할 수 있습니다.

```typescript
import { Request } from 'express';

async sendNotificationWithUser(@Req() req: Request) {
  const employee = req.user; // JwtStrategy에서 반환된 Employee 엔티티
  const authorization = req.headers.authorization; // Bearer 토큰

  const result = await this.notificationContext.sendNotification({
    sender: this.notificationContext.getSenderName(employee), // 직원 이름 자동 추출
    title: '알림 제목',
    content: '알림 내용',
    recipientEmployeeIds: ['recipient-id-1', 'recipient-id-2'],
    authorization: this.notificationContext.getAuthorizationHeader(authorization), // Bearer 형식 자동 변환
  });

  return result;
}
```

## API

### NotificationContext

#### sendNotification(dto: SendNotificationDto): Promise<SendNotificationResponseDto>

여러 직원에게 알림을 전송합니다.

**파라미터:**
- `sender`: 발신자 이름 (예: '결재 시스템', '홍길동')
- `title`: 알림 제목
- `content`: 알림 본문
- `recipientEmployeeIds`: 수신자 직원 ID 배열
- `sourceSystem`: 소스 시스템 (기본값: 'lias')
- `linkUrl`: 알림 클릭 시 이동할 URL
- `metadata`: 추가 정보 (선택)
- `authorization`: Bearer 토큰 (선택)

**반환값:**
```typescript
{
  success: boolean;        // 성공 여부
  message: string;         // 응답 메시지
  notificationIds: string[]; // 생성된 알림 ID 목록
  successCount: number;    // 성공 건수
  failureCount: number;    // 실패 건수
}
```

#### sendNotificationToEmployee(dto: SendNotificationToEmployeeDto): Promise<SendNotificationResponseDto>

단일 직원에게 알림을 전송합니다.

**파라미터:**
- `sender`: 발신자 이름
- `title`: 알림 제목
- `content`: 알림 본문
- `recipientEmployeeId`: 수신자 직원 ID
- `sourceSystem`: 소스 시스템 (기본값: 'lias')
- `linkUrl`: 알림 클릭 시 이동할 URL
- `metadata`: 추가 정보 (선택)
- `authorization`: Bearer 토큰 (선택)

#### getSenderName(employee: { name?: string; employeeNumber?: string }): string

직원 정보로부터 발신자 이름을 생성합니다.

#### getAuthorizationHeader(accessToken: string): string

액세스 토큰을 Bearer 형식의 Authorization 헤더로 변환합니다.

## 에러 핸들링

### FCM 토큰이 없는 경우

직원이 FCM 토큰을 등록하지 않은 경우, 알림 전송이 실패합니다.

```typescript
{
  success: false,
  message: 'FCM 토큰이 등록되지 않음',
  notificationIds: [],
  successCount: 0,
  failureCount: 1
}
```

### 유효성 검증 오류

필수 필드가 누락되거나 잘못된 경우 `BadRequestException`이 발생합니다.

```typescript
try {
  await notificationContext.sendNotification({
    sender: '',  // 빈 문자열
    title: '제목',
    content: '내용',
    recipientEmployeeIds: [],  // 빈 배열
  });
} catch (error) {
  // BadRequestException: 발신자(sender)는 필수입니다.
  // 또는
  // BadRequestException: 수신자(recipientEmployeeIds)는 최소 1명 이상이어야 합니다.
}
```

## 실사용 예제

### 결재 승인 요청 알림

```typescript
@Injectable()
export class ApprovalProcessService {
  constructor(private readonly notificationContext: NotificationContext) {}

  async requestApproval(documentId: string, approverIds: string[], drafter: Employee, authorization: string) {
    // 결재 요청 처리 로직...

    // 결재자들에게 알림 전송
    await this.notificationContext.sendNotification({
      sender: this.notificationContext.getSenderName(drafter),
      title: '결재 요청',
      content: `${drafter.name}님이 결재를 요청했습니다.`,
      recipientEmployeeIds: approverIds,
      linkUrl: `/approval/${documentId}`,
      metadata: {
        documentId,
        type: 'approval_request',
        requestedAt: new Date().toISOString(),
      },
      authorization,
    });
  }
}
```

### 결재 완료 알림

```typescript
async notifyApprovalCompleted(documentId: string, drafterId: string, authorization: string) {
  await this.notificationContext.sendNotificationToEmployee({
    sender: '결재 시스템',
    title: '결재 완료',
    content: '귀하의 문서가 최종 승인되었습니다.',
    recipientEmployeeId: drafterId,
    linkUrl: `/documents/${documentId}`,
    metadata: {
      documentId,
      type: 'approval_completed',
    },
    authorization,
  });
}
```

## 주의사항

1. **Authorization 헤더**: 사용자별 알림 권한을 체크하기 위해 가능한 경우 항상 `authorization` 파라미터를 전달해주세요.
2. **FCM 토큰**: 직원이 모바일 앱에 로그인하여 FCM 토큰을 등록해야 알림을 받을 수 있습니다.
3. **에러 처리**: 알림 전송 실패는 비즈니스 로직에 영향을 주지 않도록 적절히 처리해야 합니다.
4. **중복 제거**: 수신자 목록에 중복이 있을 경우 자동으로 제거됩니다.

## 의존성

- `@lumir-company/sso-sdk`: FCM 토큰 조회
- `@nestjs/axios`: HTTP 통신
- `SSOModule`: SSO 통합 모듈
- `NotificationModule`: 알림 통합 모듈

