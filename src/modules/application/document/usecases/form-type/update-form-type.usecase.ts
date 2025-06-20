import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { UpdateDocumentTypeDto, DocumentTypeResponseDto } from '../../dtos/form-type.dto';

@Injectable()
export class UpdateFormTypeUseCase {
    constructor(private readonly documentTypeService: DomainDocumentTypeService) {}

    async execute(documentTypeId: string, dto: UpdateDocumentTypeDto): Promise<DocumentTypeResponseDto> {
        const existingDocumentType = await this.documentTypeService.findOne({
            where: { documentTypeId },
        });

        if (!existingDocumentType) {
            throw new NotFoundException('문서 타입을 찾을 수 없습니다.');
        }

        const updatedDocumentType = await this.documentTypeService.update(documentTypeId, dto);

        return updatedDocumentType;
    }
}
