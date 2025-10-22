export declare class DraftContextDto {
    drafterId: string;
    drafterDepartmentId?: string;
    documentAmount?: number;
    documentType?: string;
    customFields?: Record<string, any>;
}
export declare class ResolvedApproverDto {
    employeeId: string;
    employeeName?: string;
    departmentId?: string;
    positionId?: string;
    stepOrder: number;
    stepType: string;
    assigneeRule?: string;
    isRequired: boolean;
}
export declare class CreateSnapshotDto {
    documentId: string;
    formVersionId: string;
    draftContext: DraftContextDto;
}
