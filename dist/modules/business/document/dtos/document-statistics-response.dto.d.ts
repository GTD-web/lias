export declare class MyDocumentsStatisticsDto {
    draft: number;
    submitted: number;
    agreement: number;
    approval: number;
    approved: number;
    rejected: number;
    implemented: number;
}
export declare class OthersDocumentsStatisticsDto {
    reference: number;
}
export declare class DocumentStatisticsResponseDto {
    myDocuments: MyDocumentsStatisticsDto;
    othersDocuments: OthersDocumentsStatisticsDto;
}
