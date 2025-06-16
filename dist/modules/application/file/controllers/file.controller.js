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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("@resource/application/file/file.service");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const file_response_dto_1 = require("@resource/application/file/dtos/file-response.dto");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const mime_type_enum_1 = require("@libs/enums/mime-type.enum");
const create_filedata_dto_1 = require("../dtos/create-filedata.dto");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadFile(file) {
        return this.fileService.uploadFile(file);
    }
    async uploadMultipleFiles(files) {
        return this.fileService.uploadMultipleFiles(files);
    }
    async deleteMultipleFiles(fileIds) {
        await this.fileService.deleteMultipleFiles(fileIds);
    }
    async getPresignedUrl(mime) {
        return this.fileService.getPresignedUrl(mime);
    }
    async createFileData(createFileDataDto) {
        return this.fileService.createFileData(createFileDataDto);
    }
    async deleteFile(fileId) {
        await this.fileService.deleteFile(fileId);
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: '파일 업로드' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '파일 업로드 성공', type: file_response_dto_1.FileResponseDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload/multiple'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: '여러 파일 업로드' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '여러 파일 업로드 성공', type: [file_response_dto_1.FileResponseDto] }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadMultipleFiles", null);
__decorate([
    (0, common_1.Delete)('multiple'),
    (0, swagger_1.ApiOperation)({ summary: '여러 파일 삭제' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                fileIds: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        },
    }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '여러 파일 삭제 성공' }),
    __param(0, (0, common_1.Body)('fileIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteMultipleFiles", null);
__decorate([
    (0, common_1.Get)('presigned-url'),
    (0, swagger_1.ApiOperation)({ summary: 'Presigned URL 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: 'Presigned URL 생성 성공' }),
    (0, swagger_1.ApiQuery)({ name: 'mime', enum: mime_type_enum_1.MimeType, example: mime_type_enum_1.MimeType.IMAGE_PNG, required: true }),
    __param(0, (0, common_1.Query)('mime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof mime_type_enum_1.MimeType !== "undefined" && mime_type_enum_1.MimeType) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.Post)('data'),
    (0, swagger_1.ApiOperation)({ summary: '파일 데이터 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '파일 데이터 생성 성공' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_filedata_dto_1.CreateFileDataDto]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "createFileData", null);
__decorate([
    (0, common_1.Delete)(':fileId'),
    (0, swagger_1.ApiOperation)({ summary: '파일 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({ status: 200, description: '파일 삭제 성공' }),
    __param(0, (0, common_1.Param)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
exports.FileController = FileController = __decorate([
    (0, swagger_1.ApiTags)('0. 파일 - 공통 '),
    (0, common_1.Controller)('v1/files'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _a : Object])
], FileController);
//# sourceMappingURL=file.controller.js.map