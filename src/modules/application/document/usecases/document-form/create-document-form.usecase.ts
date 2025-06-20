import { Injectable } from '@nestjs/common';
import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { CreateDocumentFormDto, DocumentFormResponseDto } from '../../dtos/document-form.dto';
import { DocumentForm } from '../../../../../database/entities/document-form.entity';

@Injectable()
export class CreateDocumentFormUseCase {
    constructor(private readonly documentFormService: DomainDocumentFormService) {}

    async execute(dto: CreateDocumentFormDto): Promise<DocumentFormResponseDto> {
        const documentForm = await this.documentFormService.save(dto);

        return documentForm;
    }
}
