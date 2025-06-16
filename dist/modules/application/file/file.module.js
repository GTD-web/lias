"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const file_module_1 = require("@src/domain/file/file.module");
const upload_file_usecase_1 = require("./usecases/upload-file.usecase");
const delete_file_usecase_1 = require("./usecases/delete-file.usecase");
const s3_service_1 = require("./infrastructure/s3.service");
const file_controller_1 = require("./controllers/file.controller");
const file_service_1 = require("./file.service");
const env_config_1 = require("@libs/configs/env.config");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("@libs/entities/file.entity");
const cron_file_controller_1 = require("./controllers/cron.file.controller");
const find_temporary_file_usecase_1 = require("./usecases/find-temporary-file.usecase");
const create_file_data_usecase_1 = require("./usecases/create-file-data.usecase");
const get_presigned_url_usecase_1 = require("./usecases/get-presigned-url.usecase");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [file_module_1.DomainFileModule, typeorm_1.TypeOrmModule.forFeature([file_entity_1.File]), config_1.ConfigModule.forFeature(env_config_1.APP_CONFIG)],
        controllers: [file_controller_1.FileController, cron_file_controller_1.CronFileController],
        providers: [
            file_service_1.FileService,
            upload_file_usecase_1.UploadFileUsecase,
            delete_file_usecase_1.DeleteFileUsecase,
            s3_service_1.S3Service,
            find_temporary_file_usecase_1.FindTemporaryFileUsecase,
            create_file_data_usecase_1.CreateFileDataUsecase,
            get_presigned_url_usecase_1.GetPresignedUrlUsecase,
        ],
        exports: [file_service_1.FileService],
    })
], FileModule);
//# sourceMappingURL=file.module.js.map