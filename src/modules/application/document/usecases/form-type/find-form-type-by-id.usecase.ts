import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { DocumentTypeResponseDto } from '../../dtos/form-type.dto';

@Injectable()
export class FindFormTypeByIdUseCase {
    constructor(private readonly documentTypeService: DomainDocumentTypeService) {}

    async execute(documentTypeId: string): Promise<DocumentTypeResponseDto> {
        const documentType = await this.documentTypeService.findOne({
            where: { documentTypeId },
        });

        if (!documentType) {
            throw new NotFoundException('문서 타입을 찾을 수 없습니다.');
        }

        return documentType;
    }
}
