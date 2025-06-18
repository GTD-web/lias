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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const create_approval_line_usecase_1 = require("./usecases/create-approval-line.usecase");
const find_approval_lines_usecase_1 = require("./usecases/find-approval-lines.usecase");
let DocumentService = class DocumentService {
    constructor(createApprovalLineUseCase, findApprovalLinesUseCase) {
        this.createApprovalLineUseCase = createApprovalLineUseCase;
        this.findApprovalLinesUseCase = findApprovalLinesUseCase;
    }
    async createApprovalLine(dto) {
        return await this.createApprovalLineUseCase.execute(dto);
    }
    async findApprovalLines() {
        return await this.findApprovalLinesUseCase.execute();
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_approval_line_usecase_1.CreateApprovalLineUseCase,
        find_approval_lines_usecase_1.FindApprovalLinesUseCase])
], DocumentService);
//# sourceMappingURL=document.service.js.map