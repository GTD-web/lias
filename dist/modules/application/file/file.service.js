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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const upload_file_usecase_1 = require("./usecases/upload-file.usecase");
const delete_file_usecase_1 = require("./usecases/delete-file.usecase");
const find_temporary_file_usecase_1 = require("./usecases/find-temporary-file.usecase");
const get_presigned_url_usecase_1 = require("./usecases/get-presigned-url.usecase");
const create_file_data_usecase_1 = require("./usecases/create-file-data.usecase");
let FileService = class FileService {
    constructor(uploadFileUsecase, deleteFileUsecase, findTemporaryFileUsecase, getPresignedUrlUsecase, createFileDataUsecase) {
        this.uploadFileUsecase = uploadFileUsecase;
        this.deleteFileUsecase = deleteFileUsecase;
        this.findTemporaryFileUsecase = findTemporaryFileUsecase;
        this.getPresignedUrlUsecase = getPresignedUrlUsecase;
        this.createFileDataUsecase = createFileDataUsecase;
    }
    async deleteTemporaryFile() {
        const files = await this.findTemporaryFileUsecase.execute();
        const deletePromises = files.map((file) => this.deleteFileUsecase.execute(file.fileId));
        await Promise.all(deletePromises);
    }
    async uploadFile(file) {
        return await this.uploadFileUsecase.execute(file);
    }
    async uploadMultipleFiles(files) {
        const uploadPromises = files.map((file) => this.uploadFileUsecase.execute(file));
        return await Promise.all(uploadPromises);
    }
    async deleteFile(fileId) {
        await this.deleteFileUsecase.execute(fileId);
    }
    async deleteMultipleFiles(fileIds) {
        const deletePromises = fileIds.map((fileId) => this.deleteFileUsecase.execute(fileId));
        await Promise.all(deletePromises);
    }
    async getPresignedUrl(mime) {
        if (!mime) {
            throw new common_1.BadRequestException('Mime type is required');
        }
        return this.getPresignedUrlUsecase.execute(mime);
    }
    async createFileData(createFileDataDto) {
        return this.createFileDataUsecase.execute(createFileDataDto);
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [upload_file_usecase_1.UploadFileUsecase,
        delete_file_usecase_1.DeleteFileUsecase,
        find_temporary_file_usecase_1.FindTemporaryFileUsecase,
        get_presigned_url_usecase_1.GetPresignedUrlUsecase,
        create_file_data_usecase_1.CreateFileDataUsecase])
], FileService);
//# sourceMappingURL=file.service.js.map