export declare enum MyPendingType {
    SUBMITTED = "SUBMITTED",
    AGREEMENT = "AGREEMENT",
    APPROVAL = "APPROVAL"
}
export declare class QueryMyPendingDto {
    userId: string;
    type: MyPendingType;
    page?: number;
    limit?: number;
}
