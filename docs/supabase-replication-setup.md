# Supabase 논리 복제 설정 가이드

## 개요

Supabase를 중앙 서버로 사용할 때 논리 복제를 설정하는 방법입니다.

## ⚠️ 중요: Connection Pooler vs 직접 연결

Supabase는 두 가지 연결 방식을 제공합니다:

| 연결 방식             | 포트 | 논리 복제 지원 | 용도                         |
| --------------------- | ---- | -------------- | ---------------------------- |
| **Connection Pooler** | 6543 | ❌ 지원 안함   | 일반 쿼리, 애플리케이션 연결 |
| **Direct Connection** | 5432 | ✅ 지원        | 논리 복제, 관리 작업         |

**논리 복제를 사용하려면 반드시 직접 연결(포트 5432)을 사용해야 합니다!**

## 1. Supabase에서 직접 연결 정보 확인

1. Supabase Dashboard 접속
2. 프로젝트 선택
3. **Settings** → **Database** 이동
4. **Connection string** 섹션에서 다음 정보 확인:

### Connection Pooler (사용 안함)

```
postgres://postgres.xxx:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres
                                                                                  ^^^^
                                                                            6543 - 사용 안함!
```

### Direct Connection (사용!)

```
postgres://postgres.xxx:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres
                                                                                  ^^^^
                                                                            5432 - 이것 사용!
```

## 2. .env 파일 설정

```env
# ❌ 잘못된 설정 (Connection Pooler)
CENTRAL_DB_HOST=aws-1-ap-northeast-2.pooler.supabase.com
CENTRAL_DB_PORT=6543  # ❌ 논리 복제 불가능!
CENTRAL_DB_NAME=postgres
CENTRAL_DB_USER=postgres.dolaectpicnuksoayqvd
CENTRAL_DB_PASSWORD=your_password

# ✅ 올바른 설정 (Direct Connection)
CENTRAL_DB_HOST=aws-1-ap-northeast-2.pooler.supabase.com
CENTRAL_DB_PORT=5432  # ✅ 논리 복제 가능!
CENTRAL_DB_NAME=postgres
CENTRAL_DB_USER=postgres.dolaectpicnuksoayqvd
CENTRAL_DB_PASSWORD=your_password
```

## 3. Supabase에서 Publication 생성 확인

Supabase SQL Editor에서 다음 쿼리를 실행하여 publication이 있는지 확인:

```sql
-- Publication 목록 확인
SELECT * FROM pg_publication;

-- 특정 publication의 테이블 확인
SELECT * FROM pg_publication_tables WHERE pubname = 'organization_all_publication';
```

Publication이 없다면 생성:

```sql
-- 개별 publication 생성
CREATE PUBLICATION ranks_publication FOR TABLE ranks;
CREATE PUBLICATION positions_publication FOR TABLE positions;
CREATE PUBLICATION departments_publication FOR TABLE departments;
CREATE PUBLICATION employees_publication FOR TABLE employees;
CREATE PUBLICATION employee_department_positions_publication FOR TABLE employee_department_positions;

-- 통합 publication 생성 (선택사항)
CREATE PUBLICATION organization_all_publication
FOR TABLE ranks, positions, departments, employees, employee_department_positions;
```

## 4. Replication Slot 생성 (선택사항)

마이그레이션에서 `create_slot = true`로 설정하면 자동으로 생성되지만,
미리 생성하고 싶다면:

```sql
-- Replication slot 생성
SELECT pg_create_logical_replication_slot('ranks_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('positions_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('departments_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('employees_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('employee_department_positions_slot', 'pgoutput');

-- Replication slot 확인
SELECT * FROM pg_replication_slots;
```

## 5. 마이그레이션 실행

```bash
npm run migration:run
```

## 6. 연결 확인

### 직접 연결 테스트

```bash
# PowerShell
$env:PGPASSWORD='your_password'
psql -h aws-1-ap-northeast-2.pooler.supabase.com -p 5432 -U postgres.dolaectpicnuksoayqvd -d postgres

# 연결 후 실행
SELECT version();
SELECT * FROM pg_publication;
```

## 문제 해결

### "could not create replication slot" 에러

**증상:**

```
ERROR: syntax error at or near "CREATE_REPLICATION_SLOT"
```

**원인:** Connection Pooler(포트 6543)를 사용하고 있습니다.

**해결:** `.env` 파일에서 `CENTRAL_DB_PORT=5432`로 변경하세요.

### "remaining connection slots are reserved" 에러

**증상:**

```
ERROR: remaining connection slots are reserved for non-replication superuser connections
```

**원인:** Supabase의 무료 플랜은 동시 연결 수가 제한되어 있습니다.

**해결:**

1. Supabase 대시보드에서 다른 연결 종료
2. 또는 유료 플랜으로 업그레이드

### "password authentication failed" 에러

**증상:**

```
FATAL: password authentication failed for user "postgres.xxx"
```

**원인:**

1. 비밀번호가 잘못되었거나
2. 호스트 주소가 잘못되었거나
3. 사용자 이름이 잘못되었습니다

**해결 방법:**

1. **Supabase에서 정확한 연결 정보 확인**

    - Supabase Dashboard → Settings → Database
    - "Connection info" 섹션에서 다음 정보 확인:
        - Host: `db.xxx.supabase.co` (pooler가 아닌 db로 시작!)
        - Database name: `postgres`
        - User: `postgres.xxx` (프로젝트 참조 ID 포함)
        - Password: 프로젝트 데이터베이스 비밀번호

2. **.env 파일 수정**

    ```env
    # ✅ 올바른 형식
    CENTRAL_DB_HOST=db.dolaectpicnuksoayqvd.supabase.co  # pooler가 아닌 db!
    CENTRAL_DB_PORT=5432
    CENTRAL_DB_NAME=postgres
    CENTRAL_DB_USER=postgres.dolaectpicnuksoayqvd
    CENTRAL_DB_PASSWORD=실제_데이터베이스_비밀번호  # [YOUR-PASSWORD]가 아님!
    ```

3. **비밀번호 재설정 (필요한 경우)**

    - Supabase Dashboard → Settings → Database
    - "Database Password" 섹션에서 "Reset database password" 클릭

4. **연결 테스트**
    ```bash
    # PowerShell에서 연결 테스트
    $env:PGPASSWORD='your_actual_password'
    psql -h db.dolaectpicnuksoayqvd.supabase.co -p 5432 -U postgres.dolaectpicnuksoayqvd -d postgres
    ```

### Publication이 보이지 않음

**증상:**

```sql
SELECT * FROM pg_publication;
-- 결과 없음
```

**해결:** Supabase SQL Editor에서 publication을 생성하세요.

```sql
CREATE PUBLICATION organization_all_publication
FOR TABLE ranks, positions, departments, employees, employee_department_positions;
```

## Supabase 플랜별 제한사항

| 항목      | Free | Pro   | Enterprise |
| --------- | ---- | ----- | ---------- |
| 동시 연결 | 60개 | 200개 | 무제한     |
| 직접 연결 | ✅   | ✅    | ✅         |
| 논리 복제 | ✅   | ✅    | ✅         |

## 보안 권장사항

### 1. IP 허용 목록 설정

Supabase Dashboard → Settings → Database → **IP allowlist**에서 현재 서버 IP 추가

### 2. SSL 연결 사용

```env
CENTRAL_DB_HOST=aws-1-ap-northeast-2.pooler.supabase.com?sslmode=require
```

### 3. 읽기 전용 사용자 생성 (선택사항)

```sql
-- Supabase SQL Editor에서 실행
CREATE USER replication_user WITH PASSWORD 'strong_password';
GRANT USAGE ON SCHEMA public TO replication_user;
GRANT SELECT ON TABLE ranks, positions, departments, employees, employee_department_positions TO replication_user;

-- Replication 권한 부여
ALTER USER replication_user WITH REPLICATION;
```

## 참고 자료

- [Supabase Database Settings](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [PostgreSQL Logical Replication](https://www.postgresql.org/docs/current/logical-replication.html)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

## 요약 체크리스트

- [ ] Supabase에서 직접 연결 정보 확인 (포트 5432)
- [ ] `.env` 파일에 직접 연결 정보 입력
- [ ] Supabase에서 Publication 생성 확인
- [ ] 마이그레이션 실행 (`npm run migration:run`)
- [ ] Subscription 상태 확인
- [ ] 데이터 복제 확인

모든 단계가 완료되면 중앙 서버의 데이터가 실시간으로 현재 서버에 복제됩니다! 🎉
