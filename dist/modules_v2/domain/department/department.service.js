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
exports.DomainDepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_repository_1 = require("./department.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainDepartmentService = class DomainDepartmentService extends base_service_1.BaseService {
    constructor(departmentRepository) {
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
    }
    async findByDepartmentId(id) {
        const department = await this.departmentRepository.findOne({ where: { id } });
        if (!department) {
            throw new common_1.NotFoundException('부서를 찾을 수 없습니다.');
        }
        return department;
    }
    async findByCode(departmentCode) {
        const department = await this.departmentRepository.findByCode(departmentCode);
        if (!department) {
            throw new common_1.NotFoundException('부서를 찾을 수 없습니다.');
        }
        return department;
    }
    async findRootDepartments() {
        return this.departmentRepository.findRootDepartments();
    }
    async findChildDepartments(parentDepartmentId) {
        return this.departmentRepository.findChildDepartments(parentDepartmentId);
    }
};
exports.DomainDepartmentService = DomainDepartmentService;
exports.DomainDepartmentService = DomainDepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_repository_1.DomainDepartmentRepository])
], DomainDepartmentService);
//# sourceMappingURL=department.service.js.map