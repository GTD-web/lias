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
exports.CreateDraftUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const document_service_1 = require("../../../../domain/document/document.service");
const approval_step_service_1 = require("../../../../domain/approval-step/approval-step.service");
const file_service_1 = require("../../../../domain/file/file.service");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
const date_util_1 = require("../../../../../common/utils/date.util");
let CreateDraftUseCase = class CreateDraftUseCase {
    constructor(dataSource, domainDocumentService, domainApprovalStepService, domainFileService) {
        this.dataSource = dataSource;
        this.domainDocumentService = domainDocumentService;
        this.domainApprovalStepService = domainApprovalStepService;
        this.domainFileService = domainFileService;
    }
    async execute(user, draftData) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const year = new Date().getFullYear();
            const [_, count] = await this.domainDocumentService.findAndCount({
                where: {
                    documentNumber: (0, typeorm_1.Like)(`${draftData.documentNumber}-${year}-%`),
                },
            });
            const nextCount = count + 1;
            const formattedCount = nextCount.toString().padStart(4, '0');
            const document = await this.domainDocumentService.save({
                ...draftData,
                drafterId: user.employeeId,
                status: approval_enum_1.ApprovalStatus.PENDING,
                documentNumber: `${draftData.documentNumber}-${year}-${formattedCount}`,
            }, { queryRunner });
            if (draftData.approvalSteps && draftData.approvalSteps.length > 0) {
                const approvalStepsData = draftData.approvalSteps.map((step) => ({
                    ...step,
                    documentId: document.documentId,
                }));
                await Promise.all(approvalStepsData.map((stepData) => this.domainApprovalStepService.save(stepData, { queryRunner })));
            }
            if (draftData.files && draftData.files.length > 0) {
                const filesData = draftData.files.map((file) => ({
                    ...file,
                    documentId: document.documentId,
                }));
                await Promise.all(filesData.map((fileData) => this.domainFileService.update(fileData.fileId, fileData, { queryRunner })));
            }
            await queryRunner.commitTransaction();
            if (draftData.approvalSteps && draftData.approvalSteps.length > 0) {
                const approvalSteps = await this.domainApprovalStepService.findOne({
                    where: {
                        documentId: document.documentId,
                        approverId: user.employeeId,
                    },
                });
                if (approvalSteps) {
                    await this.domainApprovalStepService.update(approvalSteps.approvalStepId, {
                        isApproved: true,
                        approvedDate: date_util_1.DateUtil.now().toDate(),
                    }, { queryRunner });
                }
            }
            const response = await this.domainDocumentService.findOne({
                where: {
                    documentId: document.documentId,
                },
                relations: ['drafter', 'approvalSteps', 'parentDocument', 'files'],
            });
            return response;
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
exports.CreateDraftUseCase = CreateDraftUseCase;
exports.CreateDraftUseCase = CreateDraftUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        document_service_1.DomainDocumentService,
        approval_step_service_1.DomainApprovalStepService,
        file_service_1.DomainFileService])
], CreateDraftUseCase);
//# sourceMappingURL=create-draft.usecase.js.map