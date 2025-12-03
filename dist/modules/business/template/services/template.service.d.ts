import { DataSource } from 'typeorm';
import { TemplateContext } from '../../../context/template/template.context';
import { TemplateQueryService } from '../../../context/template/template-query.service';
import { ApproverMappingService } from '../../../context/template/approver-mapping.service';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { UpdateTemplateDto } from '../dtos/update-template.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { DocumentTemplateStatus } from '../../../../common/enums/approval.enum';
export declare class TemplateService {
    private readonly dataSource;
    private readonly templateContext;
    private readonly templateQueryService;
    private readonly approverMappingService;
    private readonly logger;
    constructor(dataSource: DataSource, templateContext: TemplateContext, templateQueryService: TemplateQueryService, approverMappingService: ApproverMappingService);
    createTemplateWithApprovalSteps(dto: CreateTemplateDto): Promise<{
        documentTemplate: import("../../../domain").DocumentTemplate;
        approvalSteps: any[];
    }>;
    updateTemplate(templateId: string, dto: UpdateTemplateDto): Promise<import("../../../domain").DocumentTemplate>;
    deleteTemplate(templateId: string): Promise<void>;
    getTemplates(query: {
        searchKeyword?: string;
        categoryId?: string;
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
    getTemplate(templateId: string): Promise<import("../../../domain").DocumentTemplate>;
    getTemplateWithMappedApprovers(templateId: string, drafterId: string): Promise<{
        drafter: {
            id: string;
            employeeNumber: string;
            name: string;
            email: string;
            department: {
                id: string;
                departmentName: string;
                departmentCode: string;
            };
            position: {
                id: string;
                positionTitle: string;
                positionCode: string;
                level: number;
            };
        };
        approvalStepTemplates: any[];
        id: string;
        name: string;
        code: string;
        description?: string;
        status: DocumentTemplateStatus;
        template: string;
        categoryId?: string;
        createdAt: Date;
        updatedAt: Date;
        category?: import("../../../domain").Category;
    }>;
    createCategory(dto: CreateCategoryDto): Promise<import("../../../domain").Category>;
    updateCategory(categoryId: string, dto: UpdateCategoryDto): Promise<import("../../../domain").Category>;
    deleteCategory(categoryId: string): Promise<void>;
    getCategories(): Promise<import("../../../domain").Category[]>;
    getCategory(categoryId: string): Promise<import("../../../domain").Category>;
}
