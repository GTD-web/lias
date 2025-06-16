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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../employee.service");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const employees_by_department_response_dto_1 = require("@resource/application/employee/dtos/employees-by-department-response.dto");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
let UserEmployeeController = class UserEmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async findAllEmplyeesByDepartment() {
        return this.employeeService.findEmployeeList();
    }
};
exports.UserEmployeeController = UserEmployeeController;
__decorate([
    (0, common_1.Get)('department'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: '부서별 직원 목록 조회 #사용자/참석자설정/모달' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '부서별 직원 목록을 성공적으로 조회했습니다.',
        type: [employees_by_department_response_dto_1.EmplyeesByDepartmentResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEmployeeController.prototype, "findAllEmplyeesByDepartment", null);
exports.UserEmployeeController = UserEmployeeController = __decorate([
    (0, swagger_1.ApiTags)('5. 직원 '),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('v1/employees'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], UserEmployeeController);
//# sourceMappingURL=employee.controller.js.map