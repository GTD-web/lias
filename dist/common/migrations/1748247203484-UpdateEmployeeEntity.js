"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeEntity1748247203484 = void 0;
class UpdateEmployeeEntity1748247203484 {
    async up(queryRunner) {
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE "public"."role_type_enum" AS ENUM ('USER', 'RESOURCE_ADMIN', 'SYSTEM_ADMIN');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);
        await queryRunner.query(`
            ALTER TABLE employees 
            ADD COLUMN roles_tmp role_type_enum[] DEFAULT '{USER}'::role_type_enum[]
        `);
        await queryRunner.query(`
            UPDATE employees 
            SET roles_tmp = roles::text[]::role_type_enum[]
        `);
        await queryRunner.query(`
            ALTER TABLE employees 
            DROP COLUMN roles
        `);
        await queryRunner.query(`
            ALTER TABLE employees 
            RENAME COLUMN roles_tmp TO roles
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE employees 
            ADD COLUMN roles_tmp text[] DEFAULT '{USER}'
        `);
        await queryRunner.query(`
            UPDATE employees 
            SET roles_tmp = roles::text[]
        `);
        await queryRunner.query(`
            ALTER TABLE employees 
            DROP COLUMN roles
        `);
        await queryRunner.query(`
            ALTER TABLE employees 
            RENAME COLUMN roles_tmp TO roles
        `);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."role_type_enum"`);
    }
}
exports.UpdateEmployeeEntity1748247203484 = UpdateEmployeeEntity1748247203484;
//# sourceMappingURL=1748247203484-UpdateEmployeeEntity.js.map