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
exports.DomainDocumentService = void 0;
const common_1 = require("@nestjs/common");
const document_repository_1 = require("./document.repository");
const base_service_1 = require("../../../common/services/base.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let DomainDocumentService = class DomainDocumentService extends base_service_1.BaseService {
    constructor(documentRepository) {
        super(documentRepository);
        this.documentRepository = documentRepository;
    }
    async approve(id, queryRunner) {
        return await this.documentRepository.update(id, { status: approval_enum_1.ApprovalStatus.APPROVED }, { queryRunner });
    }
    async reject(id, queryRunner) {
        return await this.documentRepository.update(id, { status: approval_enum_1.ApprovalStatus.REJECTED }, { queryRunner });
    }
};
exports.DomainDocumentService = DomainDocumentService;
exports.DomainDocumentService = DomainDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_repository_1.DomainDocumentRepository])
], DomainDocumentService);
//# sourceMappingURL=document.service.js.map