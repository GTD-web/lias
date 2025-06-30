import { Injectable } from '@nestjs/common';
import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { CreateDocumentTypeDto, DocumentTypeResponseDto } from '../../dtos/form-type.dto';

@Injectable()
export class CreateFormTypeUseCase {
    constructor(private readonly documentTypeService: DomainDocumentTypeService) {}

    async execute(dto: CreateDocumentTypeDto): Promise<DocumentTypeResponseDto> {
        const documentType = await this.documentTypeService.save(dto);

        return documentType;
    }
}
