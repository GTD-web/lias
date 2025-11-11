"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataModule = void 0;
const common_1 = require("@nestjs/common");
const metadata_controller_1 = require("./controllers/metadata.controller");
const metadata_query_controller_1 = require("./controllers/metadata-query.controller");
const sync_all_metadata_usecase_1 = require("./usecases/sync-all-metadata.usecase");
const external_metadata_service_1 = require("./services/external-metadata.service");
const metadata_sync_module_1 = require("../../context/metadata-sync/metadata-sync.module");
const metadata_context_module_1 = require("../../context/metadata/metadata-context.module");
let MetadataModule = class MetadataModule {
};
exports.MetadataModule = MetadataModule;
exports.MetadataModule = MetadataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            metadata_sync_module_1.MetadataSyncModule,
            metadata_context_module_1.MetadataContextModule,
        ],
        controllers: [
            metadata_controller_1.MetadataController,
            metadata_query_controller_1.MetadataQueryController,
        ],
        providers: [sync_all_metadata_usecase_1.SyncAllMetadataUsecase, external_metadata_service_1.ExternalMetadataService],
    })
], MetadataModule);
//# sourceMappingURL=metadata.module.js.map