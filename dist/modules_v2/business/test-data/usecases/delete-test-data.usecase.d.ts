import { TestDataContext } from '../../../context/test-data/test-data.context';
export declare class DeleteTestDataUsecase {
    private readonly testDataContext;
    private readonly logger;
    constructor(testDataContext: TestDataContext);
    deleteAllDocuments(): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAllFormsAndTemplates(): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAll(): Promise<{
        success: boolean;
        message: string;
    }>;
}
