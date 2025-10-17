import { ApprovalResponseDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DocumentListType } from 'src/common/enums/approval.enum';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { Employee } from 'src/database/entities/employee.entity';
export declare class GetApprovalDocumentsUseCase {
    private readonly domainDocumentService;
    constructor(domainDocumentService: DomainDocumentService);
    execute(user: Employee, query: PaginationQueryDto, listType: DocumentListType): Promise<PaginationData<ApprovalResponseDto>>;
    private mapEmployeeToDto;
    private getQueryCondition;
}
