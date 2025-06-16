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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManagerCandidatesUsecase = void 0;
const common_1 = require("@nestjs/common");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const typeorm_1 = require("typeorm");
const employee_service_1 = require("@src/domain/employee/employee.service");
let GetManagerCandidatesUsecase = class GetManagerCandidatesUsecase {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute() {
        const resourceManagers = await this.employeeService.findAll({
            where: {
                department: (0, typeorm_1.Not)((0, typeorm_1.In)(['퇴사', '관리자'])),
            },
            select: {
                employeeId: true,
                name: true,
                employeeNumber: true,
                department: true,
                position: true,
                roles: true,
            },
        });
        const departments = new Map();
        resourceManagers.forEach((resourceManager) => {
            if (!departments.has(resourceManager.department)) {
                departments.set(resourceManager.department, []);
            }
            const data = {
                ...resourceManager,
                isResourceAdmin: resourceManager.roles.includes(role_type_enum_1.Role.RESOURCE_ADMIN),
            };
            departments.get(resourceManager.department)?.push(data);
        });
        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }
};
exports.GetManagerCandidatesUsecase = GetManagerCandidatesUsecase;
exports.GetManagerCandidatesUsecase = GetManagerCandidatesUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object])
], GetManagerCandidatesUsecase);
//# sourceMappingURL=getManagerCandidates.usecase.js.map