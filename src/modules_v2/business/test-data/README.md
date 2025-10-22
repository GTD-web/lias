# 테스트 데이터 관리 API

## 개요

개발 및 테스트 환경에서 다양한 시나리오의 결재 시스템 데이터를 생성하고 삭제하는 API입니다.

⚠️ **경고**: 이 API는 개발/테스트 환경에서만 사용해야 합니다. 운영 환경에서는 비활성화하세요.

## 생성되는 데이터

### 1. 결재선 템플릿 (3종)

#### 간단한 2단계 결재선

- 1단계: 고정 결재자
- 2단계: 부서장 결재

#### 복잡한 4단계 결재선

- 1단계: 협의 (고정)
- 2단계: 1차 결재 (고정)
- 3단계: 2차 결재 (부서장)
- 4단계: 시행 (고정)

#### 협의 중심 결재선

- 1단계: 협의 A
- 2단계: 협의 B
- 3단계: 최종 결재 (부서장)

### 2. 문서양식 (3종)

- **지출 결의서** (간단한 2단계 결재선 연결)
- **예산 신청서** (복잡한 4단계 결재선 연결)
- **구매 요청서** (협의 중심 결재선 연결)

### 3. 문서 (6개 - 다양한 상태)

#### DRAFT (임시저장)

- 1개의 임시저장 문서
- 스냅샷 없음

#### PENDING (결재 대기)

- 1개의 새로운 결재 대기 문서
- 1개의 일부 승인된 문서 (1단계 승인 완료)

#### REJECTED (반려)

- 1개의 반려된 문서 (2단계에서 반려)

#### APPROVED (승인 완료)

- 1개의 완전 승인된 문서 (모든 단계 승인)

#### CANCELLED (취소)

- 1개의 취소된 문서

## API 엔드포인트

### 1. JWT 액세스 토큰 생성

```
POST /v2/test-data/token
```

**요청 Body:**

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

**응답 예시:**

```json
{
    "success": true,
    "message": "JWT 토큰이 생성되었습니다.",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "employee": {
        "id": "employee-id",
        "employeeNumber": "20230001",
        "name": "홍길동",
        "email": "hong@company.com"
    }
}
```

**특징:**

- ⚠️ **인증이 필요하지 않습니다**
- 직원번호 또는 이메일 중 하나만 제공하면 됩니다
- 테스트/개발 목적으로만 사용해야 합니다

---

### 2. 테스트 데이터 생성

```
POST /v2/test-data
Authorization: Bearer {JWT_TOKEN}
```

**응답 예시:**

```json
{
  "success": true,
  "message": "테스트 데이터가 생성되었습니다.",
  "data": {
    "forms": ["form-id-1", "form-id-2", "form-id-3"],
    "formVersions": ["version-id-1", "version-id-2", "version-id-3"],
    "documents": [
      "doc-id-1 (DRAFT)",
      "doc-id-2 (PENDING)",
      "doc-id-3 (PENDING - 일부 승인)",
      "doc-id-4 (REJECTED)",
      "doc-id-5 (APPROVED)",
      "doc-id-6 (CANCELLED)"
    ],
    "approvalLineTemplates": ["template-id-1", "template-id-2", "template-id-3"],
    "approvalLineTemplateVersions": ["version-id-1", "version-id-2", "version-id-3"],
    "approvalStepTemplates": ["step-id-1", "step-id-2", ...],
    "approvalLineSnapshots": ["snapshot-id-1", "snapshot-id-2", ...],
    "approvalStepSnapshots": ["step-snapshot-id-1", "step-snapshot-id-2", ...]
  }
}
```

### 3. 특정 테스트 데이터 삭제

```
DELETE /v2/test-data
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**요청 Body:**

```json
{
  "forms": ["form-id-1", "form-id-2", "form-id-3"],
  "formVersions": ["version-id-1", "version-id-2", "version-id-3"],
  "documents": ["doc-id-1", "doc-id-2", ...],
  "approvalLineTemplates": ["template-id-1", "template-id-2", ...],
  "approvalLineTemplateVersions": ["version-id-1", "version-id-2", ...],
  "approvalStepTemplates": ["step-id-1", "step-id-2", ...],
  "approvalLineSnapshots": ["snapshot-id-1", "snapshot-id-2", ...],
  "approvalStepSnapshots": ["step-snapshot-id-1", "step-snapshot-id-2", ...]
}
```

**응답 예시:**

```json
{
    "success": true,
    "message": "테스트 데이터가 삭제되었습니다."
}
```

### 4. 모든 테스트 데이터 삭제

```
DELETE /v2/test-data/all
Authorization: Bearer {JWT_TOKEN}
```

**응답 예시:**

```json
{
    "success": true,
    "message": "6개의 테스트 문서가 삭제되었습니다."
}
```

## 사용 시나리오

### 시나리오 1: 개발 환경 초기 설정

```bash
# 1. JWT 토큰 생성
curl -X POST http://localhost:3000/v2/test-data/token \
  -H "Content-Type: application/json" \
  -d '{"employeeNumber": "20230001"}'

# 2. 테스트 데이터 생성
curl -X POST http://localhost:3000/v2/test-data \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# 3. 개발 및 테스트 진행
# ...

# 4. 필요시 모든 테스트 데이터 삭제
curl -X DELETE http://localhost:3000/v2/test-data/all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 시나리오 2: E2E 테스트

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

    it('should test approval flow', async () => {
        // 테스트 코드...
    });
});
```

## 데이터 구조

생성된 데이터의 연관 관계:

```
Form (3개)
  └─ FormVersion (각 1개)
       ├─ FormVersionApprovalLineTemplateVersion (연결)
       │    └─ ApprovalLineTemplateVersion
       │         └─ ApprovalStepTemplate (여러 개)
       └─ Document (여러 개)
            └─ ApprovalLineSnapshot (PENDING 이상인 경우)
                 └─ ApprovalStepSnapshot (여러 개)
```

## 주의사항

1. **환경 제한**: 개발/테스트 환경에서만 사용하세요.
2. **데이터 정리**: 테스트 후 반드시 데이터를 삭제하세요.
3. **JWT 인증**: 모든 API는 인증이 필요합니다.
4. **외래키 제약**: 삭제 시 외래키 제약을 고려하여 역순으로 삭제됩니다.
5. **메타데이터**: 모든 생성된 문서는 `metadata.testData: true`가 설정됩니다.

## 테스트 가능한 시나리오

생성된 데이터로 다음 시나리오를 테스트할 수 있습니다:

- ✅ 문서 임시저장
- ✅ 문서 제출 (스냅샷 생성)
- ✅ 결재 승인 (단계별)
- ✅ 결재 반려
- ✅ 문서 취소
- ✅ 협의 프로세스
- ✅ 시행 프로세스
- ✅ 부분 승인 상태
- ✅ 완전 승인 상태
- ✅ 다양한 결재선 패턴

## 운영 환경 비활성화

운영 환경에서는 이 모듈을 비활성화하세요:

```typescript
// app.module.ts
@Module({
    imports: [
        // 개발 환경에서만 TestDataBusinessModule 활성화
        ...(process.env.NODE_ENV !== 'production' ? [TestDataBusinessModule] : []),
    ],
})
export class AppModule {}
```
