export declare class DraftContextDto {
    drafterDepartmentId?: string;
    documentAmount?: number;
    documentType?: string;
}
export declare class SubmitDocumentRequestDto {
    draftContext: DraftContextDto;
}
