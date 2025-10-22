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
var TestDataContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataContext = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const transaction_util_1 = require("../../../common/utils/transaction.util");
const form_service_1 = require("../../domain/form/form.service");
const form_version_service_1 = require("../../domain/form/form-version.service");
const document_service_1 = require("../../domain/document/document.service");
const approval_line_template_service_1 = require("../../domain/approval-line-template/approval-line-template.service");
const approval_line_template_version_service_1 = require("../../domain/approval-line-template/approval-line-template-version.service");
const approval_step_template_service_1 = require("../../domain/approval-step-template/approval-step-template.service");
const approval_line_snapshot_service_1 = require("../../domain/approval-line-snapshot/approval-line-snapshot.service");
const approval_step_snapshot_service_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.service");
const form_version_approval_line_template_version_service_1 = require("../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const department_service_1 = require("../../domain/department/department.service");
const employee_department_position_service_1 = require("../../domain/employee-department-position/employee-department-position.service");
const position_service_1 = require("../../domain/position/position.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let TestDataContext = TestDataContext_1 = class TestDataContext {
    constructor(dataSource, formService, formVersionService, documentService, approvalLineTemplateService, approvalLineTemplateVersionService, approvalStepTemplateService, approvalLineSnapshotService, approvalStepSnapshotService, formVersionApprovalLineTemplateVersionService, employeeService, departmentService, employeeDepartmentPositionService, positionService) {
        this.dataSource = dataSource;
        this.formService = formService;
        this.formVersionService = formVersionService;
        this.documentService = documentService;
        this.approvalLineTemplateService = approvalLineTemplateService;
        this.approvalLineTemplateVersionService = approvalLineTemplateVersionService;
        this.approvalStepTemplateService = approvalStepTemplateService;
        this.approvalLineSnapshotService = approvalLineSnapshotService;
        this.approvalStepSnapshotService = approvalStepSnapshotService;
        this.formVersionApprovalLineTemplateVersionService = formVersionApprovalLineTemplateVersionService;
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.positionService = positionService;
        this.logger = new common_1.Logger(TestDataContext_1.name);
    }
    async createTestData(employeeId, departmentId) {
        this.logger.log('테스트 데이터 생성 시작');
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const createdData = {
                forms: [],
                formVersions: [],
                documents: [],
                approvalLineTemplates: [],
                approvalLineTemplateVersions: [],
                approvalStepTemplates: [],
                approvalLineSnapshots: [],
                approvalStepSnapshots: [],
            };
            const simpleTemplate = await this.createSimpleApprovalLine(employeeId, departmentId, queryRunner);
            const complexTemplate = await this.createComplexApprovalLine(employeeId, departmentId, queryRunner);
            const agreementTemplate = await this.createAgreementApprovalLine(employeeId, departmentId, queryRunner);
            createdData.approvalLineTemplates.push(simpleTemplate.template.id, complexTemplate.template.id, agreementTemplate.template.id);
            createdData.approvalLineTemplateVersions.push(simpleTemplate.version.id, complexTemplate.version.id, agreementTemplate.version.id);
            createdData.approvalStepTemplates.push(...simpleTemplate.steps, ...complexTemplate.steps, ...agreementTemplate.steps);
            const expenseForm = await this.createFormWithApprovalLine('지출 결의서', 'EXPENSE_FORM', simpleTemplate.version.id, employeeId, queryRunner);
            const budgetForm = await this.createFormWithApprovalLine('예산 신청서', 'BUDGET_FORM', complexTemplate.version.id, employeeId, queryRunner);
            const purchaseForm = await this.createFormWithApprovalLine('구매 요청서', 'PURCHASE_FORM', agreementTemplate.version.id, employeeId, queryRunner);
            createdData.forms.push(expenseForm.form.id, budgetForm.form.id, purchaseForm.form.id);
            createdData.formVersions.push(expenseForm.version.id, budgetForm.version.id, purchaseForm.version.id);
            const draftDoc = await this.createDocument(expenseForm.version.id, employeeId, departmentId, '임시저장 문서', approval_enum_1.DocumentStatus.DRAFT, queryRunner);
            createdData.documents.push(draftDoc.id);
            const pendingDoc = await this.createDocumentWithSnapshot(budgetForm.version.id, employeeId, departmentId, '결재 대기 문서', complexTemplate.version.id, queryRunner);
            createdData.documents.push(pendingDoc.document.id);
            createdData.approvalLineSnapshots.push(pendingDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...pendingDoc.stepSnapshots.map((s) => s.id));
            const partialApprovedDoc = await this.createDocumentWithSnapshot(expenseForm.version.id, employeeId, departmentId, '일부 승인 문서', simpleTemplate.version.id, queryRunner);
            await this.approvalStepSnapshotService.update(partialApprovedDoc.stepSnapshots[0].id, {
                status: approval_enum_1.ApprovalStatus.APPROVED,
                comment: '승인합니다',
                approvedAt: new Date(),
            }, { queryRunner });
            createdData.documents.push(partialApprovedDoc.document.id);
            createdData.approvalLineSnapshots.push(partialApprovedDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...partialApprovedDoc.stepSnapshots.map((s) => s.id));
            const rejectedDoc = await this.createDocumentWithSnapshot(purchaseForm.version.id, employeeId, departmentId, '반려된 문서', agreementTemplate.version.id, queryRunner);
            await this.approvalStepSnapshotService.update(rejectedDoc.stepSnapshots[1].id, {
                status: approval_enum_1.ApprovalStatus.REJECTED,
                comment: '예산 초과로 반려합니다',
                approvedAt: new Date(),
            }, { queryRunner });
            await this.documentService.update(rejectedDoc.document.id, { status: approval_enum_1.DocumentStatus.REJECTED }, { queryRunner });
            createdData.documents.push(rejectedDoc.document.id);
            createdData.approvalLineSnapshots.push(rejectedDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...rejectedDoc.stepSnapshots.map((s) => s.id));
            const approvedDoc = await this.createDocumentWithSnapshot(expenseForm.version.id, employeeId, departmentId, '승인 완료 문서', simpleTemplate.version.id, queryRunner);
            for (const step of approvedDoc.stepSnapshots) {
                await this.approvalStepSnapshotService.update(step.id, {
                    status: approval_enum_1.ApprovalStatus.APPROVED,
                    comment: '승인합니다',
                    approvedAt: new Date(),
                }, { queryRunner });
            }
            await this.documentService.update(approvedDoc.document.id, { status: approval_enum_1.DocumentStatus.APPROVED }, { queryRunner });
            createdData.documents.push(approvedDoc.document.id);
            createdData.approvalLineSnapshots.push(approvedDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...approvedDoc.stepSnapshots.map((s) => s.id));
            const cancelledDoc = await this.createDocument(budgetForm.version.id, employeeId, departmentId, '취소된 문서', approval_enum_1.DocumentStatus.CANCELLED, queryRunner);
            await this.documentService.update(cancelledDoc.id, {
                status: approval_enum_1.DocumentStatus.CANCELLED,
                cancelReason: '기안자가 취소함',
                cancelledAt: new Date(),
            }, { queryRunner });
            createdData.documents.push(cancelledDoc.id);
            this.logger.log('테스트 데이터 생성 완료');
            return createdData;
        });
    }
    async getOtherEmployeesInDepartment(excludeEmployeeId, departmentId, queryRunner) {
        const employeeDeptPositions = await this.employeeDepartmentPositionService.findAll({
            where: { departmentId },
            relations: ['employee', 'position'],
            queryRunner,
        });
        return employeeDeptPositions
            .filter((edp) => edp.employeeId !== excludeEmployeeId && edp.employee)
            .map((edp) => edp.employee);
    }
    async getDepartmentHead(departmentId, excludeEmployeeId, queryRunner) {
        const employeeDeptPositions = await this.employeeDepartmentPositionService.findAll({
            where: { departmentId },
            relations: ['employee', 'position'],
            queryRunner,
        });
        const manager = employeeDeptPositions.find((edp) => edp.isManager && edp.employee && edp.employeeId !== excludeEmployeeId);
        if (manager)
            return manager.employee;
        for (const edp of employeeDeptPositions) {
            if (edp.position?.hasManagementAuthority && edp.employee && edp.employeeId !== excludeEmployeeId) {
                return edp.employee;
            }
        }
        const fallback = employeeDeptPositions.find((edp) => edp.employee && edp.employeeId !== excludeEmployeeId);
        return fallback?.employee || null;
    }
    async getParentDepartment(departmentId, queryRunner) {
        const department = await this.departmentService.findOne({
            where: { id: departmentId },
            queryRunner,
        });
        if (!department?.parentDepartmentId)
            return null;
        return await this.departmentService.findOne({
            where: { id: department.parentDepartmentId },
            queryRunner,
        });
    }
    async getParentDepartmentHead(departmentId, excludeEmployeeId, queryRunner) {
        const parentDept = await this.getParentDepartment(departmentId, queryRunner);
        if (!parentDept)
            return null;
        return await this.getDepartmentHead(parentDept.id, excludeEmployeeId, queryRunner);
    }
    getRandomEmployee(employees) {
        if (!employees || employees.length === 0)
            return null;
        return employees[Math.floor(Math.random() * employees.length)];
    }
    async createSimpleApprovalLine(employeeId, departmentId, queryRunner) {
        const otherEmployees = await this.getOtherEmployeesInDepartment(employeeId, departmentId, queryRunner);
        const departmentHead = await this.getDepartmentHead(departmentId, employeeId, queryRunner);
        this.logger.debug(`부서 ${departmentId}의 직원 수: ${otherEmployees.length + 1} (기안자 포함)`);
        this.logger.debug(`부서장: ${departmentHead?.employeeNumber || '없음'}`);
        const nonHeadEmployees = otherEmployees.filter((e) => e.id !== departmentHead?.id);
        const firstApprover = this.getRandomEmployee(nonHeadEmployees);
        const templateEntity = await this.approvalLineTemplateService.create({
            name: '간단한 2단계 결재선',
            type: approval_enum_1.ApprovalLineType.COMMON,
            orgScope: approval_enum_1.DepartmentScopeType.ALL,
            status: approval_enum_1.ApprovalLineTemplateStatus.ACTIVE,
            createdBy: employeeId,
        }, { queryRunner });
        const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });
        const versionEntity = await this.approvalLineTemplateVersionService.create({
            templateId: template.id,
            versionNo: 1,
            isActive: true,
            createdBy: employeeId,
        }, { queryRunner });
        const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });
        if (firstApprover) {
            const step1Entity = await this.approvalStepTemplateService.create({
                lineTemplateVersionId: version.id,
                stepOrder: 1,
                stepType: approval_enum_1.ApprovalStepType.APPROVAL,
                assigneeRule: approval_enum_1.AssigneeRule.FIXED,
                defaultApproverId: firstApprover.id,
                required: true,
                description: '1차 결재',
            }, { queryRunner });
            const step1 = await this.approvalStepTemplateService.save(step1Entity, { queryRunner });
            const step2Entity = await this.approvalStepTemplateService.create({
                lineTemplateVersionId: version.id,
                stepOrder: 2,
                stepType: approval_enum_1.ApprovalStepType.APPROVAL,
                assigneeRule: approval_enum_1.AssigneeRule.DEPARTMENT_HEAD,
                targetDepartmentId: departmentId,
                required: true,
                description: '2차 결재 (부서장)',
            }, { queryRunner });
            const step2 = await this.approvalStepTemplateService.save(step2Entity, { queryRunner });
            template.currentVersionId = version.id;
            await this.approvalLineTemplateService.save(template, { queryRunner });
            return { template, version, steps: [step1.id, step2.id] };
        }
        else {
            this.logger.warn(`부서 ${departmentId}에 직원이 부족합니다. 1단계 결재선만 생성합니다 (부서장 결재)`);
            const step1Entity = await this.approvalStepTemplateService.create({
                lineTemplateVersionId: version.id,
                stepOrder: 1,
                stepType: approval_enum_1.ApprovalStepType.APPROVAL,
                assigneeRule: approval_enum_1.AssigneeRule.DEPARTMENT_HEAD,
                targetDepartmentId: departmentId,
                required: true,
                description: '부서장 결재',
            }, { queryRunner });
            const step1 = await this.approvalStepTemplateService.save(step1Entity, { queryRunner });
            template.currentVersionId = version.id;
            await this.approvalLineTemplateService.save(template, { queryRunner });
            return { template, version, steps: [step1.id] };
        }
    }
    async createComplexApprovalLine(employeeId, departmentId, queryRunner) {
        const otherEmployees = await this.getOtherEmployeesInDepartment(employeeId, departmentId, queryRunner);
        const agreementPerson = this.getRandomEmployee(otherEmployees);
        const firstApprover = this.getRandomEmployee(otherEmployees.filter((e) => e.id !== agreementPerson?.id));
        const implementer = this.getRandomEmployee(otherEmployees.filter((e) => e.id !== agreementPerson?.id && e.id !== firstApprover?.id));
        const parentDeptHead = await this.getParentDepartmentHead(departmentId, employeeId, queryRunner);
        const templateEntity = await this.approvalLineTemplateService.create({
            name: '복잡한 다단계 결재선',
            type: approval_enum_1.ApprovalLineType.COMMON,
            orgScope: approval_enum_1.DepartmentScopeType.ALL,
            status: approval_enum_1.ApprovalLineTemplateStatus.ACTIVE,
            createdBy: employeeId,
        }, { queryRunner });
        const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });
        const versionEntity = await this.approvalLineTemplateVersionService.create({
            templateId: template.id,
            versionNo: 1,
            isActive: true,
            createdBy: employeeId,
        }, { queryRunner });
        const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });
        const steps = [];
        const step1 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
            lineTemplateVersionId: version.id,
            stepOrder: 1,
            stepType: approval_enum_1.ApprovalStepType.AGREEMENT,
            assigneeRule: approval_enum_1.AssigneeRule.FIXED,
            defaultApproverId: agreementPerson?.id || employeeId,
            required: true,
            description: '사전 협의',
        }, { queryRunner }), { queryRunner });
        steps.push(step1.id);
        const step2 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
            lineTemplateVersionId: version.id,
            stepOrder: 2,
            stepType: approval_enum_1.ApprovalStepType.APPROVAL,
            assigneeRule: approval_enum_1.AssigneeRule.FIXED,
            defaultApproverId: firstApprover?.id || employeeId,
            required: true,
            description: '1차 결재',
        }, { queryRunner }), { queryRunner });
        steps.push(step2.id);
        const step3 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
            lineTemplateVersionId: version.id,
            stepOrder: 3,
            stepType: approval_enum_1.ApprovalStepType.APPROVAL,
            assigneeRule: approval_enum_1.AssigneeRule.DEPARTMENT_HEAD,
            targetDepartmentId: departmentId,
            required: true,
            description: '2차 결재 (부서장)',
        }, { queryRunner }), { queryRunner });
        steps.push(step3.id);
        if (parentDeptHead) {
            const step4 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
                lineTemplateVersionId: version.id,
                stepOrder: 4,
                stepType: approval_enum_1.ApprovalStepType.APPROVAL,
                assigneeRule: approval_enum_1.AssigneeRule.FIXED,
                defaultApproverId: parentDeptHead.id,
                required: true,
                description: '3차 결재 (상위 부서장)',
            }, { queryRunner }), { queryRunner });
            steps.push(step4.id);
        }
        const step5 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
            lineTemplateVersionId: version.id,
            stepOrder: parentDeptHead ? 5 : 4,
            stepType: approval_enum_1.ApprovalStepType.IMPLEMENTATION,
            assigneeRule: approval_enum_1.AssigneeRule.FIXED,
            defaultApproverId: implementer?.id || employeeId,
            required: true,
            description: '시행 처리',
        }, { queryRunner }), { queryRunner });
        steps.push(step5.id);
        template.currentVersionId = version.id;
        await this.approvalLineTemplateService.save(template, { queryRunner });
        return { template, version, steps };
    }
    async createAgreementApprovalLine(employeeId, departmentId, queryRunner) {
        const otherEmployees = await this.getOtherEmployeesInDepartment(employeeId, departmentId, queryRunner);
        const agreementPersonA = this.getRandomEmployee(otherEmployees);
        const agreementPersonB = this.getRandomEmployee(otherEmployees.filter((e) => e.id !== agreementPersonA?.id));
        const templateEntity = await this.approvalLineTemplateService.create({
            name: '협의 중심 결재선',
            type: approval_enum_1.ApprovalLineType.COMMON,
            orgScope: approval_enum_1.DepartmentScopeType.ALL,
            status: approval_enum_1.ApprovalLineTemplateStatus.ACTIVE,
            createdBy: employeeId,
        }, { queryRunner });
        const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });
        const versionEntity = await this.approvalLineTemplateVersionService.create({
            templateId: template.id,
            versionNo: 1,
            isActive: true,
            createdBy: employeeId,
        }, { queryRunner });
        const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });
        const steps = [];
        const step1 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
            lineTemplateVersionId: version.id,
            stepOrder: 1,
            stepType: approval_enum_1.ApprovalStepType.AGREEMENT,
            assigneeRule: approval_enum_1.AssigneeRule.FIXED,
            defaultApproverId: agreementPersonA?.id || employeeId,
            required: true,
            description: '협의 A',
        }, { queryRunner }), { queryRunner });
        steps.push(step1.id);
        const step2 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
            lineTemplateVersionId: version.id,
            stepOrder: 2,
            stepType: approval_enum_1.ApprovalStepType.AGREEMENT,
            assigneeRule: approval_enum_1.AssigneeRule.FIXED,
            defaultApproverId: agreementPersonB?.id || employeeId,
            required: true,
            description: '협의 B',
        }, { queryRunner }), { queryRunner });
        steps.push(step2.id);
        const step3 = await this.approvalStepTemplateService.save(await this.approvalStepTemplateService.create({
            lineTemplateVersionId: version.id,
            stepOrder: 3,
            stepType: approval_enum_1.ApprovalStepType.APPROVAL,
            assigneeRule: approval_enum_1.AssigneeRule.DEPARTMENT_HEAD,
            targetDepartmentId: departmentId,
            required: true,
            description: '최종 결재',
        }, { queryRunner }), { queryRunner });
        steps.push(step3.id);
        template.currentVersionId = version.id;
        await this.approvalLineTemplateService.save(template, { queryRunner });
        return { template, version, steps };
    }
    async createFormWithApprovalLine(name, code, lineTemplateVersionId, employeeId, queryRunner) {
        const formEntity = await this.formService.create({
            name,
            code,
            description: `${name} 테스트용`,
            status: approval_enum_1.FormStatus.ACTIVE,
        }, { queryRunner });
        const form = await this.formService.save(formEntity, { queryRunner });
        const versionEntity = await this.formVersionService.create({
            formId: form.id,
            versionNo: 1,
            template: `<div><h1>${name}</h1><p>테스트 템플릿</p></div>`,
            isActive: true,
            createdBy: employeeId,
        }, { queryRunner });
        const version = await this.formVersionService.save(versionEntity, { queryRunner });
        const linkEntity = await this.formVersionApprovalLineTemplateVersionService.create({
            formVersionId: version.id,
            approvalLineTemplateVersionId: lineTemplateVersionId,
            isDefault: true,
        }, { queryRunner });
        await this.formVersionApprovalLineTemplateVersionService.save(linkEntity, { queryRunner });
        form.currentVersionId = version.id;
        await this.formService.save(form, { queryRunner });
        return { form, version };
    }
    async createDocument(formVersionId, drafterId, drafterDepartmentId, title, status, queryRunner) {
        const docEntity = await this.documentService.create({
            formVersionId,
            title,
            drafterId,
            status,
            content: `<p>${title}의 내용입니다.</p>`,
            metadata: { testData: true },
            documentNumber: `TEST-${Date.now()}`,
        }, { queryRunner });
        return await this.documentService.save(docEntity, { queryRunner });
    }
    async createDocumentWithSnapshot(formVersionId, drafterId, drafterDepartmentId, title, lineTemplateVersionId, queryRunner) {
        const document = await this.createDocument(formVersionId, drafterId, drafterDepartmentId, title, approval_enum_1.DocumentStatus.PENDING, queryRunner);
        const snapshotEntity = await this.approvalLineSnapshotService.create({
            documentId: document.id,
            sourceTemplateVersionId: lineTemplateVersionId,
            snapshotName: `${title} 결재선`,
            snapshotDescription: '테스트 결재선',
            frozenAt: new Date(),
        }, { queryRunner });
        const snapshot = await this.approvalLineSnapshotService.save(snapshotEntity, { queryRunner });
        const stepTemplates = await this.approvalStepTemplateService.findAll({
            where: { lineTemplateVersionId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });
        const stepSnapshots = [];
        for (const template of stepTemplates) {
            const stepEntity = await this.approvalStepSnapshotService.create({
                snapshotId: snapshot.id,
                stepOrder: template.stepOrder,
                stepType: template.stepType,
                approverId: template.defaultApproverId || drafterId,
                approverDepartmentId: drafterDepartmentId,
                status: approval_enum_1.ApprovalStatus.PENDING,
                required: template.required,
                description: template.description,
            }, { queryRunner });
            const step = await this.approvalStepSnapshotService.save(stepEntity, { queryRunner });
            stepSnapshots.push(step);
        }
        await this.documentService.update(document.id, {
            approvalLineSnapshotId: snapshot.id,
            submittedAt: new Date(),
        }, { queryRunner });
        return { document, snapshot, stepSnapshots };
    }
    async deleteTestData(createdData) {
        this.logger.log('테스트 데이터 삭제 시작');
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            for (const id of createdData.documents || []) {
                await queryRunner.manager.query(`DELETE FROM documents WHERE id = $1`, [id]);
            }
            for (const id of createdData.approvalStepSnapshots || []) {
                await queryRunner.manager.query(`DELETE FROM approval_step_snapshots WHERE id = $1`, [id]);
            }
            for (const id of createdData.approvalLineSnapshots || []) {
                await queryRunner.manager.query(`DELETE FROM approval_line_snapshots WHERE id = $1`, [id]);
            }
            for (const formVersionId of createdData.formVersions || []) {
                await queryRunner.manager.query(`DELETE FROM form_version_approval_line_template_versions WHERE "formVersionId" = $1`, [formVersionId]);
            }
            for (const id of createdData.formVersions || []) {
                await queryRunner.manager.query(`DELETE FROM form_versions WHERE id = $1`, [id]);
            }
            for (const id of createdData.forms || []) {
                await queryRunner.manager.query(`DELETE FROM forms WHERE id = $1`, [id]);
            }
            for (const id of createdData.approvalStepTemplates || []) {
                await queryRunner.manager.query(`DELETE FROM approval_step_templates WHERE id = $1`, [id]);
            }
            for (const id of createdData.approvalLineTemplateVersions || []) {
                await queryRunner.manager.query(`DELETE FROM approval_line_template_versions WHERE id = $1`, [id]);
            }
            for (const id of createdData.approvalLineTemplates || []) {
                await queryRunner.manager.query(`DELETE FROM approval_line_templates WHERE id = $1`, [id]);
            }
            this.logger.log('테스트 데이터 삭제 완료');
            return { success: true, message: '테스트 데이터가 삭제되었습니다.' };
        });
    }
    async deleteAllDocuments() {
        this.logger.log('모든 문서 및 결재 프로세스 삭제 시작');
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const documents = await queryRunner.manager.query(`
                SELECT id, "approvalLineSnapshotId" 
                FROM documents
            `);
            for (const doc of documents) {
                await queryRunner.manager.query(`DELETE FROM documents WHERE id = $1`, [doc.id]);
            }
            const deletedSteps = await queryRunner.manager.query(`DELETE FROM approval_step_snapshots RETURNING id`);
            const deletedSnapshots = await queryRunner.manager.query(`DELETE FROM approval_line_snapshots RETURNING id`);
            this.logger.log(`문서 ${documents.length}개, 결재선 스냅샷 ${deletedSnapshots.length}개, 결재 단계 스냅샷 ${deletedSteps.length}개 삭제 완료`);
            return {
                success: true,
                message: `문서 ${documents.length}개, 결재 프로세스 데이터 삭제 완료`,
            };
        });
    }
    async deleteAllFormsAndTemplates() {
        this.logger.log('모든 결재선 및 양식 삭제 시작');
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            await queryRunner.manager.query(`UPDATE forms SET "currentVersionId" = NULL`);
            await queryRunner.manager.query(`DELETE FROM form_version_approval_line_template_versions`);
            const deletedFormVersions = await queryRunner.manager.query(`DELETE FROM form_versions RETURNING id`);
            const deletedForms = await queryRunner.manager.query(`DELETE FROM forms RETURNING id`);
            const deletedStepTemplates = await queryRunner.manager.query(`DELETE FROM approval_step_templates RETURNING id`);
            await queryRunner.manager.query(`UPDATE approval_line_templates SET "currentVersionId" = NULL`);
            const deletedTemplateVersions = await queryRunner.manager.query(`DELETE FROM approval_line_template_versions RETURNING id`);
            const deletedTemplates = await queryRunner.manager.query(`DELETE FROM approval_line_templates RETURNING id`);
            this.logger.log(`양식 ${deletedForms.length}개, 양식버전 ${deletedFormVersions.length}개, ` +
                `결재선 템플릿 ${deletedTemplates.length}개, 템플릿버전 ${deletedTemplateVersions.length}개, ` +
                `단계 템플릿 ${deletedStepTemplates.length}개 삭제 완료`);
            return {
                success: true,
                message: `양식 ${deletedForms.length}개, 결재선 템플릿 ${deletedTemplates.length}개 삭제 완료`,
            };
        });
    }
    async deleteAllTestData() {
        this.logger.log('모든 테스트 데이터 삭제 시작');
        const documentsResult = await this.deleteAllDocuments();
        this.logger.log(`문서 삭제 완료: ${documentsResult.message}`);
        const formsResult = await this.deleteAllFormsAndTemplates();
        this.logger.log(`결재선 및 양식 삭제 완료: ${formsResult.message}`);
        this.logger.log('모든 테스트 데이터 삭제 완료');
        return {
            success: true,
            message: `전체 삭제 완료: ${documentsResult.message}, ${formsResult.message}`,
        };
    }
    async createTestDataByScenario(employeeId, departmentId, dto) {
        this.logger.log(`시나리오 기반 테스트 데이터 생성: ${dto.scenario}`);
        const documentCount = dto.documentCount || 1;
        const titlePrefix = dto.titlePrefix || '테스트 문서';
        const progress = dto.progress || 0;
        switch (dto.scenario) {
            case 'SIMPLE_APPROVAL':
                return await this.createSimpleApprovalScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            case 'MULTI_LEVEL_APPROVAL':
                return await this.createMultiLevelApprovalScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            case 'AGREEMENT_PROCESS':
                return await this.createAgreementProcessScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            case 'IMPLEMENTATION_PROCESS':
                return await this.createImplementationProcessScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            case 'REJECTED_DOCUMENT':
                return await this.createRejectedDocumentScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                });
            case 'CANCELLED_DOCUMENT':
                return await this.createCancelledDocumentScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                });
            case 'WITH_REFERENCE':
                return await this.createWithReferenceScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            case 'PARALLEL_AGREEMENT':
                return await this.createParallelAgreementScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            case 'FULL_PROCESS':
                return await this.createFullProcessScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            default:
                return await this.createTestData(employeeId, departmentId);
        }
    }
    async createSimpleApprovalScenario(employeeId, departmentId, options) {
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const createdData = {
                forms: [],
                formVersions: [],
                documents: [],
                approvalLineTemplates: [],
                approvalLineTemplateVersions: [],
                approvalStepTemplates: [],
                approvalLineSnapshots: [],
                approvalStepSnapshots: [],
            };
            const template = await this.createSimpleApprovalLine(employeeId, departmentId, queryRunner);
            createdData.approvalLineTemplates.push(template.template.id);
            createdData.approvalLineTemplateVersions.push(template.version.id);
            createdData.approvalStepTemplates.push(...template.steps);
            const form = await this.createFormWithApprovalLine(`${options.titlePrefix}`, `${options.titlePrefix.toUpperCase().replace(/ /g, '_')}_FORM`, template.version.id, employeeId, queryRunner);
            createdData.forms.push(form.form.id);
            createdData.formVersions.push(form.version.id);
            for (let i = 0; i < options.documentCount; i++) {
                if (options.progress > 0) {
                    const doc = await this.createDocumentWithSnapshot(form.version.id, employeeId, departmentId, `${options.titlePrefix} #${i + 1}`, template.version.id, queryRunner);
                    createdData.documents.push(doc.document.id);
                    createdData.approvalLineSnapshots.push(doc.snapshot.id);
                    createdData.approvalStepSnapshots.push(...doc.stepSnapshots.map((s) => s.id));
                }
                else {
                    const doc = await this.createDocument(form.version.id, employeeId, departmentId, `${options.titlePrefix} #${i + 1}`, approval_enum_1.DocumentStatus.DRAFT, queryRunner);
                    createdData.documents.push(doc.id);
                }
            }
            return createdData;
        });
    }
    async createMultiLevelApprovalScenario(employeeId, departmentId, options) {
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const createdData = {
                forms: [],
                formVersions: [],
                documents: [],
                approvalLineTemplates: [],
                approvalLineTemplateVersions: [],
                approvalStepTemplates: [],
                approvalLineSnapshots: [],
                approvalStepSnapshots: [],
            };
            const template = await this.createComplexApprovalLine(employeeId, departmentId, queryRunner);
            createdData.approvalLineTemplates.push(template.template.id);
            createdData.approvalLineTemplateVersions.push(template.version.id);
            createdData.approvalStepTemplates.push(...template.steps);
            const form = await this.createFormWithApprovalLine(`${options.titlePrefix}`, `${options.titlePrefix.toUpperCase().replace(/ /g, '_')}_FORM`, template.version.id, employeeId, queryRunner);
            createdData.forms.push(form.form.id);
            createdData.formVersions.push(form.version.id);
            for (let i = 0; i < options.documentCount; i++) {
                if (options.progress > 0) {
                    const doc = await this.createDocumentWithSnapshot(form.version.id, employeeId, departmentId, `${options.titlePrefix} #${i + 1}`, template.version.id, queryRunner);
                    createdData.documents.push(doc.document.id);
                    createdData.approvalLineSnapshots.push(doc.snapshot.id);
                    createdData.approvalStepSnapshots.push(...doc.stepSnapshots.map((s) => s.id));
                }
                else {
                    const doc = await this.createDocument(form.version.id, employeeId, departmentId, `${options.titlePrefix} #${i + 1}`, approval_enum_1.DocumentStatus.DRAFT, queryRunner);
                    createdData.documents.push(doc.id);
                }
            }
            return createdData;
        });
    }
    async createAgreementProcessScenario(employeeId, departmentId, options) {
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const createdData = {
                forms: [],
                formVersions: [],
                documents: [],
                approvalLineTemplates: [],
                approvalLineTemplateVersions: [],
                approvalStepTemplates: [],
                approvalLineSnapshots: [],
                approvalStepSnapshots: [],
            };
            const template = await this.createAgreementApprovalLine(employeeId, departmentId, queryRunner);
            createdData.approvalLineTemplates.push(template.template.id);
            createdData.approvalLineTemplateVersions.push(template.version.id);
            createdData.approvalStepTemplates.push(...template.steps);
            const form = await this.createFormWithApprovalLine(`${options.titlePrefix}`, `${options.titlePrefix.toUpperCase().replace(/ /g, '_')}_FORM`, template.version.id, employeeId, queryRunner);
            createdData.forms.push(form.form.id);
            createdData.formVersions.push(form.version.id);
            for (let i = 0; i < options.documentCount; i++) {
                if (options.progress > 0) {
                    const doc = await this.createDocumentWithSnapshot(form.version.id, employeeId, departmentId, `${options.titlePrefix} #${i + 1}`, template.version.id, queryRunner);
                    createdData.documents.push(doc.document.id);
                    createdData.approvalLineSnapshots.push(doc.snapshot.id);
                    createdData.approvalStepSnapshots.push(...doc.stepSnapshots.map((s) => s.id));
                }
                else {
                    const doc = await this.createDocument(form.version.id, employeeId, departmentId, `${options.titlePrefix} #${i + 1}`, approval_enum_1.DocumentStatus.DRAFT, queryRunner);
                    createdData.documents.push(doc.id);
                }
            }
            return createdData;
        });
    }
    async createImplementationProcessScenario(employeeId, departmentId, options) {
        return await this.createSimpleApprovalScenario(employeeId, departmentId, options);
    }
    async createRejectedDocumentScenario(employeeId, departmentId, options) {
        return await this.createSimpleApprovalScenario(employeeId, departmentId, { ...options, progress: 100 });
    }
    async createCancelledDocumentScenario(employeeId, departmentId, options) {
        return await this.createSimpleApprovalScenario(employeeId, departmentId, { ...options, progress: 100 });
    }
    async createWithReferenceScenario(employeeId, departmentId, options) {
        return await this.createSimpleApprovalScenario(employeeId, departmentId, options);
    }
    async createParallelAgreementScenario(employeeId, departmentId, options) {
        return await this.createAgreementProcessScenario(employeeId, departmentId, options);
    }
    async createFullProcessScenario(employeeId, departmentId, options) {
        return await this.createMultiLevelApprovalScenario(employeeId, departmentId, options);
    }
};
exports.TestDataContext = TestDataContext;
exports.TestDataContext = TestDataContext = TestDataContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        form_service_1.DomainFormService,
        form_version_service_1.DomainFormVersionService,
        document_service_1.DomainDocumentService,
        approval_line_template_service_1.DomainApprovalLineTemplateService,
        approval_line_template_version_service_1.DomainApprovalLineTemplateVersionService,
        approval_step_template_service_1.DomainApprovalStepTemplateService,
        approval_line_snapshot_service_1.DomainApprovalLineSnapshotService,
        approval_step_snapshot_service_1.DomainApprovalStepSnapshotService,
        form_version_approval_line_template_version_service_1.DomainFormVersionApprovalLineTemplateVersionService,
        employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService,
        position_service_1.DomainPositionService])
], TestDataContext);
//# sourceMappingURL=test-data.context.js.map