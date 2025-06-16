"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEquipmentTypeToResourceGroup1748247203490 = void 0;
class AddEquipmentTypeToResourceGroup1748247203490 {
    constructor() {
        this.name = 'AddEquipmentTypeToResourceGroup1748247203490';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TYPE "public"."resource_groups_type_enum" ADD VALUE IF NOT EXISTS 'EQUIPMENT'
        `);
    }
    async down(queryRunner) {
    }
}
exports.AddEquipmentTypeToResourceGroup1748247203490 = AddEquipmentTypeToResourceGroup1748247203490;
//# sourceMappingURL=1748247203490-AddEquipmentTypeToResourceGroup.js.map