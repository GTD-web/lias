import { DataSource, QueryRunner } from 'typeorm';
export declare function prepareTransaction(dataSource: DataSource, externalQueryRunner?: QueryRunner): {
    queryRunner: QueryRunner;
    shouldManage: boolean;
};
export declare function withTransaction<T>(dataSource: DataSource, callback: (queryRunner: QueryRunner) => Promise<T>, externalQueryRunner?: QueryRunner): Promise<T>;
export declare function Transactional(options?: {
    isolationLevel?: any;
    logErrors?: boolean;
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
