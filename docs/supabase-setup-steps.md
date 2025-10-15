# Supabase 논리 복제 설정 단계별 가이드

## ⚠️ 중요 알림

Supabase의 Connection Pooler는 논리 복제를 지원하지 않습니다.
따라서 **Supabase SQL Editor에서 미리 replication slot을 생성**한 후 마이그레이션을 실행해야 합니다.

## 📋 설정 단계

### 1단계: Supabase에서 Publication 생성

1. Supabase Dashboard 접속
2. 프로젝트 선택
3. **SQL Editor** 클릭
4. 다음 SQL 실행:

```sql
-- Publication 생성 (중앙 서버에서 실행)
CREATE PUBLICATION ranks_publication FOR TABLE ranks;
CREATE PUBLICATION positions_publication FOR TABLE positions;
CREATE PUBLICATION departments_publication FOR TABLE departments;
CREATE PUBLICATION employees_publication FOR TABLE employees;
CREATE PUBLICATION employee_department_positions_publication FOR TABLE employee_department_positions;

-- Publication 확인
SELECT * FROM pg_publication;
```

### 2단계: Supabase에서 Replication Slot 생성

**같은 SQL Editor에서 다음 실행:**

```sql
-- Replication Slot 생성 (중앙 서버에서 실행)
SELECT pg_create_logical_replication_slot('ranks_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('positions_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('departments_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('employees_slot', 'pgoutput');
SELECT pg_create_logical_replication_slot('employee_department_positions_slot', 'pgoutput');

-- Replication Slot 확인
SELECT slot_name, plugin, slot_type, active
FROM pg_replication_slots;
```

**예상 결과:**

```
slot_name                                | plugin   | slot_type | active
-----------------------------------------|----------|-----------|-------
ranks_slot                               | pgoutput | logical   | f
positions_slot                           | pgoutput | logical   | f
departments_slot                         | pgoutput | logical   | f
employees_slot                           | pgoutput | logical   | f
employee_department_positions_slot       | pgoutput | logical   | f
```

### 3단계: 마이그레이션 파일 수정

마이그레이션 파일을 수정하여 이미 생성된 slot을 사용하도록 설정합니다.

**파일:** `src/common/migrations/CreateSubscriptionForOrganizationTables1757500000004.ts`

각 subscription의 `create_slot`을 `false`로 변경:

```typescript
// Ranks 테이블 subscription
await queryRunner.query(`
    CREATE SUBSCRIPTION ranks_subscription
    CONNECTION '${connectionString}'
    PUBLICATION ranks_publication
    WITH (
        copy_data = true,
        create_slot = false,  // true에서 false로 변경!
        enabled = true,
        slot_name = 'ranks_slot'
    )
`);
```

**모든 subscription (5개)에 대해 동일하게 수정하세요.**

### 4단계: .env 파일 확인

```env
# Supabase 연결 정보
CENTRAL_DB_HOST=aws-1-ap-northeast-2.pooler.supabase.com  # pooler 사용해도 OK (slot이 미리 생성되어 있으므로)
CENTRAL_DB_PORT=5432
CENTRAL_DB_NAME=postgres
CENTRAL_DB_USER=postgres.dolaectpicnuksoayqvd
CENTRAL_DB_PASSWORD=d0xRLFjlAnJz99VJ
```

### 5단계: 마이그레이션 실행

```bash
npm run migration:run
```

## ✅ 성공 확인

마이그레이션이 성공하면 다음 메시지가 표시됩니다:

```
✅ Organization tables subscription이 성공적으로 생성되었습니다.
📡 중앙 서버와의 실시간 동기화가 시작되었습니다.
```

### Subscription 상태 확인

현재 서버(LIAS)에서 실행:

```sql
-- Subscription 목록 확인
SELECT subname, subenabled, subslotname
FROM pg_subscription;

-- 복제 상태 확인
SELECT * FROM pg_stat_subscription;
```

### 데이터 복제 확인

```sql
-- 각 테이블의 데이터 확인
SELECT COUNT(*) FROM ranks;
SELECT COUNT(*) FROM positions;
SELECT COUNT(*) FROM departments;
SELECT COUNT(*) FROM employees;
SELECT COUNT(*) FROM employee_department_positions;
```

## 🔄 Replication Slot 정리 (필요시)

Slot을 삭제하고 다시 생성하려면:

```sql
-- Supabase SQL Editor에서 실행
SELECT pg_drop_replication_slot('ranks_slot');
SELECT pg_drop_replication_slot('positions_slot');
SELECT pg_drop_replication_slot('departments_slot');
SELECT pg_drop_replication_slot('employees_slot');
SELECT pg_drop_replication_slot('employee_department_positions_slot');
```

## 📊 체크리스트

- [ ] Supabase SQL Editor에서 Publication 생성 확인
- [ ] Supabase SQL Editor에서 Replication Slot 생성
- [ ] 마이그레이션 파일에서 `create_slot = false` 변경
- [ ] `.env` 파일 설정 확인
- [ ] 마이그레이션 실행
- [ ] Subscription 상태 확인
- [ ] 데이터 복제 확인

모든 단계를 완료하면 중앙 서버의 데이터가 실시간으로 복제됩니다! 🎉
