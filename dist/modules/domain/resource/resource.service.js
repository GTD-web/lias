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
exports.DomainResourceService = void 0;
const common_1 = require("@nestjs/common");
const resource_repository_1 = require("./resource.repository");
const base_service_1 = require("@libs/services/base.service");
let DomainResourceService = class DomainResourceService extends base_service_1.BaseService {
    constructor(resourceRepository) {
        super(resourceRepository);
        this.resourceRepository = resourceRepository;
    }
    async softDelete(resourceId, options) {
        await this.resourceRepository.softDelete(resourceId, options);
    }
};
exports.DomainResourceService = DomainResourceService;
exports.DomainResourceService = DomainResourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [resource_repository_1.DomainResourceRepository])
], DomainResourceService);
//# sourceMappingURL=resource.service.js.map