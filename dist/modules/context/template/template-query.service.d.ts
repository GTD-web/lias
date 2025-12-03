import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainCategoryService } from '../../domain/category/category.service';
import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';
export declare class TemplateQueryService {
    private readonly documentTemplateService;
    private readonly categoryService;
    private readonly logger;
    constructor(documentTemplateService: DomainDocumentTemplateService, categoryService: DomainCategoryService);
    getDocumentTemplate(templateId: string): Promise<import("../../domain").DocumentTemplate>;
    getDocumentTemplates(query: {
        searchKeyword?: string;
        categoryId?: string;
        status?: DocumentTemplateStatus;
        sortOrder?: 'LATEST' | 'OLDEST';
        page?: number;
        limit?: number;
    }): Promise<{
        data: any[];
        pagination: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    getApprovalStepTemplatesByDocumentTemplate(documentTemplateId: string): Promise<import("../../domain").ApprovalStepTemplate[]>;
    getCategory(categoryId: string): Promise<import("../../domain").Category>;
    getCategories(): Promise<import("../../domain").Category[]>;
}
