"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateTestDataUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestDataUsecase = void 0;
const common_1 = require("@nestjs/common");
const test_data_context_1 = require("../../../context/test-data/test-data.context");
const employee_service_1 = require("../../../domain/employee/employee.service");
let CreateTestDataUsecase = CreateTestDataUsecase_1 = class CreateTestDataUsecase {
    constructor(testDataContext, employeeService) {
        this.testDataContext = testDataContext;
        this.employeeService = employeeService;
        this.logger = new common_1.Logger(CreateTestDataUsecase_1.name);
    }
    async execute(employeeId, dto) {
        this.logger.log(`테스트 데이터 생성 요청 (사용자: ${employeeId}, 시나리오: ${dto.scenario})`);
        const employee = await this.employeeService.findOne({
            where: { id: employeeId },
            relations: ['departmentPositions'],
        });
        if (!employee || !employee.departmentPositions || employee.departmentPositions.length === 0) {
            throw new common_1.BadRequestException('직원 정보 또는 부서 정보를 찾을 수 없습니다.');
        }
        const departmentId = employee.departmentPositions[0].departmentId;
        const createdData = await this.testDataContext.createTestDataByScenario(employeeId, departmentId, dto);
        this.logger.log(`테스트 데이터 생성 완료: ${dto.scenario}`);
        return {
            success: true,
            message: `${dto.scenario} 시나리오의 테스트 데이터가 생성되었습니다.`,
            data: createdData,
        };
    }
};
exports.CreateTestDataUsecase = CreateTestDataUsecase;
exports.CreateTestDataUsecase = CreateTestDataUsecase = CreateTestDataUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [test_data_context_1.TestDataContext,
        employee_service_1.DomainEmployeeService])
], CreateTestDataUsecase);
//# sourceMappingURL=create-test-data.usecase.js.map