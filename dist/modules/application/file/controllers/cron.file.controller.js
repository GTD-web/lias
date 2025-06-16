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
exports.CronFileController = void 0;
const public_decorator_1 = require("@libs/decorators/public.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const file_service_1 = require("../file.service");
let CronFileController = class CronFileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async deleteTemporaryFile() {
        return this.fileService.deleteTemporaryFile();
    }
};
exports.CronFileController = CronFileController;
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('cron-job/delete-temporary-file'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronFileController.prototype, "deleteTemporaryFile", null);
exports.CronFileController = CronFileController = __decorate([
    (0, swagger_1.ApiTags)('0. 파일 - 공통 '),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('v1/files'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], CronFileController);
//# sourceMappingURL=cron.file.controller.js.map