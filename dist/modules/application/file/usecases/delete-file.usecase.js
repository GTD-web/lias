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
exports.DeleteFileUsecase = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("../infrastructure/s3.service");
const file_service_1 = require("@src/domain/file/file.service");
const error_message_1 = require("@libs/constants/error-message");
let DeleteFileUsecase = class DeleteFileUsecase {
    constructor(s3Service, fileService) {
        this.s3Service = s3Service;
        this.fileService = fileService;
    }
    async execute(fileId) {
        let file;
        if (fileId) {
            file = await this.fileService.findFileById(fileId);
            if (!file)
                throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.FILE.NOT_FOUND);
        }
        else {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.FILE.ID_OR_PATH_REQUIRED);
        }
        await this.s3Service.deleteFile(file);
        await this.fileService.delete(file.fileId);
    }
};
exports.DeleteFileUsecase = DeleteFileUsecase;
exports.DeleteFileUsecase = DeleteFileUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [s3_service_1.S3Service, typeof (_a = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _a : Object])
], DeleteFileUsecase);
//# sourceMappingURL=delete-file.usecase.js.map