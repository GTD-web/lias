"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderResourcesUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const error_message_1 = require("@libs/constants/error-message");
const typeorm_1 = require("typeorm");
let ReorderResourcesUsecase = class ReorderResourcesUsecase {
    constructor(resourceService, dataSource) {
        this.resourceService = resourceService;
        this.dataSource = dataSource;
    }
    async execute(updateResourceOrdersDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await Promise.all(updateResourceOrdersDto.orders.map(async (order) => {
                await this.resourceService.update(order.resourceId, { order: order.newOrder }, { queryRunner });
            }));
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.FAILED_REORDER);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ReorderResourcesUsecase = ReorderResourcesUsecase;
exports.ReorderResourcesUsecase = ReorderResourcesUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeorm_1.DataSource])
], ReorderResourcesUsecase);
//# sourceMappingURL=reorderResources.usecase.js.map