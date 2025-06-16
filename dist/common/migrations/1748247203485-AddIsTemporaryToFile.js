"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsTemporaryToFile1748247203485 = void 0;
class AddIsTemporaryToFile1748247203485 {
    constructor() {
        this.name = 'AddIsTemporaryToFile1748247203485';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "files" 
            ADD COLUMN IF NOT EXISTS "isTemporary" boolean DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "files" 
            ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        `);
        await queryRunner.query(`
            UPDATE "files" f
            SET "isTemporary" = false
            WHERE EXISTS (
                SELECT 1 FROM "resources" r
                WHERE r.images::jsonb ? f."filePath"
            )
        `);
        await queryRunner.query(`
            UPDATE "files" f
            SET "isTemporary" = false
            WHERE EXISTS (
                SELECT 1 FROM "vehicle_infos" v
                WHERE 
                    (v."parkingLocationImages"::jsonb ? f."filePath") OR
                    (v."odometerImages"::jsonb ? f."filePath") OR
                    (v."indoorImages"::jsonb ? f."filePath")
            )
        `);
        await queryRunner.query(`
            UPDATE "files" f
            SET "isTemporary" = false
            WHERE EXISTS (
                SELECT 1 FROM "maintenances" m
                WHERE m.images::jsonb ? f."filePath"
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "files" 
            DROP COLUMN IF EXISTS "isTemporary",
            DROP COLUMN IF EXISTS "createdAt"
        `);
    }
}
exports.AddIsTemporaryToFile1748247203485 = AddIsTemporaryToFile1748247203485;
//# sourceMappingURL=1748247203485-AddIsTemporaryToFile.js.map