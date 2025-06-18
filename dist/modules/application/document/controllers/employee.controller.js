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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const common_1 = require("@nestjs/common");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return common_1.Controller; } });
const employee_service_1 = require("../employee.service");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("../../../../common/decorators/api-responses.decorator");
const employees_by_department_response_dto_1 = require("../dtos/employees-by-department-response.dto");
let Controller = class Controller {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async findAllEmplyeesByDepartment() {
        return [];
    }
};
exports.Controller = Controller;
__decorate([
    (0, common_1.Get)('department'),
    (0, swagger_1.ApiOperation)({ summary: '부서별 직원 목록 조회 #사용자/참석자설정/모달' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '부서별 직원 목록을 성공적으로 조회했습니다.',
        type: [employees_by_department_response_dto_1.EmplyeesByDepartmentResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], common_1.Controller.prototype, "findAllEmplyeesByDepartment", null);
exports.Controller = common_1.Controller = __decorate([
    (0, swagger_1.ApiTags)('5. 직원 '),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.EmployeeService !== "undefined" && employee_service_1.EmployeeService) === "function" ? _a : Object])
], common_1.Controller);
//# sourceMappingURL=employee.controller.js.map