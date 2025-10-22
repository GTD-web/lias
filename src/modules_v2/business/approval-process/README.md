# Approval Process Business Module

결재 프로세스 실행을 담당하는 비즈니스 모듈입니다.

## 📌 개요

Approval Process 모듈은 문서가 제출된 후 실제 결재가 진행되는 프로세스를 관리합니다.

## 🏗️ 아키텍처

```
controllers/
  └── approval-process.controller.ts    # HTTP 엔드포인트

usecases/
  ├── approve-step.usecase.ts           # 결재 승인
  ├── reject-step.usecase.ts            # 결재 반려
  ├── complete-agreement.usecase.ts     # 협의 완료
  ├── complete-implementation.usecase.ts # 시행 완료
  ├── cancel-approval.usecase.ts        # 결재 취소
  └── get-approval-status.usecase.ts    # 결재 상태 조회

dtos/
  ├── approval-step-request.dto.ts
  └── approval-step-response.dto.ts
```

## 📋 주요 기능

### 1. 결재 승인 (Approve)

- 결재자가 결재 단계를 승인
- 다음 결재 단계로 자동 진행
- 모든 결재가 완료되면 문서 상태를 `APPROVED`로 변경

### 2. 결재 반려 (Reject)

- 결재자가 결재 단계를 반려
- 반려 사유 필수 입력
- 문서 상태를 `REJECTED`로 변경
- 기안자에게 알림 발송

### 3. 협의 완료 (Agreement)

- 협의자가 의견을 제시하고 협의 완료 처리
- 결재 권한은 없으며, 의견만 전달
- 모든 협의가 완료되어야 결재 진행 가능 (설정에 따라)

### 4. 시행 완료 (Implementation)

- 결재가 모두 완료된 후 시행자가 실제 업무 수행
- 시행 결과 보고 및 증빙 자료 첨부
- 문서 상태를 `IMPLEMENTED`로 변경

### 5. 결재 취소 (Cancel)

- 기안자가 결재 진행 중인 문서를 취소
- 취소 사유 필수 입력
- 문서 상태를 `CANCELLED`로 변경

### 6. 결재 상태 조회

- 내 결재 대기 목록 조회
- 문서별 결재 단계 진행 상황 조회

## 🔄 결재 흐름

### 일반적인 결재 흐름

```
[기안] → [협의] → [결재] → [시행] → [참조]
```

### 상세 프로세스

```
1. 문서 제출 (PENDING)
   ↓
2. 협의자 A, B 협의 완료 (선택적)
   ↓
3. 결재자 1 승인
   ↓
4. 결재자 2 승인
   ↓
5. 문서 상태 → APPROVED
   ↓
6. 시행자 시행 완료
   ↓
7. 문서 상태 → IMPLEMENTED
   ↓
8. 참조자에게 알림
```

### 반려 시나리오

```
결재자 승인 대기 중
   ↓
결재자 반려 (사유 입력)
   ↓
문서 상태 → REJECTED
   ↓
기안자에게 알림 발송
```

## 🎭 역할별 권한

| 역할       | 수행 가능 작업            | 권한                   |
| ---------- | ------------------------- | ---------------------- |
| **협의자** | 협의 의견 작성, 협의 완료 | ✖ 결재 권한 없음      |
| **결재자** | 결재 승인/반려, 의견 작성 | ✔ 결재 권한 있음      |
| **시행자** | 시행 완료, 결과 보고      | ✖ 결재 권한 없음      |
| **참조자** | 문서 열람                 | ✖ 모든 처리 권한 없음 |
| **기안자** | 결재 취소                 | ✔ 취소 권한 있음      |

## 🔗 의존성

### Context Layer

- `ApprovalProcessContext`: 결재 프로세스 로직

### Domain Layer

- `DomainApprovalStepSnapshotService`
- `DomainApprovalLineSnapshotService`
- `DomainDocumentService`

## 🚀 사용 예시

### 결재 승인

```typescript
POST /api/v2/approval-process/approve
{
  "stepSnapshotId": "uuid",
  "approverId": "uuid",
  "comment": "승인합니다"
}
```

### 결재 반려

```typescript
POST /api/v2/approval-process/reject
{
  "stepSnapshotId": "uuid",
  "approverId": "uuid",
  "rejectReason": "예산안이 부적절합니다"
}
```

### 협의 완료

```typescript
POST /api/v2/approval-process/agreement/complete
{
  "stepSnapshotId": "uuid",
  "agreementUserId": "uuid",
  "comment": "회계 검토 완료"
}
```

### 시행 완료

```typescript
POST /api/v2/approval-process/implementation/complete
{
  "stepSnapshotId": "uuid",
  "implementerId": "uuid",
  "comment": "예산 집행 완료",
  "implementationResult": { ... }
}
```

### 결재 취소

```typescript
POST /api/v2/approval-process/cancel
{
  "documentId": "uuid",
  "drafterId": "uuid",
  "cancelReason": "내용 수정이 필요합니다"
}
```

### 내 결재 대기 목록 조회

```typescript
GET /api/v2/approval-process/my-pending?approverId=uuid
```

### 문서의 결재 단계 조회

```typescript
GET /api/v2/approval-process/document/:documentId/steps
```

## 📊 데이터 흐름

```
Client Request
  ↓
Controller (HTTP Layer)
  ↓
Usecase (Business Logic)
  ↓
ApprovalProcessContext
  ↓
Domain Services
  ↓
Repository
  ↓
Database
```

## ✅ 검증 규칙

### 결재 승인/반려

- 결재 단계가 `PENDING` 상태여야 함
- 요청자가 해당 단계의 결재자여야 함
- 순차 결재의 경우 이전 단계가 완료되어야 함

### 협의 완료

- 협의 단계가 `PENDING` 상태여야 함
- 요청자가 해당 단계의 협의자여야 함

### 시행 완료

- 모든 결재가 완료되어야 함 (문서 상태 `APPROVED`)
- 요청자가 시행자여야 함

### 결재 취소

- 문서 상태가 `PENDING`이어야 함
- 요청자가 기안자여야 함

## 🔔 알림 시스템

### 알림 발송 시점

1. **결재 요청**: 다음 결재자에게 알림
2. **결재 승인**: 다음 결재자에게 알림
3. **결재 반려**: 기안자에게 알림
4. **협의 요청**: 협의자에게 알림
5. **시행 요청**: 시행자에게 알림
6. **결재 완료**: 참조자들에게 알림
7. **결재 취소**: 관련자 전원에게 알림

### 알림 채널

- Slack
- 이메일
- 푸시 알림 (모바일)
- 시스템 내 알림함

## 🧪 테스트

E2E 테스트는 `test/approval-process.e2e-spec.ts`에 위치합니다.

```bash
npm run test:e2e -- --testPathPattern=approval-process.e2e-spec
```

### 테스트 커버리지

- ✅ 결재 승인
- ✅ 결재 반려
- ✅ 협의 완료
- ✅ 시행 완료
- ✅ 결재 취소
- ✅ 권한 검증 (본인이 아닌 경우 403)
- ✅ 결재 대기 목록 조회
- ✅ 결재 단계 조회
- ✅ 전체 프로세스 통합 테스트 (협의 → 결재 → 시행)

## 📝 참고사항

### 트랜잭션 관리

- 모든 결재 처리는 트랜잭션 내에서 실행
- 결재 승인 시 다음 결재자 할당도 같은 트랜잭션 내에서 처리

### 동시성 제어

- 낙관적 잠금(Optimistic Locking) 사용
- 동일 결재 단계를 여러 사용자가 동시에 처리하려는 경우 방지

### 순차 vs 병렬 결재

- **순차 결재**: 지정된 순서대로 결재 진행 (기본)
- **병렬 결재**: 동일 순서의 여러 결재자가 동시 결재 가능 (향후 지원)

### 조건부 결재

- 문서 금액, 유형 등에 따라 결재선이 동적으로 변경되는 경우
- `assigneeRule`을 통해 기안 시점에 결재자 확정

## 🔒 권한 관리

### 현재 구현

- DTO에 전달된 `approverId`, `drafterId` 등을 신뢰

### 프로덕션 환경 필수 구현

- JWT 토큰에서 사용자 ID 추출
- Guard를 통한 권한 검증
- 본인이 결재자인 경우만 승인/반려 가능
- 본인이 기안자인 경우만 취소 가능

## 📈 성능 최적화

### 인덱싱

- `approval_step_snapshots` 테이블의 `approverId`, `status` 컬럼 인덱싱
- 결재 대기 목록 조회 성능 향상

### 캐싱

- 결재 대기 개수는 캐싱 고려 (Redis)
- 문서별 결재 진행 상황 캐싱

### 이벤트 기반 아키텍처

- 결재 처리 후 알림 발송은 비동기 이벤트로 처리
- 메시지 큐 활용 (RabbitMQ, Kafka 등)

## 📚 관련 문서

- [API 문서](../../../../docs/API-DOCUMENTATION.md)
- [E2E 테스트](../../../../test/approval-process.e2e-spec.ts)
- [결재 시스템 설계 규칙](../approval-flow/README.md)
- [트랜잭션 사용 가이드](../../../../docs/transaction-usage.md)

## 🚧 향후 개선사항

### 기능 개선

- [ ] 대리 결재 기능
- [ ] 결재 위임 기능
- [ ] 병렬 결재 지원
- [ ] 조건부 결재선 (금액별, 유형별)
- [ ] 결재 기한 설정 및 자동 에스컬레이션

### 기술 개선

- [ ] 이벤트 소싱 패턴 적용
- [ ] CQRS 패턴 적용
- [ ] GraphQL 지원
- [ ] 웹소켓을 통한 실시간 알림
