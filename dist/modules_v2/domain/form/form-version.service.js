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
exports.DomainFormVersionService = void 0;
const common_1 = require("@nestjs/common");
const form_version_repository_1 = require("./form-version.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainFormVersionService = class DomainFormVersionService extends base_service_1.BaseService {
    constructor(formVersionRepository) {
        super(formVersionRepository);
        this.formVersionRepository = formVersionRepository;
    }
    async findByFormVersionId(id) {
        const formVersion = await this.formVersionRepository.findOne({ where: { id } });
        if (!formVersion) {
            throw new common_1.NotFoundException('양식 버전을 찾을 수 없습니다.');
        }
        return formVersion;
    }
    async findByFormId(formId) {
        return this.formVersionRepository.findByFormId(formId);
    }
    async findActiveVersion(formId) {
        const formVersion = await this.formVersionRepository.findActiveVersion(formId);
        if (!formVersion) {
            throw new common_1.NotFoundException('활성 버전을 찾을 수 없습니다.');
        }
        return formVersion;
    }
    async findByFormIdAndVersionNo(formId, versionNo) {
        const formVersion = await this.formVersionRepository.findByFormIdAndVersionNo(formId, versionNo);
        if (!formVersion) {
            throw new common_1.NotFoundException('양식 버전을 찾을 수 없습니다.');
        }
        return formVersion;
    }
};
exports.DomainFormVersionService = DomainFormVersionService;
exports.DomainFormVersionService = DomainFormVersionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_version_repository_1.DomainFormVersionRepository])
], DomainFormVersionService);
//# sourceMappingURL=form-version.service.js.map