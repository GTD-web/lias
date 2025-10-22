import { CreateTestDataUsecase, DeleteTestDataUsecase, GenerateTokenUsecase } from '../usecases';
import { TestDataResponseDto, GenerateTokenRequestDto, GenerateTokenResponseDto, CreateTestDataRequestDto } from '../dtos';
import { Employee } from '../../../domain/employee/employee.entity';
export declare class TestDataController {
    private readonly createTestDataUsecase;
    private readonly deleteTestDataUsecase;
    private readonly generateTokenUsecase;
    constructor(createTestDataUsecase: CreateTestDataUsecase, deleteTestDataUsecase: DeleteTestDataUsecase, generateTokenUsecase: GenerateTokenUsecase);
    generateToken(dto: GenerateTokenRequestDto): Promise<GenerateTokenResponseDto>;
    createTestData(user: Employee, dto: CreateTestDataRequestDto): Promise<TestDataResponseDto>;
    deleteAllDocuments(): Promise<TestDataResponseDto>;
    deleteAllFormsAndTemplates(): Promise<TestDataResponseDto>;
    deleteAllTestData(): Promise<TestDataResponseDto>;
}
