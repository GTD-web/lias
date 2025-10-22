import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { TestDataContext } from '../../../context/test-data/test-data.context';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { CreateTestDataRequestDto } from '../dtos';

/**
 * 테스트 데이터 생성 Usecase
 */
@Injectable()
export class CreateTestDataUsecase {
    private readonly logger = new Logger(CreateTestDataUsecase.name);

    constructor(
        private readonly testDataContext: TestDataContext,
        private readonly employeeService: DomainEmployeeService,
    ) {}

    async execute(employeeId: string, dto: CreateTestDataRequestDto) {
        this.logger.log(`테스트 데이터 생성 요청 (사용자: ${employeeId}, 시나리오: ${dto.scenario})`);

        // 직원 정보 조회
        const employee = await this.employeeService.findOne({
            where: { id: employeeId },
            relations: ['departmentPositions'],
        });

        if (!employee || !employee.departmentPositions || employee.departmentPositions.length === 0) {
            throw new BadRequestException('직원 정보 또는 부서 정보를 찾을 수 없습니다.');
        }

        const departmentId = employee.departmentPositions[0].departmentId;

        // 시나리오 기반 테스트 데이터 생성
        const createdData = await this.testDataContext.createTestDataByScenario(employeeId, departmentId, dto);

        this.logger.log(`테스트 데이터 생성 완료: ${dto.scenario}`);

        return {
            success: true,
            message: `${dto.scenario} 시나리오의 테스트 데이터가 생성되었습니다.`,
            data: createdData,
        };
    }
}
