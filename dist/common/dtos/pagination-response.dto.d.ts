export declare class PaginationMetaDto {
    total: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
}
export declare class PaginationData<T> {
    items: T[];
    meta: PaginationMetaDto;
}
