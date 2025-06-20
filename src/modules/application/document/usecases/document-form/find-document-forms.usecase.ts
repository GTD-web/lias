import { Injectable } from '@nestjs/common';
import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { DocumentFormResponseDto } from '../../dtos/document-form.dto';

@Injectable()
export class FindDocumentFormsUseCase {
    constructor(private readonly documentFormService: DomainDocumentFormService) {}

    async execute(): Promise<DocumentFormResponseDto[]> {
        const documentForms = await this.documentFormService.findAll({
            relations: ['documentType', 'formApprovalLine', 'formApprovalLine.formApprovalSteps'],
        });

        return documentForms;
    }
}
