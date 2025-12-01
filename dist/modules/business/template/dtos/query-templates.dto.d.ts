export declare enum SortOrder {
    LATEST = "LATEST",
    OLDEST = "OLDEST"
}
export declare class QueryTemplatesDto {
    searchKeyword?: string;
    categoryId?: string;
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}
