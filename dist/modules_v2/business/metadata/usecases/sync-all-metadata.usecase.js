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
var SyncAllMetadataUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncAllMetadataUsecase = void 0;
const common_1 = require("@nestjs/common");
const context_1 = require("../../../context");
const external_metadata_service_1 = require("../services/external-metadata.service");
let SyncAllMetadataUsecase = SyncAllMetadataUsecase_1 = class SyncAllMetadataUsecase {
    constructor(metadataSyncContext, externalMetadataService) {
        this.metadataSyncContext = metadataSyncContext;
        this.externalMetadataService = externalMetadataService;
        this.logger = new common_1.Logger(SyncAllMetadataUsecase_1.name);
    }
    async execute() {
        this.logger.log('메타데이터 동기화 프로세스 시작');
        try {
            this.logger.log('외부 API에서 메타데이터 조회 중...');
            const externalData = await this.externalMetadataService.fetchAllMetadata();
            this.logger.log('메타데이터 동기화 시작...');
            await this.metadataSyncContext.syncAllMetadata({
                positions: externalData.positions || [],
                ranks: externalData.ranks || [],
                departments: externalData.departments || [],
                employees: externalData.employees || [],
                employeeDepartmentPositions: externalData.employeeDepartmentPositions || [],
            });
            const response = {
                success: true,
                message: '메타데이터 동기화가 성공적으로 완료되었습니다.',
                syncedCounts: {
                    departments: externalData.departments?.length || 0,
                    employees: externalData.employees?.length || 0,
                    positions: externalData.positions?.length || 0,
                    ranks: externalData.ranks?.length || 0,
                    employeeDepartmentPositions: externalData.employeeDepartmentPositions?.length || 0,
                },
                syncedAt: new Date(),
            };
            const totalSynced = response.syncedCounts.departments +
                response.syncedCounts.employees +
                response.syncedCounts.positions +
                response.syncedCounts.ranks +
                response.syncedCounts.employeeDepartmentPositions;
            this.logger.log(`메타데이터 동기화 완료: 총 ${totalSynced}개 항목`);
            return response;
        }
        catch (error) {
            this.logger.error('메타데이터 동기화 프로세스 실패', error);
            throw error;
        }
    }
};
exports.SyncAllMetadataUsecase = SyncAllMetadataUsecase;
exports.SyncAllMetadataUsecase = SyncAllMetadataUsecase = SyncAllMetadataUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [context_1.MetadataSyncContext,
        external_metadata_service_1.ExternalMetadataService])
], SyncAllMetadataUsecase);
//# sourceMappingURL=sync-all-metadata.usecase.js.map