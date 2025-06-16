import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsTemporaryToFile1748247203485 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
