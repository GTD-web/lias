import { CreateRandomDocumentsUseCase } from '../usecases/test/create-random-documents.usecase';
export declare class RandomDocumentsController {
    private readonly createRandomDocumentsUseCase;
    constructor(createRandomDocumentsUseCase: CreateRandomDocumentsUseCase);
    createRandomDocuments(count?: number): Promise<{
        message: string;
        data: {
            createdCount: number;
            employees: number;
            departments: number;
            documentTypes: number;
            documentForms: number;
            approvalSteps: number;
        };
        details: {
            documents: {
                documentId: string;
                title: string;
                status: import("../../../../common/enums").ApprovalStatus;
                drafterId: string;
                createdAt: Date;
            }[];
        };
    }>;
    deleteRandomDocuments(): Promise<{
        message: string;
        data: {
            deletedCount: number;
        };
    }>;
}
