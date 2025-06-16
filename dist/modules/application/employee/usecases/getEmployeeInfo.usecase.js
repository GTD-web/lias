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
exports.GetEmployeeInfoUsecase = void 0;
const common_1 = require("@nestjs/common");
const mms_employee_response_dto_1 = require("@resource/application/employee/dtos/mms-employee-response.dto");
const axios_1 = require("axios");
let GetEmployeeInfoUsecase = class GetEmployeeInfoUsecase {
    constructor() { }
    async execute(employeeNumber) {
        let url = `${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`;
        if (employeeNumber) {
            url += `&employeeNumber=${employeeNumber}`;
        }
        const result = await axios_1.default.get(url);
        if (employeeNumber) {
            return [new mms_employee_response_dto_1.MMSEmployeeResponseDto(result.data)];
        }
        return result.data.map((employee) => new mms_employee_response_dto_1.MMSEmployeeResponseDto(employee));
    }
};
exports.GetEmployeeInfoUsecase = GetEmployeeInfoUsecase;
exports.GetEmployeeInfoUsecase = GetEmployeeInfoUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GetEmployeeInfoUsecase);
//# sourceMappingURL=getEmployeeInfo.usecase.js.map