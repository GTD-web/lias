# Document Business Module

문서 생명주기를 관리하는 비즈니스 모듈입니다.

## 📌 개요

Document 모듈은 문서의 생성부터 제출, 삭제까지 전체 라이프사이클을 관리합니다.

## 🏗️ 아키텍처

```
controllers/
  └── document.controller.ts    # HTTP 엔드포인트

usecases/
  ├── create-document.usecase.ts
  ├── update-document.usecase.ts
  ├── submit-document.usecase.ts
  ├── cancel-document.usecase.ts
  └── get-document.usecase.ts

dtos/
  ├── create-document-request.dto.ts
  ├── update-document-request.dto.ts
  ├── submit-document-request.dto.ts
  └── document-response.dto.ts
```

## 📋 주요 기능

### 1. 문서 생성 (임시저장)

- 새로운 문서를 `DRAFT` 상태로 생성
- 문서 번호 자동 생성

### 2. 문서 수정

- `DRAFT` 상태의 문서만 수정 가능
- 제목, 내용, 메타데이터 수정

### 3. 문서 제출

- 결재선 스냅샷 생성 (ApprovalFlowContext 호출)
- 문서 상태를 `PENDING`으로 변경
- `submittedAt` 타임스탬프 기록

### 4. 문서 삭제

- `DRAFT` 상태의 문서만 삭제 가능
- 물리적 삭제 (soft delete 아님)

### 5. 문서 조회

- ID별 조회
- 기안자별 조회
- 상태별 조회

## 🔄 문서 상태 전환

```
DRAFT (임시저장)
  ↓ [submit]
PENDING (결재 대기)
  ↓ [approve]
APPROVED (승인 완료)
  ↓ [implement]
IMPLEMENTED (시행 완료)

또는:
PENDING → [reject] → REJECTED (반려)
PENDING → [cancel] → CANCELLED (취소)
```

## 🔗 의존성

### Context Layer

- `DocumentContext`: 문서 CRUD 로직
- `ApprovalFlowContext`: 결재선 스냅샷 생성

### Domain Layer

- `DomainDocumentService`
- `DomainFormVersionService`

## 🚀 사용 예시

### 문서 생성

```typescript
POST /api/v2/document
{
  "formVersionId": "uuid",
  "title": "2025년 1분기 예산안",
  "drafterId": "uuid",
  "content": "<p>예산안 내용</p>",
  "metadata": { "urgency": "high" }
}
```

### 문서 제출

```typescript
POST /api/v2/document/:documentId/submit
{
  "draftContext": {
    "drafterId": "uuid",
    "drafterDepartmentId": "uuid",
    "lineTemplateVersionId": "uuid",
    "documentAmount": 1000000
  }
}
```

## 📊 데이터 흐름

```
Client Request
  ↓
Controller (HTTP Layer)
  ↓
Usecase (Business Logic)
  ↓
Context (Transaction Coordination)
  ↓
Domain Service (Entity Operations)
  ↓
Repository
  ↓
Database
```

## ✅ 검증 규칙

### 문서 생성

- `formVersionId`: 존재하는 양식 버전이어야 함
- `drafterId`: 존재하는 직원이어야 함
- `title`, `content`: 필수 입력

### 문서 수정

- 문서 상태가 `DRAFT`여야 함
- 본인 작성 문서만 수정 가능 (권한 검증)

### 문서 제출

- 문서 상태가 `DRAFT`여야 함
- 결재선 템플릿이 양식에 연결되어 있어야 함
- 결재자가 최소 1명 이상 해석되어야 함

### 문서 삭제

- 문서 상태가 `DRAFT`여야 함
- 본인 작성 문서만 삭제 가능 (권한 검증)

## 🧪 테스트

E2E 테스트는 `test/document.e2e-spec.ts`에 위치합니다.

```bash
npm run test:e2e -- --testPathPattern=document.e2e-spec
```

### 테스트 커버리지

- ✅ 문서 생성
- ✅ 문서 수정
- ✅ 문서 제출 (결재선 스냅샷 생성 포함)
- ✅ 문서 삭제
- ✅ 문서 조회 (ID, 기안자별, 상태별)
- ✅ 전체 라이프사이클 통합 테스트

## 📝 참고사항

### 트랜잭션 관리

- 모든 작업은 `withTransaction` 유틸리티를 사용하여 트랜잭션 내에서 실행
- 문서 제출 시 결재선 스냅샷 생성도 같은 트랜잭션 내에서 처리

### 문서 번호 생성

- 현재: `DRAFT-{timestamp}` 형식 (임시)
- TODO: 조직별 규칙에 따른 문서 번호 생성 로직 구현 필요

### 성능 고려사항

- 문서 목록 조회 시 페이지네이션 구현 권장
- 대용량 문서 내용 처리 시 별도 저장소 고려 (S3 등)

## 🔒 권한 관리

현재는 DTO에 전달된 `drafterId`를 신뢰하나, 실제 프로덕션 환경에서는:

- JWT 토큰에서 사용자 ID 추출
- Guard를 통한 권한 검증 필수
- 본인 작성 문서만 수정/삭제 가능하도록 제한

## 📚 관련 문서

- [API 문서](../../../../docs/API-DOCUMENTATION.md)
- [E2E 테스트](../../../../test/document.e2e-spec.ts)
- [트랜잭션 사용 가이드](../../../../docs/transaction-usage.md)
