# 데이터베이스 스키마 문서

> 전자결재 시스템의 데이터베이스 스키마 문서입니다.

**작성일**: 2025-11-11  
**데이터베이스**: PostgreSQL  
**ORM**: TypeORM

---

## 📋 목차

1. [개요](#개요)
2. [ERD 관계도](#erd-관계도)
3. [조직/인사 관련 테이블](#조직인사-관련-테이블)
4. [문서/결재 관련 테이블](#문서결재-관련-테이블)
5. [Enum 타입 정의](#enum-타입-정의)

---

## 개요

전자결재 시스템은 크게 **조직/인사 관리**와 **문서/결재 관리** 두 영역으로 구성됩니다.

### 주요 기능

- **조직 관리**: 부서 계층 구조, 직원, 직급, 직책 관리
- **문서 관리**: 문서 템플릿, 카테고리, 문서 생성 및 관리
- **결재 프로세스**: 결재선 정의, 결재 진행 상태 추적, 스냅샷 관리

### 데이터베이스 특징

- UUID를 Primary Key로 사용
- 결재 단계는 스냅샷으로 관리하여 불변성 보장
- JSONB를 활용한 메타데이터 저장
- Soft Delete 미지원 (하드 삭제)

---

## ERD 관계도

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           조직/인사 관련                                      │
└─────────────────────────────────────────────────────────────────────────────┘

        ┌──────────┐
        │   Rank   │ (직급)
        │ (직급)   │
        └────┬─────┘
             │ 1:N
             │
        ┌────▼─────┐           ┌────────────────────┐
        │ Employee │◄──────────│ EmployeeDepartment │
        │  (직원)  │ 1:N       │    Position        │
        └────┬─────┘           │  (직원-부서-직책)  │
             │ 1:N             └────────┬───────────┘
             │                          │ N:1    │ N:1
        ┌────▼────────┐                 │        │
        │  Document   │            ┌────▼───┐ ┌──▼────────┐
        │   (문서)    │            │ Dept   │ │ Position  │
        └─────────────┘            │ (부서) │ │  (직책)   │
                                   └────┬───┘ └───────────┘
                                        │
                                        │ 자기참조 (계층구조)
                                        │
                                   └────▼───┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          문서/결재 관련                                       │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │ Category │ (카테고리)
    └────┬─────┘
         │ 1:N
         │
    ┌────▼────────────────┐
    │ DocumentTemplate    │ (문서 템플릿)
    └────┬────────────────┘
         │ 1:N
         │
    ┌────▼──────────────────┐
    │ ApprovalStepTemplate  │ (결재 단계 템플릿)
    └───────────────────────┘


    ┌──────────┐                 ┌─────────────────────┐
    │ Employee │◄────────────────│     Document        │
    │  (직원)  │  drafter (1:N)  │      (문서)         │
    └────┬─────┘                 └──────────┬──────────┘
         │                                  │ 1:N
         │ approver (N:1)                   │
         │                        ┌─────────▼───────────────┐
         └────────────────────────│ ApprovalStepSnapshot   │
                                  │   (결재 단계 스냅샷)    │
                                  └─────────────────────────┘
```

---

## 조직/인사 관련 테이블

### 1. employees (직원)

직원 정보를 관리하는 테이블입니다. 외부 시스템에서 제공된 ID를 사용합니다.

#### 컬럼 정보

| 컬럼명                 | 타입      | Nullable | 기본값 | 설명                       |
| ---------------------- | --------- | -------- | ------ | -------------------------- |
| `id`                   | UUID      | NO       | -      | 직원 ID (PK, 외부 제공)    |
| `employeeNumber`       | VARCHAR   | NO       | -      | 사번 (Unique)              |
| `name`                 | VARCHAR   | NO       | -      | 이름                       |
| `email`                | VARCHAR   | YES      | -      | 이메일 (Unique)            |
| `password`             | VARCHAR   | YES      | -      | 비밀번호                   |
| `phoneNumber`          | VARCHAR   | YES      | -      | 전화번호                   |
| `dateOfBirth`          | DATE      | YES      | -      | 생년월일                   |
| `gender`               | ENUM      | YES      | -      | 성별 (MALE, FEMALE, OTHER) |
| `hireDate`             | DATE      | NO       | -      | 입사일                     |
| `status`               | ENUM      | NO       | Active | 재직 상태                  |
| `currentRankId`        | UUID      | YES      | -      | 현재 직급 ID (FK → ranks)  |
| `terminationDate`      | DATE      | YES      | -      | 퇴사일                     |
| `terminationReason`    | TEXT      | YES      | -      | 퇴사 사유                  |
| `isInitialPasswordSet` | BOOLEAN   | NO       | false  | 초기 비밀번호 설정 여부    |
| `roles`                | ENUM[]    | NO       | [USER] | 사용자 역할                |
| `createdAt`            | TIMESTAMP | NO       | NOW()  | 생성일                     |
| `updatedAt`            | TIMESTAMP | NO       | NOW()  | 수정일                     |

#### 관계

- `currentRank`: Rank (N:1, eager)
- `departmentPositions`: EmployeeDepartmentPosition[] (1:N)
- `draftDocuments`: Document[] (1:N)

---

### 2. departments (부서)

부서 정보를 관리하며 계층 구조를 지원합니다.

#### 컬럼 정보

| 컬럼명               | 타입      | Nullable | 기본값     | 설명                                       |
| -------------------- | --------- | -------- | ---------- | ------------------------------------------ |
| `id`                 | UUID      | NO       | -          | 부서 ID (PK, 외부 제공)                    |
| `departmentName`     | VARCHAR   | NO       | -          | 부서명                                     |
| `departmentCode`     | VARCHAR   | NO       | -          | 부서 코드 (Unique)                         |
| `type`               | ENUM      | NO       | DEPARTMENT | 유형 (COMPANY, DIVISION, DEPARTMENT, TEAM) |
| `parentDepartmentId` | UUID      | YES      | -          | 상위 부서 ID (FK → departments, 자기참조)  |
| `order`              | INTEGER   | NO       | 0          | 정렬 순서                                  |
| `createdAt`          | TIMESTAMP | NO       | NOW()      | 생성일                                     |
| `updatedAt`          | TIMESTAMP | NO       | NOW()      | 수정일                                     |

#### 인덱스 & 제약조건

- **Unique**: `(parentDepartmentId, order)` - 같은 상위 부서 내에서 순서 중복 불가
- **Unique**: `(order)` WHERE `parentDepartmentId IS NULL` - 최상위 부서 순서 중복 불가
- **Index**: `(parentDepartmentId, order)`

#### 관계

- `parentDepartment`: Department (N:1, 자기참조)
- `childDepartments`: Department[] (1:N, 자기참조)

---

### 3. ranks (직급)

직급 정보를 관리합니다.

#### 컬럼 정보

| 컬럼명      | 타입      | Nullable | 기본값 | 설명                                            |
| ----------- | --------- | -------- | ------ | ----------------------------------------------- |
| `id`        | UUID      | NO       | -      | 직급 ID (PK, 외부 제공)                         |
| `rankTitle` | VARCHAR   | NO       | -      | 직급명 (예: 사원, 주임, 대리, 과장, 차장, 부장) |
| `rankCode`  | VARCHAR   | NO       | -      | 직급 코드 (Unique)                              |
| `level`     | INTEGER   | NO       | -      | 직급 레벨 (낮을수록 상위 직급)                  |
| `createdAt` | TIMESTAMP | NO       | NOW()  | 생성일                                          |
| `updatedAt` | TIMESTAMP | NO       | NOW()  | 수정일                                          |

#### 관계

- Employee의 `currentRank`에서 참조됨 (1:N)

---

### 4. positions (직책)

직책 정보를 관리합니다.

#### 컬럼 정보

| 컬럼명                   | 타입      | Nullable | 기본값 | 설명                                         |
| ------------------------ | --------- | -------- | ------ | -------------------------------------------- |
| `id`                     | UUID      | NO       | -      | 직책 ID (PK, 외부 제공)                      |
| `positionTitle`          | VARCHAR   | NO       | -      | 직책명 (예: 부서장, 파트장, 팀장, 직원)      |
| `positionCode`           | VARCHAR   | NO       | -      | 직책 코드 (Unique, 예: DEPT_HEAD, PART_HEAD) |
| `level`                  | INTEGER   | NO       | -      | 직책 레벨 (낮을수록 상위 직책)               |
| `hasManagementAuthority` | BOOLEAN   | NO       | false  | 관리 권한 여부                               |
| `createdAt`              | TIMESTAMP | NO       | NOW()  | 생성일                                       |
| `updatedAt`              | TIMESTAMP | NO       | NOW()  | 수정일                                       |

#### 관계

- EmployeeDepartmentPosition에서 참조됨 (1:N)
- ApprovalStepTemplate의 `targetPosition`에서 참조됨 (1:N)

---

### 5. employee_department_positions (직원-부서-직책 매핑)

직원이 특정 부서에서 맡고 있는 직책을 나타냅니다. 한 직원이 여러 부서에서 다른 직책을 가질 수 있습니다.

#### 컬럼 정보

| 컬럼명         | 타입      | Nullable | 기본값 | 설명                              |
| -------------- | --------- | -------- | ------ | --------------------------------- |
| `id`           | UUID      | NO       | -      | 직원-부서-직책 ID (PK, 외부 제공) |
| `employeeId`   | UUID      | NO       | -      | 직원 ID (FK → employees)          |
| `departmentId` | UUID      | NO       | -      | 부서 ID (FK → departments)        |
| `positionId`   | UUID      | NO       | -      | 직책 ID (FK → positions)          |
| `isManager`    | BOOLEAN   | NO       | false  | 관리자 권한 여부                  |
| `createdAt`    | TIMESTAMP | NO       | NOW()  | 생성일                            |
| `updatedAt`    | TIMESTAMP | NO       | NOW()  | 수정일                            |

#### 인덱스 & 제약조건

- **Unique**: `(employeeId, departmentId)` - 한 직원이 같은 부서에서 하나의 직책만 가능
- **Index**: `employeeId`
- **Index**: `departmentId`
- **Index**: `positionId`

#### 관계

- `employee`: Employee (N:1)
- `department`: Department (N:1)
- `position`: Position (N:1)

---

## 문서/결재 관련 테이블

### 6. categories (카테고리)

문서 템플릿을 분류하기 위한 카테고리입니다.

#### 컬럼 정보

| 컬럼명        | 타입      | Nullable | 기본값 | 설명                   |
| ------------- | --------- | -------- | ------ | ---------------------- |
| `id`          | UUID      | NO       | -      | 카테고리 ID (PK)       |
| `name`        | VARCHAR   | NO       | -      | 카테고리 이름          |
| `code`        | VARCHAR   | NO       | -      | 카테고리 코드 (Unique) |
| `description` | TEXT      | YES      | -      | 카테고리 설명          |
| `order`       | INTEGER   | NO       | 0      | 정렬 순서              |
| `createdAt`   | TIMESTAMP | NO       | NOW()  | 생성일                 |
| `updatedAt`   | TIMESTAMP | NO       | NOW()  | 수정일                 |

#### 인덱스

- **Unique**: `code`
- **Index**: `order`

#### 관계

- `documentTemplates`: DocumentTemplate[] (1:N)

---

### 7. document_templates (문서 템플릿)

문서 양식의 메타데이터를 관리합니다.

#### 컬럼 정보

| 컬럼명        | 타입      | Nullable | 기본값 | 설명                                       |
| ------------- | --------- | -------- | ------ | ------------------------------------------ |
| `id`          | UUID      | NO       | -      | 문서 템플릿 ID (PK)                        |
| `name`        | VARCHAR   | NO       | -      | 문서 템플릿 이름                           |
| `code`        | VARCHAR   | NO       | -      | 문서 템플릿 코드 (Unique)                  |
| `description` | TEXT      | YES      | -      | 문서 템플릿 설명                           |
| `status`      | ENUM      | NO       | DRAFT  | 문서 템플릿 상태 (DRAFT, ACTIVE, INACTIVE) |
| `template`    | TEXT      | NO       | -      | 문서 HTML 템플릿                           |
| `categoryId`  | UUID      | YES      | -      | 카테고리 ID (FK → categories)              |
| `createdAt`   | TIMESTAMP | NO       | NOW()  | 생성일                                     |
| `updatedAt`   | TIMESTAMP | NO       | NOW()  | 수정일                                     |

#### 인덱스

- **Unique**: `code`
- **Index**: `status`
- **Index**: `categoryId`

#### 관계

- `category`: Category (N:1)
- `approvalStepTemplates`: ApprovalStepTemplate[] (1:N, cascade)

---

### 8. approval_step_templates (결재 단계 템플릿)

문서 양식의 결재 단계 템플릿을 정의합니다. 기안 시 추천 결재선 역할을 합니다.

#### 컬럼 정보

| 컬럼명               | 타입    | Nullable | 기본값 | 설명                                                                                |
| -------------------- | ------- | -------- | ------ | ----------------------------------------------------------------------------------- |
| `id`                 | UUID    | NO       | -      | 결재 단계 템플릿 ID (PK)                                                            |
| `documentTemplateId` | UUID    | NO       | -      | 문서 템플릿 ID (FK → document_templates)                                            |
| `stepOrder`          | INTEGER | NO       | -      | 결재 단계 순서                                                                      |
| `stepType`           | ENUM    | NO       | -      | 결재 단계 타입 (APPROVAL, AGREEMENT, IMPLEMENTATION, REFERENCE)                     |
| `assigneeRule`       | ENUM    | NO       | FIXED  | 결재자 할당 규칙 (FIXED, DRAFTER, HIERARCHY_TO_SUPERIOR, DEPARTMENT_HEAD, POSITION) |
| `targetEmployeeId`   | UUID    | YES      | -      | 결재자 ID (FK → employees)                                                          |
| `targetDepartmentId` | UUID    | YES      | -      | 부서 ID (FK → departments)                                                          |
| `targetPositionId`   | UUID    | YES      | -      | 직책 ID (FK → positions)                                                            |

#### 인덱스

- **Index**: `(documentTemplateId, stepOrder)`

#### 관계

- `documentTemplate`: DocumentTemplate (N:1, CASCADE)
- `targetEmployee`: Employee (N:1)
- `targetDepartment`: Department (N:1)
- `targetPosition`: Position (N:1)

---

### 9. documents (문서)

실제 기안된 문서를 나타냅니다.

#### 컬럼 정보

| 컬럼명                | 타입         | Nullable | 기본값 | 설명                                                                                         |
| --------------------- | ------------ | -------- | ------ | -------------------------------------------------------------------------------------------- |
| `id`                  | UUID         | NO       | -      | 문서 ID (PK)                                                                                 |
| `documentNumber`      | VARCHAR(100) | YES      | -      | 문서(품의) 번호 (Unique, 기안 시 생성)                                                       |
| `title`               | VARCHAR(500) | NO       | -      | 문서 제목                                                                                    |
| `content`             | TEXT         | NO       | -      | 문서 내용 (HTML)                                                                             |
| `status`              | ENUM         | NO       | DRAFT  | 문서 상태 (DRAFT, PENDING, SUBMITTED, IN_PROGRESS, APPROVED, REJECTED, CANCELLED, COMPLETED) |
| `comment`             | TEXT         | YES      | -      | 문서 비고                                                                                    |
| `metadata`            | JSONB        | YES      | -      | 문서 메타데이터 (추가 정보)                                                                  |
| `drafterId`           | UUID         | NO       | -      | 기안자 ID (FK → employees)                                                                   |
| `documentTemplateId`  | UUID         | YES      | -      | 문서 템플릿 ID                                                                               |
| `retentionPeriod`     | VARCHAR(50)  | YES      | -      | 보존 연한 (예: 10년, 영구보관)                                                               |
| `retentionPeriodUnit` | VARCHAR(20)  | YES      | -      | 보존 연한 단위 (예: 년, 월, 일)                                                              |
| `retentionStartDate`  | DATE         | YES      | -      | 보존 연한 시작일                                                                             |
| `retentionEndDate`    | DATE         | YES      | -      | 보존 연한 종료일                                                                             |
| `submittedAt`         | TIMESTAMP    | YES      | -      | 기안(상신) 일시                                                                              |
| `cancelReason`        | TEXT         | YES      | -      | 취소 사유                                                                                    |
| `cancelledAt`         | TIMESTAMP    | YES      | -      | 취소 일시                                                                                    |
| `approvedAt`          | TIMESTAMP    | YES      | -      | 결재 완료 일시                                                                               |
| `rejectedAt`          | TIMESTAMP    | YES      | -      | 반려 일시                                                                                    |
| `createdAt`           | TIMESTAMP    | NO       | NOW()  | 생성일                                                                                       |
| `updatedAt`           | TIMESTAMP    | NO       | NOW()  | 수정일                                                                                       |

#### 인덱스

- **Unique**: `documentNumber`
- **Index**: `drafterId`
- **Index**: `status`
- **Index**: `createdAt`

#### 관계

- `drafter`: Employee (N:1)
- `approvalSteps`: ApprovalStepSnapshot[] (1:N)

---

### 10. approval_step_snapshots (결재 단계 스냅샷)

결재선 스냅샷의 각 결재 단계를 나타냅니다. 문서 기안 시점에 생성되어 불변성을 보장합니다.

#### 컬럼 정보

| 컬럼명             | 타입      | Nullable | 기본값  | 설명                                                                   |
| ------------------ | --------- | -------- | ------- | ---------------------------------------------------------------------- |
| `id`               | UUID      | NO       | -       | 결재 단계 스냅샷 ID (PK)                                               |
| `documentId`       | UUID      | NO       | -       | 문서 ID (FK → documents)                                               |
| `stepOrder`        | INTEGER   | NO       | -       | 결재 단계 순서                                                         |
| `stepType`         | ENUM      | NO       | -       | 결재 단계 타입 (APPROVAL, AGREEMENT, IMPLEMENTATION, REFERENCE)        |
| `approverId`       | UUID      | NO       | -       | 결재자 ID (FK → employees)                                             |
| `approverSnapshot` | JSONB     | YES      | -       | 결재자 스냅샷 시점 정보 (부서, 직책, 직급 등)                          |
| `status`           | ENUM      | NO       | PENDING | 결재 상태 (PENDING, APPROVED, REJECTED, CANCELLED, COMPLETED, SKIPPED) |
| `comment`          | TEXT      | YES      | -       | 결재 의견                                                              |
| `approvedAt`       | TIMESTAMP | YES      | -       | 결재 완료 시간                                                         |
| `createdAt`        | TIMESTAMP | NO       | NOW()   | 생성일                                                                 |
| `updatedAt`        | TIMESTAMP | NO       | NOW()   | 수정일                                                                 |

#### 인덱스

- **Index**: `(documentId, stepOrder)`
- **Index**: `approverId`
- **Index**: `status`

#### approverSnapshot JSONB 구조

```typescript
{
  departmentId?: string;
  departmentName?: string;
  positionId?: string;
  positionTitle?: string;
  rankId?: string;
  rankTitle?: string;
  employeeName?: string;
  employeeNumber?: string;
}
```

#### 관계

- `document`: Document (N:1, CASCADE)
- `approver`: Employee (N:1)

---

## Enum 타입 정의

### 직원 관련 Enum

#### Gender (성별)

```typescript
enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}
```

#### EmployeeStatus (재직 상태)

```typescript
enum EmployeeStatus {
    Active = 'active', // 재직
    OnLeave = 'on_leave', // 휴직
    Terminated = 'terminated', // 퇴사
}
```

#### Role (사용자 역할)

```typescript
enum Role {
    USER = 'user', // 일반 사용자
    ADMIN = 'admin', // 관리자
    SUPER_ADMIN = 'super_admin', // 최고 관리자
}
```

---

### 부서 관련 Enum

#### DepartmentType (부서 유형)

```typescript
enum DepartmentType {
    COMPANY = 'company', // 회사
    DIVISION = 'division', // 본부
    DEPARTMENT = 'department', // 부서
    TEAM = 'team', // 팀
}
```

---

### 문서/결재 관련 Enum

#### DocumentTemplateStatus (문서 템플릿 상태)

```typescript
enum DocumentTemplateStatus {
    DRAFT = 'draft', // 초안
    ACTIVE = 'active', // 활성
    INACTIVE = 'inactive', // 비활성
}
```

#### DocumentStatus (문서 상태)

```typescript
enum DocumentStatus {
    DRAFT = 'draft', // 임시저장
    PENDING = 'pending', // 결재 대기 (제출 후 첫 결재자가 처리하기 전)
    SUBMITTED = 'submitted', // 제출됨 (기안됨)
    IN_PROGRESS = 'in_progress', // 결재 진행 중
    APPROVED = 'approved', // 결재 완료
    REJECTED = 'rejected', // 반려
    CANCELLED = 'cancelled', // 취소
    COMPLETED = 'completed', // 시행 완료
}
```

#### ApprovalStepType (결재 단계 타입)

```typescript
enum ApprovalStepType {
    APPROVAL = 'approval', // 결재
    AGREEMENT = 'agreement', // 협의
    IMPLEMENTATION = 'implementation', // 시행
    REFERENCE = 'reference', // 참조
}
```

#### ApprovalStatus (결재 상태)

```typescript
enum ApprovalStatus {
    PENDING = 'pending', // 대기
    APPROVED = 'approved', // 승인
    REJECTED = 'rejected', // 반려
    CANCELLED = 'cancelled', // 취소
    COMPLETED = 'completed', // 완료 (협의/시행)
    SKIPPED = 'skipped', // 건너뜀
}
```

#### AssigneeRule (결재자 할당 규칙)

```typescript
enum AssigneeRule {
    FIXED = 'fixed', // 고정 결재자
    DRAFTER = 'drafter', // 기안자 본인
    HIERARCHY_TO_SUPERIOR = 'hierarchy_to_superior', // 계층 상신 (기안자 → 직속 상사)
    DEPARTMENT_HEAD = 'department_head', // 부서장
    POSITION = 'position', // 특정 직책
}
```

---

## 데이터베이스 설계 원칙

### 1. 불변성 보장 (Immutability)

- **결재 단계 스냅샷**: 문서 기안 시점의 결재자 정보를 JSONB로 저장
- 결재자의 부서/직책이 변경되어도 기존 문서의 결재 정보는 변경되지 않음

### 2. 추적 가능성 (Traceability)

- 모든 테이블에 `createdAt`, `updatedAt` 컬럼 존재
- 문서의 상태 변화 시점 기록 (`submittedAt`, `approvedAt`, `rejectedAt`, `cancelledAt`)
- 결재 단계별 처리 시간 기록 (`approvedAt`)

### 3. 유연한 확장성

- JSONB를 활용한 메타데이터 저장 (`metadata`, `approverSnapshot`)
- Enum을 통한 타입 안전성 확보
- 계층 구조를 위한 자기 참조 관계 (부서)

### 4. 성능 최적화

- 자주 조회되는 컬럼에 인덱스 설정 (`status`, `drafterId`, `approverId` 등)
- 복합 인덱스를 통한 쿼리 최적화 (`documentId + stepOrder`)
- Unique 제약 조건을 통한 데이터 무결성 보장

### 5. 외부 시스템 연동

- 조직/인사 정보는 외부 시스템에서 제공된 UUID 사용 (PrimaryColumn)
- 외부 시스템과의 동기화를 위한 코드 필드 (Unique)

---

## 주요 비즈니스 로직

### 문서 번호 생성 규칙

문서 번호는 기안(제출) 시 다음 형식으로 자동 생성됩니다:

```
{templateCode}-{year}-{sequence}
```

**예시**: `APPROVAL_TEST_FORM_12345-2025-0001`

### 결재 흐름

1. **문서 생성** (DRAFT): 기안자가 문서를 작성하고 임시저장
2. **문서 제출** (PENDING/SUBMITTED): 기안자가 결재 요청
    - 문서 번호 자동 생성
    - `ApprovalStepSnapshot` 생성 (결재선 확정)
    - 결재자 정보 스냅샷 저장
3. **결재 진행** (IN_PROGRESS): 순차적으로 결재자가 승인/반려
4. **결재 완료** (APPROVED): 모든 결재자가 승인
5. **시행** (COMPLETED): 시행 담당자가 실행 완료 처리

### 결재자 할당 규칙

- **FIXED**: 지정된 특정 직원
- **DRAFTER**: 기안자 본인
- **HIERARCHY_TO_SUPERIOR**: 기안자부터 지정된 직책/직급까지의 상급자 전체
- **DEPARTMENT_HEAD**: 해당 부서의 부서장
- **POSITION**: 특정 직책을 가진 직원

---

## 데이터 무결성 규칙

### Unique 제약 조건

- `employees.employeeNumber`: 사번 중복 불가
- `employees.email`: 이메일 중복 불가
- `departments.departmentCode`: 부서 코드 중복 불가
- `ranks.rankCode`: 직급 코드 중복 불가
- `positions.positionCode`: 직책 코드 중복 불가
- `categories.code`: 카테고리 코드 중복 불가
- `document_templates.code`: 문서 템플릿 코드 중복 불가
- `documents.documentNumber`: 문서 번호 중복 불가
- `employee_department_positions (employeeId, departmentId)`: 한 직원이 같은 부서에서 하나의 직책만 가능

### Foreign Key 관계

- CASCADE 삭제: `approval_step_snapshots` (문서 삭제 시 결재 단계도 삭제)
- CASCADE 삭제: `approval_step_templates` (문서 템플릿 삭제 시 결재 단계 템플릿도 삭제)

---

## 참고사항

### TypeORM 설정

- `synchronize: false` - 프로덕션에서는 마이그레이션 사용 권장
- `logging: true` - 개발 환경에서 쿼리 로깅 활성화
- `timezone: 'Asia/Seoul'` - 한국 시간대 설정

### 마이그레이션

마이그레이션 파일은 `src/migrations` 디렉토리에 저장됩니다.

```bash
# 마이그레이션 생성
npm run migration:generate -- -n MigrationName

# 마이그레이션 실행
npm run migration:run

# 마이그레이션 롤백
npm run migration:revert
```

---

**문서 버전**: 1.0  
**마지막 업데이트**: 2025-11-11
