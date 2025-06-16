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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const user_response_dto_1 = require("@resource/application/employee/dtos/user-response.dto");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const change_role_dto_1 = require("@resource/application/employee/dtos/change-role.dto");
const employee_service_1 = require("../employee.service");
let AdminUserController = class AdminUserController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    findUser() {
        return this.employeeService.findManagerCandidates();
    }
    changeRole(changeRoleDto) {
        return this.employeeService.changeRole(changeRoleDto);
    }
};
exports.AdminUserController = AdminUserController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: '직원 목록 조회	자원담당자로 설정하기 위한 직원 목록' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '내 상세 정보 조회 성공', type: user_response_dto_1.UserResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminUserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Patch)('change/role'),
    (0, swagger_1.ApiOperation)({ summary: '자원 담당자 설정	자원별 담당자 설정 또는 토글 방식' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '자원 담당자 설정 성공' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof change_role_dto_1.ChangeRoleDto !== "undefined" && change_role_dto_1.ChangeRoleDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], AdminUserController.prototype, "changeRole", null);
exports.AdminUserController = AdminUserController = __decorate([
    (0, swagger_1.ApiTags)('5. 유저 - 관리자 '),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('v1/admin/users'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], AdminUserController);
//# sourceMappingURL=admin.user.controller.js.map