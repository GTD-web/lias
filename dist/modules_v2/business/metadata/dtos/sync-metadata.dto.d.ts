export declare class SyncMetadataResponseDto {
    success: boolean;
    message: string;
    syncedCounts: {
        departments: number;
        employees: number;
        positions: number;
        ranks: number;
        employeeDepartmentPositions: number;
    };
    syncedAt: Date;
}
