"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTransaction = prepareTransaction;
exports.withTransaction = withTransaction;
exports.Transactional = Transactional;
const common_1 = require("@nestjs/common");
function prepareTransaction(dataSource, externalQueryRunner) {
    const queryRunner = externalQueryRunner || dataSource.createQueryRunner();
    const shouldManage = !externalQueryRunner;
    return {
        queryRunner,
        shouldManage,
    };
}
async function withTransaction(dataSource, callback, externalQueryRunner) {
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
    }
    catch (error) {
        if (shouldManage) {
            await queryRunner.rollbackTransaction();
        }
        throw error;
    }
    finally {
        if (shouldManage) {
            await queryRunner.release();
        }
    }
}
function Transactional(options) {
    const logger = new common_1.Logger('Transactional');
    const shouldLogErrors = options?.logErrors !== false;
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const dataSource = this.dataSource;
            if (!dataSource) {
                throw new Error(`${target.constructor.name}.${propertyKey}: DataSource를 찾을 수 없습니다. ` +
                    `클래스에 'dataSource' 속성이 필요합니다.`);
            }
            const lastArg = args[args.length - 1];
            const externalQueryRunner = lastArg && typeof lastArg === 'object' && 'manager' in lastArg ? lastArg : undefined;
            return await withTransaction(dataSource, async (queryRunner) => {
                const finalArgs = externalQueryRunner
                    ? [...args.slice(0, -1), queryRunner]
                    : [...args, queryRunner];
                return await originalMethod.apply(this, finalArgs);
            }, externalQueryRunner);
        };
        return descriptor;
    };
}
//# sourceMappingURL=transaction.util.js.map