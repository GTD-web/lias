import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { DocumentFormResponseDto } from '../../dtos/document-form.dto';

@Injectable()
export class FindDocumentFormByIdUseCase {
    constructor(private readonly documentFormService: DomainDocumentFormService) {}

    async execute(documentFormId: string): Promise<DocumentFormResponseDto> {
        const documentForm = await this.documentFormService.findOne({
            where: { documentFormId },
            relations: ['documentType', 'formApprovalLine', 'formApprovalLine.formApprovalSteps'],
        });

        if (!documentForm) {
            throw new NotFoundException('문서 양식을 찾을 수 없습니다.');
        }

        return documentForm;
    }
}
