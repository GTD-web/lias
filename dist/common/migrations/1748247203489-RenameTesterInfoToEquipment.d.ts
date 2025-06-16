import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RenameTesterInfoToEquipment1748247203489 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
