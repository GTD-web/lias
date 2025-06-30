import { Injectable } from '@nestjs/common';
import { DomainDocumentTypeService } from '../../../../domain/document-type/document-type.service';
import { DocumentTypeResponseDto } from '../../dtos/form-type.dto';

@Injectable()
export class FindFormTypesUseCase {
    constructor(private readonly documentTypeService: DomainDocumentTypeService) {}

    async execute(): Promise<DocumentTypeResponseDto[]> {
        const documentTypes = await this.documentTypeService.findAll();

        return documentTypes;
    }
}
