import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../../domain/employee/employee.entity';
import { Department } from '../../../domain/department/department.entity';
import { EmployeeDepartmentPosition } from '../../../domain/employee-department-position/employee-department-position.entity';
import { DocumentTemplate } from '../../../domain/document-template/document-template.entity';
import { Document } from '../../../domain/document/document.entity';
import { ApprovalStepSnapshot } from '../../../domain/approval-step-snapshot/approval-step-snapshot.entity';
import { ApprovalStepTemplate } from '../../../domain/approval-step-template/approval-step-template.entity';
import { Category } from '../../../domain/category/category.entity';
import { DocumentService } from './document.service';
import { ApprovalStepType, AssigneeRule, DocumentTemplateStatus } from '../../../../common/enums/approval.enum';
import { CreateDocumentDto, SubmitDocumentDto } from '../dtos';

/**
 * 테스트 데이터 생성 서비스
 * 결재 프로세스 테스트를 위한 문서 및 결재라인을 자동으로 생성합니다.
 */
@Injectable()
export class TestDataService {
    private readonly logger = new Logger(TestDataService.name);
    private webPartEmployees: Employee[] = [];
    private cachedAt: Date | null = null;

    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
        @InjectRepository(EmployeeDepartmentPosition)
        private readonly edpRepository: Repository<EmployeeDepartmentPosition>,
        @InjectRepository(DocumentTemplate)
        private readonly documentTemplateRepository: Repository<DocumentTemplate>,
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
        @InjectRepository(ApprovalStepSnapshot)
        private readonly approvalStepSnapshotRepository: Repository<ApprovalStepSnapshot>,
        @InjectRepository(ApprovalStepTemplate)
        private readonly approvalStepTemplateRepository: Repository<ApprovalStepTemplate>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        private readonly documentService: DocumentService,
    ) {}

    /**
     * Web파트 부서원 조회 (캐싱)
     */
    private async getWebPartEmployees(): Promise<Employee[]> {
        // 캐시가 있고 10분 이내면 재사용
        if (this.webPartEmployees.length > 0 && this.cachedAt) {
            const now = new Date();
            const diff = now.getTime() - this.cachedAt.getTime();
            if (diff < 10 * 60 * 1000) {
                return this.webPartEmployees;
            }
        }

        this.logger.log('Web파트 부서원 조회 시작');

        // 1. Web파트 부서 조회
        const webDepartment = await this.departmentRepository.findOne({
            where: {
                departmentName: 'Web파트',
                departmentCode: '지상-Web',
            },
        });

        if (!webDepartment) {
            throw new NotFoundException(
                'Web파트 부서를 찾을 수 없습니다. (departmentName: Web파트, departmentCode: 지상-Web)',
            );
        }

        // 2. 해당 부서의 직원 조회
        const edps = await this.edpRepository.find({
            where: { departmentId: webDepartment.id },
            relations: ['employee', 'employee.currentRank'],
        });

        if (edps.length === 0) {
            throw new NotFoundException('Web파트 부서에 직원이 없습니다.');
        }

        this.webPartEmployees = edps.map((edp) => edp.employee);
        this.cachedAt = new Date();

        this.logger.log(`Web파트 부서원 ${this.webPartEmployees.length}명 조회 완료`);
        return this.webPartEmployees;
    }

    /**
     * 랜덤 Web파트 직원 선택
     */
    private async getRandomEmployee(): Promise<Employee> {
        const employees = await this.getWebPartEmployees();
        const randomIndex = Math.floor(Math.random() * employees.length);
        return employees[randomIndex];
    }

    /**
     * 랜덤 Web파트 직원 여러 명 선택 (중복 없음)
     */
    private async getRandomEmployees(count: number): Promise<Employee[]> {
        const employees = await this.getWebPartEmployees();

        if (count > employees.length) {
            throw new BadRequestException(
                `요청한 직원 수(${count})가 Web파트 부서원 수(${employees.length})보다 많습니다.`,
            );
        }

        // Fisher-Yates 셔플 알고리즘
        const shuffled = [...employees];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, count);
    }

    /**
     * 기본 카테고리 생성 또는 조회
     */
    private async ensureDefaultCategory(): Promise<Category> {
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

    /**
     * 기본 템플릿 생성
     */
    private async createDefaultTemplate(category: Category): Promise<DocumentTemplate> {
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
            status: DocumentTemplateStatus.ACTIVE,
            categoryId: category.id,
        });

        const savedTemplate = await this.documentTemplateRepository.save(template);

        // 기본 결재 단계 템플릿 생성
        const employees = await this.getWebPartEmployees();
        if (employees.length >= 2) {
            const stepTemplates = [
                this.approvalStepTemplateRepository.create({
                    documentTemplateId: savedTemplate.id,
                    stepOrder: 1,
                    stepType: ApprovalStepType.APPROVAL,
                    assigneeRule: AssigneeRule.FIXED,
                    targetEmployeeId: employees[0].id,
                }),
                this.approvalStepTemplateRepository.create({
                    documentTemplateId: savedTemplate.id,
                    stepOrder: 2,
                    stepType: ApprovalStepType.IMPLEMENTATION,
                    assigneeRule: AssigneeRule.FIXED,
                    targetEmployeeId: employees[1].id,
                }),
            ];

            await this.approvalStepTemplateRepository.save(stepTemplates);
        }

        this.logger.log(`템플릿 생성 완료: ${savedTemplate.id}`);
        return savedTemplate;
    }

    /**
     * 템플릿 조회 (code 또는 name으로 조회, 없으면 자동 생성)
     */
    private async getDocumentTemplate(codeOrName?: string): Promise<DocumentTemplate> {
        if (codeOrName) {
            const template = await this.documentTemplateRepository.findOne({
                where: [{ code: codeOrName }, { name: codeOrName }],
            });

            if (template) {
                return template;
            }

            this.logger.warn(`템플릿을 찾을 수 없습니다: ${codeOrName}. 기본 템플릿 사용`);
        }

        // 기본 템플릿 조회
        const templates = await this.documentTemplateRepository.find({
            take: 1,
            order: { createdAt: 'DESC' },
        });

        if (templates.length > 0) {
            return templates[0];
        }

        // 템플릿이 없으면 자동 생성
        this.logger.warn('사용 가능한 템플릿이 없습니다. 자동으로 생성합니다.');
        const category = await this.ensureDefaultCategory();
        return await this.createDefaultTemplate(category);
    }

    /**
     * 테스트 문서 생성 (기안만, 제출 안 함)
     */
    async createTestDocument(options?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
    }) {
        this.logger.log('테스트 문서 생성 시작');

        const template = await this.getDocumentTemplate(options?.templateCodeOrName);
        const employees = await this.getRandomEmployees(10); // 최대 10명

        // 기안자
        const drafter = employees[0];

        // 결재라인 구성
        const approvalSteps: CreateDocumentDto['approvalSteps'] = [];
        let stepOrder = 1;

        // 협의자 (옵션)
        if (options?.hasAgreement) {
            approvalSteps.push({
                stepOrder: stepOrder++,
                stepType: ApprovalStepType.AGREEMENT,
                approverId: employees[1].id,
            });
        }

        // 결재자 (기본 2명, 최대 5명)
        const approvalCount = Math.min(options?.approvalCount || 2, 5);
        const approverStartIndex = options?.hasAgreement ? 2 : 1;

        for (let i = 0; i < approvalCount; i++) {
            const employeeIndex = approverStartIndex + i;
            if (employeeIndex >= employees.length) break;

            approvalSteps.push({
                stepOrder: stepOrder++,
                stepType: ApprovalStepType.APPROVAL,
                approverId: employees[employeeIndex].id,
            });
        }

        // 시행자 (옵션, 기본 true)
        if (options?.hasImplementation !== false) {
            const implementerIndex = approverStartIndex + approvalCount;
            if (implementerIndex < employees.length) {
                approvalSteps.push({
                    stepOrder: stepOrder++,
                    stepType: ApprovalStepType.IMPLEMENTATION,
                    approverId: employees[implementerIndex].id,
                });
            }
        }

        // 문서 생성 DTO
        const createDto: CreateDocumentDto = {
            documentTemplateId: template.id,
            title: options?.title || `테스트 문서_${new Date().getTime()}`,
            content: `<h1>테스트 문서</h1><p>자동 생성된 테스트 문서입니다.</p><p>생성 시각: ${new Date().toLocaleString('ko-KR')}</p>`,
            drafterId: drafter.id,
            metadata: {
                testData: true,
                createdBy: 'TestDataService',
                createdAt: new Date().toISOString(),
            },
            approvalSteps,
        };

        const document = await this.documentService.createDocument(createDto);

        this.logger.log(`테스트 문서 생성 완료: ${document.id}`);
        return {
            document,
            drafter,
            approvalSteps: approvalSteps.map((step, index) => ({
                ...step,
                employee: employees[index + (options?.hasAgreement ? 0 : 1)],
            })),
        };
    }

    /**
     * 테스트 문서 생성 및 즉시 기안
     */
    async createAndSubmitTestDocument(options?: {
        templateCodeOrName?: string;
        title?: string;
        hasAgreement?: boolean;
        hasImplementation?: boolean;
        approvalCount?: number;
    }) {
        this.logger.log('테스트 문서 생성 및 기안 시작');

        const { document, drafter, approvalSteps } = await this.createTestDocument(options);

        // 기안
        const submitDto: SubmitDocumentDto = {
            documentId: document.id,
            documentTemplateId: document.documentTemplateId,
            approvalSteps: approvalSteps.map((step) => ({
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
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

    /**
     * 여러 개의 테스트 문서 일괄 생성
     */
    async createMultipleTestDocuments(count: number, submitImmediately: boolean = false) {
        this.logger.log(`테스트 문서 ${count}개 일괄 생성 시작`);

        const results = [];

        for (let i = 0; i < count; i++) {
            const options = {
                title: `일괄 테스트 문서 ${i + 1}/${count}`,
                hasAgreement: Math.random() > 0.5, // 50% 확률로 협의자 포함
                hasImplementation: Math.random() > 0.3, // 70% 확률로 시행자 포함
                approvalCount: Math.floor(Math.random() * 3) + 2, // 2-4명
            };

            try {
                if (submitImmediately) {
                    const result = await this.createAndSubmitTestDocument(options);
                    results.push(result);
                } else {
                    const result = await this.createTestDocument(options);
                    results.push(result);
                }
            } catch (error) {
                this.logger.error(`문서 ${i + 1} 생성 실패:`, error);
            }
        }

        this.logger.log(`테스트 문서 ${results.length}/${count}개 생성 완료`);
        return results;
    }

    /**
     * Web파트 부서원 목록 조회
     */
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

    /**
     * 사용 가능한 템플릿 목록 조회
     */
    async getAvailableTemplates() {
        const templates = await this.documentTemplateRepository.find({
            select: ['id', 'name', 'code'],
            order: { createdAt: 'DESC' },
        });

        return templates;
    }

    /**
     * 테스트 데이터 전체 삭제
     * 5개 엔티티를 모두 삭제합니다.
     * 순서: ApprovalStepSnapshot → Document → ApprovalStepTemplate → DocumentTemplate → Category
     */
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
            // 1. ApprovalStepSnapshot 삭제
            this.logger.log('1/5: ApprovalStepSnapshot 삭제 중...');
            deletionSummary.approvalStepSnapshots = await this.approvalStepSnapshotRepository.count();
            await this.approvalStepSnapshotRepository
                .createQueryBuilder()
                .delete()
                .from(ApprovalStepSnapshot)
                .execute();
            this.logger.log(`✓ ApprovalStepSnapshot ${deletionSummary.approvalStepSnapshots}개 삭제 완료`);

            // 2. Document 삭제
            this.logger.log('2/5: Document 삭제 중...');
            deletionSummary.documents = await this.documentRepository.count();
            await this.documentRepository.createQueryBuilder().delete().from(Document).execute();
            this.logger.log(`✓ Document ${deletionSummary.documents}개 삭제 완료`);

            // 3. ApprovalStepTemplate 삭제
            this.logger.log('3/5: ApprovalStepTemplate 삭제 중...');
            deletionSummary.approvalStepTemplates = await this.approvalStepTemplateRepository.count();
            await this.approvalStepTemplateRepository
                .createQueryBuilder()
                .delete()
                .from(ApprovalStepTemplate)
                .execute();
            this.logger.log(`✓ ApprovalStepTemplate ${deletionSummary.approvalStepTemplates}개 삭제 완료`);

            // 4. DocumentTemplate 삭제
            this.logger.log('4/5: DocumentTemplate 삭제 중...');
            deletionSummary.documentTemplates = await this.documentTemplateRepository.count();
            await this.documentTemplateRepository.createQueryBuilder().delete().from(DocumentTemplate).execute();
            this.logger.log(`✓ DocumentTemplate ${deletionSummary.documentTemplates}개 삭제 완료`);

            // 5. Category 삭제
            this.logger.log('5/5: Category 삭제 중...');
            deletionSummary.categories = await this.categoryRepository.count();
            await this.categoryRepository.createQueryBuilder().delete().from(Category).execute();
            this.logger.log(`✓ Category ${deletionSummary.categories}개 삭제 완료`);

            // 캐시 초기화
            this.webPartEmployees = [];
            this.cachedAt = null;

            this.logger.warn('✅ 테스트 데이터 전체 삭제 완료');
            return {
                success: true,
                message: '테스트 데이터 전체 삭제 완료',
                deleted: deletionSummary,
                total:
                    deletionSummary.approvalStepSnapshots +
                    deletionSummary.documents +
                    deletionSummary.approvalStepTemplates +
                    deletionSummary.documentTemplates +
                    deletionSummary.categories,
            };
        } catch (error) {
            this.logger.error('테스트 데이터 삭제 실패:', error);
            throw new BadRequestException(`테스트 데이터 삭제 실패: ${error.message}`);
        }
    }

    /**
     * 문서 데이터만 삭제 (템플릿과 카테고리는 유지)
     */
    async deleteDocumentsOnly() {
        this.logger.warn('⚠️  문서 데이터 삭제 시작 (템플릿/카테고리는 유지)');

        const deletionSummary = {
            approvalStepSnapshots: 0,
            documents: 0,
        };

        try {
            // 1. ApprovalStepSnapshot 삭제
            this.logger.log('1/2: ApprovalStepSnapshot 삭제 중...');
            deletionSummary.approvalStepSnapshots = await this.approvalStepSnapshotRepository.count();
            await this.approvalStepSnapshotRepository
                .createQueryBuilder()
                .delete()
                .from(ApprovalStepSnapshot)
                .execute();
            this.logger.log(`✓ ApprovalStepSnapshot ${deletionSummary.approvalStepSnapshots}개 삭제 완료`);

            // 2. Document 삭제
            this.logger.log('2/2: Document 삭제 중...');
            deletionSummary.documents = await this.documentRepository.count();
            await this.documentRepository.createQueryBuilder().delete().from(Document).execute();
            this.logger.log(`✓ Document ${deletionSummary.documents}개 삭제 완료`);

            this.logger.warn('✅ 문서 데이터 삭제 완료');
            return {
                success: true,
                message: '문서 데이터 삭제 완료 (템플릿/카테고리는 유지)',
                deleted: deletionSummary,
                total: deletionSummary.approvalStepSnapshots + deletionSummary.documents,
            };
        } catch (error) {
            this.logger.error('문서 데이터 삭제 실패:', error);
            throw new BadRequestException(`문서 데이터 삭제 실패: ${error.message}`);
        }
    }

    /**
     * 테스트 카테고리만 삭제
     */
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

            // 해당 카테고리의 템플릿 먼저 삭제
            const templates = await this.documentTemplateRepository.find({
                where: { categoryId: testCategory.id },
            });

            for (const template of templates) {
                // 템플릿의 결재 단계 템플릿 삭제
                await this.approvalStepTemplateRepository.delete({ documentTemplateId: template.id });
                // 템플릿 삭제
                await this.documentTemplateRepository.delete({ id: template.id });
            }

            // 카테고리 삭제
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
        } catch (error) {
            this.logger.error('테스트 카테고리 삭제 실패:', error);
            throw new BadRequestException(`테스트 카테고리 삭제 실패: ${error.message}`);
        }
    }
}
