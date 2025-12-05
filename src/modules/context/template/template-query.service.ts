import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainCategoryService } from '../../domain/category/category.service';
import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';

/**
 * 템플릿 조회 서비스
 *
 * 역할:
 * - 문서 템플릿 목록 조회 (검색, 필터링, 페이지네이션)
 * - 문서 템플릿 상세 조회
 * - 카테고리 조회
 */
@Injectable()
export class TemplateQueryService {
    private readonly logger = new Logger(TemplateQueryService.name);

    constructor(
        private readonly documentTemplateService: DomainDocumentTemplateService,
        private readonly categoryService: DomainCategoryService,
    ) {}

    /**
     * 문서 템플릿 상세 조회
     */
    async getDocumentTemplate(templateId: string) {
        this.logger.debug(`문서 템플릿 상세 조회: ${templateId}`);

        const template = await this.documentTemplateService.findOneWithError({
            where: { id: templateId },
            relations: [
                'category',
                'approvalStepTemplates',
                'approvalStepTemplates.targetEmployee',
                'approvalStepTemplates.targetDepartment',
                'approvalStepTemplates.targetPosition',
            ],
        });

        // 결재단계 정렬
        if (template.approvalStepTemplates) {
            template.approvalStepTemplates.sort((a, b) => a.stepOrder - b.stepOrder);
        }

        return template;
    }

    /**
     * 문서 템플릿 목록 조회 (검색, 페이지네이션, 정렬 포함)
     */
    async getDocumentTemplates(query: {
        searchKeyword?: string;
        categoryId?: string;
        status?: DocumentTemplateStatus;
        sortOrder?: 'LATEST' | 'OLDEST';
        page?: number;
        limit?: number;
    }) {
        this.logger.debug(`문서 템플릿 목록 조회: ${JSON.stringify(query)}`);

        const { searchKeyword, categoryId, status, sortOrder = 'LATEST', page = 1, limit = 20 } = query;

        // 페이지네이션 계산
        const skip = (page - 1) * limit;

        // 기본 QueryBuilder 생성
        const baseQb = this.documentTemplateService.createQueryBuilder('template');

        // 검색어 필터
        if (searchKeyword) {
            baseQb.andWhere('(template.name LIKE :keyword OR template.description LIKE :keyword)', {
                keyword: `%${searchKeyword}%`,
            });
        }

        // 카테고리 필터
        if (categoryId) {
            baseQb.andWhere('template.categoryId = :categoryId', { categoryId });
        }

        // 상태 필터
        if (status) {
            baseQb.andWhere('template.status = :status', { status });
        }

        // 정렬
        if (sortOrder === 'LATEST') {
            baseQb.orderBy('template.createdAt', 'DESC');
        } else {
            baseQb.orderBy('template.createdAt', 'ASC');
        }

        // 1단계: 전체 개수 조회
        const totalItems = await baseQb.getCount();

        // 2단계: 페이지네이션 적용하여 template ID만 조회
        const templateIds = await baseQb.clone().select('template.id').skip(skip).take(limit).getRawMany();

        this.logger.debug(
            `페이지네이션 적용: skip=${skip}, limit=${limit}, 조회된 ID 개수=${templateIds.length}, 전체=${totalItems}`,
        );

        // 3단계: ID 기준으로 전체 데이터 조회 (category, approvalSteps 포함)
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

            // ID 순서대로 정렬 (페이지네이션 순서 유지)
            const templateMap = new Map(templatesMap.map((tmpl) => [tmpl.id, tmpl]));
            templates = ids.map((id) => templateMap.get(id)).filter((tmpl) => tmpl !== undefined);
        }

        // 페이징 메타데이터 계산
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

    /**
     * 결재단계 템플릿 목록 조회 (문서 템플릿 기준)
     */
    async getApprovalStepTemplatesByDocumentTemplate(documentTemplateId: string) {
        this.logger.debug(`결재단계 템플릿 목록 조회: ${documentTemplateId}`);

        const template = await this.documentTemplateService.findOneWithError({
            where: { id: documentTemplateId },
            relations: ['approvalStepTemplates'],
        });

        return template.approvalStepTemplates.sort((a, b) => a.stepOrder - b.stepOrder);
    }

    /**
     * 카테고리 상세 조회
     */
    async getCategory(categoryId: string) {
        this.logger.debug(`카테고리 조회: ${categoryId}`);

        return await this.categoryService.findOneWithError({
            where: { id: categoryId },
        });
    }

    /**
     * 카테고리 목록 조회
     */
    async getCategories() {
        this.logger.debug('카테고리 목록 조회');

        const categories = await this.categoryService.findAll({
            order: { order: 'ASC', createdAt: 'ASC' },
        });

        return categories;
    }
}
