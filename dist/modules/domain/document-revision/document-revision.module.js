"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainDocumentRevisionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_revision_service_1 = require("./document-revision.service");
const document_revision_repository_1 = require("./document-revision.repository");
const document_revision_entity_1 = require("./document-revision.entity");
let DomainDocumentRevisionModule = class DomainDocumentRevisionModule {
};
exports.DomainDocumentRevisionModule = DomainDocumentRevisionModule;
exports.DomainDocumentRevisionModule = DomainDocumentRevisionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([document_revision_entity_1.DocumentRevision])],
        providers: [document_revision_service_1.DocumentRevisionService, document_revision_repository_1.DocumentRevisionRepository],
        exports: [document_revision_service_1.DocumentRevisionService],
    })
], DomainDocumentRevisionModule);
//# sourceMappingURL=document-revision.module.js.map