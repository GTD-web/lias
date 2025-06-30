import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';

@Injectable()
export class DeleteFormTypeUseCase {
    constructor(private readonly documentTypeService: DomainDocumentTypeService) {}

    async execute(documentTypeId: string): Promise<boolean> {
        const existingDocumentType = await this.documentTypeService.findOne({
            where: { documentTypeId },
        });

        if (!existingDocumentType) {
            throw new NotFoundException('문서 타입을 찾을 수 없습니다.');
        }

        await this.documentTypeService.delete(documentTypeId);
        return true;
    }
}
