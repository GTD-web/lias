# [사용자 API] Auth

### 로그인

- **Method:** `POST`
- **Endpoint:** `/api/auth/login`

#### 🟠 Request Body

**Content Type:** `application/json`

```json
{
  "email": "kim.kyuhyun@lumir.space", // ✅ Required
  "password": "12341234" // ✅ Required
}
```

#### Responses

##### 🟢 200 - 로그인 성공

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....", // ✅ Required
    "email": "test@lumir.space", // ✅ Required
    "name": "홍길동", // ✅ Required
    "department": "Web 파트", // ✅ Required
    "position": "파트장", // ✅ Required
    "rank": "연구원", // ✅ Required
    "roles": [""] // ✅ Required
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

### 사용자 정보 조회

- **Method:** `GET`
- **Endpoint:** `/api/auth/me`

#### Responses

##### 🟢 200 - 사용자 정보 조회 성공

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": {
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

