export declare class DocumentStatisticsItemDto {
    type: string;
    count: number;
}
export declare class DocumentStatisticsResponseDto {
    myDocuments: {
        submitted: number;
        agreement: number;
        approval: number;
        approved: number;
        rejected: number;
        implemented: number;
        draft: number;
    };
    othersDocuments: {
        reference: number;
    };
}
