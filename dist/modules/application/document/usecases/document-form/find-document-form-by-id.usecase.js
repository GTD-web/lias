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
exports.FindDocumentFormByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const document_form_service_1 = require("../../../../domain/document-form/document-form.service");
const employee_entity_1 = require("../../../../../database/entities/employee.entity");
const approval_enum_1 = require("../../../../../common/enums/approval.enum");
const typeorm_1 = require("typeorm");
const form_approval_step_service_1 = require("../../../../domain/form-approval-step/form-approval-step.service");
const department_service_1 = require("../../../../domain/department/department.service");
const employee_service_1 = require("../../../../domain/employee/employee.service");
let FindDocumentFormByIdUseCase = class FindDocumentFormByIdUseCase {
    constructor(documentFormService, formApprovalStepService, departmentService, employeeService, dataSource) {
        this.documentFormService = documentFormService;
        this.formApprovalStepService = formApprovalStepService;
        this.departmentService = departmentService;
        this.employeeService = employeeService;
        this.dataSource = dataSource;
    }
    async execute(documentFormId, user) {
        const documentForm = await this.documentFormService.findOne({
            where: { documentFormId },
            relations: [
                'documentType',
                'formApprovalLine',
                'formApprovalLine.formApprovalSteps',
                'formApprovalLine.formApprovalSteps.defaultApprover',
            ],
        });
        if (!documentForm) {
            throw new common_1.NotFoundException('문서 양식을 찾을 수 없습니다.');
        }
        const hasApprovalSteps = documentForm.formApprovalLine?.formApprovalSteps?.some((step) => step.type === approval_enum_1.ApprovalStepType.APPROVAL);
        if (!hasApprovalSteps && documentForm.autoFillType !== approval_enum_1.AutoFillType.NONE) {
            const autoApprovalSteps = await this.generateAutoApprovalSteps(user, documentForm.autoFillType);
            if (documentForm.formApprovalLine) {
                documentForm.formApprovalLine.formApprovalSteps = [
                    ...documentForm.formApprovalLine.formApprovalSteps,
                    ...autoApprovalSteps,
                ];
            }
        }
        return documentForm;
    }
    async generateAutoApprovalSteps(user, autoFillType) {
        const autoApprovalSteps = [];
        const newApprovalStep = await this.formApprovalStepService.create({
            type: approval_enum_1.ApprovalStepType.APPROVAL,
            order: autoApprovalSteps.length + 1,
            defaultApprover: user,
        });
        autoApprovalSteps.push(newApprovalStep);
        if (autoFillType === approval_enum_1.AutoFillType.DRAFTER_SUPERIOR) {
            const superiors = await this.findSuperiorsByDepartment(user.departmentPositions[0].departmentId, user.id, user.departmentPositions[0].positionId);
            for (let index = 0; index < superiors.length; index++) {
                const superior = superiors[index];
                const newApprovalStep = await this.formApprovalStepService.create({
                    type: approval_enum_1.ApprovalStepType.APPROVAL,
                    order: autoApprovalSteps.length + 1,
                    defaultApprover: superior,
                });
                autoApprovalSteps.push(newApprovalStep);
            }
        }
        return autoApprovalSteps;
    }
    async findSuperiorsByDepartment(departmentCode, currentUserId, currentUserPosition) {
        const positionOrder = ['직원', '파트장', 'PM', '실장', '임원'];
        const currentUserPositionIndex = positionOrder.indexOf(currentUserPosition);
        if (currentUserPositionIndex === -1) {
            return [];
        }
        const superiorRanks = positionOrder.slice(currentUserPositionIndex + 1);
        if (superiorRanks.length === 0) {
            return [];
        }
        const departmentHierarchy = await this.getDepartmentHierarchy(departmentCode);
        const superiors = await this.findSuperiorsInHierarchy(departmentHierarchy, currentUserId, superiorRanks);
        return superiors;
    }
    async getDepartmentHierarchy(departmentCode) {
        const hierarchy = [departmentCode];
        const findUpperDepts = async (deptCode) => {
            const dept = await this.departmentService.findOne({
                where: { departmentCode: deptCode },
            });
            if (dept && dept.parentDepartmentId) {
                const parentDept = await this.departmentService.findOne({
                    where: { id: dept.parentDepartmentId },
                });
                if (parentDept) {
                    hierarchy.push(parentDept.departmentCode);
                    await findUpperDepts(parentDept.departmentCode);
                }
            }
        };
        await findUpperDepts(departmentCode);
        return hierarchy;
    }
    async findSuperiorsInHierarchy(departmentHierarchy, currentUserId, superiorPositions) {
        const superiors = [];
        for (const dept of departmentHierarchy) {
            const deptSuperiors = await this.dataSource
                .getRepository(employee_entity_1.Employee)
                .createQueryBuilder('employee')
                .where('employee.department = :department', { department: dept })
                .andWhere('employee.employeeId != :currentUserId', { currentUserId })
                .andWhere('employee.position IN (:...superiorPositions)', { superiorPositions })
                .orderBy('CASE employee.position ' +
                superiorPositions.map((position, index) => `WHEN '${position}' THEN ${index}`).join(' ') +
                ' END', 'ASC')
                .getMany();
            superiors.push(...deptSuperiors);
        }
        return superiors;
    }
};
exports.FindDocumentFormByIdUseCase = FindDocumentFormByIdUseCase;
exports.FindDocumentFormByIdUseCase = FindDocumentFormByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [document_form_service_1.DomainDocumentFormService,
        form_approval_step_service_1.DomainFormApprovalStepService,
        department_service_1.DomainDepartmentService,
        employee_service_1.DomainEmployeeService,
        typeorm_1.DataSource])
], FindDocumentFormByIdUseCase);
//# sourceMappingURL=find-document-form-by-id.usecase.js.map