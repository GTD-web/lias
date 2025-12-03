import { TestDataService } from '../services/test-data.service';
export declare class TestDataController {
    private readonly testDataService;
    constructor(testDataService: TestDataService);
    getWebPartEmployees(): Promise<any>;
    getAvailableTemplates(): Promise<any>;
    createTestDocument(body?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
        hasReference?: boolean;
        referenceCount?: number;
    }): Promise<any>;
    createAndSubmitTestDocument(body?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
        hasReference?: boolean;
        referenceCount?: number;
    }): Promise<any>;
    createMultipleTestDocuments(count: number, submit?: boolean): Promise<any>;
    deleteAllTestData(): Promise<any>;
    deleteDocumentsOnly(): Promise<any>;
    deleteTestCategory(): Promise<any>;
}
