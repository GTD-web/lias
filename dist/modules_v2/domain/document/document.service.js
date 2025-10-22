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
let DomainDocumentService = class DomainDocumentService extends base_service_1.BaseService {
    constructor(documentRepository) {
        super(documentRepository);
        this.documentRepository = documentRepository;
    }
    async findByDocumentId(id) {
        const document = await this.documentRepository.findOne({
            where: { id },
            relations: ['formVersion', 'drafter', 'approvalLineSnapshot'],
        });
        if (!document) {
            throw new common_1.NotFoundException('문서를 찾을 수 없습니다.');
        }
        return document;
    }
    async findByDocumentNumber(documentNumber) {
        const document = await this.documentRepository.findByDocumentNumber(documentNumber);
        if (!document) {
            throw new common_1.NotFoundException('문서를 찾을 수 없습니다.');
        }
        return document;
    }
    async findByDrafterId(drafterId) {
        return this.documentRepository.findByDrafterId(drafterId);
    }
    async findByStatus(status) {
        return this.documentRepository.findByStatus(status);
    }
    async findByDrafterIdAndStatus(drafterId, status) {
        return this.documentRepository.findByDrafterIdAndStatus(drafterId, status);
    }
};
exports.DomainDocumentService = DomainDocumentService;
exports.DomainDocumentService = DomainDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_repository_1.DomainDocumentRepository])
], DomainDocumentService);
//# sourceMappingURL=document.service.js.map