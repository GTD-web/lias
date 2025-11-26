# E2E 테스트 가이드

## 테스트 파일 목록

### 1. approval-flow-v2.e2e-spec.ts

**ApprovalFlowController 테스트 (문서양식 & 결재선 관리)**

- ✅ 문서양식 생성 (새 결재선 / 기존 결재선 참조)
- ✅ 문서양식 수정 (버전 관리)
- ✅ 결재선 템플릿 생성
- ✅ 결재선 템플릿 복제
- ✅ 결재선 템플릿 버전 관리
- ✅ 결재선 미리보기
- ✅ 조회 API (템플릿, 문서양식)
- ✅ 필수 파라미터 검증
- ✅ 인증/권한 검증

**테스트 케이스: 약 45개**

### 2. document-v2.e2e-spec.ts

**DocumentController 테스트 (문서 CRUD)**

- ✅ 문서 생성 (임시저장)
- ✅ 문서 수정
- ✅ 문서 제출
- ✅ 문서 조회 (단건, 내 문서, 상태별)
- ✅ 문서 삭제
- ✅ 상태별 제약 검증 (DRAFT만 수정/삭제 가능)
- ✅ 권한 검증 (다른 사용자의 문서 접근)
- ✅ 필수 파라미터 검증

**테스트 케이스: 약 35개**

### 3. approval-process-v2.e2e-spec.ts

**ApprovalProcessController 테스트 (결재 프로세스)**

- ✅ 결재 승인
- ✅ 결재 반려
- ✅ 협의 완료
- ✅ 시행 완료
- ✅ 결재 취소
- ✅ 내 결재 대기 목록 조회
- ✅ 문서의 결재 단계 조회
- ✅ 권한 검증 (결재자/기안자 구분)
- ✅ 반려 사유 필수 검증
- ✅ 이미 처리된 단계 재처리 방지

**테스트 케이스: 약 40개**

### 4. metadata-query-v2.e2e-spec.ts

**MetadataQueryController 테스트 (메타데이터 조회)**

- ✅ 부서 목록 조회
- ✅ 부서별 직원 조회
- ✅ 직급 목록 조회
- ✅ 직원 검색 (이름, 직원번호)
- ✅ 부서별 필터링
- ✅ 직원 상세 조회
- ✅ 특수 케이스 (한글, 공백, 특수문자 검색)
- ✅ UUID 형식 검증

**테스트 케이스: 약 30개**

### 5. my-all-documents-consistency.e2e-spec.ts

**내 전체 문서 API 일관성 테스트 (데이터 정합성 검증)**

- ✅ 통계 API와 문서 목록 API 개수 일치 검증
  - DRAFT (임시저장)
  - RECEIVED (수신함)
  - PENDING (상신함)
  - PENDING_AGREEMENT (합의함)
  - PENDING_APPROVAL (결재함)
  - IMPLEMENTATION (시행함)
  - APPROVED (기결함)
  - REJECTED (반려함)
  - RECEIVED_REFERENCE (수신참조함)
- ✅ 승인 상태별 개수 일관성 검증
  - PENDING_AGREEMENT: SCHEDULED + CURRENT + COMPLETED
  - PENDING_APPROVAL: SCHEDULED + CURRENT + COMPLETED
- ✅ 열람 상태별 개수 일관성 검증
  - RECEIVED_REFERENCE: READ + UNREAD
- ✅ 페이지네이션 정확성 검증
  - 페이지별 중복 데이터 없음
  - totalItems 정확성
- ✅ 전체 문서 중복도 분석

**테스트 케이스: 15개**

**주요 검증 사항:**
- `/documents/my-all/statistics` 응답 개수
- `/documents/my-all/documents` 실제 조회 개수
- 두 API 간 데이터 정합성 보장

## 테스트 실행 방법

### 전체 테스트 실행

```bash
npm run test:e2e
```

### 특정 파일만 실행

```bash
# ApprovalFlow 테스트만
npm run test:e2e -- approval-flow-v2.e2e-spec.ts

# Document 테스트만
npm run test:e2e -- document-v2.e2e-spec.ts

# ApprovalProcess 테스트만
npm run test:e2e -- approval-process-v2.e2e-spec.ts

# Metadata 테스트만
npm run test:e2e -- metadata-query-v2.e2e-spec.ts

# 내 전체 문서 일관성 테스트만
npm run test:e2e -- my-all-documents-consistency.e2e-spec.ts
```

### 특정 describe 블록만 실행

```bash
npm run test:e2e -- -t "문서양식 생성"
```

### watch 모드로 실행

```bash
npm run test:e2e -- --watch
```

## 테스트 사전 준비

### 1. 테스트용 데이터베이스 설정

```bash
# .env.test 파일 생성
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=lias_test
```

### 2. 테스트용 사용자 계정 생성

테스트를 실행하기 전에 다음 사용자가 데이터베이스에 존재해야 합니다:

- **TEST001**: 기안자 역할
- **TEST002**: 결재자/협의자 역할

```sql
-- 테스트용 사용자 생성 예시
INSERT INTO employees (id, employee_number, name, email, password)
VALUES
  ('uuid-test-001', 'TEST001', '테스트사용자1', 'test001@example.com', 'hashed_password'),
  ('uuid-test-002', 'TEST002', '테스트사용자2', 'test002@example.com', 'hashed_password');
```

### 3. 테스트용 부서 및 직급 데이터

```sql
-- 테스트용 부서
INSERT INTO departments (id, department_code, department_name)
VALUES ('uuid-dept-001', 'TEST_DEPT', '테스트부서');

-- 테스트용 직급
INSERT INTO positions (id, position_code, position_title, position_level)
VALUES ('uuid-pos-001', 'TEST_POS', '테스트직급', 1);
```

## 테스트 커버리지

### 각 API 엔드포인트별 테스트 시나리오

#### 1. 정상 케이스 (200/201)

- ✅ 유효한 요청으로 정상 응답 확인
- ✅ 선택적 파라미터 포함/미포함 케이스

#### 2. 검증 실패 (400)

- ✅ 필수 파라미터 누락
- ✅ 잘못된 데이터 타입
- ✅ 비즈니스 규칙 위반
- ✅ 중복 처리 방지

#### 3. 인증 실패 (401)

- ✅ 토큰 없음
- ✅ 잘못된 토큰
- ✅ 만료된 토큰

#### 4. 권한 없음 (403)

- ✅ 다른 사용자의 리소스 수정/삭제
- ✅ 권한 없는 결재 처리

#### 5. 리소스 없음 (404)

- ✅ 존재하지 않는 ID
- ✅ 잘못된 UUID 형식

## 테스트 구조

각 테스트 파일은 다음 구조를 따릅니다:

```typescript
describe('Controller명 (e2e)', () => {
    // Setup
    beforeAll(async () => {
        // 앱 초기화
        // 로그인 및 토큰 획득
        // 테스트 데이터 준비
    });

    // Cleanup
    afterAll(async () => {
        // 앱 종료
    });

    describe('POST /endpoint - API 설명', () => {
        it('정상: 상세 시나리오 설명', async () => {
            // 정상 케이스 테스트
        });

        it('실패: 에러 상황 설명', async () => {
            // 에러 케이스 테스트
        });
    });
});
```

## 주의사항

### 1. 테스트 순서 독립성

- 각 테스트는 독립적으로 실행 가능해야 함
- 테스트 간 의존성이 있는 경우 `beforeAll`/`beforeEach`에서 준비

### 2. 테스트 데이터 정리

- 테스트 후 생성된 데이터는 자동으로 정리되지 않음
- 필요시 `afterAll`에서 정리 로직 추가

### 3. 비동기 처리

- 모든 API 호출은 `async/await` 사용
- 타임아웃 설정 필요시 `jest.setTimeout()` 활용

### 4. 환경 변수

- 테스트 환경에서는 `.env.test` 파일 사용
- 프로덕션 데이터베이스 접근 방지

## CI/CD 통합

### GitHub Actions 예시

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
    e2e:
        runs-on: ubuntu-latest

        services:
            postgres:
                image: postgres:14
                env:
                    POSTGRES_DB: lias_test
                    POSTGRES_USER: postgres
                    POSTGRES_PASSWORD: postgres

        steps:
            - uses: actions/checkout@v2
            - name: Install dependencies
              run: npm ci
            - name: Run E2E tests
              run: npm run test:e2e
```

## 테스트 결과 확인

테스트 실행 후 다음 정보를 확인할 수 있습니다:

- ✅ 통과/실패한 테스트 수
- ✅ 각 테스트의 실행 시간
- ✅ 에러 메시지 및 스택 트레이스
- ✅ 커버리지 리포트 (설정 시)

## 문제 해결

### 테스트가 실패하는 경우

1. **데이터베이스 연결 오류**

    - `.env.test` 파일 확인
    - 데이터베이스 서비스 실행 확인

2. **테스트 데이터 없음**

    - 테스트용 사용자 계정 확인
    - 부서/직급 데이터 확인

3. **타임아웃 에러**

    - API 응답 시간 확인
    - `jest.setTimeout()` 증가

4. **인증 토큰 문제**
    - 로그인 API 정상 동작 확인
    - JWT 시크릿 키 확인

## 추가 개선 사항

### 향후 추가 예정

- [ ] 테스트 커버리지 리포트 생성
- [ ] E2E 테스트 자동화 스크립트
- [ ] 테스트 데이터 자동 생성/정리
- [ ] 성능 테스트 추가
- [ ] 부하 테스트 추가

## 기여 가이드

새로운 API를 추가할 때는 다음 테스트를 포함해주세요:

1. ✅ 정상 케이스 (필수)
2. ✅ 필수 파라미터 누락 (필수)
3. ✅ 존재하지 않는 리소스 (필수)
4. ✅ 인증 실패 (필수)
5. ✅ 권한 검증 (권한이 필요한 경우)
6. ✅ 비즈니스 로직 검증 (복잡한 로직인 경우)

---

**총 테스트 케이스: 약 165개**
**예상 실행 시간: 2-3분**
