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
exports.FindTemporaryFileUsecase = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("@src/domain/file/file.service");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
let FindTemporaryFileUsecase = class FindTemporaryFileUsecase {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async execute() {
        return await this.fileService.findAll({
            where: { isTemporary: true, createdAt: (0, typeorm_1.LessThan)(date_util_1.DateUtil.now().addDays(-1).toDate()) },
        });
    }
};
exports.FindTemporaryFileUsecase = FindTemporaryFileUsecase;
exports.FindTemporaryFileUsecase = FindTemporaryFileUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _a : Object])
], FindTemporaryFileUsecase);
//# sourceMappingURL=find-temporary-file.usecase.js.map