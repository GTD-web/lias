"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResourceEntity1716171600000 = void 0;
class UpdateResourceEntity1716171600000 {
    constructor() {
        this.name = 'UpdateResourceEntity1716171600000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "locationURLs" jsonb`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN IF EXISTS "locationURLs"`);
    }
}
exports.UpdateResourceEntity1716171600000 = UpdateResourceEntity1716171600000;
//# sourceMappingURL=1716171600000-UpdateResourceEntity.js.map