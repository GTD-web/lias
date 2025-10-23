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
exports.CreateTestDataRequestDto = exports.TestDataScenario = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var TestDataScenario;
(function (TestDataScenario) {
    TestDataScenario["SIMPLE_APPROVAL"] = "SIMPLE_APPROVAL";
    TestDataScenario["MULTI_LEVEL_APPROVAL"] = "MULTI_LEVEL_APPROVAL";
    TestDataScenario["AGREEMENT_PROCESS"] = "AGREEMENT_PROCESS";
    TestDataScenario["IMPLEMENTATION_PROCESS"] = "IMPLEMENTATION_PROCESS";
    TestDataScenario["REJECTED_DOCUMENT"] = "REJECTED_DOCUMENT";
    TestDataScenario["CANCELLED_DOCUMENT"] = "CANCELLED_DOCUMENT";
    TestDataScenario["WITH_REFERENCE"] = "WITH_REFERENCE";
    TestDataScenario["PARALLEL_AGREEMENT"] = "PARALLEL_AGREEMENT";
    TestDataScenario["FULL_PROCESS"] = "FULL_PROCESS";
    TestDataScenario["NO_APPROVAL_LINE"] = "NO_APPROVAL_LINE";
})(TestDataScenario || (exports.TestDataScenario = TestDataScenario = {}));
class CreateTestDataRequestDto {
}
exports.CreateTestDataRequestDto = CreateTestDataRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성할 테스트 데이터 시나리오',
        enum: TestDataScenario,
        example: TestDataScenario.SIMPLE_APPROVAL,
        examples: {
            simple: { value: TestDataScenario.SIMPLE_APPROVAL, description: '✅ 간단한 2단계 결재' },
            multiLevel: { value: TestDataScenario.MULTI_LEVEL_APPROVAL, description: '🔄 복잡한 다단계 결재' },
            agreement: { value: TestDataScenario.AGREEMENT_PROCESS, description: '🤝 협의 프로세스' },
            implementation: { value: TestDataScenario.IMPLEMENTATION_PROCESS, description: '⚙️ 시행 프로세스' },
            rejected: { value: TestDataScenario.REJECTED_DOCUMENT, description: '❌ 반려된 문서' },
            cancelled: { value: TestDataScenario.CANCELLED_DOCUMENT, description: '🚫 취소된 문서' },
            withReference: { value: TestDataScenario.WITH_REFERENCE, description: '👥 참조자 포함' },
            parallel: { value: TestDataScenario.PARALLEL_AGREEMENT, description: '🔀 병렬 협의' },
            fullProcess: { value: TestDataScenario.FULL_PROCESS, description: '🎯 전체 프로세스' },
            noApprovalLine: { value: TestDataScenario.NO_APPROVAL_LINE, description: '🔧 결재선 없는 양식' },
        },
    }),
    (0, class_validator_1.IsNotEmpty)({ message: '시나리오를 선택해주세요' }),
    (0, class_validator_1.IsEnum)(TestDataScenario),
    __metadata("design:type", String)
], CreateTestDataRequestDto.prototype, "scenario", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '생성할 문서 개수 (기본값: 1)',
        example: 1,
        minimum: 1,
        maximum: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTestDataRequestDto.prototype, "documentCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '문서 제목 접두사',
        example: '테스트',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestDataRequestDto.prototype, "titlePrefix", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '시나리오 진행 정도 (0: 초기 상태, 100: 완료 상태)',
        example: 50,
        minimum: 0,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTestDataRequestDto.prototype, "progress", void 0);
//# sourceMappingURL=create-test-data-request.dto.js.map