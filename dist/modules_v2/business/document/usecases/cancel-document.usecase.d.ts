import { DocumentContext } from '../../../context/document/document.context';
export declare class CancelDocumentUsecase {
    private readonly documentContext;
    private readonly logger;
    constructor(documentContext: DocumentContext);
    execute(userId: string, documentId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
