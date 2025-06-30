import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';

@Injectable()
export class DeleteDocumentFormUseCase {
    constructor(private readonly documentFormService: DomainDocumentFormService) {}

    async execute(documentFormId: string): Promise<boolean> {
        const existingDocumentForm = await this.documentFormService.findOne({
            where: { documentFormId },
        });

        if (!existingDocumentForm) {
            throw new NotFoundException('문서 양식을 찾을 수 없습니다.');
        }

        await this.documentFormService.delete(documentFormId);
        return true;
    }
}
