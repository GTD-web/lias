import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { withTransaction } from '../../../common/utils/transaction.util';
import { DomainFormService } from '../../domain/form/form.service';
import { DomainFormVersionService } from '../../domain/form/form-version.service';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DomainApprovalLineTemplateService } from '../../domain/approval-line-template/approval-line-template.service';
import { DomainApprovalLineTemplateVersionService } from '../../domain/approval-line-template/approval-line-template-version.service';
import { DomainApprovalStepTemplateService } from '../../domain/approval-step-template/approval-step-template.service';
import { DomainApprovalLineSnapshotService } from '../../domain/approval-line-snapshot/approval-line-snapshot.service';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainFormVersionApprovalLineTemplateVersionService } from '../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainPositionService } from '../../domain/position/position.service';
import {
    FormStatus,
    ApprovalLineTemplateStatus,
    ApprovalStepType,
    AssigneeRule,
    DocumentStatus,
    ApprovalStatus,
    ApprovalLineType,
    DepartmentScopeType,
} from '../../../common/enums/approval.enum';
import { EmployeeStatus } from '../../../common/enums/employee.enum';

/**
 * TestDataContext
 *
 * 테스트 데이터 생성 및 삭제를 위한 컨텍스트
 */
@Injectable()
export class TestDataContext {
    private readonly logger = new Logger(TestDataContext.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly formService: DomainFormService,
        private readonly formVersionService: DomainFormVersionService,
        private readonly documentService: DomainDocumentService,
        private readonly approvalLineTemplateService: DomainApprovalLineTemplateService,
        private readonly approvalLineTemplateVersionService: DomainApprovalLineTemplateVersionService,
        private readonly approvalStepTemplateService: DomainApprovalStepTemplateService,
        private readonly approvalLineSnapshotService: DomainApprovalLineSnapshotService,
        private readonly approvalStepSnapshotService: DomainApprovalStepSnapshotService,
        private readonly formVersionApprovalLineTemplateVersionService: DomainFormVersionApprovalLineTemplateVersionService,
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
        private readonly positionService: DomainPositionService,
    ) {}

    /**
     * 1. 포괄적인 테스트 데이터 생성
     */
    async createTestData(employeeId: string, departmentId: string) {
        this.logger.log('테스트 데이터 생성 시작');

        return await withTransaction(this.dataSource, async (queryRunner) => {
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

            // 1) 결재선 템플릿 생성 (3가지 유형)
            const simpleTemplate = await this.createSimpleApprovalLine(employeeId, departmentId, queryRunner);
            const complexTemplate = await this.createComplexApprovalLine(employeeId, departmentId, queryRunner);
            const agreementTemplate = await this.createAgreementApprovalLine(employeeId, departmentId, queryRunner);

            createdData.approvalLineTemplates.push(
                simpleTemplate.template.id,
                complexTemplate.template.id,
                agreementTemplate.template.id,
            );
            createdData.approvalLineTemplateVersions.push(
                simpleTemplate.version.id,
                complexTemplate.version.id,
                agreementTemplate.version.id,
            );
            createdData.approvalStepTemplates.push(
                ...simpleTemplate.steps,
                ...complexTemplate.steps,
                ...agreementTemplate.steps,
            );

            // 2) 문서양식 생성 (3가지)
            const expenseForm = await this.createFormWithApprovalLine(
                '지출 결의서',
                'EXPENSE_FORM',
                simpleTemplate.version.id,
                employeeId,
                queryRunner,
            );
            const budgetForm = await this.createFormWithApprovalLine(
                '예산 신청서',
                'BUDGET_FORM',
                complexTemplate.version.id,
                employeeId,
                queryRunner,
            );
            const purchaseForm = await this.createFormWithApprovalLine(
                '구매 요청서',
                'PURCHASE_FORM',
                agreementTemplate.version.id,
                employeeId,
                queryRunner,
            );

            createdData.forms.push(expenseForm.form.id, budgetForm.form.id, purchaseForm.form.id);
            createdData.formVersions.push(expenseForm.version.id, budgetForm.version.id, purchaseForm.version.id);

            // 3) 다양한 상태의 문서 생성
            // 3-1) DRAFT 상태 문서
            const draftDoc = await this.createDocument(
                expenseForm.version.id,
                employeeId,
                departmentId,
                '임시저장 문서',
                DocumentStatus.DRAFT,
                queryRunner,
            );
            createdData.documents.push(draftDoc.id);

            // 3-2) PENDING 상태 문서 (결재 진행 중)
            const pendingDoc = await this.createDocumentWithSnapshot(
                budgetForm.version.id,
                employeeId,
                departmentId,
                '결재 대기 문서',
                complexTemplate.version.id,
                queryRunner,
            );
            createdData.documents.push(pendingDoc.document.id);
            createdData.approvalLineSnapshots.push(pendingDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...pendingDoc.stepSnapshots.map((s) => s.id));

            // 3-3) 일부 승인된 PENDING 문서
            const partialApprovedDoc = await this.createDocumentWithSnapshot(
                expenseForm.version.id,
                employeeId,
                departmentId,
                '일부 승인 문서',
                simpleTemplate.version.id,
                queryRunner,
            );
            // 첫 번째 단계 승인 처리
            await this.approvalStepSnapshotService.update(
                partialApprovedDoc.stepSnapshots[0].id,
                {
                    status: ApprovalStatus.APPROVED,
                    comment: '승인합니다',
                    approvedAt: new Date(),
                },
                { queryRunner },
            );
            createdData.documents.push(partialApprovedDoc.document.id);
            createdData.approvalLineSnapshots.push(partialApprovedDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...partialApprovedDoc.stepSnapshots.map((s) => s.id));

            // 3-4) REJECTED 상태 문서
            const rejectedDoc = await this.createDocumentWithSnapshot(
                purchaseForm.version.id,
                employeeId,
                departmentId,
                '반려된 문서',
                agreementTemplate.version.id,
                queryRunner,
            );
            // 반려 처리
            await this.approvalStepSnapshotService.update(
                rejectedDoc.stepSnapshots[1].id,
                {
                    status: ApprovalStatus.REJECTED,
                    comment: '예산 초과로 반려합니다',
                    approvedAt: new Date(),
                },
                { queryRunner },
            );
            await this.documentService.update(
                rejectedDoc.document.id,
                { status: DocumentStatus.REJECTED },
                { queryRunner },
            );
            createdData.documents.push(rejectedDoc.document.id);
            createdData.approvalLineSnapshots.push(rejectedDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...rejectedDoc.stepSnapshots.map((s) => s.id));

            // 3-5) APPROVED 상태 문서 (완전 승인)
            const approvedDoc = await this.createDocumentWithSnapshot(
                expenseForm.version.id,
                employeeId,
                departmentId,
                '승인 완료 문서',
                simpleTemplate.version.id,
                queryRunner,
            );
            // 모든 단계 승인 처리
            for (const step of approvedDoc.stepSnapshots) {
                await this.approvalStepSnapshotService.update(
                    step.id,
                    {
                        status: ApprovalStatus.APPROVED,
                        comment: '승인합니다',
                        approvedAt: new Date(),
                    },
                    { queryRunner },
                );
            }
            await this.documentService.update(
                approvedDoc.document.id,
                { status: DocumentStatus.APPROVED },
                { queryRunner },
            );
            createdData.documents.push(approvedDoc.document.id);
            createdData.approvalLineSnapshots.push(approvedDoc.snapshot.id);
            createdData.approvalStepSnapshots.push(...approvedDoc.stepSnapshots.map((s) => s.id));

            // 3-6) CANCELLED 상태 문서
            const cancelledDoc = await this.createDocument(
                budgetForm.version.id,
                employeeId,
                departmentId,
                '취소된 문서',
                DocumentStatus.CANCELLED,
                queryRunner,
            );
            await this.documentService.update(
                cancelledDoc.id,
                {
                    status: DocumentStatus.CANCELLED,
                    cancelReason: '기안자가 취소함',
                    cancelledAt: new Date(),
                },
                { queryRunner },
            );
            createdData.documents.push(cancelledDoc.id);

            this.logger.log('테스트 데이터 생성 완료');
            return createdData;
        });
    }

    /**
     * 헬퍼: 같은 부서의 다른 직원들 조회 (기안자 제외, 재직중인 직원만)
     */
    private async getOtherEmployeesInDepartment(
        excludeEmployeeId: string,
        departmentId: string,
        queryRunner?: QueryRunner,
    ) {
        const employeeDeptPositions = await this.employeeDepartmentPositionService.findAll({
            where: { departmentId },
            relations: ['employee', 'position'],
            queryRunner,
        });

        return employeeDeptPositions
            .filter(
                (edp) =>
                    edp.employeeId !== excludeEmployeeId &&
                    edp.employee &&
                    edp.employee.status === EmployeeStatus.Active,
            )
            .map((edp) => edp.employee);
    }

    /**
     * 헬퍼: 부서장 조회 (재직중인 직원만)
     */
    private async getDepartmentHead(departmentId: string, excludeEmployeeId?: string, queryRunner?: QueryRunner) {
        const employeeDeptPositions = await this.employeeDepartmentPositionService.findAll({
            where: { departmentId },
            relations: ['employee', 'position'],
            queryRunner,
        });

        // isManager가 true인 직원 우선 (excludeEmployeeId 제외, 재직중인 직원만)
        const manager = employeeDeptPositions.find(
            (edp) =>
                edp.isManager &&
                edp.employee &&
                edp.employeeId !== excludeEmployeeId &&
                edp.employee.status === EmployeeStatus.Active,
        );
        if (manager) return manager.employee;

        // hasManagementAuthority가 true인 position을 가진 직원 (excludeEmployeeId 제외, 재직중인 직원만)
        for (const edp of employeeDeptPositions) {
            if (
                edp.position?.hasManagementAuthority &&
                edp.employee &&
                edp.employeeId !== excludeEmployeeId &&
                edp.employee.status === EmployeeStatus.Active
            ) {
                return edp.employee;
            }
        }

        // 없으면 첫 번째 재직중인 직원 반환 (excludeEmployeeId 제외)
        const fallback = employeeDeptPositions.find(
            (edp) =>
                edp.employee && edp.employeeId !== excludeEmployeeId && edp.employee.status === EmployeeStatus.Active,
        );
        return fallback?.employee || null;
    }

    /**
     * 헬퍼: 상위 부서 조회
     */
    private async getParentDepartment(departmentId: string, queryRunner?: QueryRunner) {
        const department = await this.departmentService.findOne({
            where: { id: departmentId },
            queryRunner,
        });

        if (!department?.parentDepartmentId) return null;

        return await this.departmentService.findOne({
            where: { id: department.parentDepartmentId },
            queryRunner,
        });
    }

    /**
     * 헬퍼: 상위 부서의 부서장 조회 (재직중인 직원만)
     */
    private async getParentDepartmentHead(departmentId: string, excludeEmployeeId?: string, queryRunner?: QueryRunner) {
        const parentDept = await this.getParentDepartment(departmentId, queryRunner);
        if (!parentDept) return null;

        return await this.getDepartmentHead(parentDept.id, excludeEmployeeId, queryRunner);
    }

    /**
     * 헬퍼: 랜덤으로 직원 선택 (재직중인 직원만)
     */
    private getRandomEmployee(employees: any[]) {
        if (!employees || employees.length === 0) return null;

        // 재직중인 직원만 필터링
        const activeEmployees = employees.filter((emp) => emp.status === EmployeeStatus.Active);
        if (activeEmployees.length === 0) return null;

        return activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
    }

    /**
     * 2. 간단한 결재선 생성 (2단계 결재)
     */
    private async createSimpleApprovalLine(employeeId: string, departmentId: string, queryRunner: QueryRunner) {
        // 같은 부서의 다른 직원 조회 (1차 결재자용)
        const otherEmployees = await this.getOtherEmployeesInDepartment(employeeId, departmentId, queryRunner);
        const departmentHead = await this.getDepartmentHead(departmentId, employeeId, queryRunner);

        this.logger.debug(`부서 ${departmentId}의 직원 수: ${otherEmployees.length + 1} (기안자 포함)`);
        this.logger.debug(`부서장: ${departmentHead?.employeeNumber || '없음'}`);

        // 1차 결재자 선택: 부서장을 제외한 다른 직원 중 랜덤 선택
        const nonHeadEmployees = otherEmployees.filter((e) => e.id !== departmentHead?.id);
        const firstApprover = this.getRandomEmployee(nonHeadEmployees);

        // 템플릿 생성
        const templateEntity = await this.approvalLineTemplateService.create(
            {
                name: '간단한 2단계 결재선',
                type: ApprovalLineType.COMMON,
                orgScope: DepartmentScopeType.ALL,
                status: ApprovalLineTemplateStatus.ACTIVE,
                createdBy: employeeId,
            },
            { queryRunner },
        );
        const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });

        // 템플릿 버전 생성
        const versionEntity = await this.approvalLineTemplateVersionService.create(
            {
                templateId: template.id,
                versionNo: 1,
                isActive: true,
                createdBy: employeeId,
            },
            { queryRunner },
        );
        const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });

        // 단계 생성
        // 1차 결재: 같은 부서의 다른 직원 (부서장 제외)
        // 만약 부서에 직원이 2명 이하(기안자 + 부서장만)이면 DEPARTMENT_HEAD 규칙 사용
        if (firstApprover) {
            const step1Entity = await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 1,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.FIXED,
                    defaultApproverId: firstApprover.id,
                    required: true,
                    description: '1차 결재',
                },
                { queryRunner },
            );
            const step1 = await this.approvalStepTemplateService.save(step1Entity, { queryRunner });

            // 2차 결재: 부서장
            const step2Entity = await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 2,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.FIXED,
                    targetDepartmentId: departmentId,
                    required: true,
                    description: '2차 결재 (부서장)',
                },
                { queryRunner },
            );
            const step2 = await this.approvalStepTemplateService.save(step2Entity, { queryRunner });

            // 템플릿 업데이트
            template.currentVersionId = version.id;
            await this.approvalLineTemplateService.save(template, { queryRunner });

            return { template, version, steps: [step1.id, step2.id] };
        } else {
            this.logger.warn(`부서 ${departmentId}에 직원이 부족합니다. 1단계 결재선만 생성합니다 (부서장 결재)`);

            // 직원이 부족하면 부서장 결재만
            const step1Entity = await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 1,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.FIXED,
                    targetDepartmentId: departmentId,
                    required: true,
                    description: '부서장 결재',
                },
                { queryRunner },
            );
            const step1 = await this.approvalStepTemplateService.save(step1Entity, { queryRunner });

            // 템플릿 업데이트
            template.currentVersionId = version.id;
            await this.approvalLineTemplateService.save(template, { queryRunner });

            return { template, version, steps: [step1.id] };
        }
    }

    /**
     * 3. 복잡한 결재선 생성 (5단계: 협의 + 결재 + 상위 부서 결재 + 시행)
     */
    private async createComplexApprovalLine(employeeId: string, departmentId: string, queryRunner: QueryRunner) {
        // 같은 부서의 다른 직원들 조회
        const otherEmployees = await this.getOtherEmployeesInDepartment(employeeId, departmentId, queryRunner);
        const agreementPerson = this.getRandomEmployee(otherEmployees);
        const firstApprover = this.getRandomEmployee(otherEmployees.filter((e) => e.id !== agreementPerson?.id));
        const implementer = this.getRandomEmployee(
            otherEmployees.filter((e) => e.id !== agreementPerson?.id && e.id !== firstApprover?.id),
        );

        // 상위 부서의 부서장 조회 (기안자 제외)
        const parentDeptHead = await this.getParentDepartmentHead(departmentId, employeeId, queryRunner);

        const templateEntity = await this.approvalLineTemplateService.create(
            {
                name: '복잡한 다단계 결재선',
                type: ApprovalLineType.COMMON,
                orgScope: DepartmentScopeType.ALL,
                status: ApprovalLineTemplateStatus.ACTIVE,
                createdBy: employeeId,
            },
            { queryRunner },
        );
        const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });

        const versionEntity = await this.approvalLineTemplateVersionService.create(
            {
                templateId: template.id,
                versionNo: 1,
                isActive: true,
                createdBy: employeeId,
            },
            { queryRunner },
        );
        const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });

        const steps = [];

        // 1단계: 협의 (고정 결재자)
        const step1 = await this.approvalStepTemplateService.save(
            await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 1,
                    stepType: ApprovalStepType.AGREEMENT,
                    assigneeRule: AssigneeRule.FIXED,
                    defaultApproverId: agreementPerson?.id || employeeId,
                    required: true,
                    description: '사전 협의 (고정 결재자)',
                },
                { queryRunner },
            ),
            { queryRunner },
        );
        steps.push(step1.id);

        // 2단계: 1차 결재 (기안자)
        const step2 = await this.approvalStepTemplateService.save(
            await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 2,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.DRAFTER,
                    required: true,
                    description: '1차 결재 (기안자)',
                },
                { queryRunner },
            ),
            { queryRunner },
        );
        steps.push(step2.id);

        // 3단계: 2차 결재 (기안자 상급자)
        const step3 = await this.approvalStepTemplateService.save(
            await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 3,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.DRAFTER_SUPERIOR,
                    required: true,
                    description: '2차 결재 (기안자 상급자)',
                },
                { queryRunner },
            ),
            { queryRunner },
        );
        steps.push(step3.id);

        // 4단계: 3차 결재 (상위 부서장, 있는 경우만)
        if (parentDeptHead) {
            const step4 = await this.approvalStepTemplateService.save(
                await this.approvalStepTemplateService.create(
                    {
                        lineTemplateVersionId: version.id,
                        stepOrder: 4,
                        stepType: ApprovalStepType.APPROVAL,
                        assigneeRule: AssigneeRule.FIXED,
                        defaultApproverId: parentDeptHead.id,
                        required: true,
                        description: '3차 결재 (상위 부서장)',
                    },
                    { queryRunner },
                ),
                { queryRunner },
            );
            steps.push(step4.id);
        }

        // 5단계: 시행 (고정 결재자)
        const step5 = await this.approvalStepTemplateService.save(
            await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: parentDeptHead ? 5 : 4,
                    stepType: ApprovalStepType.IMPLEMENTATION,
                    assigneeRule: AssigneeRule.FIXED,
                    defaultApproverId: implementer?.id || employeeId,
                    required: true,
                    description: '시행 처리 (고정 결재자)',
                },
                { queryRunner },
            ),
            { queryRunner },
        );
        steps.push(step5.id);

        template.currentVersionId = version.id;
        await this.approvalLineTemplateService.save(template, { queryRunner });

        return { template, version, steps };
    }

    /**
     * 4. 협의 중심 결재선 생성
     */
    private async createAgreementApprovalLine(employeeId: string, departmentId: string, queryRunner: QueryRunner) {
        // 같은 부서의 다른 직원들 조회
        const otherEmployees = await this.getOtherEmployeesInDepartment(employeeId, departmentId, queryRunner);
        const agreementPersonA = this.getRandomEmployee(otherEmployees);
        const agreementPersonB = this.getRandomEmployee(otherEmployees.filter((e) => e.id !== agreementPersonA?.id));

        const templateEntity = await this.approvalLineTemplateService.create(
            {
                name: '협의 중심 결재선',
                type: ApprovalLineType.COMMON,
                orgScope: DepartmentScopeType.ALL,
                status: ApprovalLineTemplateStatus.ACTIVE,
                createdBy: employeeId,
            },
            { queryRunner },
        );
        const template = await this.approvalLineTemplateService.save(templateEntity, { queryRunner });

        const versionEntity = await this.approvalLineTemplateVersionService.create(
            {
                templateId: template.id,
                versionNo: 1,
                isActive: true,
                createdBy: employeeId,
            },
            { queryRunner },
        );
        const version = await this.approvalLineTemplateVersionService.save(versionEntity, { queryRunner });

        const steps = [];

        // 협의 A (고정 결재자)
        const step1 = await this.approvalStepTemplateService.save(
            await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 1,
                    stepType: ApprovalStepType.AGREEMENT,
                    assigneeRule: AssigneeRule.FIXED,
                    defaultApproverId: agreementPersonA?.id || employeeId,
                    required: true,
                    description: '협의 A (고정 결재자)',
                },
                { queryRunner },
            ),
            { queryRunner },
        );
        steps.push(step1.id);

        // 협의 B (고정 결재자)
        const step2 = await this.approvalStepTemplateService.save(
            await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 2,
                    stepType: ApprovalStepType.AGREEMENT,
                    assigneeRule: AssigneeRule.FIXED,
                    defaultApproverId: agreementPersonB?.id || employeeId,
                    required: true,
                    description: '협의 B (고정 결재자)',
                },
                { queryRunner },
            ),
            { queryRunner },
        );
        steps.push(step2.id);

        // 최종 결재 (기안자)
        const step3 = await this.approvalStepTemplateService.save(
            await this.approvalStepTemplateService.create(
                {
                    lineTemplateVersionId: version.id,
                    stepOrder: 3,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.DRAFTER,
                    required: true,
                    description: '최종 결재 (기안자)',
                },
                { queryRunner },
            ),
            { queryRunner },
        );
        steps.push(step3.id);

        template.currentVersionId = version.id;
        await this.approvalLineTemplateService.save(template, { queryRunner });

        return { template, version, steps };
    }

    /**
     * 5. 문서양식 + 결재선 생성
     */
    private async createFormWithApprovalLine(
        name: string,
        code: string,
        lineTemplateVersionId: string,
        employeeId: string,
        queryRunner: QueryRunner,
    ) {
        // Form 생성
        const formEntity = await this.formService.create(
            {
                name,
                code,
                description: `${name} 테스트용`,
                status: FormStatus.ACTIVE,
            },
            { queryRunner },
        );
        const form = await this.formService.save(formEntity, { queryRunner });

        // FormVersion 생성
        const versionEntity = await this.formVersionService.create(
            {
                formId: form.id,
                versionNo: 1,
                template: `<div><h1>${name}</h1><p>테스트 템플릿</p></div>`,
                isActive: true,
                createdBy: employeeId,
            },
            { queryRunner },
        );
        const version = await this.formVersionService.save(versionEntity, { queryRunner });

        // Form - ApprovalLine 연결
        const linkEntity = await this.formVersionApprovalLineTemplateVersionService.create(
            {
                formVersionId: version.id,
                approvalLineTemplateVersionId: lineTemplateVersionId,
                isDefault: true,
            },
            { queryRunner },
        );
        await this.formVersionApprovalLineTemplateVersionService.save(linkEntity, { queryRunner });

        // Form 업데이트
        form.currentVersionId = version.id;
        await this.formService.save(form, { queryRunner });

        return { form, version };
    }

    /**
     * 6. 문서 생성 (스냅샷 없음)
     */
    private async createDocument(
        formVersionId: string,
        drafterId: string,
        drafterDepartmentId: string,
        title: string,
        status: DocumentStatus,
        queryRunner: QueryRunner,
    ) {
        const docEntity = await this.documentService.create(
            {
                formVersionId,
                title,
                drafterId,
                status,
                content: `<p>${title}의 내용입니다.</p>`,
                metadata: { testData: true },
                documentNumber: `TEST-${Date.now()}`,
            },
            { queryRunner },
        );
        return await this.documentService.save(docEntity, { queryRunner });
    }

    /**
     * 7. 문서 + 스냅샷 생성
     */
    private async createDocumentWithSnapshot(
        formVersionId: string,
        drafterId: string,
        drafterDepartmentId: string,
        title: string,
        lineTemplateVersionId: string,
        queryRunner: QueryRunner,
    ) {
        // 문서 생성
        const document = await this.createDocument(
            formVersionId,
            drafterId,
            drafterDepartmentId,
            title,
            DocumentStatus.PENDING,
            queryRunner,
        );

        // 스냅샷 생성
        const snapshotEntity = await this.approvalLineSnapshotService.create(
            {
                documentId: document.id,
                sourceTemplateVersionId: lineTemplateVersionId,
                snapshotName: `${title} 결재선`,
                snapshotDescription: '테스트 결재선',
                frozenAt: new Date(),
            },
            { queryRunner },
        );
        const snapshot = await this.approvalLineSnapshotService.save(snapshotEntity, { queryRunner });

        // 단계 템플릿 조회
        const stepTemplates = await this.approvalStepTemplateService.findAll({
            where: { lineTemplateVersionId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });

        // 각 단계 스냅샷 생성
        const stepSnapshots = [];
        for (const template of stepTemplates) {
            const stepEntity = await this.approvalStepSnapshotService.create(
                {
                    snapshotId: snapshot.id,
                    stepOrder: template.stepOrder,
                    stepType: template.stepType,
                    approverId: template.defaultApproverId || drafterId,
                    approverDepartmentId: drafterDepartmentId,
                    status: ApprovalStatus.PENDING,
                    required: template.required,
                    description: template.description,
                },
                { queryRunner },
            );
            const step = await this.approvalStepSnapshotService.save(stepEntity, { queryRunner });
            stepSnapshots.push(step);
        }

        // 문서에 스냅샷 연결
        await this.documentService.update(
            document.id,
            {
                approvalLineSnapshotId: snapshot.id,
                submittedAt: new Date(),
            },
            { queryRunner },
        );

        return { document, snapshot, stepSnapshots };
    }

    /**
     * 8. 테스트 데이터 삭제
     */
    async deleteTestData(createdData: any) {
        this.logger.log('테스트 데이터 삭제 시작');

        return await withTransaction(this.dataSource, async (queryRunner) => {
            // 역순으로 삭제 (외래키 제약 고려)

            // 1. Document 삭제 (외래 키 제약 조건 때문에 먼저 삭제)
            for (const id of createdData.documents || []) {
                await queryRunner.manager.query(`DELETE FROM documents WHERE id = $1`, [id]);
            }

            // 2. ApprovalStepSnapshot 삭제
            for (const id of createdData.approvalStepSnapshots || []) {
                await queryRunner.manager.query(`DELETE FROM approval_step_snapshots WHERE id = $1`, [id]);
            }

            // 3. ApprovalLineSnapshot 삭제
            for (const id of createdData.approvalLineSnapshots || []) {
                await queryRunner.manager.query(`DELETE FROM approval_line_snapshots WHERE id = $1`, [id]);
            }

            // 4. FormVersion-ApprovalLineTemplateVersion 연결 삭제
            for (const formVersionId of createdData.formVersions || []) {
                await queryRunner.manager.query(
                    `DELETE FROM form_version_approval_line_template_versions WHERE "formVersionId" = $1`,
                    [formVersionId],
                );
            }

            // 5. FormVersion 삭제
            for (const id of createdData.formVersions || []) {
                await queryRunner.manager.query(`DELETE FROM form_versions WHERE id = $1`, [id]);
            }

            // 6. Form 삭제
            for (const id of createdData.forms || []) {
                await queryRunner.manager.query(`DELETE FROM forms WHERE id = $1`, [id]);
            }

            // 7. ApprovalStepTemplate 삭제
            for (const id of createdData.approvalStepTemplates || []) {
                await queryRunner.manager.query(`DELETE FROM approval_step_templates WHERE id = $1`, [id]);
            }

            // 8. ApprovalLineTemplateVersion 삭제
            for (const id of createdData.approvalLineTemplateVersions || []) {
                await queryRunner.manager.query(`DELETE FROM approval_line_template_versions WHERE id = $1`, [id]);
            }

            // 9. ApprovalLineTemplate 삭제
            for (const id of createdData.approvalLineTemplates || []) {
                await queryRunner.manager.query(`DELETE FROM approval_line_templates WHERE id = $1`, [id]);
            }

            this.logger.log('테스트 데이터 삭제 완료');
            return { success: true, message: '테스트 데이터가 삭제되었습니다.' };
        });
    }

    /**
     * 모든 문서 및 결재 프로세스 삭제
     * (Documents, ApprovalLineSnapshots, ApprovalStepSnapshots)
     */
    async deleteAllDocuments() {
        this.logger.log('모든 문서 및 결재 프로세스 삭제 시작');

        return await withTransaction(this.dataSource, async (queryRunner) => {
            // 1. 모든 문서 조회
            const documents = await queryRunner.manager.query(`
                SELECT id, "approvalLineSnapshotId" 
                FROM documents
            `);

            // 2. 문서 삭제 (외래 키 제약으로 인해 먼저 삭제)
            for (const doc of documents) {
                await queryRunner.manager.query(`DELETE FROM documents WHERE id = $1`, [doc.id]);
            }

            // 3. 결재 단계 스냅샷 삭제
            const deletedSteps = await queryRunner.manager.query(`DELETE FROM approval_step_snapshots RETURNING id`);

            // 4. 결재선 스냅샷 삭제
            const deletedSnapshots = await queryRunner.manager.query(
                `DELETE FROM approval_line_snapshots RETURNING id`,
            );

            this.logger.log(
                `문서 ${documents.length}개, 결재선 스냅샷 ${deletedSnapshots.length}개, 결재 단계 스냅샷 ${deletedSteps.length}개 삭제 완료`,
            );

            return {
                success: true,
                message: `문서 ${documents.length}개, 결재 프로세스 데이터 삭제 완료`,
            };
        });
    }

    /**
     * 모든 결재선 및 양식 삭제
     * (Forms, FormVersions, ApprovalLineTemplates, ApprovalLineTemplateVersions, ApprovalStepTemplates)
     */
    async deleteAllFormsAndTemplates() {
        this.logger.log('모든 결재선 및 양식 삭제 시작');

        return await withTransaction(this.dataSource, async (queryRunner) => {
            // 1. Form의 currentVersionId를 NULL로 업데이트 (외래키 제약 해제)
            await queryRunner.manager.query(`UPDATE forms SET "currentVersionId" = NULL`);

            // 2. FormVersion-ApprovalLineTemplateVersion 연결 삭제
            await queryRunner.manager.query(`DELETE FROM form_version_approval_line_template_versions`);

            // 3. FormVersion 삭제
            const deletedFormVersions = await queryRunner.manager.query(`DELETE FROM form_versions RETURNING id`);

            // 4. Form 삭제
            const deletedForms = await queryRunner.manager.query(`DELETE FROM forms RETURNING id`);

            // 5. ApprovalStepTemplate 삭제
            const deletedStepTemplates = await queryRunner.manager.query(
                `DELETE FROM approval_step_templates RETURNING id`,
            );

            // 6. ApprovalLineTemplate의 currentVersionId를 NULL로 업데이트 (외래키 제약 해제)
            await queryRunner.manager.query(`UPDATE approval_line_templates SET "currentVersionId" = NULL`);

            // 7. ApprovalLineTemplateVersion 삭제
            const deletedTemplateVersions = await queryRunner.manager.query(
                `DELETE FROM approval_line_template_versions RETURNING id`,
            );

            // 8. ApprovalLineTemplate 삭제
            const deletedTemplates = await queryRunner.manager.query(
                `DELETE FROM approval_line_templates RETURNING id`,
            );

            this.logger.log(
                `양식 ${deletedForms.length}개, 양식버전 ${deletedFormVersions.length}개, ` +
                    `결재선 템플릿 ${deletedTemplates.length}개, 템플릿버전 ${deletedTemplateVersions.length}개, ` +
                    `단계 템플릿 ${deletedStepTemplates.length}개 삭제 완료`,
            );

            return {
                success: true,
                message: `양식 ${deletedForms.length}개, 결재선 템플릿 ${deletedTemplates.length}개 삭제 완료`,
            };
        });
    }

    /**
     * 모든 테스트 데이터 삭제 (전체)
     * 문서 + 결재 프로세스 + 결재선 + 양식을 모두 삭제합니다.
     */
    async deleteAllTestData() {
        this.logger.log('모든 테스트 데이터 삭제 시작');

        // 1. 문서 및 결재 프로세스 삭제 (외래키 제약으로 인해 먼저 삭제)
        const documentsResult = await this.deleteAllDocuments();
        this.logger.log(`문서 삭제 완료: ${documentsResult.message}`);

        // 2. 결재선 및 양식 삭제
        const formsResult = await this.deleteAllFormsAndTemplates();
        this.logger.log(`결재선 및 양식 삭제 완료: ${formsResult.message}`);

        this.logger.log('모든 테스트 데이터 삭제 완료');

        return {
            success: true,
            message: `전체 삭제 완료: ${documentsResult.message}, ${formsResult.message}`,
        };
    }

    /**
     * 시나리오 기반 테스트 데이터 생성
     */
    async createTestDataByScenario(employeeId: string, departmentId: string, dto: any) {
        this.logger.log(`시나리오 기반 테스트 데이터 생성: ${dto.scenario}`);

        // 기본값 설정
        const documentCount = dto.documentCount || 1;
        const titlePrefix = dto.titlePrefix || '테스트 문서';
        const progress = dto.progress || 0;

        // 시나리오에 따라 다른 메서드 호출
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
            case 'NO_APPROVAL_LINE':
                return await this.createNoApprovalLineScenario(employeeId, departmentId, {
                    documentCount,
                    titlePrefix,
                    progress,
                });
            default:
                // 기본적으로 기존 createTestData 메서드 사용
                return await this.createTestData(employeeId, departmentId);
        }
    }

    /**
     * 간단한 결재 시나리오
     * 기안자 → 부서장 → 본부장 → 완료
     */
    private async createSimpleApprovalScenario(employeeId: string, departmentId: string, options: any) {
        return await withTransaction(this.dataSource, async (queryRunner) => {
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

            // 간단한 2단계 결재선 템플릿 생성
            const template = await this.createSimpleApprovalLine(employeeId, departmentId, queryRunner);
            createdData.approvalLineTemplates.push(template.template.id);
            createdData.approvalLineTemplateVersions.push(template.version.id);
            createdData.approvalStepTemplates.push(...template.steps);

            // 문서양식 생성
            const form = await this.createFormWithApprovalLine(
                `${options.titlePrefix}`,
                `${options.titlePrefix.toUpperCase().replace(/ /g, '_')}_FORM`,
                template.version.id,
                employeeId,
                queryRunner,
            );
            createdData.forms.push(form.form.id);
            createdData.formVersions.push(form.version.id);

            // 문서 생성
            for (let i = 0; i < options.documentCount; i++) {
                if (options.progress > 0) {
                    // PENDING 상태 (결재 진행 중)
                    const doc = await this.createDocumentWithSnapshot(
                        form.version.id,
                        employeeId,
                        departmentId,
                        `${options.titlePrefix} #${i + 1}`,
                        template.version.id,
                        queryRunner,
                    );
                    createdData.documents.push(doc.document.id);
                    createdData.approvalLineSnapshots.push(doc.snapshot.id);
                    createdData.approvalStepSnapshots.push(...doc.stepSnapshots.map((s) => s.id));
                } else {
                    // DRAFT 상태 (임시저장)
                    const doc = await this.createDocument(
                        form.version.id,
                        employeeId,
                        departmentId,
                        `${options.titlePrefix} #${i + 1}`,
                        DocumentStatus.DRAFT,
                        queryRunner,
                    );
                    createdData.documents.push(doc.id);
                }
            }

            return createdData;
        });
    }

    /**
     * 복잡한 다단계 결재 시나리오
     */
    private async createMultiLevelApprovalScenario(employeeId: string, departmentId: string, options: any) {
        return await withTransaction(this.dataSource, async (queryRunner) => {
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

            // 복잡한 4단계 결재선 템플릿 생성
            const template = await this.createComplexApprovalLine(employeeId, departmentId, queryRunner);
            createdData.approvalLineTemplates.push(template.template.id);
            createdData.approvalLineTemplateVersions.push(template.version.id);
            createdData.approvalStepTemplates.push(...template.steps);

            // 문서양식 생성
            const form = await this.createFormWithApprovalLine(
                `${options.titlePrefix}`,
                `${options.titlePrefix.toUpperCase().replace(/ /g, '_')}_FORM`,
                template.version.id,
                employeeId,
                queryRunner,
            );
            createdData.forms.push(form.form.id);
            createdData.formVersions.push(form.version.id);

            // 문서 생성
            for (let i = 0; i < options.documentCount; i++) {
                if (options.progress > 0) {
                    // PENDING 상태 (결재 진행 중)
                    const doc = await this.createDocumentWithSnapshot(
                        form.version.id,
                        employeeId,
                        departmentId,
                        `${options.titlePrefix} #${i + 1}`,
                        template.version.id,
                        queryRunner,
                    );
                    createdData.documents.push(doc.document.id);
                    createdData.approvalLineSnapshots.push(doc.snapshot.id);
                    createdData.approvalStepSnapshots.push(...doc.stepSnapshots.map((s) => s.id));
                } else {
                    // DRAFT 상태 (임시저장)
                    const doc = await this.createDocument(
                        form.version.id,
                        employeeId,
                        departmentId,
                        `${options.titlePrefix} #${i + 1}`,
                        DocumentStatus.DRAFT,
                        queryRunner,
                    );
                    createdData.documents.push(doc.id);
                }
            }

            return createdData;
        });
    }

    /**
     * 협의 프로세스 시나리오
     */
    private async createAgreementProcessScenario(employeeId: string, departmentId: string, options: any) {
        return await withTransaction(this.dataSource, async (queryRunner) => {
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

            // 협의 중심 결재선 템플릿 생성
            const template = await this.createAgreementApprovalLine(employeeId, departmentId, queryRunner);
            createdData.approvalLineTemplates.push(template.template.id);
            createdData.approvalLineTemplateVersions.push(template.version.id);
            createdData.approvalStepTemplates.push(...template.steps);

            // 문서양식 생성
            const form = await this.createFormWithApprovalLine(
                `${options.titlePrefix}`,
                `${options.titlePrefix.toUpperCase().replace(/ /g, '_')}_FORM`,
                template.version.id,
                employeeId,
                queryRunner,
            );
            createdData.forms.push(form.form.id);
            createdData.formVersions.push(form.version.id);

            // 문서 생성
            for (let i = 0; i < options.documentCount; i++) {
                if (options.progress > 0) {
                    // PENDING 상태 (결재 진행 중)
                    const doc = await this.createDocumentWithSnapshot(
                        form.version.id,
                        employeeId,
                        departmentId,
                        `${options.titlePrefix} #${i + 1}`,
                        template.version.id,
                        queryRunner,
                    );
                    createdData.documents.push(doc.document.id);
                    createdData.approvalLineSnapshots.push(doc.snapshot.id);
                    createdData.approvalStepSnapshots.push(...doc.stepSnapshots.map((s) => s.id));
                } else {
                    // DRAFT 상태 (임시저장)
                    const doc = await this.createDocument(
                        form.version.id,
                        employeeId,
                        departmentId,
                        `${options.titlePrefix} #${i + 1}`,
                        DocumentStatus.DRAFT,
                        queryRunner,
                    );
                    createdData.documents.push(doc.id);
                }
            }

            return createdData;
        });
    }

    // 나머지 시나리오들은 간단하게 기존 메서드 재사용
    private async createImplementationProcessScenario(employeeId: string, departmentId: string, options: any) {
        // 간단한 결재선 + 시행 단계 추가
        return await this.createSimpleApprovalScenario(employeeId, departmentId, options);
    }

    private async createRejectedDocumentScenario(employeeId: string, departmentId: string, options: any) {
        // REJECTED 상태의 문서 생성
        return await this.createSimpleApprovalScenario(employeeId, departmentId, { ...options, progress: 100 });
    }

    private async createCancelledDocumentScenario(employeeId: string, departmentId: string, options: any) {
        // CANCELLED 상태의 문서 생성
        return await this.createSimpleApprovalScenario(employeeId, departmentId, { ...options, progress: 100 });
    }

    private async createWithReferenceScenario(employeeId: string, departmentId: string, options: any) {
        // 참조자 포함 결재선
        return await this.createSimpleApprovalScenario(employeeId, departmentId, options);
    }

    private async createParallelAgreementScenario(employeeId: string, departmentId: string, options: any) {
        // 병렬 협의 시나리오
        return await this.createAgreementProcessScenario(employeeId, departmentId, options);
    }

    private async createFullProcessScenario(employeeId: string, departmentId: string, options: any) {
        // 전체 프로세스 (복잡한 결재선 사용)
        return await this.createMultiLevelApprovalScenario(employeeId, departmentId, options);
    }

    private async createNoApprovalLineScenario(employeeId: string, departmentId: string, options: any) {
        // 결재선이 없는 양식으로 문서 생성 (자동 결재선 생성 테스트)
        const { documentCount, titlePrefix, progress } = options;

        // 결재선이 없는 양식 생성
        const form = await this.createFormWithoutApprovalLine(employeeId, departmentId);

        const documents = [];
        for (let i = 0; i < documentCount; i++) {
            const document = await this.createDocument(
                form.currentVersionId,
                employeeId,
                departmentId,
                `${titlePrefix} ${i + 1} (결재선 없음)`,
                progress > 0 ? DocumentStatus.PENDING : DocumentStatus.DRAFT,
                null,
            );
            documents.push(document);
        }

        return {
            forms: [form],
            documents,
            approvalLines: [], // 결재선이 없음
        };
    }

    /**
     * 결재선이 없는 양식 생성
     */
    private async createFormWithoutApprovalLine(employeeId: string, departmentId: string) {
        const formEntity = await this.formService.create(
            {
                name: '결재선 없는 테스트 양식',
                code: `NO_APPROVAL_LINE_FORM_${Date.now()}`,
                description: '결재선이 없는 테스트 양식 (자동 결재선 생성 테스트용)',
                status: FormStatus.ACTIVE,
            },
            { queryRunner: null },
        );
        const form = await this.formService.save(formEntity, { queryRunner: null });

        // 양식 버전 생성 (결재선 없음)
        const versionEntity = await this.formVersionService.create(
            {
                formId: form.id,
                versionNo: 1,
                template: `<div><h1>결재선 없는 테스트 양식</h1><p>자동 결재선 생성 테스트용 템플릿</p></div>`,
                isActive: true,
                createdBy: employeeId,
                // approvalLineVersionId 없음 - 결재선이 없는 양식
            },
            { queryRunner: null },
        );
        const version = await this.formVersionService.save(versionEntity, { queryRunner: null });

        // 양식 업데이트
        form.currentVersionId = version.id;
        await this.formService.save(form, { queryRunner: null });

        return form;
    }
}
