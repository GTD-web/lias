# [사용자 API] Document

### 결재선 생성

- **Method:** `POST`
- **Endpoint:** `/api/document/approval-lines`

#### 🟠 Request Body

**Content Type:** `application/json`

```json
{
  "name": "결재선 1", // 결재선 이름, ✅ Required
  "description": "결재선 1 설명", // 결재선 설명, ❌ Optional
  "type": "COMMON", // 결재 라인 타입 (COMMON: 공통, CUSTOM: 개인화), ✅ Required
  "formApprovalSteps": [
    {
      "type": "결재", // 결재 단계 타입, ✅ Required
      "order": 1, // 결재 단계 순서, ✅ Required
      "defaultApproverId": "uuid" // 기본 결재자 ID, ❌ Optional
    }
  ] // 결재선 단계, ✅ Required
}
```

#### Responses

##### 🟢 200 - 결재선을 성공적으로 생성했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "formApprovalLineId": "1", // 결재선 ID, ✅ Required
    "name": "결재선 1", // 결재선 이름, ✅ Required
    "description": "결재선 1 설명", // 결재선 설명, ✅ Required
    "type": "COMMON", // 결재선 타입, ✅ Required
    "isActive": true, // 결재선 사용 여부, ✅ Required
    "order": 1, // 결재선 정렬 순서, ✅ Required
    "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
    "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
    "formApprovalSteps": [
      {
        "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
        "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
        "order": 1, // 결재선 단계 순서, ✅ Required
        "defaultApprover": {
          "employeeId": "1", // 결재자 ID, ✅ Required
          "name": "홍길동", // 결재자 이름, ✅ Required
          "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
          "department": "1234567890", // 결재자 부서, ✅ Required
          "position": "1234567890", // 결재자 직책, ✅ Required
          "rank": "1234567890" // 결재자 직급, ✅ Required
        } // ✅ Required
      }
    ] // 결재선 단계, ✅ Required
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

### 결재선 목록 조회

- **Method:** `GET`
- **Endpoint:** `/api/document/approval-lines`

#### 🟣 Query Parameters

```json
{
  "page": 1 // ❌ Optional 페이지 번호
,
  "limit": 10 // ❌ Optional 페이지당 아이템 수
,
  "type": "COMMON" // ❌ Optional 결재선 타입

}
```

#### Responses

##### 🟢 200 - 결재선 목록을 성공적으로 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "items": [    "items": [
      {
        "formApprovalLineId": "1", // 결재선 ID, ✅ Required
        "name": "결재선 1", // 결재선 이름, ✅ Required
        "description": "결재선 1 설명", // 결재선 설명, ✅ Required
        "type": "COMMON", // 결재선 타입, ✅ Required
        "isActive": true, // 결재선 사용 여부, ✅ Required
        "order": 1, // 결재선 정렬 순서, ✅ Required
        "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
        "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
        "formApprovalSteps": [
          {
            "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
            "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
            "order": 1, // 결재선 단계 순서, ✅ Required
            "defaultApprover": {
              "employeeId": "1", // 결재자 ID, ✅ Required
              "name": "홍길동", // 결재자 이름, ✅ Required
              "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
              "department": "1234567890", // 결재자 부서, ✅ Required
              "position": "1234567890", // 결재자 직책, ✅ Required
              "rank": "1234567890" // 결재자 직급, ✅ Required
            } // ✅ Required
          }
        ] // 결재선 단계, ✅ Required
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

### 결재선 상세 조회

- **Method:** `GET`
- **Endpoint:** `/api/document/approval-lines/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 결재선을 성공적으로 상세 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "formApprovalLineId": "1", // 결재선 ID, ✅ Required
    "name": "결재선 1", // 결재선 이름, ✅ Required
    "description": "결재선 1 설명", // 결재선 설명, ✅ Required
    "type": "COMMON", // 결재선 타입, ✅ Required
    "isActive": true, // 결재선 사용 여부, ✅ Required
    "order": 1, // 결재선 정렬 순서, ✅ Required
    "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
    "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
    "formApprovalSteps": [
      {
        "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
        "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
        "order": 1, // 결재선 단계 순서, ✅ Required
        "defaultApprover": {
          "employeeId": "1", // 결재자 ID, ✅ Required
          "name": "홍길동", // 결재자 이름, ✅ Required
          "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
          "department": "1234567890", // 결재자 부서, ✅ Required
          "position": "1234567890", // 결재자 직책, ✅ Required
          "rank": "1234567890" // 결재자 직급, ✅ Required
        } // ✅ Required
      }
    ] // 결재선 단계, ✅ Required
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

### 결재선 수정

- **Method:** `PATCH`
- **Endpoint:** `/api/document/approval-lines/{id}`

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
  "name": "결재선 1", // 결재선 이름, ❌ Optional
  "description": "결재선 1 설명", // 결재선 설명, ❌ Optional
  "type": "COMMON", // 결재 라인 타입 (COMMON: 공통, CUSTOM: 개인화), ❌ Optional
  "formApprovalLineId": "uuid", // 결재선 ID, ✅ Required
  "formApprovalSteps": [
    {
      "type": "결재", // 결재 단계 타입, ✅ Required
      "order": 1, // 결재 단계 순서, ✅ Required
      "defaultApproverId": "uuid" // 기본 결재자 ID, ❌ Optional
    }
  ] // 결재선 단계, ✅ Required
}
```

#### Responses

##### 🟢 200 - 결재선을 성공적으로 수정했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "formApprovalLineId": "1", // 결재선 ID, ✅ Required
    "name": "결재선 1", // 결재선 이름, ✅ Required
    "description": "결재선 1 설명", // 결재선 설명, ✅ Required
    "type": "COMMON", // 결재선 타입, ✅ Required
    "isActive": true, // 결재선 사용 여부, ✅ Required
    "order": 1, // 결재선 정렬 순서, ✅ Required
    "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
    "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
    "formApprovalSteps": [
      {
        "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
        "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
        "order": 1, // 결재선 단계 순서, ✅ Required
        "defaultApprover": {
          "employeeId": "1", // 결재자 ID, ✅ Required
          "name": "홍길동", // 결재자 이름, ✅ Required
          "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
          "department": "1234567890", // 결재자 부서, ✅ Required
          "position": "1234567890", // 결재자 직책, ✅ Required
          "rank": "1234567890" // 결재자 직급, ✅ Required
        } // ✅ Required
      }
    ] // 결재선 단계, ✅ Required
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

### 결재선 삭제

- **Method:** `DELETE`
- **Endpoint:** `/api/document/approval-lines/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 결재선을 성공적으로 삭제했습니다.

**Content Type:** `application/json`

```json
null
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

### 문서양식분류 생성

- **Method:** `POST`
- **Endpoint:** `/api/document/form-types`

#### 🟠 Request Body

**Content Type:** `application/json`

```json
{
  "name": "VACATION", // 문서 타입 이름, ✅ Required
  "documentNumberCode": "VAC-001" // 문서 번호 코드 (ex. 휴가, 출결, 출장 등), ✅ Required
}
```

#### Responses

##### 🟢 200 - 문서양식분류를 성공적으로 생성했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
    "name": "VACATION", // 문서 타입 이름, ✅ Required
    "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
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

### 문서양식분류 목록 조회

- **Method:** `GET`
- **Endpoint:** `/api/document/form-types`

#### Responses

##### 🟢 200 - 문서양식분류 목록을 성공적으로 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": [
    {
      "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
      "name": "VACATION", // 문서 타입 이름, ✅ Required
      "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
    }
  ], // ✅ Required
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

### 문서양식분류 상세 조회

- **Method:** `GET`
- **Endpoint:** `/api/document/form-types/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 문서양식분류를 성공적으로 상세 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
    "name": "VACATION", // 문서 타입 이름, ✅ Required
    "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
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

### 문서양식분류 수정

- **Method:** `PATCH`
- **Endpoint:** `/api/document/form-types/{id}`

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
  "name": "VACATION", // 문서 타입 이름, ❌ Optional
  "documentNumberCode": "VAC-001", // 문서 번호 코드 (ex. 휴가, 출결, 출장 등), ❌ Optional
  "documentTypeId": "uuid" // 문서 타입 ID, ✅ Required
}
```

#### Responses

##### 🟢 200 - 문서양식분류를 성공적으로 수정했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
    "name": "VACATION", // 문서 타입 이름, ✅ Required
    "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
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

### 문서양식분류 삭제

- **Method:** `DELETE`
- **Endpoint:** `/api/document/form-types/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 문서양식분류를 성공적으로 삭제했습니다.

**Content Type:** `application/json`

```json
null
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

### 문서양식 생성

- **Method:** `POST`
- **Endpoint:** `/api/document/forms`

#### 🟠 Request Body

**Content Type:** `application/json`

```json
{
  "name": "휴가신청서", // 문서 양식 이름, ✅ Required
  "description": "휴가 신청을 위한 문서 양식입니다.", // 문서 양식 설명, ❌ Optional
  "template": "<div>문서 양식 템플릿</div>", // 문서 양식 html, ✅ Required
  "autoFillType": "NONE", // 자동 채우기 타입, ❌ Optional
  "documentTypeId": "uuid", // 문서 양식 타입 ID, ✅ Required
  "formApprovalLineId": "uuid" // 결재선 ID, ❌ Optional
}
```

#### Responses

##### 🟢 200 - 문서양식을 성공적으로 생성했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "documentFormId": "uuid", // 문서 양식 ID, ✅ Required
    "name": "휴가신청서", // 문서 양식 이름, ✅ Required
    "description": "휴가 신청을 위한 문서 양식입니다.", // 문서 양식 설명, ✅ Required
    "template": "<div>문서 양식 템플릿</div>", // 문서 양식 html, ✅ Required
    "autoFillType": "NONE", // 자동 채우기 타입 (NONE, DRAFTER_ONLY, DRAFTER_SUPERIOR), ✅ Required
    "documentType": {
      "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
      "name": "VACATION", // 문서 타입 이름, ✅ Required
      "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
    }, // ✅ Required
    "formApprovalLine": {
      "formApprovalLineId": "1", // 결재선 ID, ✅ Required
      "name": "결재선 1", // 결재선 이름, ✅ Required
      "description": "결재선 1 설명", // 결재선 설명, ✅ Required
      "type": "COMMON", // 결재선 타입, ✅ Required
      "isActive": true, // 결재선 사용 여부, ✅ Required
      "order": 1, // 결재선 정렬 순서, ✅ Required
      "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
      "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
      "formApprovalSteps": [
        {
          "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
          "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
          "order": 1, // 결재선 단계 순서, ✅ Required
          "defaultApprover": {
            "employeeId": "1", // 결재자 ID, ✅ Required
            "name": "홍길동", // 결재자 이름, ✅ Required
            "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
            "department": "1234567890", // 결재자 부서, ✅ Required
            "position": "1234567890", // 결재자 직책, ✅ Required
            "rank": "1234567890" // 결재자 직급, ✅ Required
          } // ✅ Required
        }
      ] // 결재선 단계, ✅ Required
    } // ✅ Required
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

### 문서양식 목록 조회

- **Method:** `GET`
- **Endpoint:** `/api/document/forms`

#### 🟣 Query Parameters

```json
{
  "page": 0 // ❌ Optional 페이지 번호 (1부터 시작)
,
  "limit": 0 // ❌ Optional 한 페이지당 항목 수
,
  "search": "" // ❌ Optional 

}
```

#### Responses

##### 🟢 200 - 문서양식 목록을 성공적으로 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "items": [    "items": [
      {
        "documentFormId": "uuid", // 문서 양식 ID, ✅ Required
        "name": "휴가신청서", // 문서 양식 이름, ✅ Required
        "description": "휴가 신청을 위한 문서 양식입니다.", // 문서 양식 설명, ✅ Required
        "template": "<div>문서 양식 템플릿</div>", // 문서 양식 html, ✅ Required
        "autoFillType": "NONE", // 자동 채우기 타입 (NONE, DRAFTER_ONLY, DRAFTER_SUPERIOR), ✅ Required
        "documentType": {
          "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
          "name": "VACATION", // 문서 타입 이름, ✅ Required
          "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
        }, // ✅ Required
        "formApprovalLine": {
          "formApprovalLineId": "1", // 결재선 ID, ✅ Required
          "name": "결재선 1", // 결재선 이름, ✅ Required
          "description": "결재선 1 설명", // 결재선 설명, ✅ Required
          "type": "COMMON", // 결재선 타입, ✅ Required
          "isActive": true, // 결재선 사용 여부, ✅ Required
          "order": 1, // 결재선 정렬 순서, ✅ Required
          "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
          "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
          "formApprovalSteps": [
            {
              "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
              "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
              "order": 1, // 결재선 단계 순서, ✅ Required
              "defaultApprover": {
                "employeeId": "1", // 결재자 ID, ✅ Required
                "name": "홍길동", // 결재자 이름, ✅ Required
                "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
                "department": "1234567890", // 결재자 부서, ✅ Required
                "position": "1234567890", // 결재자 직책, ✅ Required
                "rank": "1234567890" // 결재자 직급, ✅ Required
              } // ✅ Required
            }
          ] // 결재선 단계, ✅ Required
        } // ✅ Required
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

### 문서양식 상세 조회

- **Method:** `GET`
- **Endpoint:** `/api/document/forms/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 문서양식을 성공적으로 상세 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "documentFormId": "uuid", // 문서 양식 ID, ✅ Required
    "name": "휴가신청서", // 문서 양식 이름, ✅ Required
    "description": "휴가 신청을 위한 문서 양식입니다.", // 문서 양식 설명, ✅ Required
    "template": "<div>문서 양식 템플릿</div>", // 문서 양식 html, ✅ Required
    "autoFillType": "NONE", // 자동 채우기 타입 (NONE, DRAFTER_ONLY, DRAFTER_SUPERIOR), ✅ Required
    "documentType": {
      "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
      "name": "VACATION", // 문서 타입 이름, ✅ Required
      "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
    }, // ✅ Required
    "formApprovalLine": {
      "formApprovalLineId": "1", // 결재선 ID, ✅ Required
      "name": "결재선 1", // 결재선 이름, ✅ Required
      "description": "결재선 1 설명", // 결재선 설명, ✅ Required
      "type": "COMMON", // 결재선 타입, ✅ Required
      "isActive": true, // 결재선 사용 여부, ✅ Required
      "order": 1, // 결재선 정렬 순서, ✅ Required
      "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
      "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
      "formApprovalSteps": [
        {
          "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
          "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
          "order": 1, // 결재선 단계 순서, ✅ Required
          "defaultApprover": {
            "employeeId": "1", // 결재자 ID, ✅ Required
            "name": "홍길동", // 결재자 이름, ✅ Required
            "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
            "department": "1234567890", // 결재자 부서, ✅ Required
            "position": "1234567890", // 결재자 직책, ✅ Required
            "rank": "1234567890" // 결재자 직급, ✅ Required
          } // ✅ Required
        }
      ] // 결재선 단계, ✅ Required
    } // ✅ Required
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

### 문서양식 수정

- **Method:** `PATCH`
- **Endpoint:** `/api/document/forms/{id}`

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
  "name": "휴가신청서", // 문서 양식 이름, ❌ Optional
  "description": "휴가 신청을 위한 문서 양식입니다.", // 문서 양식 설명, ❌ Optional
  "template": "<div>문서 양식 템플릿</div>", // 문서 양식 html, ❌ Optional
  "autoFillType": "NONE", // 자동 채우기 타입, ❌ Optional
  "documentTypeId": "uuid", // 문서 양식 타입 ID, ❌ Optional
  "formApprovalLineId": "uuid", // 결재선 ID, ❌ Optional
  "documentFormId": "uuid" // 문서 양식 ID, ✅ Required
}
```

#### Responses

##### 🟢 200 - 문서양식을 성공적으로 수정했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "documentFormId": "uuid", // 문서 양식 ID, ✅ Required
    "name": "휴가신청서", // 문서 양식 이름, ✅ Required
    "description": "휴가 신청을 위한 문서 양식입니다.", // 문서 양식 설명, ✅ Required
    "template": "<div>문서 양식 템플릿</div>", // 문서 양식 html, ✅ Required
    "autoFillType": "NONE", // 자동 채우기 타입 (NONE, DRAFTER_ONLY, DRAFTER_SUPERIOR), ✅ Required
    "documentType": {
      "documentTypeId": "uuid", // 문서 타입 ID, ✅ Required
      "name": "VACATION", // 문서 타입 이름, ✅ Required
      "documentNumberCode": "VAC-001" // 문서 번호 코드, ✅ Required
    }, // ✅ Required
    "formApprovalLine": {
      "formApprovalLineId": "1", // 결재선 ID, ✅ Required
      "name": "결재선 1", // 결재선 이름, ✅ Required
      "description": "결재선 1 설명", // 결재선 설명, ✅ Required
      "type": "COMMON", // 결재선 타입, ✅ Required
      "isActive": true, // 결재선 사용 여부, ✅ Required
      "order": 1, // 결재선 정렬 순서, ✅ Required
      "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
      "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
      "formApprovalSteps": [
        {
          "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
          "type": "AGREEMENT", // 결재선 단계 타입, AGREEMENT, APPROVAL, IMPLEMENTATION, REFERENCE, ✅ Required
          "order": 1, // 결재선 단계 순서, ✅ Required
          "defaultApprover": {
            "employeeId": "1", // 결재자 ID, ✅ Required
            "name": "홍길동", // 결재자 이름, ✅ Required
            "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
            "department": "1234567890", // 결재자 부서, ✅ Required
            "position": "1234567890", // 결재자 직책, ✅ Required
            "rank": "1234567890" // 결재자 직급, ✅ Required
          } // ✅ Required
        }
      ] // 결재선 단계, ✅ Required
    } // ✅ Required
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

### 문서양식 삭제

- **Method:** `DELETE`
- **Endpoint:** `/api/document/forms/{id}`

#### 🔵 Path Parameters

```json
{
  "id": "" // ✅ Required 

}
```

#### Responses

##### 🟢 200 - 문서양식을 성공적으로 삭제했습니다.

**Content Type:** `application/json`

```json
null
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

