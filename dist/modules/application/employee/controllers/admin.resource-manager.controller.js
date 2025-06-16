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
exports.AdminResourceManagerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const employee_service_1 = require("@src/application/employee/employee.service");
const employees_by_department_response_dto_1 = require("@resource/application/employee/dtos/employees-by-department-response.dto");
let AdminResourceManagerController = class AdminResourceManagerController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async findAllResourceManagers() {
        return this.employeeService.findResourceManagers();
    }
};
exports.AdminResourceManagerController = AdminResourceManagerController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '자원 관리자 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 관리자 목록 조회 성공',
        type: [employees_by_department_response_dto_1.EmplyeesByDepartmentResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResourceManagerController.prototype, "findAllResourceManagers", null);
exports.AdminResourceManagerController = AdminResourceManagerController = __decorate([
    (0, swagger_1.ApiTags)('3. 자원 관리자 - 관리자 '),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('v1/admin/resource-managers'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.EmployeeService !== "undefined" && employee_service_1.EmployeeService) === "function" ? _a : Object])
], AdminResourceManagerController);
//# sourceMappingURL=admin.resource-manager.controller.js.map