# PostgreSQL 논리 복제 (Logical Replication) 설정 가이드

## 개요

이 문서는 중앙 정보 서버에서 현재 서버로 조직 정보(직급, 직책, 부서, 직원)를 실시간으로 복제하는 PostgreSQL 논리 복제 설정 방법을 설명합니다.

## 아키텍처

```
┌─────────────────────────┐          ┌─────────────────────────┐
│  중앙 정보 서버          │          │  현재 서버 (LIAS)       │
│  (Publisher)            │          │  (Subscriber)           │
│                         │          │                         │
│  ┌──────────────────┐  │          │  ┌──────────────────┐  │
│  │ ranks            │  │──┐       │  │ ranks            │  │
│  │ positions        │  │  │       │  │ positions        │  │
│  │ departments      │  │  │       │  │ departments      │  │
│  │ employees        │  │  │  📡  │  │ employees        │  │
│  │ employee_dept... │  │  └───────┼─▶│ employee_dept... │  │
│  └──────────────────┘  │          │  └──────────────────┘  │
│                         │          │                         │
│  Publications:          │          │  Subscriptions:         │
│  - organization_all     │          │  - organization_all     │
└─────────────────────────┘          └─────────────────────────┘
```

## 복제되는 테이블

1. **ranks** - 직급 정보
2. **positions** - 직책 정보
3. **departments** - 부서 정보
4. **employees** - 직원 정보
5. **employee_department_positions** - 직원-부서-직책 매핑 정보

## 환경 변수 설정

### 1. `.env` 파일에 중앙 서버 정보 추가

```env
# 중앙 정보 서버 연결 정보
CENTRAL_DB_HOST=central-server.example.com
CENTRAL_DB_PORT=5432
CENTRAL_DB_NAME=central-server
CENTRAL_DB_USER=replication_user
CENTRAL_DB_PASSWORD=secure_password_here
```

### 2. 환경 변수 설명

| 변수명                | 설명                        | 예시                         |
| --------------------- | --------------------------- | ---------------------------- |
| `CENTRAL_DB_HOST`     | 중앙 서버 호스트 주소       | `central-server.example.com` |
| `CENTRAL_DB_PORT`     | 중앙 서버 PostgreSQL 포트   | `5432`                       |
| `CENTRAL_DB_NAME`     | 중앙 서버 데이터베이스 이름 | `central-server`             |
| `CENTRAL_DB_USER`     | 복제용 사용자 이름          | `replication_user`           |
| `CENTRAL_DB_PASSWORD` | 복제용 사용자 비밀번호      | `secure_password`            |

## 마이그레이션 파일

### 옵션 1: 개별 Subscription (권장)

각 테이블별로 독립적인 subscription을 생성합니다. 문제 발생 시 특정 테이블만 재동기화할 수 있습니다.

**파일:** `CreateSubscriptionForOrganizationTables1757500000004.ts`

```bash
# 마이그레이션 실행
npm run migration:run
```

### 옵션 2: 통합 Subscription

모든 테이블을 하나의 subscription으로 관리합니다.

**파일:** `CreateUnifiedSubscriptionForOrganization1757500000005.ts`

⚠️ **주의:** 개별 subscription과 통합 subscription 중 **하나만** 사용해야 합니다.

## 중앙 서버 설정 (이미 완료됨)

중앙 서버에서는 다음 publication이 생성되어 있어야 합니다:

- `ranks_publication`
- `positions_publication`
- `departments_publication`
- `employees_publication`
- `employee_department_positions_publication`
- `organization_all_publication` (통합)

## 설치 및 실행 순서

### 1. 엔티티 생성 확인

```bash
# 엔티티가 제대로 생성되었는지 확인
ls src/database/entities/
```

다음 파일들이 있어야 합니다:

- `rank.entity.ts`
- `position.entity.ts`
- `department.entity.ts`
- `employee.entity.ts`
- `employee-department-position.entity.ts`

### 2. 환경 변수 설정

`.env` 파일에 중앙 서버 연결 정보를 추가합니다.

### 3. 데이터베이스 마이그레이션 실행

```bash
# 개별 subscription 사용 시
npm run migration:run

# 또는 통합 subscription 사용 시 (개별 마이그레이션 건너뛰고)
npm run migration:run -- --transaction=each
```

### 4. Subscription 상태 확인

```sql
-- 현재 서버에서 실행
SELECT
    subname AS subscription_name,
    subenabled AS enabled,
    subslotname AS slot_name,
    subpublications AS publications
FROM pg_subscription;
```

### 5. 복제 상태 모니터링

```sql
-- 복제 지연 확인
SELECT
    s.subname,
    r.received_lsn,
    r.latest_end_lsn,
    r.latest_end_time
FROM pg_subscription s
JOIN pg_stat_subscription r ON s.oid = r.subid;
```

## 문제 해결

### CREATE SUBSCRIPTION 트랜잭션 에러

#### 에러 1: transaction block 에러

**에러 메시지:**

```
CREATE SUBSCRIPTION ... WITH (create_slot = true) cannot run inside a transaction block
```

**원인:** `CREATE SUBSCRIPTION` 명령은 트랜잭션 블록 안에서 실행될 수 없습니다.

**해결 방법:**

1. **마이그레이션 파일에 `transaction = false` 추가**

    ```typescript
    export class CreateSubscriptionForOrganizationTables1757500000004 implements MigrationInterface {
        name = 'CreateSubscriptionForOrganizationTables1757500000004';
        transaction = false; // 이 줄이 있어야 합니다!

        public async up(queryRunner: QueryRunner): Promise<void> {
            // ...
        }
    }
    ```

2. **data-source.ts에 `migrationsTransactionMode` 설정 추가**
    ```typescript
    export const AppDataSource = new DataSource({
        // ... 다른 설정들
        migrations: [join(__dirname, '../common/migrations/*.ts')],
        migrationsRun: false,
        migrationsTransactionMode: 'each', // 이 줄 추가!
    });
    ```

#### 에러 2: ForbiddenTransactionModeOverrideError

**에러 메시지:**

```
Migrations "CreateSubscriptionForOrganizationTables1757500000004" override the transaction mode,
but the global transaction mode is "all"
```

**원인:** TypeORM의 글로벌 트랜잭션 모드가 "all"로 설정되어 있어 개별 마이그레이션의 트랜잭션 설정을 허용하지 않습니다.

**해결:** `src/configs/data-source.ts` 파일에서 `migrationsTransactionMode: 'each'`를 추가하세요. (위의 해결 방법 2 참고)

#### 에러 3: Replication Slot 생성 실패 (Supabase Connection Pooler)

**에러 메시지:**

```
could not create replication slot "ranks_slot": ERROR: syntax error at or near "CREATE_REPLICATION_SLOT"
```

**원인:** Supabase의 Connection Pooler (포트 6543)는 논리 복제를 지원하지 않습니다. Replication 명령은 직접 연결이 필요합니다.

**해결 방법:**

**옵션 1: 직접 연결 사용 (권장)**

Supabase 대시보드에서 직접 연결 정보를 확인하고 `.env` 파일을 수정하세요:

```env
# ✅ Supabase 직접 연결 설정
CENTRAL_DB_HOST=db.xxx.supabase.co  # ⚠️ pooler가 아닌 db로 시작!
CENTRAL_DB_PORT=5432  # 6543이 아닌 5432 사용!
CENTRAL_DB_NAME=postgres
CENTRAL_DB_USER=postgres.xxx  # 프로젝트 참조 ID 포함
CENTRAL_DB_PASSWORD=실제_데이터베이스_비밀번호  # [YOUR-PASSWORD]가 아님!
```

> 📌 **Supabase 직접 연결 정보 확인:**
>
> 1. Supabase Dashboard → Settings → Database
> 2. "Connection info" 섹션에서 다음 정보 확인:
>     - **Host:** `db.xxx.supabase.co` (pooler가 아닌 **db**로 시작!)
>     - **Port:** `5432`
>     - **Database name:** `postgres`
>     - **User:** `postgres.xxx`
>     - **Password:** 실제 데이터베이스 비밀번호 (프로젝트 설정에서 확인)

**옵션 2: Replication Slot 미리 생성**

중앙 서버에서 미리 replication slot을 생성하고 마이그레이션 파일을 수정:

```sql
-- 중앙 서버(Supabase)에서 실행 (SQL Editor 사용)
SELECT pg_create_logical_replication_slot('ranks_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('positions_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('departments_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('employees_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('employee_department_positions_slot', 'pgoutput');
```

그리고 마이그레이션 파일에서 `create_slot = false`로 변경:

```typescript
// 각 subscription에서
WITH(
    (copy_data = true),
    (create_slot = false), // true에서 false로 변경
    (enabled = true),
    (slot_name = 'ranks_slot'),
);
```

### Subscription이 생성되지 않는 경우

1. **중앙 서버 연결 확인**

    ```bash
    psql -h $CENTRAL_DB_HOST -p $CENTRAL_DB_PORT -U $CENTRAL_DB_USER -d $CENTRAL_DB_NAME
    ```

2. **Publication 존재 확인** (중앙 서버에서)

    ```sql
    SELECT * FROM pg_publication WHERE pubname LIKE '%organization%';
    ```

3. **방화벽 규칙 확인**
    - 중앙 서버의 5432 포트가 열려 있는지 확인
    - `pg_hba.conf`에서 현재 서버 IP가 허용되어 있는지 확인

### Subscription 재설정

```sql
-- 1. Subscription 비활성화
ALTER SUBSCRIPTION organization_all_subscription DISABLE;

-- 2. Subscription 삭제
DROP SUBSCRIPTION organization_all_subscription;

-- 3. 마이그레이션 다시 실행
npm run migration:run
```

### 데이터 동기화 충돌 해결

```sql
-- 복제 충돌 확인
SELECT * FROM pg_stat_subscription WHERE last_msg_receipt_time < NOW() - INTERVAL '1 minute';

-- 특정 subscription 새로고침
ALTER SUBSCRIPTION organization_all_subscription REFRESH PUBLICATION;
```

## Subscription 옵션 설명

| 옵션                 | 설명                       | 값                      |
| -------------------- | -------------------------- | ----------------------- |
| `copy_data`          | 초기 데이터 복사 여부      | `true`                  |
| `create_slot`        | Replication slot 자동 생성 | `true`                  |
| `enabled`            | 즉시 활성화 여부           | `true`                  |
| `slot_name`          | Replication slot 이름      | `organization_all_slot` |
| `synchronous_commit` | 동기 커밋 모드             | `local`                 |

## 보안 고려사항

1. **전용 복제 사용자 생성** (중앙 서버에서)

    ```sql
    CREATE USER replication_user WITH REPLICATION LOGIN PASSWORD 'secure_password';
    GRANT SELECT ON TABLE ranks, positions, departments, employees, employee_department_positions TO replication_user;
    ```

2. **SSL 연결 사용**

    ```env
    CENTRAL_DB_HOST=central-server.example.com?sslmode=require
    ```

3. **비밀번호 보안**
    - `.env` 파일은 `.gitignore`에 포함
    - 프로덕션 환경에서는 AWS Secrets Manager 등 사용

## 성능 최적화

### 1. Replication Slot 모니터링

```sql
SELECT
    slot_name,
    active,
    restart_lsn,
    pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) AS lag
FROM pg_replication_slots;
```

### 2. WAL 크기 제한 (중앙 서버)

```sql
-- postgresql.conf
max_replication_slots = 10
max_wal_senders = 10
wal_keep_size = 1GB
```

## 참고 자료

- [PostgreSQL Logical Replication 공식 문서](https://www.postgresql.org/docs/current/logical-replication.html)
- [Publication 관리](https://www.postgresql.org/docs/current/sql-createpublication.html)
- [Subscription 관리](https://www.postgresql.org/docs/current/sql-createsubscription.html)

## 연락처

문제가 발생하면 다음으로 연락주세요:

- 개발팀: dev@example.com
- 데이터베이스 관리자: dba@example.com
