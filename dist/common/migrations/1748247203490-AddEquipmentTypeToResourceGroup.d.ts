import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddEquipmentTypeToResourceGroup1748247203490 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
