import { DocumentStatus } from '../../../../common/enums/approval.enum';
export declare class CreateDocumentDto {
    formVersionId: string;
    title: string;
    content: string;
    drafterId: string;
    metadata?: Record<string, any>;
}
export declare class UpdateDocumentDto {
    title?: string;
    content?: string;
    metadata?: Record<string, any>;
}
export declare class SubmitDocumentDto {
    documentId: string;
    draftContext: {
        drafterId: string;
        drafterDepartmentId: string;
        documentAmount?: number;
        documentType?: string;
    };
}
export declare class DocumentFilterDto {
    status?: DocumentStatus;
    drafterId?: string;
    formVersionId?: string;
    startDate?: Date;
    endDate?: Date;
    searchKeyword?: string;
}
