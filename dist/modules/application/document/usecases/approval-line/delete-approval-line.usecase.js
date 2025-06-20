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
exports.DeleteApprovalLineUseCase = void 0;
const common_1 = require("@nestjs/common");
const error_message_1 = require("../../../../../common/constants/error-message");
const form_approval_line_service_1 = require("../../../../domain/form-approval-line/form-approval-line.service");
const form_approval_step_service_1 = require("../../../../domain/form-approval-step/form-approval-step.service");
const typeorm_1 = require("typeorm");
let DeleteApprovalLineUseCase = class DeleteApprovalLineUseCase {
    constructor(formApprovalLineService, formApprovalStepService, dataSource) {
        this.formApprovalLineService = formApprovalLineService;
        this.formApprovalStepService = formApprovalStepService;
        this.dataSource = dataSource;
    }
    async execute(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.formApprovalStepService.deleteByFormApprovalLineId(id, { queryRunner });
            await this.formApprovalLineService.delete(id, { queryRunner });
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.NotAcceptableException(error_message_1.ERROR_MESSAGE.BUSINESS.APPROVAL.DELETE_FAILED);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DeleteApprovalLineUseCase = DeleteApprovalLineUseCase;
exports.DeleteApprovalLineUseCase = DeleteApprovalLineUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_approval_line_service_1.DomainFormApprovalLineService,
        form_approval_step_service_1.DomainFormApprovalStepService,
        typeorm_1.DataSource])
], DeleteApprovalLineUseCase);
//# sourceMappingURL=delete-approval-line.usecase.js.map