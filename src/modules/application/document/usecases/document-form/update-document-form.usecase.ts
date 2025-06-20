import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { UpdateDocumentFormDto, DocumentFormResponseDto } from '../../dtos/document-form.dto';

@Injectable()
export class UpdateDocumentFormUseCase {
    constructor(private readonly documentFormService: DomainDocumentFormService) {}

    async execute(documentFormId: string, dto: UpdateDocumentFormDto): Promise<DocumentFormResponseDto> {
        const existingDocumentForm = await this.documentFormService.findOne({
            where: { documentFormId },
        });

        if (!existingDocumentForm) {
            throw new NotFoundException('문서 양식을 찾을 수 없습니다.');
        }

        const updatedDocumentForm = await this.documentFormService.update(documentFormId, dto, {
            relations: ['documentType', 'formApprovalLine', 'formApprovalLine.formApprovalSteps'],
        });

        return updatedDocumentForm;
    }
}
