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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const user_response_dto_1 = require("@resource/application/employee/dtos/user-response.dto");
const check_password_dto_1 = require("@resource/application/employee/dtos/check-password.dto");
const change_password_dto_1 = require("@resource/application/employee/dtos/change-password.dto");
const notification_settings_dto_1 = require("@resource/application/employee/dtos/notification-settings.dto");
const employee_service_1 = require("../employee.service");
const entities_1 = require("@libs/entities");
let UserUserController = class UserUserController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    findUser(user) {
        return this.employeeService.findEmployeeDetail(user.employeeId);
    }
    checkPassword(user, checkPasswordDto) {
        return this.employeeService.checkPassword(user.employeeId, checkPasswordDto.password);
    }
    changePassword(user, changePasswordDto) {
        return this.employeeService.changePassword(user.employeeId, changePasswordDto.newPassword);
    }
    async changeNotificationSettings(user, updateDto) {
        return this.employeeService.changeNotificationSettings(user.employeeId, updateDto);
    }
};
exports.UserUserController = UserUserController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: '내 상세 정보 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '내 상세 정보 조회 성공', type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserUserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Post)('check-password'),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 확인' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '비밀번호 확인 성공' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object, typeof (_c = typeof check_password_dto_1.CheckPasswordDto !== "undefined" && check_password_dto_1.CheckPasswordDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UserUserController.prototype, "checkPassword", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '비밀번호 변경 성공' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _d : Object, typeof (_e = typeof change_password_dto_1.ChangePasswordDto !== "undefined" && change_password_dto_1.ChangePasswordDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], UserUserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('me/notification-settings'),
    (0, swagger_1.ApiOperation)({ summary: '알림 설정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '알림 설정 성공',
        type: user_response_dto_1.UserResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _f : Object, typeof (_g = typeof notification_settings_dto_1.UpdateNotificationSettingsDto !== "undefined" && notification_settings_dto_1.UpdateNotificationSettingsDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], UserUserController.prototype, "changeNotificationSettings", null);
exports.UserUserController = UserUserController = __decorate([
    (0, swagger_1.ApiTags)('5. 유저 '),
    (0, common_1.Controller)('v1/users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], UserUserController);
//# sourceMappingURL=user.controller.js.map