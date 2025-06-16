"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResourceLocationAddress1748247203486 = void 0;
class UpdateResourceLocationAddress1748247203486 {
    async up(queryRunner) {
        const resources = await queryRunner.query(`
            SELECT "resourceId", location
            FROM resources
            WHERE location IS NOT NULL
        `);
        for (const resource of resources) {
            const location = resource.location;
            if (location && location.detailAddress) {
                const updatedLocation = {
                    address: `${location.address} ${location.detailAddress}`,
                };
                await queryRunner.query(`
                    UPDATE resources
                    SET location = $1
                    WHERE "resourceId" = $2
                    `, [updatedLocation, resource.resourceId]);
            }
        }
    }
    async down(queryRunner) {
    }
}
exports.UpdateResourceLocationAddress1748247203486 = UpdateResourceLocationAddress1748247203486;
//# sourceMappingURL=1748247203486-UpdateResourceLocationAddress.js.map