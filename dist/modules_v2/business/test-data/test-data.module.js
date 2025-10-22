"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const test_data_module_1 = require("../../context/test-data/test-data.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const test_data_controller_1 = require("./controllers/test-data.controller");
const usecases_1 = require("./usecases");
let TestDataBusinessModule = class TestDataBusinessModule {
};
exports.TestDataBusinessModule = TestDataBusinessModule;
exports.TestDataBusinessModule = TestDataBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [test_data_module_1.TestDataContextModule, employee_module_1.DomainEmployeeModule],
        controllers: [test_data_controller_1.TestDataController],
        providers: [usecases_1.CreateTestDataUsecase, usecases_1.DeleteTestDataUsecase, usecases_1.GenerateTokenUsecase],
        exports: [usecases_1.CreateTestDataUsecase, usecases_1.DeleteTestDataUsecase, usecases_1.GenerateTokenUsecase],
    })
], TestDataBusinessModule);
//# sourceMappingURL=test-data.module.js.map