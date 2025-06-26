# [사용자 API] Approval

### 기안 문서 생성

- **Method:** `POST`
- **Endpoint:** `/api/approval/documents`

#### 🟠 Request Body

**Content Type:** `application/json`

```json
{
  "documentNumber": "", // 문서(품의) 번호, ✅ Required
  "documentType": "", // 문서(품의) 유형, ✅ Required
  "title": "", // 문서 제목, ✅ Required
  "content": "", // 문서 내용, ✅ Required
  "drafterId": "", // 기안자 ID, ❌ Optional
  "approvalSteps": [
    {
      "type": "", // 결재 단계 타입, ✅ Required
      "order": 0, // 결재 단계 순서, ✅ Required
      "approverId": "" // 결재자 ID, ✅ Required
    }
  ], // 결재 단계 정보 객체, ❌ Optional
  "parentDocumentId": "", // 부모 문서 ID, ❌ Optional
  "files": [
    {
      "fileId": "", // 파일 ID, ✅ Required
      "fileName": "", // 파일 이름, ✅ Required
      "filePath": "", // 파일 경로, ✅ Required
      "createdAt": "" // 생성일, ✅ Required
    }
  ] // 파일 정보 객체, ❌ Optional
}
```

#### Responses

##### 🟢 201 - 기안 문서 생성 성공

**Content Type:** `application/json`

```json
{
  "documentId": "", // 기안 ID, ✅ Required
  "documentNumber": "", // 문서 번호, ✅ Required
  "documentType": "", // 문서(품의) 유형, ✅ Required
  "title": "", // 문서 제목, ✅ Required
  "content": "", // 문서 내용, ✅ Required
  "status": "", // 문서 상태, ✅ Required
  "retentionPeriod": "", // 보존 연한, ✅ Required
  "retentionPeriodUnit": "", // 보존 연한 단위, ✅ Required
  "retentionStartDate": "", // 보존 연한 시작일, ✅ Required
  "retentionEndDate": "", // 보존 연한 종료일, ✅ Required
  "implementDate": "", // 시행 일자, ✅ Required
  "createdAt": "", // 생성일, ✅ Required
  "updatedAt": "", // 수정일, ✅ Required
  "drafter": {
    "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
    "name": "홍길동", // ✅ Required
    "employeeNumber": "25001", // ✅ Required
    "email": "hong@lumir.space", // ✅ Required
    "department": "지상-Web", // ✅ Required
    "position": "파트장", // ✅ Required
    "rank": "책임연구원" // ✅ Required
  }, // ✅ Required
  "approvalSteps": [
    {
      "type": "", // 결재 단계 타입, ✅ Required
      "order": 0, // 결재 단계 순서, ✅ Required
      "approvedDate": "", // 결재 일시, ✅ Required
      "createdAt": "", // 생성일, ✅ Required
      "updatedAt": "", // 수정일, ✅ Required
      "approver": {
        "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
        "name": "홍길동", // ✅ Required
        "employeeNumber": "25001", // ✅ Required
        "email": "hong@lumir.space", // ✅ Required
        "department": "지상-Web", // ✅ Required
        "position": "파트장", // ✅ Required
        "rank": "책임연구원" // ✅ Required
      } // ✅ Required
    }
  ], // 결재 단계 정보 객체, ✅ Required
  "parentDocument": {
  }, // Reference to ApprovalResponseDto, ✅ Required
  "files": [
    {
      "fileId": "", // 파일 ID, ✅ Required
      "fileName": "", // 파일 이름, ✅ Required
      "filePath": "", // 파일 경로, ✅ Required
      "createdAt": "" // 생성일, ✅ Required
    }
  ] // 파일, ✅ Required
}
```

---

### 기안 문서 목록 조회

- **Method:** `GET`
- **Endpoint:** `/api/approval/documents`

#### 🟣 Query Parameters

```json
{
  "page": 0 // ❌ Optional 페이지 번호 (1부터 시작)
,
  "limit": 0 // ❌ Optional 한 페이지당 항목 수
,
  "stepType": [] // ❌ Optional AGREEMENT / APPROVAL / IMPLEMENTATION / REFERENCE
,
  "status": [] // ❌ Optional PENDING / APPROVED / REJECTED / CANCELLED

}
```

#### Responses

##### 🟢 200 - 기안 문서 목록 조회 성공

**Content Type:** `application/json`

```json
{
  "documentId": "", // 기안 ID, ✅ Required
  "documentNumber": "", // 문서 번호, ✅ Required
  "documentType": "", // 문서(품의) 유형, ✅ Required
  "title": "", // 문서 제목, ✅ Required
  "content": "", // 문서 내용, ✅ Required
  "status": "", // 문서 상태, ✅ Required
  "retentionPeriod": "", // 보존 연한, ✅ Required
  "retentionPeriodUnit": "", // 보존 연한 단위, ✅ Required
  "retentionStartDate": "", // 보존 연한 시작일, ✅ Required
  "retentionEndDate": "", // 보존 연한 종료일, ✅ Required
  "implementDate": "", // 시행 일자, ✅ Required
  "createdAt": "", // 생성일, ✅ Required
  "updatedAt": "", // 수정일, ✅ Required
  "drafter": {
    "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
    "name": "홍길동", // ✅ Required
    "employeeNumber": "25001", // ✅ Required
    "email": "hong@lumir.space", // ✅ Required
    "department": "지상-Web", // ✅ Required
    "position": "파트장", // ✅ Required
    "rank": "책임연구원" // ✅ Required
  }, // ✅ Required
  "approvalSteps": [
    {
      "type": "", // 결재 단계 타입, ✅ Required
      "order": 0, // 결재 단계 순서, ✅ Required
      "approvedDate": "", // 결재 일시, ✅ Required
      "createdAt": "", // 생성일, ✅ Required
      "updatedAt": "", // 수정일, ✅ Required
      "approver": {
        "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
        "name": "홍길동", // ✅ Required
        "employeeNumber": "25001", // ✅ Required
        "email": "hong@lumir.space", // ✅ Required
        "department": "지상-Web", // ✅ Required
        "position": "파트장", // ✅ Required
        "rank": "책임연구원" // ✅ Required
      } // ✅ Required
    }
  ], // 결재 단계 정보 객체, ✅ Required
  "parentDocument": {
  }, // Reference to ApprovalResponseDto, ✅ Required
  "files": [
    {
      "fileId": "", // 파일 ID, ✅ Required
      "fileName": "", // 파일 이름, ✅ Required
      "filePath": "", // 파일 경로, ✅ Required
      "createdAt": "" // 생성일, ✅ Required
    }
  ] // 파일, ✅ Required
}
```

---

### 기안 문서 조회

- **Method:** `GET`
- **Endpoint:** `/api/approval/documents/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 기안 문서 조회 성공

**Content Type:** `application/json`

```json
{
  "documentId": "", // 기안 ID, ✅ Required
  "documentNumber": "", // 문서 번호, ✅ Required
  "documentType": "", // 문서(품의) 유형, ✅ Required
  "title": "", // 문서 제목, ✅ Required
  "content": "", // 문서 내용, ✅ Required
  "status": "", // 문서 상태, ✅ Required
  "retentionPeriod": "", // 보존 연한, ✅ Required
  "retentionPeriodUnit": "", // 보존 연한 단위, ✅ Required
  "retentionStartDate": "", // 보존 연한 시작일, ✅ Required
  "retentionEndDate": "", // 보존 연한 종료일, ✅ Required
  "implementDate": "", // 시행 일자, ✅ Required
  "createdAt": "", // 생성일, ✅ Required
  "updatedAt": "", // 수정일, ✅ Required
  "drafter": {
    "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
    "name": "홍길동", // ✅ Required
    "employeeNumber": "25001", // ✅ Required
    "email": "hong@lumir.space", // ✅ Required
    "department": "지상-Web", // ✅ Required
    "position": "파트장", // ✅ Required
    "rank": "책임연구원" // ✅ Required
  }, // ✅ Required
  "approvalSteps": [
    {
      "type": "", // 결재 단계 타입, ✅ Required
      "order": 0, // 결재 단계 순서, ✅ Required
      "approvedDate": "", // 결재 일시, ✅ Required
      "createdAt": "", // 생성일, ✅ Required
      "updatedAt": "", // 수정일, ✅ Required
      "approver": {
        "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
        "name": "홍길동", // ✅ Required
        "employeeNumber": "25001", // ✅ Required
        "email": "hong@lumir.space", // ✅ Required
        "department": "지상-Web", // ✅ Required
        "position": "파트장", // ✅ Required
        "rank": "책임연구원" // ✅ Required
      } // ✅ Required
    }
  ], // 결재 단계 정보 객체, ✅ Required
  "parentDocument": {
  }, // Reference to ApprovalResponseDto, ✅ Required
  "files": [
    {
      "fileId": "", // 파일 ID, ✅ Required
      "fileName": "", // 파일 이름, ✅ Required
      "filePath": "", // 파일 경로, ✅ Required
      "createdAt": "" // 생성일, ✅ Required
    }
  ] // 파일, ✅ Required
}
```

---

### 기안 문서 수정

- **Method:** `PATCH`
- **Endpoint:** `/api/approval/documents/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### 🟠 Request Body

**Content Type:** `application/json`

```json
{
  "documentNumber": "", // 문서(품의) 번호, ✅ Required
  "documentType": "", // 문서(품의) 유형, ✅ Required
  "title": "", // 문서 제목, ✅ Required
  "content": "", // 문서 내용, ✅ Required
  "drafterId": "", // 기안자 ID, ❌ Optional
  "approvalSteps": [
    {
      "type": "", // 결재 단계 타입, ✅ Required
      "order": 0, // 결재 단계 순서, ✅ Required
      "approverId": "" // 결재자 ID, ✅ Required
    }
  ], // 결재 단계 정보 객체, ❌ Optional
  "parentDocumentId": "", // 부모 문서 ID, ❌ Optional
  "files": [
    {
      "fileId": "", // 파일 ID, ✅ Required
      "fileName": "", // 파일 이름, ✅ Required
      "filePath": "", // 파일 경로, ✅ Required
      "createdAt": "" // 생성일, ✅ Required
    }
  ] // 파일 정보 객체, ❌ Optional
}
```

#### Responses

##### 🟢 200 - 기안 문서 수정 성공

**Content Type:** `application/json`

```json
{
  "documentId": "", // 기안 ID, ✅ Required
  "documentNumber": "", // 문서 번호, ✅ Required
  "documentType": "", // 문서(품의) 유형, ✅ Required
  "title": "", // 문서 제목, ✅ Required
  "content": "", // 문서 내용, ✅ Required
  "status": "", // 문서 상태, ✅ Required
  "retentionPeriod": "", // 보존 연한, ✅ Required
  "retentionPeriodUnit": "", // 보존 연한 단위, ✅ Required
  "retentionStartDate": "", // 보존 연한 시작일, ✅ Required
  "retentionEndDate": "", // 보존 연한 종료일, ✅ Required
  "implementDate": "", // 시행 일자, ✅ Required
  "createdAt": "", // 생성일, ✅ Required
  "updatedAt": "", // 수정일, ✅ Required
  "drafter": {
    "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
    "name": "홍길동", // ✅ Required
    "employeeNumber": "25001", // ✅ Required
    "email": "hong@lumir.space", // ✅ Required
    "department": "지상-Web", // ✅ Required
    "position": "파트장", // ✅ Required
    "rank": "책임연구원" // ✅ Required
  }, // ✅ Required
  "approvalSteps": [
    {
      "type": "", // 결재 단계 타입, ✅ Required
      "order": 0, // 결재 단계 순서, ✅ Required
      "approvedDate": "", // 결재 일시, ✅ Required
      "createdAt": "", // 생성일, ✅ Required
      "updatedAt": "", // 수정일, ✅ Required
      "approver": {
        "employeeId": "550e8400-e29b-41d4-a716-446655440000", // ✅ Required
        "name": "홍길동", // ✅ Required
        "employeeNumber": "25001", // ✅ Required
        "email": "hong@lumir.space", // ✅ Required
        "department": "지상-Web", // ✅ Required
        "position": "파트장", // ✅ Required
        "rank": "책임연구원" // ✅ Required
      } // ✅ Required
    }
  ], // 결재 단계 정보 객체, ✅ Required
  "parentDocument": {
  }, // Reference to ApprovalResponseDto, ✅ Required
  "files": [
    {
      "fileId": "", // 파일 ID, ✅ Required
      "fileName": "", // 파일 이름, ✅ Required
      "filePath": "", // 파일 경로, ✅ Required
      "createdAt": "" // 생성일, ✅ Required
    }
  ] // 파일, ✅ Required
}
```

---

### 기안 문서 삭제

- **Method:** `DELETE`
- **Endpoint:** `/api/approval/documents/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 204 - 기안 문서 삭제 성공

---

### 결재 승인

- **Method:** `POST`
- **Endpoint:** `/api/approval/{documentId}/approve`

#### 🔵 Path Parameters

```json
{
  "documentId": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 결재 승인 성공

---

### 결재 반려

- **Method:** `POST`
- **Endpoint:** `/api/approval/{documentId}/reject`

#### 🔵 Path Parameters

```json
{
  "documentId": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 결재 반려 성공

---

### 시행

- **Method:** `POST`
- **Endpoint:** `/api/approval/{documentId}/implementation`

#### 🔵 Path Parameters

```json
{
  "documentId": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 시행 성공

---

### 열람

- **Method:** `POST`
- **Endpoint:** `/api/approval/{documentId}/reference`

#### 🔵 Path Parameters

```json
{
  "documentId": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 열람 성공

---

