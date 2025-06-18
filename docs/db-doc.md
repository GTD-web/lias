# 데이터베이스 설계 문서

import { MermaidDiagram } from '@site/src/components/MermaidDiagram';

## ERD (Entity Relationship Diagram)

<MermaidDiagram
title="database-erd"
chart={`
erDiagram
    file {
        uuid fileId PK
        string fileName 
        string filePath 
        timestamp with time zone createdAt 
        string documentId 
    }
    approvalstep {
        uuid approvalStepId PK
        enum type 
        number order 
        timestamp with time zone approvedDate 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        string approverId 
        string documentId 
    }
    document {
        uuid documentId PK
        string documentNumber 
        string documentType 
        string title 
        text content 
        string status 
        string retentionPeriod 
        string retentionPeriodUnit 
        date retentionStartDate 
        date retentionEndDate 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        string employeeId 
        string parentDocumentId 
    }
    documenttype {
        uuid documentTypeId PK
        string name 
        string documentNumberCode 
    }
    documentform {
        uuid documentFormId PK
        string name 
        string description 
        text template 
        string formApprovalLineId 
        string documentTypeId 
    }
    formapprovalline {
        uuid formApprovalLineId PK
        string name 
        string description 
        enum type 
        boolean isActive 
        number order 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        string employeeId 
    }
    formapprovalstep {
        uuid formApprovalStepId PK
        enum type 
        number order 
        enum approverType 
        string approverValue 
        enum departmentScopeType 
        jsonb conditionExpression 
        boolean isMandatory 
        timestamp with time zone createdAt 
        timestamp with time zone updatedAt 
        string defaultApproverId 
        string formApprovalLineId 
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
    file }|--|| document : belongs_to
    approvalstep }|--|| employee : belongs_to
    approvalstep }|--|| document : belongs_to
    document }|--|| employee : belongs_to
    document ||--o{ approvalstep : has
    document }|--|| document : belongs_to
    document ||--o{ document : has
    document ||--o{ file : has
    documenttype ||--o{ documentform : has
    documentform }|--|| formapprovalline : belongs_to
    documentform }|--|| documenttype : belongs_to
    formapprovalline ||--o{ documentform : has
    formapprovalline }|--|| employee : belongs_to
    formapprovalline ||--o{ formapprovalstep : has
    formapprovalstep }|--|| employee : belongs_to
    formapprovalstep }|--|| formapprovalline : belongs_to
    employee ||--o{ document : has
    employee ||--o{ formapprovalstep : has
    employee ||--o{ approvalstep : has
`}
/>

## 엔티티 상세 정보

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
| type | enum | NOT NULL | 결재 단계 타입 (ex. 합의, 결재, 시행, 참조 등) |
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
| documentNumber | String | NOT NULL, UNIQUE | 문서(품의) 번호 |
| documentType | String | NOT NULL | 문서(품의) 유형 |
| title | String | NOT NULL | 문서 제목 |
| content | text | NOT NULL | 문서 내용 |
| status | String | NOT NULL | 문서 상태 |
| retentionPeriod | String |  | 보존 연한 (ex. 10년, 영구보관) |
| retentionPeriodUnit | String |  | 보존 연한 단위 (ex. 년, 월, 일) |
| retentionStartDate | Date |  | 보존 연한 시작일 |
| retentionEndDate | Date |  | 보존 연한 종료일 |
| createdAt | timestamp with time zone | NOT NULL |  |
| updatedAt | timestamp with time zone | NOT NULL |  |
| employeeId | String |  | 기안자 |
| parentDocumentId | String |  |  |

### document-types

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| documentTypeId | uuid | PK, NOT NULL |  |
| name | String | NOT NULL | 문서 타입 이름 |
| documentNumberCode | String | NOT NULL | 문서 번호 코드 (ex. 휴가, 출결, 출신 등 |

### document-forms

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| documentFormId | uuid | PK, NOT NULL |  |
| name | String | NOT NULL | 문서 양식 이름 |
| description | String |  | 문서 양식 설명 |
| template | text | NOT NULL | 문서 양식 html |
| formApprovalLineId | String | NOT NULL | 결재선 ID |
| documentTypeId | String | NOT NULL | 문서 양식 타입 ID |

### form-approval-lines

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| formApprovalLineId | uuid | PK, NOT NULL |  |
| name | String | NOT NULL | 결재 라인 이름 |
| description | String |  | 결재 라인 설명 |
| type | enum | NOT NULL | 결재 라인 타입 (COMMON: 공통, CUSTOM: 개인화) |
| isActive | Boolean | NOT NULL | 결재 라인 사용 여부 |
| order | Number | NOT NULL | 결재 라인 정렬 순서 |
| createdAt | timestamp with time zone | NOT NULL |  |
| updatedAt | timestamp with time zone | NOT NULL |  |
| employeeId | String |  | 개인화된 결재라인의 경우 사용자 ID |

### form-approval-steps

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|-----------|------|
| formApprovalStepId | uuid | PK, NOT NULL |  |
| type | enum | NOT NULL | 결재 단계 타입 (ex. 합의, 결재, 시행, 참조 등) |
| order | Number | NOT NULL | 결재 단계 순서 |
| approverType | enum | NOT NULL | 결재자 지정 방식 (ex. Enum(USER, DEPARTMENT_POSITION, POSITION, TITLE)) |
| approverValue | String | NOT NULL | 결재자 지정 값 (ex.  userId, positionCode, titleCode) |
| departmentScopeType | enum |  | DEPARTMENT_POSITION인 경우 부서 범위 타입  (ex. Enum(SELECTED, DRAFT_OWNER)) |
| conditionExpression | jsonb |  | 결재 단계 조건 표현식 |
| isMandatory | Boolean | NOT NULL | 결재 단계 필수 여부 |
| createdAt | timestamp with time zone | NOT NULL |  |
| updatedAt | timestamp with time zone | NOT NULL |  |
| defaultApproverId | String |  | 기본 결재자 ID |
| formApprovalLineId | String | NOT NULL | 결재 라인 템플릿 ID |

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
| one-to-many | () => approval_step_entity_1.ApprovalStep |  |
| many-to-one | () => Document |  |
| one-to-many | () => Document |  |
| one-to-many | () => file_entity_1.File |  |

### document-types 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| one-to-many | () => document_form_entity_1.DocumentForm |  |

### document-forms 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| many-to-one | () => form_approval_line_entity_1.FormApprovalLine |  |
| many-to-one | () => document_type_entity_1.DocumentType |  |

### form-approval-lines 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| one-to-many | () => document_form_entity_1.DocumentForm |  |
| many-to-one | () => employee_entity_1.Employee |  |
| one-to-many | () => form_approval_step_entity_1.FormApprovalStep |  |

### form-approval-steps 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| many-to-one | () => employee_entity_1.Employee |  |
| many-to-one | () => form_approval_line_entity_1.FormApprovalLine |  |

### employees 관계

| 관계 타입 | 대상 엔티티 | 설명 |
|------------|-------------|------|
| one-to-many | () => document_entity_1.Document |  |
| one-to-many | () => form_approval_step_entity_1.FormApprovalStep |  |
| one-to-many | () => approval_step_entity_1.ApprovalStep |  |

