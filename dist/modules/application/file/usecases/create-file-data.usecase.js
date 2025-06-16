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
exports.CreateFileDataUsecase = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("@src/domain/file/file.service");
const s3_service_1 = require("../infrastructure/s3.service");
let CreateFileDataUsecase = class CreateFileDataUsecase {
    constructor(fileService, s3Service) {
        this.fileService = fileService;
        this.s3Service = s3Service;
        this.retryCount = 3;
    }
    async execute(createFileDataDto) {
        const fileName = createFileDataDto.filePath.split('/').pop();
        const fileExists = await this.s3Service.checkFileExists(fileName);
        if (!fileExists) {
            throw new common_1.BadRequestException('File not found in S3');
        }
        const file = await this.fileService.create({
            fileName,
            filePath: this.s3Service.getFileUrl(fileName),
        });
        return await this.fileService.save(file);
    }
};
exports.CreateFileDataUsecase = CreateFileDataUsecase;
exports.CreateFileDataUsecase = CreateFileDataUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _a : Object, s3_service_1.S3Service])
], CreateFileDataUsecase);
//# sourceMappingURL=create-file-data.usecase.js.map