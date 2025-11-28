import { DocumentTemplateStatus } from '../../../../common/enums/approval.enum';
export declare enum SortOrder {
    LATEST = "LATEST",
    OLDEST = "OLDEST"
}
export declare class QueryTemplatesDto {
    searchKeyword?: string;
    categoryId?: string;
    status?: DocumentTemplateStatus;
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}
