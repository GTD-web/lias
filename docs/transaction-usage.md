# 트랜잭션 유틸리티 사용 가이드

## 개요

NestJS와 TypeORM에서 중첩 트랜잭션을 안전하게 처리하기 위한 유틸리티입니다.

## 왜 DataSource를 인자로 받나요?

```typescript
// ❌ 잘못된 방법: 직접 import
import { dataSource } from './data-source';

// ✅ 올바른 방법: 의존성 주입
constructor(private readonly dataSource: DataSource) {}
```

### 이유

1. **의존성 주입(DI) 패턴**: NestJS의 핵심 원칙
2. **테스트 용이성**: Mock DataSource 주입 가능
3. **다중 데이터베이스**: 여러 DB를 구분해서 사용
4. **라이프사이클 관리**: NestJS가 자동으로 연결/해제 관리

## 3가지 사용 방법

### 1. prepareTransaction (수동 관리)

가장 명시적이지만 코드가 많습니다.

```typescript
@Injectable()
export class UserService {
    constructor(private readonly dataSource: DataSource) {}

    async createUser(userData: CreateUserDto, externalQueryRunner?: QueryRunner) {
        const { queryRunner, shouldManage } = prepareTransaction(this.dataSource, externalQueryRunner);

        if (shouldManage) {
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            const user = await this.userRepository.save(userData, { queryRunner });
            const profile = await this.profileRepository.save({ userId: user.id }, { queryRunner });

            if (shouldManage) {
                await queryRunner.commitTransaction();
            }

            return { user, profile };
        } catch (error) {
            if (shouldManage) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally {
            if (shouldManage) {
                await queryRunner.release();
            }
        }
    }
}
```

### 2. withTransaction (권장)

코드가 간결하고 실수가 적습니다.

```typescript
@Injectable()
export class UserService {
    constructor(private readonly dataSource: DataSource) {}

    async createUser(userData: CreateUserDto, externalQueryRunner?: QueryRunner) {
        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const user = await this.userRepository.save(userData, { queryRunner });
                const profile = await this.profileRepository.save({ userId: user.id }, { queryRunner });
                return { user, profile };
            },
            externalQueryRunner,
        );
    }
}
```

### 3. @Transactional 데코레이터 (가장 간편)

가장 깔끔하지만 magic이 많습니다.

```typescript
@Injectable()
export class UserService {
    constructor(private readonly dataSource: DataSource) {}

    @Transactional()
    async createUser(userData: CreateUserDto, queryRunner?: QueryRunner) {
        // queryRunner는 자동으로 주입됨
        const user = await this.userRepository.save(userData, { queryRunner });
        const profile = await this.profileRepository.save({ userId: user.id }, { queryRunner });
        return { user, profile };
    }
}
```

## 중첩 트랜잭션 예시

```typescript
@Injectable()
export class OrderService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly userService: UserService,
        private readonly productService: ProductService,
    ) {}

    @Transactional()
    async createOrder(orderData: CreateOrderDto, queryRunner?: QueryRunner) {
        // 1. 사용자 생성 (내부적으로 queryRunner 재사용)
        const user = await this.userService.createUser(orderData.user, queryRunner);

        // 2. 상품 재고 차감 (같은 트랜잭션)
        const product = await this.productService.decreaseStock(orderData.productId, queryRunner);

        // 3. 주문 생성
        const order = await this.orderRepository.save(
            {
                userId: user.id,
                productId: product.id,
                quantity: orderData.quantity,
            },
            { queryRunner },
        );

        return order;
    }
}
```

### 동작 방식

```
createOrder (새 트랜잭션 시작)
  ├─ createUser (queryRunner 재사용)
  │   └─ createProfile (queryRunner 재사용)
  ├─ decreaseStock (queryRunner 재사용)
  └─ createOrder (queryRunner 재사용)
(모두 성공 → 커밋 / 하나라도 실패 → 전체 롤백)
```

## 실제 적용 예시 (approval-flow.context.ts)

```typescript
@Injectable()
export class ApprovalFlowContext {
    constructor(
        private readonly dataSource: DataSource,
        private readonly formService: DomainFormService,
        private readonly approvalLineService: DomainApprovalLineService,
    ) {}

    // 방법 1: 현재 방식 (수동 관리)
    async createFormWithApprovalLine(dto: CreateFormWithApprovalLineDto, externalQueryRunner?: QueryRunner) {
        const queryRunner = externalQueryRunner || this.dataSource.createQueryRunner();
        const shouldManageTransaction = !externalQueryRunner;

        if (shouldManageTransaction) {
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            const form = await this.formService.create(dto.formData, { queryRunner });
            const line = await this.approvalLineService.create(dto.lineData, { queryRunner });

            if (shouldManageTransaction) {
                await queryRunner.commitTransaction();
            }
            return { form, line };
        } catch (error) {
            if (shouldManageTransaction) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally {
            if (shouldManageTransaction) {
                await queryRunner.release();
            }
        }
    }

    // 방법 2: withTransaction 사용 (권장)
    async createFormWithApprovalLine(dto: CreateFormWithApprovalLineDto, externalQueryRunner?: QueryRunner) {
        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const form = await this.formService.create(dto.formData, { queryRunner });
                const line = await this.approvalLineService.create(dto.lineData, { queryRunner });
                return { form, line };
            },
            externalQueryRunner,
        );
    }

    // 방법 3: @Transactional 사용 (가장 간편)
    @Transactional()
    async createFormWithApprovalLine(dto: CreateFormWithApprovalLineDto, queryRunner?: QueryRunner) {
        const form = await this.formService.create(dto.formData, { queryRunner });
        const line = await this.approvalLineService.create(dto.lineData, { queryRunner });
        return { form, line };
    }
}
```

## 선택 가이드

| 방법                   | 장점                     | 단점                     | 권장 상황            |
| ---------------------- | ------------------------ | ------------------------ | -------------------- |
| **prepareTransaction** | 가장 명시적, 세밀한 제어 | 코드가 많음, 실수 가능성 | 복잡한 트랜잭션 로직 |
| **withTransaction**    | 간결함, 안전함           | 콜백 구조                | 일반적인 경우 (권장) |
| **@Transactional**     | 가장 깔끔함              | magic, 디버깅 어려움     | 간단한 CRUD          |

## 주의사항

### 1. QueryRunner 파라미터 위치

```typescript
// ✅ 올바름: 마지막 파라미터
async createUser(userData: CreateUserDto, queryRunner?: QueryRunner) {}

// ❌ 잘못됨: 중간 파라미터
async createUser(queryRunner: QueryRunner, userData: CreateUserDto) {}
```

### 2. 반드시 queryRunner 전달

```typescript
// ✅ 올바름
await this.repository.save(entity, { queryRunner });

// ❌ 잘못됨: 트랜잭션 무시됨
await this.repository.save(entity);
```

### 3. 에러 처리

```typescript
// ✅ 올바름: 에러를 다시 던짐
catch (error) {
    if (shouldManage) {
        await queryRunner.rollbackTransaction();
    }
    throw error; // 중요!
}

// ❌ 잘못됨: 에러를 숨김
catch (error) {
    console.error(error);
    return null; // 상위에서 롤백 불가능
}
```

## 마이그레이션 가이드

### 기존 코드

```typescript
async createForm(dto: CreateFormDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const form = await this.formService.create(dto);
        await queryRunner.commitTransaction();
        return form;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
}
```

### 개선 후

```typescript
// 방법 1: withTransaction
async createForm(dto: CreateFormDto, externalQueryRunner?: QueryRunner) {
    return await withTransaction(
        this.dataSource,
        async (queryRunner) => {
            return await this.formService.create(dto, { queryRunner });
        },
        externalQueryRunner,
    );
}

// 방법 2: @Transactional (가장 간단)
@Transactional()
async createForm(dto: CreateFormDto, queryRunner?: QueryRunner) {
    return await this.formService.create(dto, { queryRunner });
}
```

## 결론

- **일반적인 경우**: `withTransaction` 사용 권장
- **매우 간단한 경우**: `@Transactional` 데코레이터
- **복잡한 로직**: `prepareTransaction`으로 수동 관리
- **중첩 호출**: 항상 `queryRunner`를 마지막 파라미터로 전달
