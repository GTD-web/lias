import { Injectable } from '@nestjs/common';
import { ApprovalResponseDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';

@Injectable()
export class GetDraftUseCase {
    constructor(private readonly domainDocumentService: DomainDocumentService) {}

    async execute(id: string): Promise<ApprovalResponseDto> {
        // 기안 문서 조회 비즈니스 로직
        const document = await this.domainDocumentService.findOne({
            where: {
                documentId: id,
            },
            relations: ['drafter', 'approvalSteps', 'parentDocument', 'files'],
        });
        return document;
    }
}
