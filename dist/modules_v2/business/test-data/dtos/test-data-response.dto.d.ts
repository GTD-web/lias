export declare class CreatedTestDataDto {
    forms: string[];
    formVersions: string[];
    documents: string[];
    approvalLineTemplates: string[];
    approvalLineTemplateVersions: string[];
    approvalStepTemplates: string[];
    approvalLineSnapshots: string[];
    approvalStepSnapshots: string[];
}
export declare class TestDataResponseDto {
    success: boolean;
    message: string;
    data?: CreatedTestDataDto;
}
