# [사용자 API] Approval-lines

### 결재선 생성

- **Method:** `POST`
- **Endpoint:** `/api/approval-lines`

#### 🟠 Request Body

**Content Type:** `application/json`

```json
{
  "name": "결재선 1", // 결재선 이름, ✅ Required
  "description": "결재선 1 설명", // 결재선 설명, ❌ Optional
  "formApprovalSteps": {
    "type": "결재", // 결재 단계 타입, ✅ Required
    "order": 1, // 결재 단계 순서, ✅ Required
    "approverType": "USER", // 결재자 지정 방식, ✅ Required
    "approverValue": "1", // 결재자 지정 값, ✅ Required
    "departmentScopeType": "SELECTED", // DEPARTMENT_POSITION인 경우 부서 범위 타입, ❌ Optional
    "conditionExpression": [object Object], // 결재 단계 조건 표현식, ❌ Optional
    "isMandatory": true, // 결재 단계 필수 여부, ✅ Required
    "defaultApproverId": "1" // 기본 결재자 ID, ❌ Optional
  } // ✅ Required
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
    "formApprovalSteps": {
      "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
      "type": "결재", // 결재선 단계 타입, ✅ Required
      "order": 1, // 결재선 단계 순서, ✅ Required
      "approverType": "USER", // 결재자 지정 방식, ✅ Required
      "approverValue": "1", // 결재자 지정 값, ✅ Required
      "departmentScopeType": "SELECTED", // DEPARTMENT_POSITION인 경우 부서 범위 타입, ✅ Required
      "conditionExpression": [object Object], // 결재 단계 조건 표현식, ✅ Required
      "isMandatory": true, // 결재 단계 필수 여부, ✅ Required
      "defaultApprover": {
        "employeeId": "1", // 결재자 ID, ✅ Required
        "name": "홍길동", // 결재자 이름, ✅ Required
        "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
        "department": "1234567890", // 결재자 부서, ✅ Required
        "position": "1234567890", // 결재자 직책, ✅ Required
        "rank": "1234567890" // 결재자 직급, ✅ Required
      } // ✅ Required
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

### 결재선 목록 조회

- **Method:** `GET`
- **Endpoint:** `/api/approval-lines`

#### Responses

##### 🟢 200 - 결재선 목록을 성공적으로 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": [
    {
      "formApprovalLineId": "1", // 결재선 ID, ✅ Required
      "name": "결재선 1", // 결재선 이름, ✅ Required
      "description": "결재선 1 설명", // 결재선 설명, ✅ Required
      "type": "COMMON", // 결재선 타입, ✅ Required
      "isActive": true, // 결재선 사용 여부, ✅ Required
      "order": 1, // 결재선 정렬 순서, ✅ Required
      "createdAt": "2021-01-01", // 결재선 생성일, ✅ Required
      "updatedAt": "2021-01-01", // 결재선 수정일, ✅ Required
      "formApprovalSteps": {
        "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
        "type": "결재", // 결재선 단계 타입, ✅ Required
        "order": 1, // 결재선 단계 순서, ✅ Required
        "approverType": "USER", // 결재자 지정 방식, ✅ Required
        "approverValue": "1", // 결재자 지정 값, ✅ Required
        "departmentScopeType": "SELECTED", // DEPARTMENT_POSITION인 경우 부서 범위 타입, ✅ Required
        "conditionExpression": [object Object], // 결재 단계 조건 표현식, ✅ Required
        "isMandatory": true, // 결재 단계 필수 여부, ✅ Required
        "defaultApprover": {
          "employeeId": "1", // 결재자 ID, ✅ Required
          "name": "홍길동", // 결재자 이름, ✅ Required
          "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
          "department": "1234567890", // 결재자 부서, ✅ Required
          "position": "1234567890", // 결재자 직책, ✅ Required
          "rank": "1234567890" // 결재자 직급, ✅ Required
        } // ✅ Required
      } // ✅ Required
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

### 결재선 상세 조회

- **Method:** `GET`
- **Endpoint:** `/api/approval-lines/{id}`

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
    "formApprovalSteps": {
      "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
      "type": "결재", // 결재선 단계 타입, ✅ Required
      "order": 1, // 결재선 단계 순서, ✅ Required
      "approverType": "USER", // 결재자 지정 방식, ✅ Required
      "approverValue": "1", // 결재자 지정 값, ✅ Required
      "departmentScopeType": "SELECTED", // DEPARTMENT_POSITION인 경우 부서 범위 타입, ✅ Required
      "conditionExpression": [object Object], // 결재 단계 조건 표현식, ✅ Required
      "isMandatory": true, // 결재 단계 필수 여부, ✅ Required
      "defaultApprover": {
        "employeeId": "1", // 결재자 ID, ✅ Required
        "name": "홍길동", // 결재자 이름, ✅ Required
        "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
        "department": "1234567890", // 결재자 부서, ✅ Required
        "position": "1234567890", // 결재자 직책, ✅ Required
        "rank": "1234567890" // 결재자 직급, ✅ Required
      } // ✅ Required
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

### 결재선 수정

- **Method:** `PATCH`
- **Endpoint:** `/api/approval-lines/{id}`

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
  "formApprovalSteps": {
    "type": "결재", // 결재 단계 타입, ✅ Required
    "order": 1, // 결재 단계 순서, ✅ Required
    "approverType": "USER", // 결재자 지정 방식, ✅ Required
    "approverValue": "1", // 결재자 지정 값, ✅ Required
    "departmentScopeType": "SELECTED", // DEPARTMENT_POSITION인 경우 부서 범위 타입, ❌ Optional
    "conditionExpression": [object Object], // 결재 단계 조건 표현식, ❌ Optional
    "isMandatory": true, // 결재 단계 필수 여부, ✅ Required
    "defaultApproverId": "1" // 기본 결재자 ID, ❌ Optional
  } // ❌ Optional
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
    "formApprovalSteps": {
      "formApprovalStepId": "1", // 결재선 단계 ID, ✅ Required
      "type": "결재", // 결재선 단계 타입, ✅ Required
      "order": 1, // 결재선 단계 순서, ✅ Required
      "approverType": "USER", // 결재자 지정 방식, ✅ Required
      "approverValue": "1", // 결재자 지정 값, ✅ Required
      "departmentScopeType": "SELECTED", // DEPARTMENT_POSITION인 경우 부서 범위 타입, ✅ Required
      "conditionExpression": [object Object], // 결재 단계 조건 표현식, ✅ Required
      "isMandatory": true, // 결재 단계 필수 여부, ✅ Required
      "defaultApprover": {
        "employeeId": "1", // 결재자 ID, ✅ Required
        "name": "홍길동", // 결재자 이름, ✅ Required
        "employeeNumber": "1234567890", // 결재자 사번, ✅ Required
        "department": "1234567890", // 결재자 부서, ✅ Required
        "position": "1234567890", // 결재자 직책, ✅ Required
        "rank": "1234567890" // 결재자 직급, ✅ Required
      } // ✅ Required
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

### 결재선 삭제

- **Method:** `DELETE`
- **Endpoint:** `/api/approval-lines/{id}`

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

