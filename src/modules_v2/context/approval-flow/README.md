# ApprovalFlowContext 테스트 가이드

## 개요

`ApprovalFlowContext`는 문서양식과 결재선 템플릿의 생성, 수정, 버전 관리를 담당하는 핵심 컨텍스트입니다.

## 테스트 실행

### 전체 테스트 실행

```bash
npm test approval-flow.context
```

### Watch 모드로 실행

```bash
npm test:watch approval-flow.context
```

### 커버리지와 함께 실행

```bash
npm test:cov approval-flow.context
```

## 테스트 구조

### 1. createFormWithApprovalLine 테스트

```typescript
describe('createFormWithApprovalLine', () => {
    it('기존 결재선을 사용하여 문서양식을 성공적으로 생성해야 함');
    it('기존 결재선 사용 시 lineTemplateVersionId가 없으면 에러를 던져야 함');
    it('에러 발생 시 트랜잭션을 롤백해야 함');
    it('외부 QueryRunner가 제공되면 트랜잭션을 관리하지 않아야 함');
});
```

**테스트 시나리오:**

- ✅ 정상 케이스: 기존 결재선으로 문서양식 생성
- ✅ 유효성 검증: 필수 파라미터 누락 시 에러
- ✅ 트랜잭션 롤백: 에러 발생 시 자동 롤백
- ✅ 중첩 트랜잭션: 외부 QueryRunner 사용 시 관리 위임

### 2. updateFormVersion 테스트

```typescript
describe('updateFormVersion', () => {
    it('문서양식 새 버전을 성공적으로 생성해야 함');
    it('Form을 찾을 수 없으면 NotFoundException을 던져야 함');
});
```

**테스트 시나리오:**

- ✅ 버전 관리: 새 버전 생성 및 기존 버전 비활성화
- ✅ 엔티티 조회 실패 처리

### 3. cloneApprovalLineTemplateVersion 테스트

```typescript
describe('cloneApprovalLineTemplateVersion', () => {
    it('새 템플릿으로 결재선을 성공적으로 복제해야 함');
    it('원본 템플릿을 찾을 수 없으면 NotFoundException을 던져야 함');
    it('단계 정보를 포함하여 복제해야 함');
});
```

**테스트 시나리오:**

- ✅ 복제 기능: 새 템플릿 생성 및 단계 복사
- ✅ 단계 수정: stepEdits를 반영한 복제
- ✅ 에러 처리: 원본 미존재 시 에러

### 4. createApprovalLineTemplateVersion 테스트

```typescript
describe('createApprovalLineTemplateVersion', () => {
    it('결재선 템플릿 새 버전을 성공적으로 생성해야 함');
    it('템플릿을 찾을 수 없으면 NotFoundException을 던져야 함');
});
```

**테스트 시나리오:**

- ✅ 버전 생성: 새 버전 및 단계 생성
- ✅ 버전 관리: 이전 버전 비활성화

### 5. createApprovalSnapshot 테스트

```typescript
describe('createApprovalSnapshot', () => {
    it('결재 스냅샷을 성공적으로 생성해야 함');
    it('FormVersion을 찾을 수 없으면 NotFoundException을 던져야 함');
    it('결재자가 없으면 BadRequestException을 던져야 함');
});
```

**테스트 시나리오:**

- ✅ 스냅샷 생성: assignee_rule 해석 및 스냅샷 저장
- ✅ 유효성 검증: 결재자 존재 확인
- ✅ 에러 처리: 필수 데이터 누락 시 에러

### 6. 중첩 트랜잭션 테스트

```typescript
describe('중첩 트랜잭션 테스트', () => {
    it('createFormWithApprovalLine이 cloneApprovalLineTemplateVersion을 호출할 때 QueryRunner를 공유해야 함');
});
```

**테스트 시나리오:**

- ✅ QueryRunner 재사용: 중첩 호출 시 동일한 QueryRunner 사용
- ✅ 트랜잭션 무결성: 전체 작업이 하나의 트랜잭션으로 실행

## Mock 객체 구조

### QueryRunner Mock

```typescript
queryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {} as any,
};
```

### DataSource Mock

```typescript
dataSource = {
    createQueryRunner: jest.fn().mockReturnValue(queryRunner),
};
```

### 도메인 서비스 Mock

각 도메인 서비스는 필요한 메서드만 Mock으로 제공:

```typescript
{
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
}
```

## 테스트 작성 가이드

### 1. 기본 테스트 구조

```typescript
it('테스트 설명', async () => {
    // Given: 테스트 데이터 및 Mock 설정
    const mockDto = {
        /* ... */
    };
    service.method.mockResolvedValue(mockData);

    // When: 테스트 대상 메서드 실행
    const result = await context.method(mockDto);

    // Then: 결과 검증
    expect(result).toEqual(expectedResult);
    expect(service.method).toHaveBeenCalledWith(expectedArgs);
});
```

### 2. 에러 케이스 테스트

```typescript
it('에러 조건 설명', async () => {
    // Given
    service.findOne.mockResolvedValue(null);

    // When & Then
    await expect(context.method(dto)).rejects.toThrow(NotFoundException);
    expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
});
```

### 3. 트랜잭션 검증

```typescript
it('트랜잭션 동작 검증', async () => {
    // When
    await context.method(dto);

    // Then
    expect(queryRunner.connect).toHaveBeenCalled();
    expect(queryRunner.startTransaction).toHaveBeenCalled();
    expect(queryRunner.commitTransaction).toHaveBeenCalled();
    expect(queryRunner.release).toHaveBeenCalled();
});
```

## 커버리지 목표

| 항목           | 목표 | 현재 |
| -------------- | ---- | ---- |
| **Statements** | 90%  | -    |
| **Branches**   | 85%  | -    |
| **Functions**  | 90%  | -    |
| **Lines**      | 90%  | -    |

## 추가 테스트 케이스 (향후 추가 예정)

### AssigneeRule 해석 테스트

```typescript
describe('resolveAssigneeRule', () => {
    it('FIXED_USER 규칙을 올바르게 해석해야 함');
    it('DIRECT_MANAGER 규칙을 올바르게 해석해야 함');
    it('MANAGER_CHAIN 규칙을 올바르게 해석해야 함');
    it('DEPARTMENT_HEAD 규칙을 올바르게 해석해야 함');
    it('POSITION_BASED 규칙을 올바르게 해석해야 함');
    it('RANK_BASED 규칙을 올바르게 해석해야 함');
    it('AMOUNT_BASED 규칙을 올바르게 해석해야 함');
});
```

### 통합 테스트

```typescript
describe('통합 테스트', () => {
    it('문서양식 생성부터 결재 스냅샷 생성까지 전체 플로우가 정상 동작해야 함');
    it('여러 문서양식이 동일한 결재선 템플릿을 참조할 수 있어야 함');
    it('결재선 템플릿 수정이 기존 문서에 영향을 주지 않아야 함');
});
```

## 문제 해결

### Mock 데이터가 반영되지 않을 때

```typescript
// 각 테스트마다 Mock을 초기화
afterEach(() => {
    jest.clearAllMocks();
});
```

### QueryRunner Mock이 제대로 동작하지 않을 때

```typescript
// DataSource의 createQueryRunner가 항상 동일한 QueryRunner를 반환하도록 설정
dataSource.createQueryRunner.mockReturnValue(queryRunner);
```

### 비동기 에러 처리 테스트

```typescript
// await expect().rejects 패턴 사용
await expect(context.method()).rejects.toThrow(ErrorType);
```

## 참고 자료

- [NestJS Testing Documentation](https://docs.nestjs.com/fundamentals/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [TypeORM Testing Guide](https://typeorm.io/testing)
- [Transaction Utility Guide](../../../docs/transaction-usage.md)
