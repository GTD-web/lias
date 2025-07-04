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
exports.DomainApprovalStepService = void 0;
const common_1 = require("@nestjs/common");
const approval_step_repository_1 = require("./approval-step.repository");
const base_service_1 = require("../../../common/services/base.service");
const date_util_1 = require("../../../common/utils/date.util");
let DomainApprovalStepService = class DomainApprovalStepService extends base_service_1.BaseService {
    constructor(approvalStepRepository) {
        super(approvalStepRepository);
        this.approvalStepRepository = approvalStepRepository;
    }
    async approve(id, queryRunner) {
        return await this.approvalStepRepository.update(id, { isApproved: true, approvedDate: date_util_1.DateUtil.now().toDate(), isCurrent: false }, { queryRunner });
    }
    async reject(id, queryRunner) {
        return await this.approvalStepRepository.update(id, { isApproved: false, approvedDate: date_util_1.DateUtil.now().toDate(), isCurrent: false }, { queryRunner });
    }
    async setCurrent(id, queryRunner) {
        return await this.approvalStepRepository.update(id, { isCurrent: true }, { queryRunner });
    }
};
exports.DomainApprovalStepService = DomainApprovalStepService;
exports.DomainApprovalStepService = DomainApprovalStepService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_repository_1.DomainApprovalStepRepository])
], DomainApprovalStepService);
//# sourceMappingURL=approval-step.service.js.map