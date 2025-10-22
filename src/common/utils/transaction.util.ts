import { DataSource, QueryRunner } from 'typeorm';
import { Logger } from '@nestjs/common';

/**
 * 트랜잭션 유틸리티
 *
 * 중첩된 트랜잭션 호출을 안전하게 처리합니다.
 *
 * 사용 예시 1 - prepareTransaction:
 * ```typescript
 * async myMethod(externalQueryRunner?: QueryRunner) {
 *   const { queryRunner, shouldManage } = prepareTransaction(
 *     this.dataSource,
 *     externalQueryRunner
 *   );
 *
 *   if (shouldManage) {
 *     await queryRunner.connect();
 *     await queryRunner.startTransaction();
 *   }
 *
 *   try {
 *     // ... 비즈니스 로직 ...
 *     if (shouldManage) {
 *       await queryRunner.commitTransaction();
 *     }
 *   } catch (error) {
 *     if (shouldManage) {
 *       await queryRunner.rollbackTransaction();
 *     }
 *     throw error;
 *   } finally {
 *     if (shouldManage) {
 *       await queryRunner.release();
 *     }
 *   }
 * }
 * ```
 *
 * 사용 예시 2 - withTransaction:
 * ```typescript
 * async myMethod(externalQueryRunner?: QueryRunner) {
 *   return await withTransaction(
 *     this.dataSource,
 *     async (queryRunner) => {
 *       // 비즈니스 로직
 *       const entity = await this.service.create(data, { queryRunner });
 *       return entity;
 *     },
 *     externalQueryRunner
 *   );
 * }
 * ```
 *
 * 사용 예시 3 - @Transactional 데코레이터:
 * ```typescript
 * class MyService {
 *   constructor(private readonly dataSource: DataSource) {}
 *
 *   @Transactional()
 *   async myMethod(data: any, queryRunner?: QueryRunner) {
 *     // queryRunner는 자동으로 주입됨
 *     // 비즈니스 로직에서 queryRunner 사용
 *     await this.repository.save(entity, { queryRunner });
 *   }
 * }
 * ```
 */

/**
 * QueryRunner 준비
 *
 * @param dataSource TypeORM DataSource
 * @param externalQueryRunner 외부에서 전달된 QueryRunner (선택적)
 * @returns queryRunner와 트랜잭션 관리 여부
 */
export function prepareTransaction(dataSource: DataSource, externalQueryRunner?: QueryRunner) {
    const queryRunner = externalQueryRunner || dataSource.createQueryRunner();
    const shouldManage = !externalQueryRunner;

    return {
        queryRunner,
        shouldManage,
    };
}

/**
 * 트랜잭션 내에서 함수를 실행하는 래퍼
 *
 * @param dataSource TypeORM DataSource
 * @param callback 실행할 콜백 함수
 * @param externalQueryRunner 외부에서 전달된 QueryRunner (선택적)
 * @returns 콜백 함수의 반환값
 */
export async function withTransaction<T>(
    dataSource: DataSource,
    callback: (queryRunner: QueryRunner) => Promise<T>,
    externalQueryRunner?: QueryRunner,
): Promise<T> {
    const { queryRunner, shouldManage } = prepareTransaction(dataSource, externalQueryRunner);

    if (shouldManage) {
        await queryRunner.connect();
        await queryRunner.startTransaction();
    }

    try {
        const result = await callback(queryRunner);

        if (shouldManage) {
            await queryRunner.commitTransaction();
        }

        return result;
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

/**
 * Transactional 데코레이터
 *
 * 메서드에 자동으로 트랜잭션을 적용합니다.
 * 클래스에 dataSource 속성이 있어야 합니다.
 *
 * @param options 트랜잭션 옵션
 * @param options.isolationLevel 격리 수준 (선택적)
 * @param options.logErrors 에러 로깅 여부 (기본값: true)
 *
 * 사용 예시:
 * ```typescript
 * class MyService {
 *   constructor(private readonly dataSource: DataSource) {}
 *
 *   @Transactional()
 *   async createUser(userData: CreateUserDto, queryRunner?: QueryRunner) {
 *     // queryRunner는 자동으로 관리됨
 *     // 마지막 파라미터가 QueryRunner 타입이면 자동 주입
 *     await this.userRepository.save(user, { queryRunner });
 *     await this.profileRepository.save(profile, { queryRunner });
 *     return user;
 *   }
 * }
 * ```
 */
export function Transactional(options?: { isolationLevel?: any; logErrors?: boolean }) {
    const logger = new Logger('Transactional');
    const shouldLogErrors = options?.logErrors !== false;

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            // 클래스 인스턴스에서 dataSource 가져오기
            const dataSource: DataSource = (this as any).dataSource;

            if (!dataSource) {
                throw new Error(
                    `${target.constructor.name}.${propertyKey}: DataSource를 찾을 수 없습니다. ` +
                        `클래스에 'dataSource' 속성이 필요합니다.`,
                );
            }

            // 마지막 파라미터가 QueryRunner인지 확인
            const lastArg = args[args.length - 1];
            const externalQueryRunner =
                lastArg && typeof lastArg === 'object' && 'manager' in lastArg ? lastArg : undefined;

            return await withTransaction(
                dataSource,
                async (queryRunner) => {
                    // 마지막 파라미터를 queryRunner로 교체하거나 추가
                    const finalArgs = externalQueryRunner
                        ? [...args.slice(0, -1), queryRunner]
                        : [...args, queryRunner];

                    return await originalMethod.apply(this, finalArgs);
                },
                externalQueryRunner,
            );
        };

        return descriptor;
    };
}
