import { Injectable } from '@nestjs/common';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { Document } from 'src/database/entities';

@Injectable()
export class RejectDocumentUseCase {
    constructor(private readonly documentService: DomainDocumentService) {}

    async execute(id: string): Promise<Document> {
        return await this.documentService.reject(id);
    }
}
