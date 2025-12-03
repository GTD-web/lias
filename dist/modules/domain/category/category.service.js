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
exports.DomainCategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("./category.repository");
const base_service_1 = require("../../../common/services/base.service");
const category_entity_1 = require("./category.entity");
let DomainCategoryService = class DomainCategoryService extends base_service_1.BaseService {
    constructor(categoryRepository) {
        super(categoryRepository);
        this.categoryRepository = categoryRepository;
    }
    async createCategory(params, queryRunner) {
        const category = new category_entity_1.Category();
        category.이름을설정한다(params.name);
        category.코드를설정한다(params.code);
        if (params.description) {
            category.설명을설정한다(params.description);
        }
        if (params.order !== undefined) {
            category.정렬순서를설정한다(params.order);
        }
        return await this.categoryRepository.save(category, { queryRunner });
    }
    async updateCategory(category, params, queryRunner) {
        if (params.name) {
            category.이름을설정한다(params.name);
        }
        if (params.code) {
            category.코드를설정한다(params.code);
        }
        if (params.description !== undefined) {
            category.설명을설정한다(params.description);
        }
        if (params.order !== undefined) {
            category.정렬순서를설정한다(params.order);
        }
        return await this.categoryRepository.save(category, { queryRunner });
    }
};
exports.DomainCategoryService = DomainCategoryService;
exports.DomainCategoryService = DomainCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.DomainCategoryRepository])
], DomainCategoryService);
//# sourceMappingURL=category.service.js.map