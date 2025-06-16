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
exports.GetPresignedUrlUsecase = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("../infrastructure/s3.service");
let GetPresignedUrlUsecase = class GetPresignedUrlUsecase {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async execute(mime) {
        return this.s3Service.generatePresignedUrl(mime);
    }
};
exports.GetPresignedUrlUsecase = GetPresignedUrlUsecase;
exports.GetPresignedUrlUsecase = GetPresignedUrlUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], GetPresignedUrlUsecase);
//# sourceMappingURL=get-presigned-url.usecase.js.map