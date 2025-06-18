# [사용자 API] Form-types

### 문서양식분류 생성

- **Method:** `POST`
- **Endpoint:** `/api/form-types`

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
- **Endpoint:** `/api/form-types`

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
- **Endpoint:** `/api/form-types/{id}`

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
- **Endpoint:** `/api/form-types/{id}`

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
  "documentNumberCode": "VAC-001" // 문서 번호 코드 (ex. 휴가, 출결, 출장 등), ❌ Optional
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
- **Endpoint:** `/api/form-types/{id}`

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

