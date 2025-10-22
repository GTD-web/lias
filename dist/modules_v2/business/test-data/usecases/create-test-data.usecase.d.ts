import { TestDataContext } from '../../../context/test-data/test-data.context';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { CreateTestDataRequestDto } from '../dtos';
export declare class CreateTestDataUsecase {
    private readonly testDataContext;
    private readonly employeeService;
    private readonly logger;
    constructor(testDataContext: TestDataContext, employeeService: DomainEmployeeService);
    execute(employeeId: string, dto: CreateTestDataRequestDto): Promise<{
        success: boolean;
        message: string;
        data: {
            forms: any[];
            formVersions: any[];
            documents: any[];
            approvalLineTemplates: any[];
            approvalLineTemplateVersions: any[];
            approvalStepTemplates: any[];
            approvalLineSnapshots: any[];
            approvalStepSnapshots: any[];
        };
    }>;
}
