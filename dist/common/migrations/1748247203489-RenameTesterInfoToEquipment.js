"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameTesterInfoToEquipment1748247203489 = void 0;
class RenameTesterInfoToEquipment1748247203489 {
    constructor() {
        this.name = 'RenameTesterInfoToEquipment1748247203489';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TYPE "public"."resources_type_enum" RENAME VALUE 'TESTER' TO 'EQUIPMENT'
        `);
        await queryRunner.query(`
            ALTER TABLE "tester_infos" RENAME TO "equipment_infos"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME COLUMN "testerInfoId" TO "equipmentInfoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME CONSTRAINT "PK_tester_infos" TO "PK_equipment_infos"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME CONSTRAINT "UQ_tester_infos_resourceId" TO "UQ_equipment_infos_resourceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME CONSTRAINT "FK_tester_infos_resources" TO "FK_equipment_infos_resources"
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME CONSTRAINT "FK_equipment_infos_resources" TO "FK_tester_infos_resources"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME CONSTRAINT "UQ_equipment_infos_resourceId" TO "UQ_tester_infos_resourceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME CONSTRAINT "PK_equipment_infos" TO "PK_tester_infos"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" 
            RENAME COLUMN "equipmentInfoId" TO "testerInfoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment_infos" RENAME TO "tester_infos"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."resources_type_enum" RENAME VALUE 'EQUIPMENT' TO 'TESTER'
        `);
    }
}
exports.RenameTesterInfoToEquipment1748247203489 = RenameTesterInfoToEquipment1748247203489;
//# sourceMappingURL=1748247203489-RenameTesterInfoToEquipment.js.map