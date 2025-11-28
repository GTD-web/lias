import { TemplateService } from '../services/template.service';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { UpdateTemplateDto } from '../dtos/update-template.dto';
import { QueryTemplatesDto } from '../dtos/query-templates.dto';
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    createTemplate(dto: CreateTemplateDto): Promise<{
        documentTemplate: import("../../../domain").DocumentTemplate;
        approvalSteps: any[];
    }>;
    getTemplates(query: QueryTemplatesDto): Promise<{
        data: any[];
        pagination: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    getTemplate(templateId: string): Promise<import("../../../domain").DocumentTemplate>;
    updateTemplate(templateId: string, dto: UpdateTemplateDto): Promise<import("../../../domain").DocumentTemplate>;
    deleteTemplate(templateId: string): Promise<void>;
}
