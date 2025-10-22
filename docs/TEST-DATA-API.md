# 테스트 데이터 API 문서

## 📋 개요

개발 및 테스트 환경에서 결재 시스템의 다양한 시나리오를 테스트할 수 있도록 샘플 데이터를 생성하고 삭제하는 API입니다.

**⚠️ 중요:** 이 API는 개발/테스트 환경에서만 사용해야 합니다.

---

## 🎯 Base URL

```
/v2/test-data
```

---

## 🔐 인증

모든 API는 JWT 인증이 필요합니다.

```
Authorization: Bearer {JWT_TOKEN}
```

---

## 📡 API 목록

### 1. JWT 액세스 토큰 생성

```
POST /v2/test-data/token
```

#### 설명

테스트 목적으로 JWT 액세스 토큰을 생성합니다. 직원번호 또는 이메일을 입력하여 해당 직원의 토큰을 발급받을 수 있습니다.

**⚠️ 주의:** 이 API는 인증이 필요하지 않습니다.

#### Request

```http
POST /v2/test-data/token
Content-Type: application/json
```

**Body:**

```json
{
    "employeeNumber": "20230001"
}
```

또는

```json
{
    "email": "user@company.com"
}
```

#### Response (200 OK)

```json
{
    "success": true,
    "message": "JWT 토큰이 생성되었습니다.",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "employee": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "employeeNumber": "20230001",
        "name": "홍길동",
        "email": "hong@company.com"
    }
}
```

#### Response Codes

- `200`: JWT 토큰 생성 성공
- `400`: 잘못된 요청 (직원번호 또는 이메일 누락)
- `404`: 직원을 찾을 수 없음

---

### 2. 테스트 데이터 생성

```
POST /v2/test-data
```

#### 설명

다양한 시나리오의 테스트 데이터를 일괄 생성합니다.

#### 생성되는 데이터

**문서양식 (3개)**

- 지출 결의서
- 예산 신청서
- 구매 요청서

**결재선 템플릿 (3개)**

- 간단한 2단계 결재선
- 복잡한 4단계 결재선 (협의 + 결재 + 시행)
- 협의 중심 결재선

**문서 (6개 - 다양한 상태)**

- DRAFT (임시저장): 1개
- PENDING (결재 대기): 2개 (1개는 1단계 승인 완료)
- REJECTED (반려): 1개
- APPROVED (승인 완료): 1개
- CANCELLED (취소): 1개

#### Request

```http
POST /v2/test-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body**: 없음 (JWT 토큰에서 사용자 정보 자동 추출)

#### Response (201 Created)

```json
{
    "success": true,
    "message": "테스트 데이터가 생성되었습니다.",
    "data": {
        "forms": [
            "550e8400-e29b-41d4-a716-446655440000",
            "550e8400-e29b-41d4-a716-446655440001",
            "550e8400-e29b-41d4-a716-446655440002"
        ],
        "formVersions": [
            "660e8400-e29b-41d4-a716-446655440000",
            "660e8400-e29b-41d4-a716-446655440001",
            "660e8400-e29b-41d4-a716-446655440002"
        ],
        "documents": [
            "770e8400-e29b-41d4-a716-446655440000",
            "770e8400-e29b-41d4-a716-446655440001",
            "770e8400-e29b-41d4-a716-446655440002",
            "770e8400-e29b-41d4-a716-446655440003",
            "770e8400-e29b-41d4-a716-446655440004",
            "770e8400-e29b-41d4-a716-446655440005"
        ],
        "approvalLineTemplates": [
            "880e8400-e29b-41d4-a716-446655440000",
            "880e8400-e29b-41d4-a716-446655440001",
            "880e8400-e29b-41d4-a716-446655440002"
        ],
        "approvalLineTemplateVersions": [
            "990e8400-e29b-41d4-a716-446655440000",
            "990e8400-e29b-41d4-a716-446655440001",
            "990e8400-e29b-41d4-a716-446655440002"
        ],
        "approvalStepTemplates": [
            "aa0e8400-e29b-41d4-a716-446655440000",
            "aa0e8400-e29b-41d4-a716-446655440001",
            "..."
        ],
        "approvalLineSnapshots": [
            "bb0e8400-e29b-41d4-a716-446655440000",
            "bb0e8400-e29b-41d4-a716-446655440001",
            "..."
        ],
        "approvalStepSnapshots": ["cc0e8400-e29b-41d4-a716-446655440000", "cc0e8400-e29b-41d4-a716-446655440001", "..."]
    }
}
```

#### Response Codes

- `201`: 테스트 데이터 생성 성공
- `400`: 잘못된 요청 (직원 정보 또는 부서 정보 없음)
- `401`: 인증 실패 (JWT 토큰 없음 또는 유효하지 않음)

---

### 3. 테스트 데이터 삭제 (특정 데이터)

```
DELETE /v2/test-data
```

#### 설명

생성 시 받은 ID 목록을 제공하여 특정 테스트 데이터를 삭제합니다.

#### Request

```http
DELETE /v2/test-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**

```json
{
    "forms": ["form-id-1", "form-id-2", "form-id-3"],
    "formVersions": ["version-id-1", "version-id-2", "version-id-3"],
    "documents": ["doc-id-1", "doc-id-2", "doc-id-3", "doc-id-4", "doc-id-5", "doc-id-6"],
    "approvalLineTemplates": ["template-id-1", "template-id-2", "template-id-3"],
    "approvalLineTemplateVersions": ["version-id-1", "version-id-2", "version-id-3"],
    "approvalStepTemplates": ["step-id-1", "step-id-2", "..."],
    "approvalLineSnapshots": ["snapshot-id-1", "snapshot-id-2", "..."],
    "approvalStepSnapshots": ["step-snapshot-id-1", "step-snapshot-id-2", "..."]
}
```

#### Response (200 OK)

```json
{
    "success": true,
    "message": "테스트 데이터가 삭제되었습니다."
}
```

#### Response Codes

- `200`: 테스트 데이터 삭제 성공
- `400`: 잘못된 요청
- `401`: 인증 실패

---

### 4. 모든 테스트 데이터 삭제

```
DELETE /v2/test-data/all
```

#### 설명

`metadata.testData: true`가 설정된 모든 테스트 문서를 찾아서 삭제합니다.

#### Request

```http
DELETE /v2/test-data/all
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body**: 없음

#### Response (200 OK)

```json
{
    "success": true,
    "message": "6개의 테스트 문서가 삭제되었습니다."
}
```

#### Response Codes

- `200`: 모든 테스트 데이터 삭제 성공
- `401`: 인증 실패

---

## 📊 생성된 데이터 구조

### 간단한 2단계 결재선

```
지출 결의서
  └─ 간단한 2단계 결재선
       ├─ 1단계: 고정 결재자 (APPROVAL)
       └─ 2단계: 부서장 (APPROVAL)
```

### 복잡한 4단계 결재선

```
예산 신청서
  └─ 복잡한 4단계 결재선
       ├─ 1단계: 사전 협의 (AGREEMENT)
       ├─ 2단계: 1차 결재 (APPROVAL)
       ├─ 3단계: 2차 결재 - 부서장 (APPROVAL)
       └─ 4단계: 시행 처리 (IMPLEMENTATION)
```

### 협의 중심 결재선

```
구매 요청서
  └─ 협의 중심 결재선
       ├─ 1단계: 협의 A (AGREEMENT)
       ├─ 2단계: 협의 B (AGREEMENT)
       └─ 3단계: 최종 결재 - 부서장 (APPROVAL)
```

---

## 🔄 데이터 생명주기

```
1. POST /v2/test-data
   ↓
   [테스트 데이터 생성]
   - 3개 문서양식 + 결재선
   - 6개 문서 (다양한 상태)
   ↓
2. 개발/테스트 진행
   - API 테스트
   - 기능 검증
   ↓
3. DELETE /v2/test-data 또는 DELETE /v2/test-data/all
   ↓
   [테스트 데이터 삭제]
   - 외래키 제약 고려하여 역순 삭제
   - 스냅샷 → 문서 → 양식 → 템플릿
```

---

## 💡 사용 예시

### cURL 예시

```bash
# 1. JWT 토큰 생성 (직원번호로)
curl -X POST http://localhost:3000/v2/test-data/token \
  -H "Content-Type: application/json" \
  -d '{"employeeNumber": "20230001"}'

# 2. JWT 토큰 생성 (이메일로)
curl -X POST http://localhost:3000/v2/test-data/token \
  -H "Content-Type: application/json" \
  -d '{"email": "user@company.com"}'

# 3. 테스트 데이터 생성
curl -X POST http://localhost:3000/v2/test-data \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"

# 4. 모든 테스트 데이터 삭제
curl -X DELETE http://localhost:3000/v2/test-data/all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### JavaScript/TypeScript 예시

```typescript
// 1. JWT 토큰 생성
const tokenResponse = await fetch('http://localhost:3000/v2/test-data/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        employeeNumber: '20230001',
    }),
});

const { accessToken } = await tokenResponse.json();
console.log('생성된 토큰:', accessToken);

// 2. 테스트 데이터 생성
const createResponse = await fetch('http://localhost:3000/v2/test-data', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
});

const { data } = await createResponse.json();
console.log('생성된 데이터 ID:', data);

// 3. 나중에 삭제
await fetch('http://localhost:3000/v2/test-data', {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});
```

### E2E 테스트 예시

```typescript
describe('Approval System E2E', () => {
    let testDataIds;
    let authToken;

    beforeAll(async () => {
        // 1. JWT 토큰 생성
        const tokenResponse = await request(app.getHttpServer())
            .post('/v2/test-data/token')
            .send({ employeeNumber: '20230001' })
            .expect(200);

        authToken = tokenResponse.body.accessToken;

        // 2. 테스트 데이터 생성
        const response = await request(app.getHttpServer())
            .post('/v2/test-data')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(201);

        testDataIds = response.body.data;
    });

    afterAll(async () => {
        // 테스트 데이터 삭제
        await request(app.getHttpServer())
            .delete('/v2/test-data')
            .set('Authorization', `Bearer ${authToken}`)
            .send(testDataIds)
            .expect(200);
    });

    it('should handle document approval flow', async () => {
        // 테스트 코드
        const document = await findDocumentByStatus('PENDING');
        // ...
    });
});
```

---

## 🎯 테스트 가능한 시나리오

생성된 데이터로 다음 시나리오를 테스트할 수 있습니다:

### 문서 관리

- ✅ 문서 임시저장 (DRAFT)
- ✅ 문서 제출 및 스냅샷 생성
- ✅ 문서 취소 (CANCELLED)
- ✅ 상태별 문서 조회

### 결재 프로세스

- ✅ 결재 승인 (단계별)
- ✅ 결재 반려
- ✅ 부분 승인 상태 확인
- ✅ 완전 승인 상태 확인

### 협의 프로세스

- ✅ 협의 의견 작성
- ✅ 협의 완료 처리
- ✅ 협의 완료 후 결재 진행

### 시행 프로세스

- ✅ 시행 대기
- ✅ 시행 완료 처리

### 결재선 관리

- ✅ 다양한 패턴의 결재선 테스트
- ✅ AssigneeRule 해석 (FIXED, DEPARTMENT_HEAD 등)
- ✅ 스냅샷 동결 검증

---

## ⚠️ 주의사항

### 1. 환경 제한

- **개발/테스트 환경에서만 사용**하세요.
- 운영 환경에서는 이 API를 비활성화해야 합니다.

### 2. 데이터 정리

- 테스트 후 반드시 데이터를 삭제하세요.
- `DELETE /v2/test-data/all`을 사용하면 편리합니다.

### 3. 인증 필수

- 모든 API는 JWT 인증이 필요합니다.
- 유효한 직원 정보와 부서 정보가 있어야 합니다.

### 4. 외래키 제약

- 삭제 시 외래키 제약을 고려하여 역순으로 삭제됩니다.
- 수동 삭제 시 순서를 지켜야 합니다.

### 5. 메타데이터

- 모든 생성된 문서는 `metadata.testData: true`가 설정됩니다.
- 이를 통해 테스트 데이터를 구별할 수 있습니다.

---

## 🔧 운영 환경 비활성화

운영 환경에서 이 모듈을 비활성화하는 방법:

```typescript
// app.module.ts
@Module({
    imports: [
        // 개발 환경에서만 활성화
        ...(process.env.NODE_ENV !== 'production' ? [TestDataBusinessModule] : []),
    ],
})
export class AppModule {}
```

또는 환경변수 기반 제어:

```typescript
// app.module.ts
@Module({
    imports: [...(process.env.ENABLE_TEST_DATA === 'true' ? [TestDataBusinessModule] : [])],
})
export class AppModule {}
```

---

## 📝 문서 버전

- **버전**: 1.0.0
- **최종 수정일**: 2025-10-21
- **작성자**: LIAS Development Team
