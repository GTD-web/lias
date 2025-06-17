# 데이터베이스 설계 문서

import { MermaidDiagram } from '@site/src/components/MermaidDiagram';

## ERD (Entity Relationship Diagram)

<MermaidDiagram
title="database-erd"
chart={`
erDiagram
    formapprovalstep {
        uuid formApprovalStepId PK
        string type 
        string name 
        string description 
        number order 
        string approverType 
        string approverValue 
        string departmentScopeType 
        jsonb conditionExpression 
        boolean isMandatory 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        string defaultApproverId 
        string formApprovalLineId 
    }
    formapprovalline {
        uuid formApprovalLineId PK
        string name 
        string description 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        string documentFormId 
    }
    documentform {
        uuid documentFormId PK
        string type 
        string name 
        string description 
        text template 
    }
    file {
        uuid fileId PK
        string fileName 
        string filePath 
        timestamp with time zone createdAt 
        string documentId 
    }
    approvalstep {
        uuid approvalStepId PK
        string type 
        string name 
        string description 
        number order 
        timestamp with time zone approvedDate 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        string approverId 
        string documentId 
    }
    document {
        uuid documentId PK
        string title 
        string documentNumber 
        text content 
        string retentionPeriod 
        string retentionPeriodUnit 
        date retentionStartDate 
        date retentionEndDate 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        timestamp with time zone deletedAt 
        string employeeId 
        string documentFormId 
        string parentDocumentId 
    }
    employee {
        uuid employeeId PK
        string name 
        string employeeNumber 
        string email 
        string department 
        string position 
        string rank 
    }
    formapprovalstep }|--|| employee : belongs_to
    formapprovalstep }|--|| formapprovalline : belongs_to
    formapprovalline }|--|| documentform : belongs_to
    formapprovalline ||--o{ formapprovalstep : has
    documentform ||--o{ document : has
    documentform ||--o{ formapprovalline : has
    file }|--|| document : belongs_to
    approvalstep }|--|| employee : belongs_to
    approvalstep }|--|| document : belongs_to
    document }|--|| employee : belongs_to
    document }|--|| documentform : belongs_to
    document ||--o{ approvalstep : has
    document }|--|| document : belongs_to
    document ||--o{ document : has
    document ||--o{ file : has
    employee ||--o{ document : has
    employee ||--o{ formapprovalstep : has
    employee ||--o{ approvalstep : has
`}
/>

## 엔티티 상세 정보

### form-approval-steps

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| formApprovalStepId | uuid | PK, NOT NULL |  |
| type | String | NOT NULL | 결재 단계 타입 (ex. 합의, 결재, 시행, 참조 등) |
| name | String | NOT NULL | 결재 단계 이름 |
| description | String | NOT NULL | 결재 단계 설명 |
| order | Number | NOT NULL | 결재 단계 순서 |
| approverType | String | NOT NULL | 결재자 지정 방식 (ex. Enum(USER, DEPARTMENT_POSITION, POSITION, TITLE)) |
| approverValue | String | NOT NULL | 결재자 지정 값 (ex.  userId, positionCode, titleCode) |
| departmentScopeType | String | NOT NULL | DEPARTMENT_POSITION인 경우 부서 범위 타입  (ex. Enum(SELECTED, DRAFT_OWNER, NONE)) |
| conditionExpression | jsonb | NOT NULL | 결재 단계 조건 표현식 |
| isMandatory | Boolean | NOT NULL | 결재 단계 필수 여부 |
| createdAt | timestamp with time zone | NOT NULL |  |
| updatedAt | timestamp with time zone | NOT NULL |  |
| defaultApproverId | String |  | 기본 결재자 ID |
| formApprovalLineId | String | NOT NULL | 결재 라인 템플릿 ID |

### form-approval-lines

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| formApprovalLineId | uuid | PK, NOT NULL |  |
| name | String | NOT NULL | 결재 라인 이름 |
| description | String | NOT NULL | 결재 라인 설명 |
| createdAt | timestamp with time zone | NOT NULL |  |
| updatedAt | timestamp with time zone | NOT NULL |  |
| documentFormId | String | NOT NULL |  |

### document-forms

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| documentFormId | uuid | PK, NOT NULL |  |
| type | String | NOT NULL | 문서 양식 타입 |
| name | String | NOT NULL | 문서 양식 이름 |
| description | String | NOT NULL | 문서 양식 설명 |
| template | text | NOT NULL | 문서 양식 html |

### files

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| fileId | uuid | PK, NOT NULL |  |
| fileName | String | NOT NULL | 파일 이름 |
| filePath | String | NOT NULL, UNIQUE | 파일 경로 |
| createdAt | timestamp with time zone | NOT NULL |  |
| documentId | String |  |  |

### approval-steps

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| approvalStepId | uuid | PK, NOT NULL |  |
| type | String | NOT NULL | 결재 단계 타입 (ex. 합의, 결재, 시행, 참조 등) |
| name | String | NOT NULL | 결재 단계 이름 |
| description | String | NOT NULL | 결재 단계 설명 |
| order | Number | NOT NULL | 결재 단계 순서 |
| approvedDate | timestamp with time zone |  | 결재 일시 |
| createdAt | timestamp with time zone | NOT NULL |  |
| updatedAt | timestamp with time zone | NOT NULL |  |
| approverId | String |  | 기본 결재자 ID |
| documentId | String | NOT NULL | 문서 ID |

### documents

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| documentId | uuid | PK, NOT NULL |  |
| title | String | NOT NULL | 문서 제목 |
| documentNumber | String |  | 문서 번호 |
| content | text | NOT NULL | 문서 내용 |
| retentionPeriod | String |  | 보존 연한 (ex. 10년, 영구보관) |
| retentionPeriodUnit | String |  | 보존 연한 단위 (ex. 년, 월, 일) |
| retentionStartDate | Date |  | 보존 연한 시작일 |
| retentionEndDate | Date |  | 보존 연한 종료일 |
| createdAt | timestamp with time zone | NOT NULL |  |
| updatedAt | timestamp with time zone | NOT NULL |  |
| deletedAt | timestamp with time zone | NOT NULL |  |
| employeeId | String |  |  |
| documentFormId | String |  |  |
| parentDocumentId | String |  |  |

### employees

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| employeeId | uuid | PK, NOT NULL |  |
| name | String | NOT NULL | 이름 |
| employeeNumber | String | NOT NULL | 사번 |
| email | String |  | 이메일 |
| department | String |  | 부서 |
| position | String |  | 직책 |
| rank | String |  | 직급 |

## 관계 정보

### form-approval-steps 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| many-to-one | () => employee_entity_1.Employee |  |
| many-to-one | () => form_approval_line_entity_1.FormApprovalLine |  |

### form-approval-lines 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| many-to-one | () => document_form_entity_1.DocumentForm |  |
| one-to-many | () => form_approval_step_entity_1.FormApprovalStep |  |

### document-forms 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| one-to-many | () => document_entity_1.Document |  |
| one-to-many | () => form_approval_line_entity_1.FormApprovalLine |  |

### files 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| many-to-one | () => document_entity_1.Document |  |

### approval-steps 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| many-to-one | () => employee_entity_1.Employee |  |
| many-to-one | () => document_entity_1.Document |  |

### documents 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| many-to-one | () => employee_entity_1.Employee |  |
| many-to-one | () => document_form_entity_1.DocumentForm |  |
| one-to-many | () => approval_step_entity_1.ApprovalStep |  |
| many-to-one | () => Document |  |
| one-to-many | () => Document |  |
| one-to-many | () => file_entity_1.File |  |

### employees 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| one-to-many | () => document_entity_1.Document |  |
| one-to-many | () => form_approval_step_entity_1.FormApprovalStep |  |
| one-to-many | () => approval_step_entity_1.ApprovalStep |  |

