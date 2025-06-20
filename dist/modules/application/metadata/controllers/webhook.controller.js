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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataWebhookController = void 0;
const common_1 = require("@nestjs/common");
const metadata_service_1 = require("../metadata.service");
const swagger_1 = require("@nestjs/swagger");
let MetadataWebhookController = class MetadataWebhookController {
    constructor(metadataService) {
        this.metadataService = metadataService;
    }
    async syncMetadata() {
        await this.metadataService.syncDepartments();
        await this.metadataService.syncEmployees();
        return { message: 'Metadata synced successfully' };
    }
};
exports.MetadataWebhookController = MetadataWebhookController;
__decorate([
    (0, common_1.Get)('sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataWebhookController.prototype, "syncMetadata", null);
exports.MetadataWebhookController = MetadataWebhookController = __decorate([
    (0, swagger_1.ApiTags)('메타데이터 웹훅'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [metadata_service_1.MetadataService])
], MetadataWebhookController);
//# sourceMappingURL=webhook.controller.js.map