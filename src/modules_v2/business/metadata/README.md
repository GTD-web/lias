# Metadata Business Module (v2)

외부 SSO API에서 메타데이터를 가져와 동기화하는 비즈니스 모듈입니다.

## 구조

```
metadata/
├── controllers/
│   └── metadata.controller.ts           # API 엔드포인트
├── usecases/
│   └── sync-all-metadata.usecase.ts     # 비즈니스 로직
├── services/
│   └── external-metadata.service.ts     # 외부 API 호출
├── dtos/
│   └── sync-metadata.dto.ts             # 응답 DTO
├── metadata.module.ts                   # 모듈 설정
└── README.md                            # 문서
```

## 동작 흐름

```
┌─────────────────────────────────────┐
│  1. API 요청                         │
│  POST /v2/metadata/sync              │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  2. Controller                       │
│  - 요청 수신                         │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  3. Usecase                          │
│  - 외부 API에서 데이터 조회          │
│  - Context 호출하여 동기화           │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  4. ExternalMetadataService          │
│  - SSO API 호출                      │
│  - 메타데이터 가져오기               │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  5. MetadataSyncContext              │
│  - 도메인 서비스 조합                │
│  - 순서대로 동기화 실행              │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  6. Domain Services                  │
│  - DB에 저장/업데이트                │
└─────────────────────────────────────┘
```

## API 엔드포인트

### POST /v2/metadata/sync

외부 SSO API에서 메타데이터를 가져와 전체 동기화합니다.

**Request:**

```http
POST /v2/metadata/sync
Content-Type: application/json
```

**Response:**

```json
{
    "success": true,
    "message": "메타데이터 동기화가 성공적으로 완료되었습니다.",
    "syncedCounts": {
        "departments": 10,
        "employees": 50,
        "positions": 5,
        "ranks": 8,
        "employeeDepartmentPositions": 50
    },
    "syncedAt": "2025-10-20T12:00:00.000Z"
}
```

## 환경 변수

```env
# 외부 SSO API URL (필수)
SSO_API_URL=https://sso-api.example.com
```

## 동기화 순서

외부 API에서 가져온 메타데이터는 다음 순서로 동기화됩니다:

1. **Position** (직책) - 독립
2. **Rank** (직급) - 독립
3. **Department** (부서) - 자기 참조, order 순으로 정렬
4. **Employee** (직원) - Rank 참조
5. **EmployeeDepartmentPosition** (매핑) - Employee, Department, Position 참조

## 사용 예시

### cURL

```bash
curl -X POST http://localhost:3000/v2/metadata/sync
```

### TypeScript Client

```typescript
const response = await fetch('/v2/metadata/sync', {
    method: 'POST',
});

const result = await response.json();
console.log(result.message);
console.log(`동기화된 직원: ${result.syncedCounts.employees}명`);
```

### 스케줄러와 함께 사용 (예시)

```typescript
// 매일 새벽 2시에 자동 동기화
@Cron('0 2 * * *')
async syncMetadata() {
  await this.syncAllMetadataUsecase.execute();
}
```

## 의존성

### External

- **SSO API** (`${SSO_API_URL}/api/organization/export/all`)
    - 메타데이터 제공

### Internal

- **MetadataSyncContext** (Context Layer)
    - 도메인 서비스 조합 및 동기화 실행
- **Domain Services** (Domain Layer)
    - 각 엔티티별 CRUD 작업

## 에러 처리

### 외부 API 오류

```json
{
    "statusCode": 500,
    "message": "메타데이터 조회 실패: Network Error"
}
```

### 동기화 오류

```json
{
    "statusCode": 500,
    "message": "메타데이터 동기화 프로세스 실패"
}
```

## 로깅

모든 단계에서 상세한 로그가 기록됩니다:

```
[MetadataSyncContext] 메타데이터 동기화 프로세스 시작
[ExternalMetadataService] 외부 API에서 메타데이터 조회 시작
[ExternalMetadataService] API 호출: https://sso-api.example.com/api/organization/export/all
[ExternalMetadataService] 메타데이터 조회 완료: 10개 부서, 50명 직원
[MetadataSyncContext] 메타데이터 동기화 시작...
[MetadataSyncContext] Position 동기화 시작 (5개)
[MetadataSyncContext] Position 동기화 완료
[MetadataSyncContext] Rank 동기화 시작 (8개)
...
[SyncAllMetadataUsecase] 메타데이터 동기화 완료: 총 123개 항목
```

## 테스트

```bash
# 유닛 테스트
npm test metadata.controller.spec.ts
npm test sync-all-metadata.usecase.spec.ts
npm test external-metadata.service.spec.ts

# E2E 테스트
npm run test:e2e -- metadata
```

## 모니터링

동기화 프로세스를 모니터링하려면:

1. 로그 확인: 각 단계별 상세 로그 기록
2. 응답 데이터: `syncedCounts`로 동기화된 항목 수 확인
3. 에러 추적: 실패 시 상세한 에러 메시지와 스택 트레이스

## 주의사항

1. **환경 변수 설정**: `SSO_API_URL`이 반드시 설정되어야 합니다.
2. **네트워크 타임아웃**: 외부 API 호출은 30초 타임아웃이 설정되어 있습니다.
3. **데이터 무결성**: 동기화 중 참조 관계가 올바른 순서로 처리됩니다.
4. **트랜잭션**: 필요시 전체 동기화를 트랜잭션으로 감쌀 수 있습니다.
