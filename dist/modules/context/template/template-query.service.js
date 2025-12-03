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
var TemplateQueryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateQueryService = void 0;
const common_1 = require("@nestjs/common");
const document_template_service_1 = require("../../domain/document-template/document-template.service");
const category_service_1 = require("../../domain/category/category.service");
let TemplateQueryService = TemplateQueryService_1 = class TemplateQueryService {
    constructor(documentTemplateService, categoryService) {
        this.documentTemplateService = documentTemplateService;
        this.categoryService = categoryService;
        this.logger = new common_1.Logger(TemplateQueryService_1.name);
    }
    async getDocumentTemplate(templateId) {
        this.logger.debug(`문서 템플릿 상세 조회: ${templateId}`);
        const template = await this.documentTemplateService.findOneWithError({
            where: { id: templateId },
            relations: ['category', 'approvalStepTemplates'],
        });
        if (template.approvalStepTemplates) {
            template.approvalStepTemplates.sort((a, b) => a.stepOrder - b.stepOrder);
        }
        return template;
    }
    async getDocumentTemplates(query) {
        this.logger.debug(`문서 템플릿 목록 조회: ${JSON.stringify(query)}`);
        const { searchKeyword, categoryId, status, sortOrder = 'LATEST', page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const baseQb = this.documentTemplateService.createQueryBuilder('template');
        if (searchKeyword) {
            baseQb.andWhere('(template.name LIKE :keyword OR template.description LIKE :keyword)', {
                keyword: `%${searchKeyword}%`,
            });
        }
        if (categoryId) {
            baseQb.andWhere('template.categoryId = :categoryId', { categoryId });
        }
        if (status) {
            baseQb.andWhere('template.status = :status', { status });
        }
        if (sortOrder === 'LATEST') {
            baseQb.orderBy('template.createdAt', 'DESC');
        }
        else {
            baseQb.orderBy('template.createdAt', 'ASC');
        }
        const totalItems = await baseQb.getCount();
        const templateIds = await baseQb.clone().select('template.id').skip(skip).take(limit).getRawMany();
        this.logger.debug(`페이지네이션 적용: skip=${skip}, limit=${limit}, 조회된 ID 개수=${templateIds.length}, 전체=${totalItems}`);
        let templates = [];
        if (templateIds.length > 0) {
            const ids = templateIds.map((item) => item.template_id);
            const templatesMap = await this.documentTemplateService
                .createQueryBuilder('template')
                .leftJoinAndSelect('template.category', 'category')
                .leftJoinAndSelect('template.approvalStepTemplates', 'approvalSteps')
                .whereInIds(ids)
                .orderBy('approvalSteps.stepOrder', 'ASC')
                .getMany();
            const templateMap = new Map(templatesMap.map((tmpl) => [tmpl.id, tmpl]));
            templates = ids.map((id) => templateMap.get(id)).filter((tmpl) => tmpl !== undefined);
        }
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: templates,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
            },
        };
    }
    async getApprovalStepTemplatesByDocumentTemplate(documentTemplateId) {
        this.logger.debug(`결재단계 템플릿 목록 조회: ${documentTemplateId}`);
        const template = await this.documentTemplateService.findOneWithError({
            where: { id: documentTemplateId },
            relations: ['approvalStepTemplates'],
        });
        return template.approvalStepTemplates.sort((a, b) => a.stepOrder - b.stepOrder);
    }
    async getCategory(categoryId) {
        this.logger.debug(`카테고리 조회: ${categoryId}`);
        return await this.categoryService.findOneWithError({
            where: { id: categoryId },
        });
    }
    async getCategories() {
        this.logger.debug('카테고리 목록 조회');
        const categories = await this.categoryService.findAll({
            order: { order: 'ASC', createdAt: 'ASC' },
        });
        return categories;
    }
};
exports.TemplateQueryService = TemplateQueryService;
exports.TemplateQueryService = TemplateQueryService = TemplateQueryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_template_service_1.DomainDocumentTemplateService,
        category_service_1.DomainCategoryService])
], TemplateQueryService);
//# sourceMappingURL=template-query.service.js.map