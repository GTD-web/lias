# [사용자 API] Employees

### 부서별 직원 목록 조회 #사용자/참석자설정/모달

- **Method:** `GET`
- **Endpoint:** `/api/employees/department`

#### Responses

##### 🟢 200 - 부서별 직원 목록을 성공적으로 조회했습니다.

**Content Type:** `application/json`

```json
{
  "success": true, // ✅ Required
  "data": [
    {
      "department": "", // ✅ Required
      "employees": [
        {
          "employeeId": "", // ✅ Required
          "name": "", // ✅ Required
          "employeeNumber": "", // ✅ Required
          "department": "", // ✅ Required
          "position": "" // ✅ Required
        }
      ] // ✅ Required
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

