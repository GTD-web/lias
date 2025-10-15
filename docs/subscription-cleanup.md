# Subscription 정리 가이드

## 마이그레이션 Revert 오류 해결

`npm run migration:revert` 실행 시 다음 오류가 발생하는 경우:

```
DROP SUBSCRIPTION cannot run inside a transaction block
```

## 해결 방법

### 옵션 1: SQL로 직접 삭제 (권장)

현재 서버(LIAS)의 PostgreSQL에서 직접 실행:

```sql
-- 1. Subscription 비활성화
ALTER SUBSCRIPTION employee_department_positions_subscription DISABLE;
ALTER SUBSCRIPTION employees_subscription DISABLE;
ALTER SUBSCRIPTION departments_subscription DISABLE;
ALTER SUBSCRIPTION positions_subscription DISABLE;
ALTER SUBSCRIPTION ranks_subscription DISABLE;

-- 2. Subscription 삭제
DROP SUBSCRIPTION IF EXISTS employee_department_positions_subscription;
DROP SUBSCRIPTION IF EXISTS employees_subscription;
DROP SUBSCRIPTION IF EXISTS departments_subscription;
DROP SUBSCRIPTION IF EXISTS positions_subscription;
DROP SUBSCRIPTION IF EXISTS ranks_subscription;

-- 3. 마이그레이션 레코드 삭제
DELETE FROM migrations WHERE name = 'CreateSubscriptionForOrganizationTables1757500000004';

-- 4. 확인
SELECT * FROM pg_subscription;
SELECT * FROM migrations ORDER BY id DESC;
```

### 옵션 2: psql로 실행

PowerShell에서:

```powershell
# 환경 변수 설정
$env:PGPASSWORD='your_password'

# PostgreSQL 연결
psql -h localhost -p 5432 -U admin -d resource-server

# 연결 후 위의 SQL 명령 실행
```

### 옵션 3: 마이그레이션 레코드만 삭제 (Subscription 유지)

Subscription을 그대로 두고 마이그레이션 레코드만 삭제:

```sql
DELETE FROM migrations WHERE name = 'CreateSubscriptionForOrganizationTables1757500000004';
```

## Subscription 상태 확인

```sql
-- Subscription 목록
SELECT
    subname,
    subenabled,
    subslotname
FROM pg_subscription;

-- Subscription 상세 정보
SELECT * FROM pg_stat_subscription;

-- 마이그레이션 기록
SELECT * FROM migrations ORDER BY id DESC;
```

## 중앙 서버(Supabase)에서 Replication Slot 삭제

Subscription을 완전히 제거한 후 중앙 서버에서도 정리:

```sql
-- Supabase SQL Editor에서 실행
SELECT pg_drop_replication_slot('employee_department_positions_slot');
SELECT pg_drop_replication_slot('employees_slot');
SELECT pg_drop_replication_slot('departments_slot');
SELECT pg_drop_replication_slot('positions_slot');
SELECT pg_drop_replication_slot('ranks_slot');

-- 확인
SELECT * FROM pg_replication_slots;
```

## 재설정 절차

완전히 정리하고 다시 시작하려면:

### 1단계: 현재 서버 정리

```sql
-- Subscription 삭제
ALTER SUBSCRIPTION employee_department_positions_subscription DISABLE;
ALTER SUBSCRIPTION employees_subscription DISABLE;
ALTER SUBSCRIPTION departments_subscription DISABLE;
ALTER SUBSCRIPTION positions_subscription DISABLE;
ALTER SUBSCRIPTION ranks_subscription DISABLE;

DROP SUBSCRIPTION IF EXISTS employee_department_positions_subscription;
DROP SUBSCRIPTION IF EXISTS employees_subscription;
DROP SUBSCRIPTION IF EXISTS departments_subscription;
DROP SUBSCRIPTION IF EXISTS positions_subscription;
DROP SUBSCRIPTION IF EXISTS ranks_subscription;

-- 마이그레이션 레코드 삭제
DELETE FROM migrations WHERE name = 'CreateSubscriptionForOrganizationTables1757500000004';
```

### 2단계: 중앙 서버 정리 (선택사항)

```sql
-- Supabase에서 Replication Slot 삭제
SELECT pg_drop_replication_slot('employee_department_positions_slot');
SELECT pg_drop_replication_slot('employees_slot');
SELECT pg_drop_replication_slot('departments_slot');
SELECT pg_drop_replication_slot('positions_slot');
SELECT pg_drop_replication_slot('ranks_slot');
```

### 3단계: 데이터 삭제 (필요한 경우)

```sql
-- 복제된 데이터 삭제
TRUNCATE TABLE employee_department_positions CASCADE;
TRUNCATE TABLE employees CASCADE;
TRUNCATE TABLE departments CASCADE;
TRUNCATE TABLE positions CASCADE;
TRUNCATE TABLE ranks CASCADE;
```

### 4단계: 마이그레이션 재실행

```bash
npm run migration:run
```

## 참고사항

- `DROP SUBSCRIPTION`은 트랜잭션 블록 안에서 실행될 수 없습니다
- TypeORM의 `migration:revert`는 기본적으로 트랜잭션을 사용합니다
- 따라서 subscription 관련 마이그레이션은 수동으로 정리해야 합니다
- `transaction = false` 설정이 있어도 revert 시에는 적용되지 않을 수 있습니다
