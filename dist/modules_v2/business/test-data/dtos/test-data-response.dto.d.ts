export declare class CreatedTestDataDto {
    forms?: string[];
    formVersions?: string[];
    documents?: string[];
    approvalLineTemplates?: string[];
    approvalLineTemplateVersions?: string[];
    approvalStepTemplates?: string[];
    approvalLineSnapshots?: string[];
    approvalStepSnapshots?: string[];
    approvalLines?: string[];
    [key: string]: any;
}
export declare class TestDataResponseDto {
    success: boolean;
    message: string;
    data?: any;
}
