import { DataSource } from 'typeorm';
import { TemplateContext } from '../../../context/template/template.context';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { UpdateTemplateDto } from '../dtos/update-template.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { DocumentTemplateStatus } from '../../../../common/enums/approval.enum';
export declare class TemplateService {
    private readonly dataSource;
    private readonly templateContext;
    private readonly logger;
    constructor(dataSource: DataSource, templateContext: TemplateContext);
    createTemplateWithApprovalSteps(dto: CreateTemplateDto): Promise<{
        documentTemplate: import("../../../domain").DocumentTemplate;
        approvalSteps: any[];
    }>;
    createCategory(dto: CreateCategoryDto): Promise<import("../../../domain").Category>;
    getCategories(): Promise<import("../../../domain").Category[]>;
    getCategory(categoryId: string): Promise<import("../../../domain").Category>;
    updateCategory(categoryId: string, dto: UpdateCategoryDto): Promise<import("../../../domain").Category>;
    deleteCategory(categoryId: string): Promise<void>;
    getTemplates(categoryId?: string, status?: DocumentTemplateStatus): Promise<import("../../../domain").DocumentTemplate[]>;
    getTemplate(templateId: string): Promise<import("../../../domain").DocumentTemplate>;
    updateTemplate(templateId: string, dto: UpdateTemplateDto): Promise<import("../../../domain").DocumentTemplate>;
    deleteTemplate(templateId: string): Promise<void>;
}
