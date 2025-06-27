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
      "isApproved": false, // 결재 여부, ✅ Required
      "approvedDate": "", // 결재 일시, ✅ Required
      "isCurrent": false, // 현재 단계 여부, ✅ Required
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
  "currentStep": {
    "type": "", // 결재 단계 타입, ✅ Required
    "order": 0, // 결재 단계 순서, ✅ Required
    "isApproved": false, // 결재 여부, ✅ Required
    "approvedDate": "", // 결재 일시, ✅ Required
    "isCurrent": false, // 현재 단계 여부, ✅ Required
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
  }, // ❌ Optional
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

### 결재 문서 조회

- **Method:** `GET`
- **Endpoint:** `/api/approval/documents`

#### 🟣 Query Parameters

```json
{
  "page": 0 // ❌ Optional 페이지 번호 (1부터 시작)
,
  "limit": 0 // ❌ Optional 한 페이지당 항목 수
,
  "listType": "drafted" // ✅ Required 결재 문서 조회 타입 (drafted,pending_approval,pending_agreement,approved,rejected,received_reference,implementation)

}
```

#### Responses

##### 🟢 200 - 결재선을 성공적으로 수정했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "items": [
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
            "isApproved": false, // 결재 여부, ✅ Required
            "approvedDate": "", // 결재 일시, ✅ Required
            "isCurrent": false, // 현재 단계 여부, ✅ Required
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
        "currentStep": {
          "type": "", // 결재 단계 타입, ✅ Required
          "order": 0, // 결재 단계 순서, ✅ Required
          "isApproved": false, // 결재 여부, ✅ Required
          "approvedDate": "", // 결재 일시, ✅ Required
          "isCurrent": false, // 현재 단계 여부, ✅ Required
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
        }, // ❌ Optional
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
    ], // ❌ Optional
    "meta": {
      "total": 100, // 전체 아이템 수, ✅ Required
      "page": 1, // 현재 페이지 번호, ❌ Optional
      "limit": 20, // 페이지당 아이템 수, ❌ Optional
      "hasNext": true // 다음 페이지 존재 여부, ❌ Optional
    } // ❌ Optional
  }, // ✅ Required
  "message": "성공적으로 처리되었습니다." // 성공 메시지, ❌ Optional
}
```

##### 🔴 400 - 잘못된 요청입니다.

**Content Type:** `application/json`

```json
{
  "success": false,
  "statusCode": 400,
  "message": "잘못된 요청입니다."
}
```

##### 🔴 401 - 인증되지 않은 요청입니다.

##### 🔴 403 - 권한이 없습니다.

##### 🔴 404 - 리소스를 찾을 수 없습니다.

##### 🔴 409 - 중복된 리소스입니다.

##### 🔴 500 - 서버 에러가 발생했습니다.

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

### 랜덤 문서 생성

랜덤한 사용자들이 랜덤한 기안문서를 상신한 데이터를 생성합니다.

- **Method:** `POST`
- **Endpoint:** `/api/approval/api/v2/approval/random-documents`

#### 🟣 Query Parameters

```json
{
  "count": 0 // ❌ Optional 생성할 문서 개수 (기본값: 20)

}
```

#### Responses

##### 🟢 201 - 랜덤 문서 생성 성공

##### 🔴 500 - 서버 오류

---

### 랜덤 문서 삭제

생성된 랜덤 문서들을 모두 삭제합니다.

- **Method:** `DELETE`
- **Endpoint:** `/api/approval/api/v2/approval/random-documents`

#### Responses

##### 🟢 200 - 랜덤 문서 삭제 성공

##### 🔴 500 - 서버 오류

---

