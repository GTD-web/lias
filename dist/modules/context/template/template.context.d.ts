import { QueryRunner } from 'typeorm';
import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainApprovalStepTemplateService } from '../../domain/approval-step-template/approval-step-template.service';
import { DomainCategoryService } from '../../domain/category/category.service';
import { CreateDocumentTemplateDto, UpdateDocumentTemplateDto, CreateApprovalStepTemplateDto, UpdateApprovalStepTemplateDto } from './dtos/template.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';
export declare class TemplateContext {
    private readonly documentTemplateService;
    private readonly approvalStepTemplateService;
    private readonly categoryService;
    private readonly logger;
    constructor(documentTemplateService: DomainDocumentTemplateService, approvalStepTemplateService: DomainApprovalStepTemplateService, categoryService: DomainCategoryService);
    createDocumentTemplate(dto: CreateDocumentTemplateDto, queryRunner?: QueryRunner): Promise<import("../../domain").DocumentTemplate>;
    updateDocumentTemplate(templateId: string, dto: UpdateDocumentTemplateDto, queryRunner?: QueryRunner): Promise<import("../../domain").DocumentTemplate>;
    deleteDocumentTemplate(templateId: string, queryRunner?: QueryRunner): Promise<void>;
    createApprovalStepTemplate(dto: CreateApprovalStepTemplateDto, queryRunner?: QueryRunner): Promise<import("../../domain").ApprovalStepTemplate>;
    updateApprovalStepTemplate(stepId: string, dto: UpdateApprovalStepTemplateDto, queryRunner?: QueryRunner): Promise<import("../../domain").ApprovalStepTemplate>;
    deleteApprovalStepTemplate(stepId: string, queryRunner?: QueryRunner): Promise<void>;
    createCategory(dto: CreateCategoryDto, queryRunner?: QueryRunner): Promise<import("../../domain").Category>;
    updateCategory(categoryId: string, dto: UpdateCategoryDto, queryRunner?: QueryRunner): Promise<import("../../domain").Category>;
    deleteCategory(categoryId: string, queryRunner?: QueryRunner): Promise<void>;
}
