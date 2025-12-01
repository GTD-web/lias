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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TestDataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../../../domain/employee/employee.entity");
const department_entity_1 = require("../../../domain/department/department.entity");
const employee_department_position_entity_1 = require("../../../domain/employee-department-position/employee-department-position.entity");
const document_template_entity_1 = require("../../../domain/document-template/document-template.entity");
const document_entity_1 = require("../../../domain/document/document.entity");
const approval_step_snapshot_entity_1 = require("../../../domain/approval-step-snapshot/approval-step-snapshot.entity");
const approval_step_template_entity_1 = require("../../../domain/approval-step-template/approval-step-template.entity");
const category_entity_1 = require("../../../domain/category/category.entity");
const document_service_1 = require("./document.service");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
let TestDataService = TestDataService_1 = class TestDataService {
    constructor(employeeRepository, departmentRepository, edpRepository, documentTemplateRepository, documentRepository, approvalStepSnapshotRepository, approvalStepTemplateRepository, categoryRepository, documentService) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.edpRepository = edpRepository;
        this.documentTemplateRepository = documentTemplateRepository;
        this.documentRepository = documentRepository;
        this.approvalStepSnapshotRepository = approvalStepSnapshotRepository;
        this.approvalStepTemplateRepository = approvalStepTemplateRepository;
        this.categoryRepository = categoryRepository;
        this.documentService = documentService;
        this.logger = new common_1.Logger(TestDataService_1.name);
        this.webPartEmployees = [];
        this.cachedAt = null;
    }
    async getWebPartEmployees() {
        if (this.webPartEmployees.length > 0 && this.cachedAt) {
            const now = new Date();
            const diff = now.getTime() - this.cachedAt.getTime();
            if (diff < 10 * 60 * 1000) {
                return this.webPartEmployees;
            }
        }
        this.logger.log('Web파트 부서원 조회 시작');
        const webDepartment = await this.departmentRepository.findOne({
            where: {
                departmentName: 'Web파트',
                departmentCode: '지상-Web',
            },
        });
        if (!webDepartment) {
            throw new common_1.NotFoundException('Web파트 부서를 찾을 수 없습니다. (departmentName: Web파트, departmentCode: 지상-Web)');
        }
        const edps = await this.edpRepository.find({
            where: { departmentId: webDepartment.id },
            relations: ['employee', 'employee.currentRank'],
        });
        if (edps.length === 0) {
            throw new common_1.NotFoundException('Web파트 부서에 직원이 없습니다.');
        }
        this.webPartEmployees = edps.map((edp) => edp.employee);
        this.cachedAt = new Date();
        this.logger.log(`Web파트 부서원 ${this.webPartEmployees.length}명 조회 완료`);
        return this.webPartEmployees;
    }
    async getRandomEmployee() {
        const employees = await this.getWebPartEmployees();
        const randomIndex = Math.floor(Math.random() * employees.length);
        return employees[randomIndex];
    }
    async getRandomEmployees(count) {
        const employees = await this.getWebPartEmployees();
        if (count > employees.length) {
            throw new common_1.BadRequestException(`요청한 직원 수(${count})가 Web파트 부서원 수(${employees.length})보다 많습니다.`);
        }
        const shuffled = [...employees];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }
    async ensureDefaultCategory() {
        const categoryCode = 'TEST_CATEGORY';
        let category = await this.categoryRepository.findOne({
            where: { code: categoryCode },
        });
        if (!category) {
            this.logger.log('기본 테스트 카테고리 생성');
            category = this.categoryRepository.create({
                name: '테스트 카테고리',
                code: categoryCode,
                description: '테스트 데이터 생성용 기본 카테고리',
                order: 999,
            });
            await this.categoryRepository.save(category);
            this.logger.log(`카테고리 생성 완료: ${category.id}`);
        }
        return category;
    }
    async createDefaultTemplate(category) {
        this.logger.log('기본 테스트 템플릿 생성');
        const templateCode = `TEST_TEMPLATE_${Date.now()}`;
        const template = this.documentTemplateRepository.create({
            name: '테스트 문서 템플릿',
            code: templateCode,
            description: '테스트 데이터 생성용 기본 템플릿',
            template: `
                <div class="document-template">
                    <h1>{{title}}</h1>
                    <div class="content">
                        {{content}}
                    </div>
                    <div class="metadata">
                        <p>작성일: {{createdAt}}</p>
                        <p>기안자: {{drafterName}}</p>
                    </div>
                </div>
            `,
            status: approval_enum_1.DocumentTemplateStatus.ACTIVE,
            categoryId: category.id,
        });
        const savedTemplate = await this.documentTemplateRepository.save(template);
        const employees = await this.getWebPartEmployees();
        if (employees.length >= 2) {
            const stepTemplates = [
                this.approvalStepTemplateRepository.create({
                    documentTemplateId: savedTemplate.id,
                    stepOrder: 1,
                    stepType: approval_enum_1.ApprovalStepType.APPROVAL,
                    assigneeRule: approval_enum_1.AssigneeRule.FIXED,
                    targetEmployeeId: employees[0].id,
                }),
                this.approvalStepTemplateRepository.create({
                    documentTemplateId: savedTemplate.id,
                    stepOrder: 2,
                    stepType: approval_enum_1.ApprovalStepType.IMPLEMENTATION,
                    assigneeRule: approval_enum_1.AssigneeRule.FIXED,
                    targetEmployeeId: employees[1].id,
                }),
            ];
            await this.approvalStepTemplateRepository.save(stepTemplates);
        }
        this.logger.log(`템플릿 생성 완료: ${savedTemplate.id}`);
        return savedTemplate;
    }
    async getDocumentTemplate(codeOrName) {
        if (codeOrName) {
            const template = await this.documentTemplateRepository.findOne({
                where: [{ code: codeOrName }, { name: codeOrName }],
            });
            if (template) {
                return template;
            }
            this.logger.warn(`템플릿을 찾을 수 없습니다: ${codeOrName}. 기본 템플릿 사용`);
        }
        const templates = await this.documentTemplateRepository.find({
            take: 1,
            order: { createdAt: 'DESC' },
        });
        if (templates.length > 0) {
            return templates[0];
        }
        this.logger.warn('사용 가능한 템플릿이 없습니다. 자동으로 생성합니다.');
        const category = await this.ensureDefaultCategory();
        return await this.createDefaultTemplate(category);
    }
    async createTestDocument(options) {
        this.logger.log('테스트 문서 생성 시작');
        const template = await this.getDocumentTemplate(options?.templateCodeOrName);
        const employees = await this.getRandomEmployees(8);
        const drafter = employees[0];
        const approvalSteps = [];
        const stepEmployees = [];
        let stepOrder = 1;
        let currentEmployeeIndex = 1;
        if (options?.hasAgreement && currentEmployeeIndex < employees.length) {
            const step = {
                stepOrder: stepOrder++,
                stepType: approval_enum_1.ApprovalStepType.AGREEMENT,
                approverId: employees[currentEmployeeIndex].id,
            };
            approvalSteps.push(step);
            stepEmployees.push({ step, employee: employees[currentEmployeeIndex] });
            currentEmployeeIndex++;
        }
        const approvalCount = Math.min(options?.approvalCount || 2, 5);
        for (let i = 0; i < approvalCount; i++) {
            if (currentEmployeeIndex >= employees.length)
                break;
            const step = {
                stepOrder: stepOrder++,
                stepType: approval_enum_1.ApprovalStepType.APPROVAL,
                approverId: employees[currentEmployeeIndex].id,
            };
            approvalSteps.push(step);
            stepEmployees.push({ step, employee: employees[currentEmployeeIndex] });
            currentEmployeeIndex++;
        }
        if (options?.hasImplementation !== false && currentEmployeeIndex < employees.length) {
            const step = {
                stepOrder: stepOrder++,
                stepType: approval_enum_1.ApprovalStepType.IMPLEMENTATION,
                approverId: employees[currentEmployeeIndex].id,
            };
            approvalSteps.push(step);
            stepEmployees.push({ step, employee: employees[currentEmployeeIndex] });
            currentEmployeeIndex++;
        }
        if (options?.hasReference !== false) {
            const referenceCount = Math.min(options?.referenceCount || 1, 3);
            for (let i = 0; i < referenceCount; i++) {
                if (currentEmployeeIndex >= employees.length)
                    break;
                const step = {
                    stepOrder: stepOrder++,
                    stepType: approval_enum_1.ApprovalStepType.REFERENCE,
                    approverId: employees[currentEmployeeIndex].id,
                };
                approvalSteps.push(step);
                stepEmployees.push({ step, employee: employees[currentEmployeeIndex] });
                currentEmployeeIndex++;
            }
        }
        const createDto = {
            documentTemplateId: template.id,
            title: options?.title || `테스트 문서_${new Date().getTime()}`,
            content: `<h1>테스트 문서</h1><p>자동 생성된 테스트 문서입니다.</p><p>생성 시각: ${new Date().toLocaleString('ko-KR')}</p>`,
            metadata: {
                testData: true,
                createdBy: 'TestDataService',
                createdAt: new Date().toISOString(),
            },
            approvalSteps,
        };
        const document = await this.documentService.createDocument(createDto, drafter.id);
        this.logger.log(`테스트 문서 생성 완료: ${document.id}`);
        return {
            document,
            drafter,
            approvalSteps: stepEmployees,
        };
    }
    async createAndSubmitTestDocument(options) {
        this.logger.log('테스트 문서 생성 및 기안 시작');
        const { document, drafter, approvalSteps } = await this.createTestDocument(options);
        const submitDto = {
            documentId: document.id,
            documentTemplateId: document.documentTemplateId,
            approvalSteps: approvalSteps.map((item) => ({
                stepOrder: item.step.stepOrder,
                stepType: item.step.stepType,
                approverId: item.step.approverId,
            })),
        };
        const submittedDocument = await this.documentService.submitDocument(submitDto);
        this.logger.log(`테스트 문서 기안 완료: ${submittedDocument.id}`);
        return {
            document: submittedDocument,
            drafter,
            approvalSteps,
        };
    }
    async createMultipleTestDocuments(count, submitImmediately = false) {
        this.logger.log(`테스트 문서 ${count}개 일괄 생성 시작`);
        const results = [];
        for (let i = 0; i < count; i++) {
            const options = {
                title: `일괄 테스트 문서 ${i + 1}/${count}`,
                hasAgreement: Math.random() > 0.5,
                hasImplementation: true,
                approvalCount: Math.floor(Math.random() * 3) + 2,
                hasReference: Math.random() > 0.3,
                referenceCount: Math.floor(Math.random() * 2) + 1,
            };
            try {
                if (submitImmediately) {
                    const result = await this.createAndSubmitTestDocument(options);
                    results.push(result);
                }
                else {
                    const result = await this.createTestDocument(options);
                    results.push(result);
                }
            }
            catch (error) {
                this.logger.error(`문서 ${i + 1} 생성 실패:`, error);
            }
        }
        this.logger.log(`테스트 문서 ${results.length}/${count}개 생성 완료`);
        return results;
    }
    async getWebPartEmployeeList() {
        const employees = await this.getWebPartEmployees();
        return employees.map((emp) => ({
            id: emp.id,
            name: emp.name,
            employeeNumber: emp.employeeNumber,
            email: emp.email,
            rankTitle: emp.currentRank?.rankTitle,
        }));
    }
    async getAvailableTemplates() {
        const templates = await this.documentTemplateRepository.find({
            select: ['id', 'name', 'code'],
            order: { createdAt: 'DESC' },
        });
        return templates;
    }
    async deleteAllTestData() {
        this.logger.warn('⚠️  테스트 데이터 전체 삭제 시작');
        const deletionSummary = {
            approvalStepSnapshots: 0,
            documents: 0,
            approvalStepTemplates: 0,
            documentTemplates: 0,
            categories: 0,
        };
        try {
            this.logger.log('1/5: ApprovalStepSnapshot 삭제 중...');
            deletionSummary.approvalStepSnapshots = await this.approvalStepSnapshotRepository.count();
            await this.approvalStepSnapshotRepository
                .createQueryBuilder()
                .delete()
                .from(approval_step_snapshot_entity_1.ApprovalStepSnapshot)
                .execute();
            this.logger.log(`✓ ApprovalStepSnapshot ${deletionSummary.approvalStepSnapshots}개 삭제 완료`);
            this.logger.log('2/5: Document 삭제 중...');
            deletionSummary.documents = await this.documentRepository.count();
            await this.documentRepository.createQueryBuilder().delete().from(document_entity_1.Document).execute();
            this.logger.log(`✓ Document ${deletionSummary.documents}개 삭제 완료`);
            this.logger.log('3/5: ApprovalStepTemplate 삭제 중...');
            deletionSummary.approvalStepTemplates = await this.approvalStepTemplateRepository.count();
            await this.approvalStepTemplateRepository
                .createQueryBuilder()
                .delete()
                .from(approval_step_template_entity_1.ApprovalStepTemplate)
                .execute();
            this.logger.log(`✓ ApprovalStepTemplate ${deletionSummary.approvalStepTemplates}개 삭제 완료`);
            this.logger.log('4/5: DocumentTemplate 삭제 중...');
            deletionSummary.documentTemplates = await this.documentTemplateRepository.count();
            await this.documentTemplateRepository.createQueryBuilder().delete().from(document_template_entity_1.DocumentTemplate).execute();
            this.logger.log(`✓ DocumentTemplate ${deletionSummary.documentTemplates}개 삭제 완료`);
            this.logger.log('5/5: Category 삭제 중...');
            deletionSummary.categories = await this.categoryRepository.count();
            await this.categoryRepository.createQueryBuilder().delete().from(category_entity_1.Category).execute();
            this.logger.log(`✓ Category ${deletionSummary.categories}개 삭제 완료`);
            this.webPartEmployees = [];
            this.cachedAt = null;
            this.logger.warn('✅ 테스트 데이터 전체 삭제 완료');
            return {
                success: true,
                message: '테스트 데이터 전체 삭제 완료',
                deleted: deletionSummary,
                total: deletionSummary.approvalStepSnapshots +
                    deletionSummary.documents +
                    deletionSummary.approvalStepTemplates +
                    deletionSummary.documentTemplates +
                    deletionSummary.categories,
            };
        }
        catch (error) {
            this.logger.error('테스트 데이터 삭제 실패:', error);
            throw new common_1.BadRequestException(`테스트 데이터 삭제 실패: ${error.message}`);
        }
    }
    async deleteDocumentsOnly() {
        this.logger.warn('⚠️  문서 데이터 삭제 시작 (템플릿/카테고리는 유지)');
        const deletionSummary = {
            approvalStepSnapshots: 0,
            documents: 0,
        };
        try {
            this.logger.log('1/2: ApprovalStepSnapshot 삭제 중...');
            deletionSummary.approvalStepSnapshots = await this.approvalStepSnapshotRepository.count();
            await this.approvalStepSnapshotRepository
                .createQueryBuilder()
                .delete()
                .from(approval_step_snapshot_entity_1.ApprovalStepSnapshot)
                .execute();
            this.logger.log(`✓ ApprovalStepSnapshot ${deletionSummary.approvalStepSnapshots}개 삭제 완료`);
            this.logger.log('2/2: Document 삭제 중...');
            deletionSummary.documents = await this.documentRepository.count();
            await this.documentRepository.createQueryBuilder().delete().from(document_entity_1.Document).execute();
            this.logger.log(`✓ Document ${deletionSummary.documents}개 삭제 완료`);
            this.logger.warn('✅ 문서 데이터 삭제 완료');
            return {
                success: true,
                message: '문서 데이터 삭제 완료 (템플릿/카테고리는 유지)',
                deleted: deletionSummary,
                total: deletionSummary.approvalStepSnapshots + deletionSummary.documents,
            };
        }
        catch (error) {
            this.logger.error('문서 데이터 삭제 실패:', error);
            throw new common_1.BadRequestException(`문서 데이터 삭제 실패: ${error.message}`);
        }
    }
    async deleteTestCategory() {
        this.logger.warn('⚠️  테스트 카테고리 삭제 시작');
        try {
            const testCategory = await this.categoryRepository.findOne({
                where: { code: 'TEST_CATEGORY' },
            });
            if (!testCategory) {
                return {
                    success: true,
                    message: '테스트 카테고리가 존재하지 않습니다.',
                    deleted: 0,
                };
            }
            const templates = await this.documentTemplateRepository.find({
                where: { categoryId: testCategory.id },
            });
            for (const template of templates) {
                await this.approvalStepTemplateRepository.delete({ documentTemplateId: template.id });
                await this.documentTemplateRepository.delete({ id: template.id });
            }
            await this.categoryRepository.delete({ id: testCategory.id });
            this.logger.warn('✅ 테스트 카테고리 삭제 완료');
            return {
                success: true,
                message: '테스트 카테고리 삭제 완료',
                deleted: {
                    templates: templates.length,
                    category: 1,
                },
            };
        }
        catch (error) {
            this.logger.error('테스트 카테고리 삭제 실패:', error);
            throw new common_1.BadRequestException(`테스트 카테고리 삭제 실패: ${error.message}`);
        }
    }
};
exports.TestDataService = TestDataService;
exports.TestDataService = TestDataService = TestDataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_department_position_entity_1.EmployeeDepartmentPosition)),
    __param(3, (0, typeorm_1.InjectRepository)(document_template_entity_1.DocumentTemplate)),
    __param(4, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(5, (0, typeorm_1.InjectRepository)(approval_step_snapshot_entity_1.ApprovalStepSnapshot)),
    __param(6, (0, typeorm_1.InjectRepository)(approval_step_template_entity_1.ApprovalStepTemplate)),
    __param(7, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        document_service_1.DocumentService])
], TestDataService);
//# sourceMappingURL=test-data.service.js.map