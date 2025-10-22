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
exports.MetadataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const sync_all_metadata_usecase_1 = require("../usecases/sync-all-metadata.usecase");
const dtos_1 = require("../dtos");
let MetadataController = class MetadataController {
    constructor(syncAllMetadataUsecase) {
        this.syncAllMetadataUsecase = syncAllMetadataUsecase;
    }
    async syncMetadata() {
        return await this.syncAllMetadataUsecase.execute();
    }
};
exports.MetadataController = MetadataController;
__decorate([
    (0, common_1.Post)('sync'),
    (0, swagger_1.ApiOperation)({
        summary: '메타데이터 전체 동기화',
        description: '외부 SSO API에서 메타데이터(부서, 직원, 직급 등)를 가져와 전체 동기화합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '메타데이터 동기화 성공',
        type: dtos_1.SyncMetadataResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: '메타데이터 동기화 실패',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataController.prototype, "syncMetadata", null);
exports.MetadataController = MetadataController = __decorate([
    (0, swagger_1.ApiTags)('메타데이터 동기화'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [sync_all_metadata_usecase_1.SyncAllMetadataUsecase])
], MetadataController);
//# sourceMappingURL=metadata.controller.js.map