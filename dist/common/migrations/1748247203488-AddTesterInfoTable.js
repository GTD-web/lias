"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTesterInfoTable1748247203488 = void 0;
class AddTesterInfoTable1748247203488 {
    constructor() {
        this.name = 'AddTesterInfoTable1748247203488';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TYPE "public"."resources_type_enum" ADD VALUE IF NOT EXISTS 'TESTER'
        `);
        await queryRunner.query(`
            CREATE TABLE "tester_infos" (
                "testerInfoId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "resourceId" uuid NOT NULL,
                CONSTRAINT "PK_tester_infos" PRIMARY KEY ("testerInfoId"),
                CONSTRAINT "UQ_tester_infos_resourceId" UNIQUE ("resourceId"),
                CONSTRAINT "FK_tester_infos_resources" FOREIGN KEY ("resourceId") 
                    REFERENCES "resources"("resourceId") ON DELETE CASCADE
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "tester_infos"
        `);
    }
}
exports.AddTesterInfoTable1748247203488 = AddTesterInfoTable1748247203488;
//# sourceMappingURL=1748247203488-AddTesterInfoTable.js.map