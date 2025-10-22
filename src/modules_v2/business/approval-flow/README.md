# Approval Flow Business Module

결재 흐름 설정 및 관리를 담당하는 비즈니스 모듈입니다.

## 📌 개요

Approval Flow 모듈은 문서양식과 결재선 템플릿을 생성하고 관리하며, 문서 기안 시 결재선 스냅샷을 생성하는 역할을 담당합니다.

## 🏗️ 아키텍처

```
approval-flow/
├── controllers/
│   └── approval-flow.controller.ts    # HTTP 엔드포인트
├── dtos/                              # Request/Response DTO
│   ├── create-form-request.dto.ts
│   ├── update-form-version-request.dto.ts
│   ├── clone-template-request.dto.ts
│   ├── create-template-version-request.dto.ts
│   ├── create-snapshot-request.dto.ts
│   ├── approval-flow-response.dto.ts
│   └── index.ts
├── usecases/                          # 비즈니스 로직
│   ├── create-form-with-approval-line.usecase.ts
│   ├── update-form-version.usecase.ts
│   ├── clone-approval-line-template.usecase.ts
│   ├── create-approval-line-template-version.usecase.ts
│   ├── create-approval-snapshot.usecase.ts
│   └── index.ts
├── approval-flow.module.ts
└── README.md
```

## 📋 주요 기능

### 1. 문서양식 생성 & 결재선 연결

새로운 문서양식을 생성하고 결재선을 연결합니다.

**엔드포인트:** `POST /v2/approval-flow/forms`

**요청 예시:**

```json
{
    "formName": "휴가 신청서",
    "description": "연차/반차 신청용",
    "template": "<div>휴가 신청서 템플릿</div>",
    "useExistingLine": true,
    "lineTemplateVersionId": "line-version-123"
}
```

**사용 전략:**

- `useExistingLine: true`: 기존 결재선 템플릿 참조 (수정 시 다른 양식에 영향)
- `useExistingLine: false`: 결재선 템플릿 복제 (독립적으로 수정 가능)

### 2. 문서양식 수정 (새 버전 생성)

문서양식을 수정합니다. 기존 버전은 불변으로 유지하고 새 버전을 생성합니다.

**엔드포인트:** `PATCH /v2/approval-flow/forms/:formId/versions`

**요청 예시:**

```json
{
    "template": "<div>수정된 템플릿</div>",
    "versionNote": "결재선 수정",
    "lineTemplateVersionId": "line-version-456",
    "cloneAndEdit": true,
    "stepEdits": [
        {
            "stepOrder": 1,
            "stepType": "APPROVAL",
            "assigneeRule": "FIXED",
            "defaultApproverId": "user-123",
            "required": true
        }
    ]
}
```

### 3. 결재선 템플릿 복제 (Detach & Clone)

기존 결재선 템플릿을 복제합니다.

**엔드포인트:** `POST /v2/approval-flow/templates/clone`

**요청 예시:**

```json
{
    "baseTemplateVersionId": "template-version-123",
    "newTemplateName": "지출결의 전용 결재선",
    "newTemplateDescription": "지출결의 전용",
    "stepEdits": [
        {
            "stepOrder": 1,
            "stepType": "AGREEMENT",
            "assigneeRule": "FIXED",
            "defaultApproverId": "user-456",
            "required": true,
            "description": "회계 검토"
        },
        {
            "stepOrder": 2,
            "stepType": "APPROVAL",
            "assigneeRule": "DEPARTMENT_HEAD",
            "targetDepartmentId": "dept-789",
            "required": true,
            "description": "부서장 승인"
        }
    ]
}
```

**복제 전략:**

- `newTemplateName` 제공 시: 새 템플릿 생성 (분기)
- `newTemplateName` 미제공 시: 원본 템플릿에 새 버전 추가

### 4. 결재선 템플릿 새 버전 생성

기존 결재선 템플릿의 새 버전을 생성합니다.

**엔드포인트:** `POST /v2/approval-flow/templates/:templateId/versions`

**요청 예시:**

```json
{
    "name": "업데이트된 결재선",
    "description": "시행 단계 추가",
    "steps": [
        {
            "stepOrder": 1,
            "stepType": "APPROVAL",
            "assigneeRule": "FIXED",
            "defaultApproverId": "user-123",
            "required": true
        },
        {
            "stepOrder": 2,
            "stepType": "IMPLEMENTATION",
            "assigneeRule": "POSITION_BASED",
            "targetPositionId": "position-456",
            "required": true
        }
    ]
}
```

### 5. 결재 스냅샷 생성 (기안 시 호출)

문서 기안 시 호출되며, 결재선 템플릿의 `assignee_rule`을 기안 컨텍스트로 해석하여 실제 결재자를 확정합니다.

**엔드포인트:** `POST /v2/approval-flow/snapshots`

**요청 예시:**

```json
{
    "documentId": "document-123",
    "formVersionId": "form-version-456",
    "draftContext": {
        "drafterId": "employee-789",
        "drafterDepartmentId": "dept-012",
        "lineTemplateVersionId": "line-version-345",
        "documentAmount": 1000000,
        "documentType": "EXPENSE"
    }
}
```

**Assignee Rule 해석:**

| Rule              | 설명           | 해석 방법                         |
| ----------------- | -------------- | --------------------------------- |
| `FIXED`           | 고정 결재자    | `defaultApproverId` 사용          |
| `DRAFTER`         | 기안자         | `draftContext.drafterId` 사용     |
| `DEPARTMENT_HEAD` | 부서장         | 부서 ID로 부서장 조회             |
| `POSITION_BASED`  | 직책 기반      | 직책 ID로 해당 직책자 조회        |
| `DOCUMENT_FIELD`  | 문서 필드 기반 | 문서 금액/유형 등으로 조건부 판단 |

## 🔄 문서양식 & 결재선 관계

### 참조 (Reference) 방식

```
Form Version A ──┐
                 ├──> Approval Line Template Version
Form Version B ──┘

※ 템플릿 수정 시 모든 양식에 영향
```

### 복제 (Clone) 방식

```
Form Version A ──> Approval Line Template Version A (독립)
Form Version B ──> Approval Line Template Version B (독립)

※ 템플릿 수정 시 해당 양식에만 영향
```

### 스냅샷 (Snapshot) 방식

```
Document (기안 완료) ──> Approval Line Snapshot (불변)

※ 기안 후 템플릿이 변경되어도 기안된 문서의 결재선은 불변
```

## 📊 데이터 흐름

```
Client Request
  ↓
Controller (HTTP Layer)
  ↓
Usecase (Business Logic)
  ↓
ApprovalFlowContext
  ↓
Domain Services (Form, FormVersion, ApprovalLineTemplate, etc.)
  ↓
Repository
  ↓
Database
```

## 🔗 의존성

### Context Layer

- `ApprovalFlowContext`: 문서양식 및 결재선 관리 로직

### Domain Layer

- `DomainFormService`
- `DomainFormVersionService`
- `DomainApprovalLineTemplateService`
- `DomainApprovalLineTemplateVersionService`
- `DomainApprovalStepTemplateService`
- `DomainApprovalLineSnapshotService`
- `DomainApprovalStepSnapshotService`
- `DomainEmployeeService`
- `DomainDepartmentService`

## ✅ 검증 규칙

### 문서양식 생성

- `formName`: 필수 입력
- `useExistingLine: true` 시 `lineTemplateVersionId` 필수
- `useExistingLine: false` 시 `baseLineTemplateVersionId` 및 `stepEdits` 필수

### 문서양식 수정

- 문서양식이 존재해야 함
- 현재 활성 버전이 존재해야 함

### 결재선 템플릿 복제

- 원본 템플릿 버전이 존재해야 함
- `stepEdits`가 제공되면 최소 1개 이상의 단계 필요

### 결재 스냅샷 생성

- 문서가 존재해야 함
- 문서양식 버전이 존재해야 함
- 결재선 템플릿이 양식에 연결되어 있어야 함
- 모든 `assignee_rule`이 성공적으로 해석되어야 함

## 🧪 테스트

E2E 테스트는 `test/approval-flow.e2e-spec.ts`에 위치합니다.

```bash
# E2E 테스트 실행
npm run test:e2e -- --testPathPattern=approval-flow.e2e-spec

# 전체 E2E 테스트 실행
npm run test:e2e

# 커버리지 포함
npm run test:e2e -- --coverage
```

### 테스트 커버리지

- ✅ 문서양식 생성 & 결재선 연결
- ✅ 문서양식 수정 (버전 관리)
- ✅ 결재선 템플릿 복제
- ✅ 결재선 템플릿 새 버전 생성
- ✅ 결재 스냅샷 생성 (assignee_rule 해석)
- ✅ 트랜잭션 관리 (commit, rollback)

## 📝 참고사항

### 트랜잭션 관리

모든 작업은 `withTransaction` 유틸리티를 사용하여 트랜잭션 내에서 실행됩니다.

```typescript
// 단일 작업: 트랜잭션 자동 관리
await approvalFlowContext.createFormWithApprovalLine(dto);

// 중첩 작업: externalQueryRunner 파라미터로 트랜잭션 공유
await withTransaction(dataSource, async (queryRunner) => {
    const form = await approvalFlowContext.createFormWithApprovalLine(dto, queryRunner);
    // 추가 작업...
});
```

### 버전 관리 전략

- **불변성 (Immutability)**: 기존 버전은 수정하지 않고 새 버전 생성
- **추적성 (Traceability)**: 모든 버전 변경 사항 기록
- **활성 버전 (Active Version)**: 한 시점에 하나의 활성 버전만 존재

### Assignee Rule 확장

새로운 결재자 할당 규칙을 추가하려면:

1. `AssigneeRule` enum에 새 타입 추가
2. `ApprovalFlowContext.resolveAssigneeRule` 메서드에 해석 로직 추가
3. 관련 테스트 작성

### 성능 최적화

- 결재선 템플릿 조회 시 캐싱 고려 (Redis)
- `assignee_rule` 해석 시 대량의 직원 조회가 발생할 수 있으므로 배치 조회 구현
- 스냅샷 생성 시 트랜잭션 최적화

## 🚧 향후 개선사항

### 기능 개선

- [ ] 결재선 템플릿 미리보기 기능
- [ ] 결재선 템플릿 버전 비교 기능
- [ ] 조건부 결재선 (IF-THEN 로직)
- [ ] 결재선 템플릿 복사 이력 추적
- [ ] 결재선 시뮬레이션 (기안 전 결재자 확인)

### 기술 개선

- [ ] 결재선 템플릿 캐싱
- [ ] Assignee Rule 플러그인 시스템
- [ ] GraphQL 지원
- [ ] 결재선 템플릿 import/export (JSON)

## 📚 관련 문서

- [API 문서](../../../../docs/API-DOCUMENTATION.md)
- [E2E 테스트](../../../../test/approval-flow.e2e-spec.ts)
- [E2E 테스트 설정 가이드](./E2E-SETUP.md)
- [트랜잭션 사용 가이드](../../../../docs/transaction-usage.md)
- [결재 시스템 설계 규칙](./NOTE.md)

## 💡 사용 시나리오

### 시나리오 1: 새 문서양식 생성 (기존 결재선 참조)

```typescript
// 여러 양식이 동일한 결재선을 공유
POST /v2/approval-flow/forms
{
  "formName": "휴가 신청서",
  "useExistingLine": true,
  "lineTemplateVersionId": "common-approval-line-v1"
}
```

### 시나리오 2: 새 문서양식 생성 (결재선 복제)

```typescript
// 양식마다 독립적인 결재선 필요
POST /v2/approval-flow/forms
{
  "formName": "지출결의서",
  "useExistingLine": false,
  "baseLineTemplateVersionId": "common-approval-line-v1",
  "stepEdits": [
    {
      "stepOrder": 1,
      "stepType": "AGREEMENT",
      "assigneeRule": "FIXED",
      "defaultApproverId": "accountant-id"
    }
    // ... 추가 단계
  ]
}
```

### 시나리오 3: 문서 기안 시 결재선 확정

```typescript
// 사용자가 문서를 제출하면 자동으로 호출
POST /v2/approval-flow/snapshots
{
  "documentId": "doc-123",
  "formVersionId": "form-v1",
  "draftContext": {
    "drafterId": "emp-456",
    "drafterDepartmentId": "dept-789",
    "lineTemplateVersionId": "line-v1",
    "documentAmount": 5000000
  }
}

// 결과: 실제 결재자가 확정된 불변 스냅샷 생성
```

---

**문서 버전:** 1.0.0  
**최종 업데이트:** 2025-10-21  
**작성자:** LIAS Development Team
