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
exports.DeleteDraftUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const document_service_1 = require("../../../../domain/document/document.service");
const approval_step_service_1 = require("../../../../domain/approval-step/approval-step.service");
const file_service_1 = require("../../../../domain/file/file.service");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
let DeleteDraftUseCase = class DeleteDraftUseCase {
    constructor(dataSource, domainDocumentService, domainApprovalStepService, domainFileService) {
        this.dataSource = dataSource;
        this.domainDocumentService = domainDocumentService;
        this.domainApprovalStepService = domainApprovalStepService;
        this.domainFileService = domainFileService;
    }
    async execute(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const existingDocument = await this.domainDocumentService.findOne({
                where: { documentId: id },
                relations: ['approvalSteps', 'files'],
            });
            if (!existingDocument) {
                throw new common_1.NotFoundException('Document not found');
            }
            if (existingDocument.status !== approval_enum_1.ApprovalStatus.PENDING) {
                throw new common_1.BadRequestException('Only documents with PENDING status can be deleted');
            }
            if (existingDocument.approvalSteps && existingDocument.approvalSteps.length > 0) {
                await Promise.all(existingDocument.approvalSteps.map((step) => this.domainApprovalStepService.delete(step.approvalStepId, { queryRunner })));
            }
            if (existingDocument.files && existingDocument.files.length > 0) {
                await Promise.all(existingDocument.files.map((file) => this.domainFileService.delete(file.fileId, { queryRunner })));
            }
            await this.domainDocumentService.delete(id, { queryRunner });
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DeleteDraftUseCase = DeleteDraftUseCase;
exports.DeleteDraftUseCase = DeleteDraftUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        document_service_1.DomainDocumentService,
        approval_step_service_1.DomainApprovalStepService,
        file_service_1.DomainFileService])
], DeleteDraftUseCase);
//# sourceMappingURL=delete-draft.usecase.js.map