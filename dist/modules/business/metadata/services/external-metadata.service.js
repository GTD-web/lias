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
var ExternalMetadataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalMetadataService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ExternalMetadataService = ExternalMetadataService_1 = class ExternalMetadataService {
    constructor() {
        this.logger = new common_1.Logger(ExternalMetadataService_1.name);
        this.ssoApiUrl = process.env.SSO_API_URL || '';
        if (!this.ssoApiUrl) {
            this.logger.warn('SSO_API_URL 환경변수가 설정되지 않았습니다.');
        }
    }
    async fetchAllMetadata() {
        this.logger.log('외부 API에서 메타데이터 조회 시작');
        try {
            const url = `${this.ssoApiUrl}/api/organization/export/all`;
            this.logger.debug(`API 호출: ${url}`);
            const response = await axios_1.default.get(url, {
                timeout: 30000,
            });
            this.logger.log(`메타데이터 조회 완료: ${response.data.totalCounts?.departments || 0}개 부서, ${response.data.totalCounts?.employees || 0}명 직원`);
            return response.data;
        }
        catch (error) {
            this.logger.error('외부 API에서 메타데이터 조회 실패', error);
            throw new Error(`메타데이터 조회 실패: ${error.message}`);
        }
    }
};
exports.ExternalMetadataService = ExternalMetadataService;
exports.ExternalMetadataService = ExternalMetadataService = ExternalMetadataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ExternalMetadataService);
//# sourceMappingURL=external-metadata.service.js.map