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
exports.DocumentRevisionService = void 0;
const common_1 = require("@nestjs/common");
const document_revision_repository_1 = require("./document-revision.repository");
const base_service_1 = require("../../../common/services/base.service");
let DocumentRevisionService = class DocumentRevisionService extends base_service_1.BaseService {
    constructor(documentRevisionRepository) {
        super(documentRevisionRepository);
        this.documentRevisionRepository = documentRevisionRepository;
    }
};
exports.DocumentRevisionService = DocumentRevisionService;
exports.DocumentRevisionService = DocumentRevisionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_revision_repository_1.DocumentRevisionRepository])
], DocumentRevisionService);
//# sourceMappingURL=document-revision.service.js.map