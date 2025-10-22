export declare class DraftContextRequestDto {
    drafterId: string;
    drafterDepartmentId?: string;
    documentAmount?: number;
    documentType?: string;
    customFields?: Record<string, any>;
}
export declare class CreateSnapshotRequestDto {
    documentId: string;
    formVersionId: string;
    draftContext: DraftContextRequestDto;
}
