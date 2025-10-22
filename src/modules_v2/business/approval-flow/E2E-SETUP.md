# E2E 테스트 실행 가이드

## 사전 요구사항

### 1. 데이터베이스 준비

E2E 테스트는 실제 테스트 DB를 사용하며, **조직 정보 데이터가 이미 존재해야 합니다**.

필수 데이터:

- ✅ `department` - 최소 1개 이상의 부서
- ✅ `position` - 최소 1개 이상의 직책
- ✅ `employee` - 최소 1개 이상의 직원

### 2. 조직 데이터 생성 방법

#### 방법 1: Metadata API 사용 (권장)

```bash
# 개발 서버 실행
npm run start:dev

# Metadata 동기화 API 호출
curl -X POST http://localhost:3000/v2/metadata/sync

# 또는 Swagger UI에서 실행
# http://localhost:3000/api
# POST /v2/metadata/sync 실행
```

#### 방법 2: 직접 SQL 실행

```sql
-- Department 생성 (테이블명: departments, 컬럼: camelCase)
INSERT INTO departments (id, "departmentName", "departmentCode", type, "order", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid(),
    '테스트부서',
    'TEST_DEPT',
    'DEPARTMENT',
    0,
    NOW(),
    NOW()
);

-- Position 생성 (테이블명: positions, 컬럼: camelCase)
INSERT INTO positions (id, "positionTitle", "positionCode", level, "hasManagementAuthority", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid(),
    '테스트직책',
    'TEST_POS',
    5,
    true,
    NOW(),
    NOW()
);

-- Employee 생성 (테이블명: employees, 컬럼: camelCase)
INSERT INTO employees (id, "employeeNumber", name, email, "hireDate", status, roles, "isInitialPasswordSet", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid(),
    'EMP001',
    '테스트직원',
    'test@example.com',
    NOW(),
    'Active',
    ARRAY['USER']::text[],
    false,
    NOW(),
    NOW()
);

-- EmployeeDepartmentPosition 연결 (테이블명: employee_department_positions, 컬럼: camelCase)
INSERT INTO employee_department_positions (id, "employeeId", "departmentId", "positionId", "isManager", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid(),
    (SELECT id FROM employees WHERE email = 'test@example.com'),
    (SELECT id FROM departments WHERE "departmentCode" = 'TEST_DEPT'),
    (SELECT id FROM positions WHERE "positionCode" = 'TEST_POS'),
    true,
    NOW(),
    NOW()
);
```

## E2E 테스트 실행

### 1. 데이터 확인

```bash
# PostgreSQL 접속
psql -h localhost -U your_user -d your_test_db

# 데이터 확인 (테이블명: departments, positions, employees)
SELECT COUNT(*) FROM departments;
SELECT COUNT(*) FROM positions;
SELECT COUNT(*) FROM employees;
```

### 2. 테스트 실행

```bash
# 전체 E2E 테스트
npm run test:e2e approval-flow

# 특정 테스트만 실행
npm run test:e2e approval-flow -- -t "문서양식 생성"

# 상세 로그 확인
npm run test:e2e approval-flow -- --verbose
```

## 테스트 동작 방식

### setupTestData() 함수

1. **조회**: 기존 조직 데이터 조회 (생성하지 않음)

    - Department 조회
    - Position 조회
    - Employee 조회

2. **생성**: 테스트용 결재선 템플릿만 생성
    - ApprovalLineTemplate
    - ApprovalLineTemplateVersion
    - ApprovalStepTemplate

### 테스트 실행 흐름

```
1. beforeAll() 실행
   ├─ NestJS 앱 초기화
   ├─ DataSource 연결
   └─ setupTestData() 호출
       ├─ 조직 데이터 조회 ✅
       └─ 결재선 템플릿 생성 ✅

2. 테스트 케이스 실행
   ├─ POST /v2/approval-flow/forms
   ├─ PATCH /v2/approval-flow/forms/:id/versions
   ├─ POST /v2/approval-flow/templates/clone
   ├─ POST /v2/approval-flow/templates/:id/versions
   ├─ POST /v2/approval-flow/snapshots
   └─ 통합 시나리오 테스트

3. afterAll() 실행
   └─ cleanupTestData() 호출
       ├─ 생성된 문서양식 삭제
       ├─ 생성된 결재선 템플릿 삭제
       └─ 조직 데이터는 유지 ✅
```

## 문제 해결

### 오류: "테스트용 부서 데이터가 없습니다"

**원인**: 조직 데이터가 DB에 없음

**해결**:

1. Metadata API로 조직 데이터 동기화

    ```bash
    curl -X POST http://localhost:3000/v2/metadata/sync
    ```

2. 또는 직접 SQL로 데이터 생성 (위 "방법 2" 참고)

### 오류: "Cannot connect to database"

**원인**: 데이터베이스 연결 설정 문제

**해결**:

1. `.env` 파일 확인

    ```
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_NAME=your_test_db
    DATABASE_USER=your_user
    DATABASE_PASSWORD=your_password
    ```

2. 데이터베이스 실행 상태 확인

    ```bash
    # PostgreSQL 상태 확인 (Windows)
    pg_ctl status

    # 또는 Docker 확인
    docker ps | grep postgres
    ```

### 테스트 타임아웃

**원인**: 데이터베이스 초기화에 시간이 오래 걸림

**해결**: `beforeAll()` 타임아웃은 이미 30초로 설정되어 있습니다.

```typescript
beforeAll(async () => {
    // ...
}, 30000); // 30초
```

## 테스트 후 데이터 상태

### ✅ 유지되는 데이터 (재사용)

- Department (부서)
- Position (직책)
- Employee (직원)
- EmployeeDepartmentPosition (직원-부서-직책 관계)

### 🗑️ 삭제되는 데이터 (테스트용)

- Form (문서양식)
- FormVersion (문서양식 버전)
- ApprovalLineTemplate (결재선 템플릿)
- ApprovalLineTemplateVersion (결재선 템플릿 버전)
- ApprovalStepTemplate (결재 단계 템플릿)
- ApprovalLineSnapshot (결재 스냅샷)
- ApprovalStepSnapshot (결재 단계 스냅샷)

## CI/CD 환경 설정

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
                    POSTGRES_DB: test_db
                    POSTGRES_USER: test_user
                    POSTGRES_PASSWORD: test_password
                ports:
                    - 5432:5432
                options: >-
                    --health-cmd pg_isready
                    --health-interval 10s
                    --health-timeout 5s
                    --health-retries 5

        steps:
            - uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: '18'

            - name: Install dependencies
              run: npm ci

            - name: Setup test data
              run: |
                  npm run start:dev &
                  sleep 10
                  curl -X POST http://localhost:3000/v2/metadata/sync
                  sleep 5

            - name: Run E2E tests
              run: npm run test:e2e approval-flow
              env:
                  DATABASE_HOST: localhost
                  DATABASE_PORT: 5432
                  DATABASE_NAME: test_db
                  DATABASE_USER: test_user
                  DATABASE_PASSWORD: test_password
```

## 권장 사항

1. **개발 환경**: Docker Compose로 테스트 DB 구성

    ```yaml
    version: '3.8'
    services:
        postgres-test:
            image: postgres:14
            environment:
                POSTGRES_DB: lias_test
                POSTGRES_USER: test_user
                POSTGRES_PASSWORD: test_password
            ports:
                - '5433:5432'
    ```

2. **테스트 전 실행**: Metadata 동기화로 조직 데이터 준비

    ```bash
    npm run start:dev &
    sleep 5
    curl -X POST http://localhost:3000/v2/metadata/sync
    npm run test:e2e approval-flow
    ```

3. **정기 초기화**: 테스트 DB는 주기적으로 초기화하여 깨끗한 상태 유지
