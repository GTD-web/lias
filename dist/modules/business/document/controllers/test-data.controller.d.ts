import { TestDataService } from '../services/test-data.service';
export declare class TestDataController {
    private readonly testDataService;
    constructor(testDataService: TestDataService);
    getWebPartEmployees(): Promise<{
        id: string;
        name: string;
        employeeNumber: string;
        email: string;
        rankTitle: string;
    }[]>;
    getAvailableTemplates(): Promise<import("../../../domain").DocumentTemplate[]>;
    createTestDocument(body?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
        hasReference?: boolean;
        referenceCount?: number;
    }): Promise<{
        document: import("../../../domain").Document;
        drafter: import("../../../domain").Employee;
        approvalSteps: {
            step: import("../dtos").CreateDocumentDto["approvalSteps"][0];
            employee: import("../../../domain").Employee;
        }[];
    }>;
    createAndSubmitTestDocument(body?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
        hasReference?: boolean;
        referenceCount?: number;
    }): Promise<{
        document: import("../../../domain").Document;
        drafter: import("../../../domain").Employee;
        approvalSteps: {
            step: import("../dtos").CreateDocumentDto["approvalSteps"][0];
            employee: import("../../../domain").Employee;
        }[];
    }>;
    createMultipleTestDocuments(count: number, submit?: boolean): Promise<any[]>;
    deleteAllTestData(): Promise<{
        success: boolean;
        message: string;
        deleted: {
            approvalStepSnapshots: number;
            documents: number;
            approvalStepTemplates: number;
            documentTemplates: number;
            categories: number;
        };
        total: number;
    }>;
    deleteDocumentsOnly(): Promise<{
        success: boolean;
        message: string;
        deleted: {
            approvalStepSnapshots: number;
            documents: number;
        };
        total: number;
    }>;
    deleteTestCategory(): Promise<{
        success: boolean;
        message: string;
        deleted: number;
    } | {
        success: boolean;
        message: string;
        deleted: {
            templates: number;
            category: number;
        };
    }>;
}
