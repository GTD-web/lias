# 템플릿 관리 API

## 기본 정보
- **Base URL**: `/templates`
- **인증**: JWT Bearer Token (현재 비활성화)
- **설명**: 문서 템플릿과 결재단계 템플릿을 관리하는 API

---

## 3.1 문서 템플릿 생성

```http
POST /templates
```

**Request Body**
```json
{
  "name": "휴가 신청서",
  "code": "VACATION_REQUEST",
  "description": "연차/반차 휴가 신청용 템플릿",
  "template": "<html><body>휴가 신청 내용...</body></html>",
  "status": "ACTIVE",
  "categoryId": "cat-uuid-1",
  "approvalSteps": [
    {
      "stepOrder": 1,
      "stepType": "APPROVAL",
      "assigneeRule": "DEPARTMENT_HEAD",
      "assigneeValue": null
    },
    {
      "stepOrder": 2,
      "stepType": "APPROVAL",
      "assigneeRule": "FIXED",
      "assigneeValue": "emp-uuid-hr-manager"
    },
    {
      "stepOrder": 3,
      "stepType": "IMPLEMENTATION",
      "assigneeRule": "SPECIFIC_EMPLOYEE",
      "assigneeValue": "emp-uuid-hr-staff"
    }
  ]
}
```

**필수 필드**
- `name` (string): 템플릿 이름
- `code` (string): 템플릿 코드 (고유값)
- `template` (string): HTML 템플릿 내용
- `approvalSteps` (array): 결재단계 목록 (최소 1개)

**선택 필드**
- `description` (string): 템플릿 설명
- `status` (enum): 상태 (DRAFT, ACTIVE, INACTIVE, ARCHIVED)
- `categoryId` (string UUID): 카테고리 ID

**결재단계 필드 (approvalSteps)**
- `stepOrder` (number): 단계 순서
- `stepType` (enum): 단계 타입
  - `AGREEMENT`: 협의
  - `APPROVAL`: 결재
  - `IMPLEMENTATION`: 시행
- `assigneeRule` (enum): 배정 규칙
  - `FIXED`: 고정 결재자
  - `DRAFTER`: 기안자
  - `DEPARTMENT_HEAD`: 부서장
  - `HIERARCHY_TO_SUPERIOR`: 기안자 + 직속 상급자
  - `HIERARCHY_TO_POSITION`: 기안자 ~ 특정 직급까지
  - `SPECIFIC_EMPLOYEE`: 특정 직원
- `assigneeValue` (string UUID | null): 배정값 (규칙에 따라 다름)

**응답 예시 (201 Created)**
```json
{
  "id": "tpl-uuid-1",
  "name": "휴가 신청서",
  "code": "VACATION_REQUEST",
  "description": "연차/반차 휴가 신청용 템플릿",
  "template": "<html>...</html>",
  "status": "ACTIVE",
  "categoryId": "cat-uuid-1",
  "approvalStepTemplates": [
    {
      "id": "step-tpl-uuid-1",
      "documentTemplateId": "tpl-uuid-1",
      "stepOrder": 1,
      "stepType": "APPROVAL",
      "assigneeRule": "DEPARTMENT_HEAD",
      "targetEmployeeId": null,
      "targetDepartmentId": null,
      "targetPositionId": null
    }
  ],
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**에러 응답**
- `400`: 필수 필드 누락, 규칙 검증 실패
- `401`: 인증 실패

---

## 3.2 문서 템플릿 목록 조회

```http
GET /templates
```

**Query Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| categoryId | string (UUID) | ❌ | 카테고리 ID로 필터링 |
| status | enum | ❌ | 상태로 필터링 (DRAFT, ACTIVE, INACTIVE, ARCHIVED) |

**요청 예시**
```http
GET /templates
GET /templates?categoryId=cat-uuid-1
GET /templates?status=ACTIVE
GET /templates?categoryId=cat-uuid-1&status=ACTIVE
```

**응답 예시**
```json
[
  {
    "id": "tpl-uuid-1",
    "name": "휴가 신청서",
    "code": "VACATION_REQUEST",
    "description": "연차/반차 휴가 신청용 템플릿",
  "status": "ACTIVE",
  "categoryId": "cat-uuid-1",
  "category": {
    "id": "cat-uuid-1",
    "name": "인사",
    "code": "HR",
    "description": "인사 관련 문서",
    "order": 1,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
]
```

---

## 3.3 문서 템플릿 상세 조회

```http
GET /templates/{templateId}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| templateId | string (UUID) | ✅ | 템플릿 ID |

**응답 예시**
```json
{
  "id": "tpl-uuid-1",
  "name": "휴가 신청서",
  "code": "VACATION_REQUEST",
  "description": "연차/반차 휴가 신청용 템플릿",
  "template": "<html><body>...</body></html>",
  "status": "ACTIVE",
  "categoryId": "cat-uuid-1",
  "category": {
    "id": "cat-uuid-1",
    "name": "인사",
    "code": "HR",
    "description": "인사 관련 문서",
    "order": 1,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "approvalStepTemplates": [
    {
      "id": "step-tpl-uuid-1",
      "documentTemplateId": "tpl-uuid-1",
      "stepOrder": 1,
      "stepType": "APPROVAL",
      "assigneeRule": "DEPARTMENT_HEAD",
      "targetEmployeeId": null,
      "targetDepartmentId": null,
      "targetPositionId": null
    },
    {
      "id": "step-tpl-uuid-2",
      "documentTemplateId": "tpl-uuid-1",
      "stepOrder": 2,
      "stepType": "IMPLEMENTATION",
      "assigneeRule": "SPECIFIC_EMPLOYEE",
      "targetEmployeeId": "emp-uuid-1",
      "targetDepartmentId": null,
      "targetPositionId": null
    }
  ],
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**에러 응답**
- `404`: 템플릿을 찾을 수 없음
- `400`: 잘못된 UUID 형식

---

## 3.4 문서 템플릿 수정

```http
PUT /templates/{templateId}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| templateId | string (UUID) | ✅ | 템플릿 ID |

**Request Body** (모든 필드 선택)
```json
{
  "name": "휴가 신청서 v2",
  "description": "연차/반차/경조사 휴가 신청용 템플릿",
  "template": "<html><body>수정된 내용...</body></html>",
  "status": "ACTIVE",
  "approvalSteps": [
    {
      "id": "step-tpl-uuid-1",
      "stepOrder": 1,
      "stepType": "APPROVAL",
      "assigneeRule": "DEPARTMENT_HEAD"
    },
    {
      "stepOrder": 2,
      "stepType": "APPROVAL",
      "assigneeRule": "HIERARCHY_TO_SUPERIOR"
    }
  ]
}
```

**응답 예시**
```json
{
  "id": "tpl-uuid-1",
  "name": "휴가 신청서 v2",
  "code": "VACATION_REQUEST",
  "description": "연차/반차/경조사 휴가 신청용 템플릿",
  "template": "<html><body>수정된 내용...</body></html>",
  "status": "ACTIVE",
  "categoryId": "cat-uuid-1",
  "approvalStepTemplates": [...],
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-02T00:00:00.000Z"
}
```

**에러 응답**
- `404`: 템플릿을 찾을 수 없음
- `400`: 잘못된 요청

---

## 3.5 문서 템플릿 삭제

```http
DELETE /templates/{templateId}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| templateId | string (UUID) | ✅ | 템플릿 ID |

**응답** (204 No Content)
- Body 없음

**에러 응답**
- `404`: 템플릿을 찾을 수 없음
- `400`: 연결된 결재단계 템플릿이 있어 삭제할 수 없음

---

## 📌 배정 규칙 (AssigneeRule) 상세

### FIXED (고정 결재자)
- `targetEmployeeId`: 직원 UUID
- 특정 직원을 결재자로 지정

### DRAFTER (기안자)
- `targetEmployeeId`: null
- 문서를 작성한 기안자가 결재자

### DEPARTMENT_HEAD (부서장)
- `targetEmployeeId`: null
- `targetDepartmentId`: null (기안자 부서 기준)
- 기안자의 부서장이 자동으로 결재자

### HIERARCHY_TO_SUPERIOR (기안자 + 직속 상급자)
- `targetEmployeeId`: null
- 기안자와 직속 상급자가 결재자

### HIERARCHY_TO_POSITION (기안자 ~ 특정 직급)
- `targetPositionId`: 직급 UUID
- 기안자부터 지정된 직급까지 모든 상급자

### SPECIFIC_EMPLOYEE (특정 직원)
- `targetEmployeeId`: 직원 UUID
- 지정된 특정 직원

---

## 📌 참고

- 템플릿 코드(`code`)는 고유값이며 중복될 수 없습니다.
- 결재단계는 순서대로 처리됩니다 (`stepOrder`).
- `ACTIVE` 상태의 템플릿만 문서 작성 시 사용할 수 있습니다.

