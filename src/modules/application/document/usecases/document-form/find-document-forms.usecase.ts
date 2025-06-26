import { Injectable } from '@nestjs/common';
import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { DocumentFormResponseDto } from '../../dtos/document-form.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';

@Injectable()
export class FindDocumentFormsUseCase {
    constructor(private readonly documentFormService: DomainDocumentFormService) {}

    async execute(query: PaginationQueryDto): Promise<PaginationData<DocumentFormResponseDto>> {
        const [documentForms, total] = await this.documentFormService.findAndCount({
            // where: {
            //     name: Like(`%${query.search}%`),
            // },
            relations: [
                'documentType',
                'formApprovalLine',
                'formApprovalLine.formApprovalSteps',
                'formApprovalLine.formApprovalSteps.defaultApprover',
            ],
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });

        const meta = {
            total,
            page: query.page,
            limit: query.limit,
        };

        return {
            items: documentForms,
            meta,
        };
    }
}
