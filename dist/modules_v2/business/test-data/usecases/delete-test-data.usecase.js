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
var DeleteTestDataUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTestDataUsecase = void 0;
const common_1 = require("@nestjs/common");
const test_data_context_1 = require("../../../context/test-data/test-data.context");
let DeleteTestDataUsecase = DeleteTestDataUsecase_1 = class DeleteTestDataUsecase {
    constructor(testDataContext) {
        this.testDataContext = testDataContext;
        this.logger = new common_1.Logger(DeleteTestDataUsecase_1.name);
    }
    async deleteAllDocuments() {
        this.logger.log('모든 문서 및 결재 프로세스 삭제 요청');
        const result = await this.testDataContext.deleteAllDocuments();
        this.logger.log('모든 문서 및 결재 프로세스 삭제 완료');
        return result;
    }
    async deleteAllFormsAndTemplates() {
        this.logger.log('모든 결재선 및 양식 삭제 요청');
        const result = await this.testDataContext.deleteAllFormsAndTemplates();
        this.logger.log('모든 결재선 및 양식 삭제 완료');
        return result;
    }
    async deleteAll() {
        this.logger.log('모든 테스트 데이터 삭제 요청');
        const documentsResult = await this.testDataContext.deleteAllDocuments();
        this.logger.log(`문서 삭제 완료: ${documentsResult.message}`);
        const formsResult = await this.testDataContext.deleteAllFormsAndTemplates();
        this.logger.log(`결재선 및 양식 삭제 완료: ${formsResult.message}`);
        this.logger.log('모든 테스트 데이터 삭제 완료');
        return {
            success: true,
            message: `전체 삭제 완료: ${documentsResult.message}, ${formsResult.message}`,
        };
    }
};
exports.DeleteTestDataUsecase = DeleteTestDataUsecase;
exports.DeleteTestDataUsecase = DeleteTestDataUsecase = DeleteTestDataUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [test_data_context_1.TestDataContext])
], DeleteTestDataUsecase);
//# sourceMappingURL=delete-test-data.usecase.js.map