# Approval Flow E2E 테스트 가이드

## 테스트 실행 전 준비사항

### 1. 데이터베이스 설정

테스트는 실제 테스트 DB와 연결되어 있어야 합니다. `.env.test` 파일에 테스트 DB 설정이 있는지 확인하세요.

### 2. 테스트 데이터 준비

E2E 테스트는 자동으로 필요한 기준 데이터를 생성합니다:

- Department (부서)
- Position (직책)
- Employee (직원)
- EmployeeDepartmentPosition (직원-부서-직책 관계)
- ApprovalLineTemplate (기본 결재선 템플릿)
- ApprovalLineTemplateVersion (결재선 템플릿 버전)
- ApprovalStepTemplate (결재 단계 템플릿)

## 테스트 실행

### 단일 테스트 파일 실행

```bash
npm run test:e2e approval-flow
```

### 전체 E2E 테스트 실행

```bash
npm run test:e2e
```

### Watch 모드로 실행

```bash
npm run test:e2e -- --watch
```

### 특정 테스트만 실행

```bash
npm run test:e2e approval-flow -- -t "문서양식 생성"
```

## 테스트 시나리오

### 1. POST /v2/approval-flow/forms

- ✅ 기존 결재선을 사용하여 문서양식을 생성
- ✅ 필수 파라미터 누락 시 400 에러 반환

### 2. PATCH /v2/approval-flow/forms/:formId/versions

- ✅ 문서양식 새 버전을 생성
- ✅ 존재하지 않는 문서양식 ID로 요청 시 404 에러 반환

### 3. POST /v2/approval-flow/templates/clone

- ✅ 결재선 템플릿을 복제

### 4. POST /v2/approval-flow/templates/:templateId/versions

- ✅ 결재선 템플릿 새 버전을 생성

### 5. POST /v2/approval-flow/snapshots

- ✅ 결재 스냅샷을 생성
- ✅ 존재하지 않는 formVersionId로 요청 시 404 에러 반환

### 6. 통합 시나리오 테스트

- ✅ 문서양식 생성 → 수정 → 결재선 복제 → 스냅샷 생성 전체 플로우

## 테스트 데이터 정리

테스트 완료 후 `cleanupTestData()` 함수가 자동으로 호출되어 생성된 데이터를 삭제합니다:

- ApprovalStepSnapshot
- ApprovalLineSnapshot
- FormVersionApprovalLineTemplateVersion
- FormVersion
- Form
- ApprovalStepTemplate
- ApprovalLineTemplateVersion

**주의**: 기본 데이터(Department, Position, Employee 등)는 재사용을 위해 삭제하지 않습니다.

## 테스트 실패 시 디버깅

### 1. 데이터베이스 연결 오류

```bash
# 데이터베이스 상태 확인
npm run db:status
```

### 2. 트랜잭션 오류

테스트 중 트랜잭션 오류가 발생하면 데이터베이스의 활성 연결을 확인하세요:

```sql
SELECT * FROM pg_stat_activity WHERE datname = 'your_test_db';
```

### 3. 외래키 제약 조건 오류

`cleanupTestData()`에서 삭제 순서가 올바른지 확인하세요. 외래키 제약 조건을 고려하여 자식 테이블부터 삭제해야 합니다.

### 4. 테스트 데이터 수동 정리

테스트가 비정상 종료되어 데이터가 남아있는 경우:

```sql
-- 테스트 데이터 확인
SELECT * FROM form WHERE name LIKE 'E2E%';
SELECT * FROM approval_line_template WHERE name LIKE 'E2E%';

-- 수동 삭제
DELETE FROM approval_step_snapshot WHERE snapshot_id IN (
    SELECT id FROM approval_line_snapshot WHERE document_id LIKE 'test-doc-%'
);
DELETE FROM approval_line_snapshot WHERE document_id LIKE 'test-doc-%';
-- ... (나머지 테이블도 동일)
```

## CI/CD 환경에서 실행

### GitHub Actions 예시

```yaml
- name: Run E2E Tests
  run: |
      npm run test:e2e
  env:
      DATABASE_HOST: localhost
      DATABASE_PORT: 5432
      DATABASE_NAME: test_db
      DATABASE_USER: test_user
      DATABASE_PASSWORD: test_password
```

## 성능 최적화

### 테스트 속도 향상을 위한 팁

1. 테스트 DB는 SSD에 설정
2. 병렬 실행 제한 (동시성 문제 방지)
3. 트랜잭션 격리 레벨 조정
4. 인덱스 확인

## 추가 참고사항

- 테스트는 실제 데이터베이스와 격리되어 있어야 합니다
- 프로덕션 데이터베이스에서는 **절대** 테스트를 실행하지 마세요
- 테스트 DB는 정기적으로 초기화하는 것을 권장합니다
