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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async getTasks(user) {
        return this.taskService.getTasks(user);
    }
    async getTaskStatus(user) {
        return this.taskService.getTaskStatus(user);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '태스크 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '태스크 목록 조회 성공',
        schema: {
            type: 'object',
            properties: {
                totalCount: { type: 'number' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            type: { type: 'string' },
                            title: { type: 'string' },
                            reservationId: { type: 'string', nullable: true },
                            resourceId: { type: 'string', nullable: true },
                            resourceName: { type: 'string', nullable: true },
                            startDate: { type: 'string', nullable: true },
                            endDate: { type: 'string', nullable: true },
                        },
                    },
                },
            },
        },
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: '태스크 상태 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '태스크 상태 조회 성공',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
            },
        },
    }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTaskStatus", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('3. 태스크 관리 '),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, common_1.Controller)('v1/tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map