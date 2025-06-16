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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const date_util_1 = require("@libs/utils/date.util");
const mime_type_enum_1 = require("@libs/enums/mime-type.enum");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.bucketName = this.configService.get('S3_BUCKET_NAME');
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('S3_REGION'),
            endpoint: this.configService.get('S3_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get('S3_ACCESS_KEY'),
                secretAccessKey: this.configService.get('S3_SECRET_KEY'),
            },
            forcePathStyle: true,
        });
    }
    async uploadFile(file) {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${date_util_1.DateUtil.now().format('YYYYMMDDHHmmssSSS')}.${fileExtension}`;
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            }));
            const newFile = {
                fileName: fileName,
                filePath: this.getFileUrl(fileName),
            };
            return newFile;
        }
        catch (error) {
            throw new Error(`Failed to upload file to S3: ${error.message}`);
        }
    }
    async deleteFile(file) {
        try {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: file.fileName,
            }));
        }
        catch (error) {
            throw new Error(`Failed to delete file from S3: ${error.message}`);
        }
    }
    getFileUrl(fileKey) {
        return `${this.configService.get('S3_ENDPOINT').replace('s3', 'object/public')}/${this.bucketName}/${fileKey}`;
    }
    async generatePresignedUrl(mime) {
        const extMap = {
            [mime_type_enum_1.MimeType.IMAGE_JPEG]: 'jpg',
            [mime_type_enum_1.MimeType.IMAGE_PNG]: 'png',
            [mime_type_enum_1.MimeType.IMAGE_WEBP]: 'webp',
        };
        const fileExtension = extMap[mime] || 'bin';
        const fileKey = `${date_util_1.DateUtil.now().format('YYYYMMDDHHmmssSSS')}.${fileExtension}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            ContentType: mime,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 60 * 2 });
        return url;
    }
    async checkFileExists(fileKey) {
        try {
            const command = new client_s3_1.HeadObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
            });
            const result = await this.s3Client.send(command);
            console.log(result);
            return result.ContentLength !== undefined && result.ContentLength > 0;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=s3.service.js.map