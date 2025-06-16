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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const getTaskList_usecase_1 = require("./usecases/getTaskList.usecase");
const getTaskStatus_usecase_1 = require("./usecases/getTaskStatus.usecase");
let TaskService = class TaskService {
    constructor(getTaskListUsecase, getTaskStatusUsecase) {
        this.getTaskListUsecase = getTaskListUsecase;
        this.getTaskStatusUsecase = getTaskStatusUsecase;
    }
    async getTasks(user) {
        return this.getTaskListUsecase.execute(user);
    }
    async getTaskStatus(user) {
        return this.getTaskStatusUsecase.execute(user);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [getTaskList_usecase_1.GetTaskListUsecase,
        getTaskStatus_usecase_1.GetTaskStatusUsecase])
], TaskService);
//# sourceMappingURL=task.service.js.map