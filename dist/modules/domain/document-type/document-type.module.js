"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainDocumentTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../database/entities");
const document_type_service_1 = require("./document-type.service");
const document_type_repository_1 = require("./document-type.repository");
let DomainDocumentTypeModule = class DomainDocumentTypeModule {
};
exports.DomainDocumentTypeModule = DomainDocumentTypeModule;
exports.DomainDocumentTypeModule = DomainDocumentTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.DocumentType])],
        providers: [document_type_service_1.DomainDocumentTypeService, document_type_repository_1.DomainDocumentTypeRepository],
        exports: [document_type_service_1.DomainDocumentTypeService],
    })
], DomainDocumentTypeModule);
//# sourceMappingURL=document-type.module.js.map