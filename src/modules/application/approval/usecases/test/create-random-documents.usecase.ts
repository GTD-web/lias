import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainDocumentFormService } from 'src/modules/domain/document-form/document-form.service';
import { DomainDocumentTypeService } from 'src/modules/domain/document-type/document-type.service';
import { DomainDepartmentService } from 'src/modules/domain/department/department.service';
import { ApprovalStatus, ApprovalStepType } from 'src/common/enums/approval.enum';
import { Employee } from 'src/database/entities/employee.entity';
import { Document } from 'src/database/entities/document.entity';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
import { DocumentForm } from 'src/database/entities/document-form.entity';
import { DocumentType } from 'src/database/entities/document-type.entity';
import { Department } from 'src/database/entities/department.entity ';
import { CreateDraftDocumentDto } from '../../dtos/approval-draft.dto';
import { In } from 'typeorm';

@Injectable()
export class CreateRandomDocumentsUseCase {
    constructor(
        private readonly employeeService: DomainEmployeeService,
        private readonly documentService: DomainDocumentService,
        private readonly approvalStepService: DomainApprovalStepService,
        private readonly documentFormService: DomainDocumentFormService,
        private readonly documentTypeService: DomainDocumentTypeService,
        private readonly departmentService: DomainDepartmentService,
    ) {}

    async deleteAll() {
        const approvalSteps = await this.approvalStepService.findAll();
        const documents = await this.documentService.findAll();

        for (const approvalStep of approvalSteps) {
            await this.approvalStepService.delete(approvalStep.approvalStepId);
        }

        for (const document of documents) {
            await this.documentService.delete(document.documentId);
        }
    }

    async execute(count: number = 20): Promise<{
        employees: Employee[];
        departments: Department[];
        documentTypes: DocumentType[];
        documentForms: DocumentForm[];
        documents: Document[];
        approvalSteps: ApprovalStep[];
    }> {
        console.log(`🎲 랜덤 문서 생성 시작: ${count}개`);

        // 1. 기본 데이터 생성 (없는 경우)
        const { employees, departments, documentTypes, documentForms } = await this.ensureBasicData();

        // 2. 랜덤 문서 생성
        const documents: Document[] = [];
        const approvalSteps: ApprovalStep[] = [];

        for (let i = 0; i < count; i++) {
            const document = await this.createRandomDocument(employees, documentTypes, i + 1);
            documents.push(document);

            // 랜덤 결재 단계 생성
            const steps = await this.createRandomApprovalSteps(document, employees);
            approvalSteps.push(...steps);

            for (const step of steps) {
                await this.approvalStepService.save(step);
            }

            if ((i + 1) % 5 === 0) {
                console.log(`✅ ${i + 1}/${count} 문서 생성 완료`);
            }
        }

        console.log('🎉 랜덤 문서 생성 완료!');

        return {
            employees,
            departments,
            documentTypes,
            documentForms,
            documents,
            approvalSteps,
        };
    }

    private async ensureBasicData() {
        // 기존 데이터가 있는지 확인하고 없으면 생성
        let employees = await this.employeeService.findAll({
            where: {
                department: In(['지상-Web']),
            },
        });
        let departments = await this.departmentService.findAll();
        let documentTypes = await this.documentTypeService.findAll();
        let documentForms = await this.documentFormService.findAll({
            relations: ['documentType'],
        });

        if (employees.length === 0) {
            departments = await this.createDepartments();
            employees = await this.createEmployees(departments);
        }

        if (documentTypes.length === 0) {
            documentTypes = await this.createDocumentTypes();
        }

        if (documentForms.length === 0) {
            documentForms = await this.createDocumentForms(documentTypes);
        }

        return { employees, departments, documentTypes, documentForms };
    }

    private async createDepartments(): Promise<Department[]> {
        const departmentData = [
            { departmentCode: 'HR', departmentName: '인사팀' },
            { departmentCode: 'DEV', departmentName: '개발팀' },
            { departmentCode: 'PLAN', departmentName: '기획팀' },
            { departmentCode: 'MKT', departmentName: '마케팅팀' },
            { departmentCode: 'FIN', departmentName: '재무팀' },
            { departmentCode: 'SALES', departmentName: '영업팀' },
            { departmentCode: 'RND', departmentName: '연구개발팀' },
            { departmentCode: 'ADMIN', departmentName: '총무팀' },
        ];

        const departments: Department[] = [];
        for (const data of departmentData) {
            const department = await this.departmentService.create(data);
            departments.push(department);
        }

        return departments;
    }

    private async createEmployees(departments: Department[]): Promise<Employee[]> {
        const employeeNames = [
            '김철수',
            '이영희',
            '박민수',
            '정수진',
            '최동욱',
            '한미영',
            '윤태호',
            '송지은',
            '강현우',
            '임서연',
            '조성민',
            '백지원',
            '오승준',
            '신혜진',
            '권태현',
            '황민지',
            '남기준',
            '문소영',
            '양준호',
            '구미영',
            '손현우',
            '배지민',
            '조현준',
            '홍서연',
            '김도현',
            '이수진',
            '박준영',
            '정민지',
            '최현우',
            '한지원',
        ];

        const positions = ['사원', '대리', '과장', '차장', '부장', '이사', '상무', '전무'];
        const employees: Employee[] = [];

        for (let i = 0; i < employeeNames.length; i++) {
            const department = departments[i % departments.length];
            const position = positions[i % positions.length];

            const employee = await this.employeeService.create({
                name: employeeNames[i],
                email: `${employeeNames[i].toLowerCase().replace(/[가-힣]/g, '')}@company.com`,
                department: department.departmentName,
                position: position,
            });
            employees.push(employee);
        }

        return employees;
    }

    private async createDocumentTypes(): Promise<DocumentType[]> {
        const documentTypeData = [
            { name: '지출결의서', documentNumberCode: 'EXP', title: '프로젝트 A 개발비 지출결의서' },
            { name: '휴가신청서', documentNumberCode: 'VAC', title: '연차 신청서' },
            { name: '업무보고서', documentNumberCode: 'RPT', title: '월간 업무보고서' },
            { name: '구매요청서', documentNumberCode: 'PUR', title: '서버 구매 요청서' },
            { name: '출장신청서', documentNumberCode: 'TRV', title: '출장 신청서' },
            { name: '교육신청서', documentNumberCode: 'EDU', title: '교육 신청서' },
            { name: '회의록', documentNumberCode: 'MTG', title: '회의록' },
            { name: '계약서', documentNumberCode: 'CON', title: '계약서' },
        ];

        const documentTypes: DocumentType[] = [];
        for (const data of documentTypeData) {
            const documentType = await this.documentTypeService.save(data);
            documentTypes.push(documentType);
        }

        return documentTypes;
    }

    private async createDocumentForms(documentTypes: DocumentType[]): Promise<DocumentForm[]> {
        const documentFormData = [
            {
                name: '일반 지출결의서',
                description: '일반적인 지출을 위한 결의서',
                documentTypeId: documentTypes[0].documentTypeId,
                template: '<div>지출결의서 템플릿</div>',
                autoFillType: null,
            },
            {
                name: '휴가신청서',
                description: '연차 및 휴가 신청서',
                documentTypeId: documentTypes[1].documentTypeId,
                template: '<div>휴가신청서 템플릿</div>',
                autoFillType: null,
            },
            {
                name: '업무보고서',
                description: '업무 진행 상황 보고서',
                documentTypeId: documentTypes[2].documentTypeId,
                template: '<div>업무보고서 템플릿</div>',
                autoFillType: null,
            },
            {
                name: '구매요청서',
                description: '구매 요청서',
                documentTypeId: documentTypes[3].documentTypeId,
                template: '<div>구매요청서 템플릿</div>',
                autoFillType: null,
            },
        ];

        const documentForms: DocumentForm[] = [];
        for (const data of documentFormData) {
            const form = await this.documentFormService.save(data);
            const documentForm = await this.documentFormService.findOne({
                where: {
                    documentFormId: form.documentFormId,
                },
                relations: ['documentType'],
            });
            documentForms.push(documentForm);
        }

        return documentForms;
    }

    private async createRandomDocument(
        employees: Employee[],
        documentTypes: DocumentType[],
        index: number,
    ): Promise<Document> {
        const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
        const randomForm = documentTypes[Math.floor(Math.random() * documentTypes.length)];
        const randomStatus = this.getRandomStatus();
        const randomDate = this.getRandomDate();

        const documentTypeData = [
            {
                name: '지출결의서',
                documentNumberCode: 'EXP',
                title: '프로젝트 A 개발비 지출결의서',
                content:
                    '<div class="document-content"><h3>출장비 내역서</h3><p>아래는 출장비 내역 상세 표입니다.</p><table cellspacing="0" cellpadding="3" style="width:100%;table-layout:fixed;overflow-wrap:break-word;word-break:normal;"><colgroup><col style="width:67px;" /><col style="width:68px;" /><col style="width:127px;" /><col style="width:125px;" /><col style="width:251px;" /></colgroup><tbody><tr style="height:29px;"><td style="width:127px;height:22px;border:1px solid #000;background-color:rgb(231,230,230);" colspan="2"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;">프로젝트</p></td><td style="width:119px;height:22px;border:1px solid #000;"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;"><br /></p></td><td style="width:117px;height:22px;border:1px solid #000;background-color:rgb(231,230,230);"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;">출장지</p></td><td style="width:243px;height:22px;border:1px solid #000;"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;"><br /></p></td></tr><tr style="height:38px;"><td style="width:127px;height:29px;border:1px solid #000;background-color:rgb(231,230,230);" colspan="2"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;">출장기간</p></td><td style="width:119px;height:29px;border:1px solid #000;"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;"><br /></p></td><td style="width:117px;height:29px;border:1px solid #000;background-color:rgb(231,230,230);"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;">출장결과보고서NO</p></td><td style="width:243px;height:29px;border:1px solid #000;"><p style="text-align:center;font-size:10pt;line-height:1.2;font-family:돋움체;"><br /></p></td></tr></tbody></table><table cellspacing="0" cellpadding="1" style="border-collapse:collapse;width:100%;table-layout:fixed;overflow-wrap:break-word;word-break:normal;margin-top:10px;"><colgroup><col style="width:137px;" /><col style="width:396px;" /><col style="width:105px;" /></colgroup><tbody><tr style="height:35px;"><td style="width:134px;height:32px;border:1px solid #000;"><p style="text-align:center;font-family:돋움체;font-size:10pt;">여비항목</p></td><td style="width:393px;height:32px;border:1px solid #000;"><p style="text-align:center;font-family:돋움체;font-size:10pt;">산출내역</p></td><td style="width:102px;height:32px;border:1px solid #000;"><p style="text-align:center;font-family:돋움체;font-size:10pt;">계</p></td></tr><tr><td style="border:1px solid #000;"><p style="text-align:center;">식비</p></td><td style="border:1px solid #000;"><p></p></td><td style="border:1px solid #000;"><p></p></td></tr><tr><td style="border:1px solid #000;"><p style="text-align:center;">숙박비</p></td><td style="border:1px solid #000;"><p></p></td><td style="border:1px solid #000;"><p></p></td></tr><tr><td style="border:1px solid #000;"><p style="text-align:center;">교통비</p></td><td style="border:1px solid #000;"><p></p></td><td style="border:1px solid #000;"><p></p></td></tr><tr><td style="border:1px solid #000;"><p style="text-align:center;">기타</p></td><td style="border:1px solid #000;"><p></p></td><td style="border:1px solid #000;"><p></p></td></tr><tr><td style="border:1px solid #000;"><p style="text-align:center;">합계금액</p></td><td style="border:1px solid #000;" colspan="2"><p></p></td></tr><tr><td style="border:1px solid #000;" colspan="3"><p style="text-align:left;font-size:10pt;">※ 영수증 첨부 필수, 한도 내 실비 정산</p></td></tr></tbody></table></div>',
            },
            {
                name: '휴가신청서',
                documentNumberCode: 'VAC',
                title: '연차 신청서',
                content:
                    '<div class="document-content"><h3>휴가신청서</h3><p>연차 및 휴가 신청서입니다.</p><table cellspacing="0" cellpadding="2" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#f0f8ff;"><th style="border:1px solid #333;padding:8px;text-align:center;">휴가유형</th><th style="border:1px solid #333;padding:8px;text-align:center;">기간</th><th style="border:1px solid #333;padding:8px;text-align:center;">사유</th><th style="border:1px solid #333;padding:8px;text-align:center;">담당자</th><th style="border:1px solid #333;padding:8px;text-align:center;">결재자</th></tr></thead><tbody><tr><td style="border:1px solid #333;padding:6px;">연차</td><td style="border:1px solid #333;padding:6px;">2024-02-15 ~ 2024-02-17</td><td style="border:1px solid #333;padding:6px;">개인 사정으로 휴가 신청</td><td style="border:1px solid #333;padding:6px;">김철수</td><td style="border:1px solid #333;padding:6px;">이영희</td></tr><tr><td style="border:1px solid #333;padding:6px;">반차</td><td style="border:1px solid #333;padding:6px;">2024-03-05</td><td style="border:1px solid #333;padding:6px;">직무 관련 회의</td><td style="border:1px solid #333;padding:6px;">박민수</td><td style="border:1px solid #333;padding:6px;">정수진</td></tr></tbody></table><p style="margin-top:15px;font-size:11pt;color:#666;">※ 휴가 승인 후 집행 바랍니다.</p></div>',
            },
            {
                name: '업무보고서',
                documentNumberCode: 'RPT',
                title: '월간 업무보고서',
                content:
                    '<div class="document-content"><h3>월간 업무보고서</h3><p>2024년 1월 업무 수행 내역입니다.</p><table cellspacing="0" cellpadding="3" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#f0f0f0;"><th style="border:1px solid #333;padding:8px;text-align:center;width:15%;">업무구분</th><th style="border:1px solid #333;padding:8px;text-align:center;width:25%;">주요업무내용</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">진행상태</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">완료일</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">비고</th></tr></thead><tbody><tr><td style="border:1px solid #333;padding:6px;">프로젝트</td><td style="border:1px solid #333;padding:6px;">사용자 인터페이스 개선</td><td style="border:1px solid #333;padding:6px;text-align:center;"><span style="color:green;">완료</span></td><td style="border:1px solid #333;padding:6px;text-align:center;">2024-01-15</td><td style="border:1px solid #333;padding:6px;">디자인팀 협업</td></tr><tr><td style="border:1px solid #333;padding:6px;">유지보수</td><td style="border:1px solid #333;padding:6px;">서버 성능 최적화</td><td style="border:1px solid #333;padding:6px;text-align:center;"><span style="color:orange;">진행중</span></td><td style="border:1px solid #333;padding:6px;text-align:center;">2024-02-10</td><td style="border:1px solid #333;padding:6px;">80% 완료</td></tr><tr><td style="border:1px solid #333;padding:6px;">교육</td><td style="border:1px solid #333;padding:6px;">신입 개발자 교육</td><td style="border:1px solid #333;padding:6px;text-align:center;"><span style="color:green;">완료</span></td><td style="border:1px solid #333;padding:6px;text-align:center;">2024-01-31</td><td style="border:1px solid #333;padding:6px;">5명 수료</td></tr></tbody></table><p style="margin-top:15px;font-size:11pt;color:#666;">※ 다음 달 주요 계획</p><ul style="margin-top:10px;color:#333;"><li>신규 프로젝트 착수</li><li>보안 시스템 업그레이드</li><li>팀 워크샵 진행</li></ul></div>',
            },
            {
                name: '구매요청서',
                documentNumberCode: 'PUR',
                title: '서버 구매 요청서',
                content:
                    '<div class="document-content"><h3>구매요청서</h3><p>업무 효율성 향상을 위한 장비 구매 요청입니다.</p><table cellspacing="0" cellpadding="2" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#f0f8ff;"><th style="border:1px solid #333;padding:8px;text-align:center;">품목</th><th style="border:1px solid #333;padding:8px;text-align:center;">규격</th><th style="border:1px solid #333;padding:8px;text-align:center;">수량</th><th style="border:1px solid #333;padding:8px;text-align:center;">단가</th><th style="border:1px solid #333;padding:8px;text-align:center;">소계</th><th style="border:1px solid #333;padding:8px;text-align:center;">비고</th></tr></thead><tbody><tr><td style="border:1px solid #333;padding:6px;">모니터</td><td style="border:1px solid #333;padding:6px;">27인치 4K</td><td style="border:1px solid #333;padding:6px;text-align:center;">5대</td><td style="border:1px solid #333;padding:6px;text-align:right;">300,000원</td><td style="border:1px solid #333;padding:6px;text-align:right;">1,500,000원</td><td style="border:1px solid #333;padding:6px;">개발팀용</td></tr><tr><td style="border:1px solid #333;padding:6px;">키보드</td><td style="border:1px solid #333;padding:6px;">기계식 청축</td><td style="border:1px solid #333;padding:6px;text-align:center;">5개</td><td style="border:1px solid #333;padding:6px;text-align:right;">50,000원</td><td style="border:1px solid #333;padding:6px;text-align:right;">250,000원</td><td style="border:1px solid #333;padding:6px;">개발팀용</td></tr><tr><td style="border:1px solid #333;padding:6px;">마우스</td><td style="border:1px solid #333;padding:6px;">무선 게이밍</td><td style="border:1px solid #333;padding:6px;text-align:center;">5개</td><td style="border:1px solid #333;padding:6px;text-align:right;">80,000원</td><td style="border:1px solid #333;padding:6px;text-align:right;">400,000원</td><td style="border:1px solid #333;padding:6px;">개발팀용</td></tr><tr style="background-color:#f9f9f9;"><td style="border:1px solid #333;padding:6px;font-weight:bold;" colspan="4">합계</td><td style="border:1px solid #333;padding:6px;text-align:right;font-weight:bold;">2,150,000원</td><td style="border:1px solid #333;padding:6px;"></td></tr></tbody></table><p style="margin-top:15px;font-size:11pt;color:#666;">※ 구매 후 영수증 및 A/S 보증서 제출 필수</p></div>',
            },
            {
                name: '출장신청서',
                documentNumberCode: 'TRV',
                title: '출장 신청서',
                content:
                    '<div class="document-content"><h3>출장신청서</h3><p>아래는 출장 신청 내역입니다.</p><table cellspacing="0" cellpadding="3" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#f0f8ff;"><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">출장자</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">출장지</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">출장기간</th><th style="border:1px solid #333;padding:8px;text-align:center;width:40%;">출장목적</th></tr></thead><tbody><tr><td style="border:1px solid #333;padding:6px;text-align:center;"></td><td style="border:1px solid #333;padding:6px;text-align:center;"></td><td style="border:1px solid #333;padding:6px;text-align:center;"></td><td style="border:1px solid #333;padding:6px;"></td></tr></tbody></table><h4 style="margin-top:20px;">예상 경비</h4><table cellspacing="0" cellpadding="3" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#f0f8ff;"><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">항목</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">금액</th><th style="border:1px solid #333;padding:8px;text-align:center;width:60%;">비고</th></tr></thead><tbody><tr><td style="border:1px solid #333;padding:6px;text-align:center;">교통비</td><td style="border:1px solid #333;padding:6px;text-align:right;"></td><td style="border:1px solid #333;padding:6px;"></td></tr><tr><td style="border:1px solid #333;padding:6px;text-align:center;">숙박비</td><td style="border:1px solid #333;padding:6px;text-align:right;"></td><td style="border:1px solid #333;padding:6px;"></td></tr><tr><td style="border:1px solid #333;padding:6px;text-align:center;">식비</td><td style="border:1px solid #333;padding:6px;text-align:right;"></td><td style="border:1px solid #333;padding:6px;"></td></tr><tr><td style="border:1px solid #333;padding:6px;text-align:center;">기타</td><td style="border:1px solid #333;padding:6px;text-align:right;"></td><td style="border:1px solid #333;padding:6px;"></td></tr><tr style="background-color:#f9f9f9;"><td style="border:1px solid #333;padding:6px;text-align:center;font-weight:bold;">합계</td><td style="border:1px solid #333;padding:6px;text-align:right;font-weight:bold;"></td><td style="border:1px solid #333;padding:6px;"></td></tr></tbody></table><p style="margin-top:15px;font-size:11pt;color:#666;">※ 출장 완료 후 영수증 첨부하여 정산 요청</p></div>',
            },
            {
                name: '교육신청서',
                documentNumberCode: 'EDU',
                title: '교육 신청서',
                content:
                    '<div class="document-content"><h3>교육비 신청 내역서</h3><p>아래는 교육비 신청 내역입니다.</p><table cellspacing="0" cellpadding="2" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#e8f5e9;"><th style="border:1px solid #888;padding:6px;">교육명</th><th style="border:1px solid #888;padding:6px;">교육기관</th><th style="border:1px solid #888;padding:6px;">기간</th><th style="border:1px solid #888;padding:6px;">교육비</th><th style="border:1px solid #888;padding:6px;">비고</th></tr></thead><tbody><tr><td style="border:1px solid #888;padding:6px;">프로젝트 관리 전문가 과정</td><td style="border:1px solid #888;padding:6px;">한국생산성본부</td><td style="border:1px solid #888;padding:6px;">2024-02-01 ~ 2024-02-28</td><td style="border:1px solid #888;padding:6px;">1,200,000원</td><td style="border:1px solid #888;padding:6px;">온라인</td></tr><tr><td style="border:1px solid #888;padding:6px;">AI 실무 캠프</td><td style="border:1px solid #888;padding:6px;">패스트캠퍼스</td><td style="border:1px solid #888;padding:6px;">2024-03-10 ~ 2024-03-20</td><td style="border:1px solid #888;padding:6px;">800,000원</td><td style="border:1px solid #888;padding:6px;">오프라인</td></tr></tbody></table><p style="margin-top:10px;font-size:10pt;color:#666;">※ 교육비는 사전 승인 후 집행 바랍니다.</p></div>',
            },
            {
                name: '회의록',
                documentNumberCode: 'MTG',
                title: '회의록',
                content:
                    '<div class="document-content"><h3>프로젝트 진행 회의록</h3><p>주요 논의 사항 및 결정사항을 정리한 회의록입니다.</p><table cellspacing="0" cellpadding="3" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#e8f4fd;"><th style="border:1px solid #333;padding:8px;text-align:center;width:15%;">안건</th><th style="border:1px solid #333;padding:8px;text-align:center;width:25%;">논의내용</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">결정사항</th><th style="border:1px solid #333;padding:8px;text-align:center;width:15%;">담당자</th><th style="border:1px solid #333;padding:8px;text-align:center;width:15%;">완료일</th><th style="border:1px solid #333;padding:8px;text-align:center;width:10%;">상태</th></tr></thead><tbody><tr><td style="border:1px solid #333;padding:6px;">프로젝트 일정 조정</td><td style="border:1px solid #333;padding:6px;">클라이언트 요구사항 변경으로 인한 일정 연기 검토</td><td style="border:1px solid #333;padding:6px;">2주 연기 승인</td><td style="border:1px solid #333;padding:6px;">김철수</td><td style="border:1px solid #333;padding:6px;">2024-01-31</td><td style="border:1px solid #333;padding:6px;text-align:center;"><span style="color:green;">완료</span></td></tr><tr><td style="border:1px solid #333;padding:6px;">예산 증액</td><td style="border:1px solid #333;padding:6px;">추가 개발 인력 확보를 위한 예산 증액 요청</td><td style="border:1px solid #333;padding:6px;">5천만원 증액 승인</td><td style="border:1px solid #333;padding:6px;">이영희</td><td style="border:1px solid #333;padding:6px;">2024-01-25</td><td style="border:1px solid #333;padding:6px;text-align:center;"><span style="color:green;">완료</span></td></tr><tr><td style="border:1px solid #333;padding:6px;">기술 스택 검토</td><td style="border:1px solid #333;padding:6px;">새로운 프레임워크 도입 검토 및 성능 테스트</td><td style="border:1px solid #333;padding:6px;">React 18 도입 결정</td><td style="border:1px solid #333;padding:6px;">박민수</td><td style="border:1px solid #333;padding:6px;">2024-02-15</td><td style="border:1px solid #333;padding:6px;text-align:center;"><span style="color:orange;">진행중</span></td></tr><tr><td style="border:1px solid #333;padding:6px;">보안 검토</td><td style="border:1px solid #333;padding:6px;">외부 보안 업체 감사 및 취약점 점검</td><td style="border:1px solid #333;padding:6px;">보안 강화 조치 이행</td><td style="border:1px solid #333;padding:6px;">정수진</td><td style="border:1px solid #333;padding:6px;">2024-02-28</td><td style="border:1px solid #333;padding:6px;text-align:center;"><span style="color:blue;">대기</span></td></tr></tbody></table><p style="margin-top:15px;font-size:11pt;color:#666;">※ 다음 회의: 2024년 2월 5일 오후 2시</p></div>',
            },
            {
                name: '계약서',
                documentNumberCode: 'CON',
                title: '계약서',
                content:
                    '<div class="document-content"><h3>외주 개발 계약서</h3><p>시스템 개발을 위한 외주업체와의 계약 내역입니다.</p><table cellspacing="0" cellpadding="3" style="width:100%;border-collapse:collapse;table-layout:fixed;"><thead><tr style="background-color:#f0f0f0;"><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">계약업체</th><th style="border:1px solid #333;padding:8px;text-align:center;width:25%;">계약내용</th><th style="border:1px solid #333;padding:8px;text-align:center;width:15%;">계약금액</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">계약기간</th><th style="border:1px solid #333;padding:8px;text-align:center;width:20%;">담당자</th></tr></thead><tbody><tr><td style="border:1px solid #333;padding:6px;text-align:center;">ABC시스템즈</td><td style="border:1px solid #333;padding:6px;">웹 시스템 개발</td><td style="border:1px solid #333;padding:6px;text-align:right;">50,000,000원</td><td style="border:1px solid #333;padding:6px;text-align:center;">2024-02-01 ~ 2024-12-31</td><td style="border:1px solid #333;padding:6px;text-align:center;">김철수</td></tr><tr><td style="border:1px solid #333;padding:6px;text-align:center;">XYZ소프트</td><td style="border:1px solid #333;padding:6px;">모바일 앱 개발</td><td style="border:1px solid #333;padding:6px;text-align:right;">30,000,000원</td><td style="border:1px solid #333;padding:6px;text-align:center;">2024-03-01 ~ 2024-08-31</td><td style="border:1px solid #333;padding:6px;text-align:center;">이영희</td></tr><tr><td style="border:1px solid #333;padding:6px;text-align:center;">DEF테크</td><td style="border:1px solid #333;padding:6px;">보안 시스템 구축</td><td style="border:1px solid #333;padding:6px;text-align:right;">25,000,000원</td><td style="border:1px solid #333;padding:6px;text-align:center;">2024-04-01 ~ 2024-06-30</td><td style="border:1px solid #333;padding:6px;text-align:center;">박민수</td></tr><tr style="background-color:#f9f9f9;"><td style="border:1px solid #333;padding:6px;font-weight:bold;" colspan="2">총 계약금액</td><td style="border:1px solid #333;padding:6px;text-align:right;font-weight:bold;">105,000,000원</td><td style="border:1px solid #333;padding:6px;" colspan="2"></td></tr></tbody></table><p style="margin-top:15px;font-size:11pt;color:#666;">※ 계약 조건: 선금 30%, 중도금 40%, 잔금 30%</p></div>',
            },
        ];

        const title = documentTypeData[Math.floor(Math.random() * documentTypeData.length)].title;
        const content = documentTypeData[Math.floor(Math.random() * documentTypeData.length)].content;

        const document = await this.documentService.save({
            documentNumber: `${randomForm.documentNumberCode}-${new Date().getFullYear()}-${index}`,
            documentType: randomForm.name,
            title: `${title} (${index}번)`,
            content: content,
            drafterId: randomEmployee.employeeId,
            status: randomStatus,
            createdAt: randomDate,
        });

        return document;
    }

    private async createRandomApprovalSteps(document: Document, employees: Employee[]): Promise<ApprovalStep[]> {
        const steps: ApprovalStep[] = [];

        // 협의/결재 인원 랜덤 결정 (1~3명)
        const agreementCount = Math.floor(Math.random() * 3) + 1;
        const approvalCount = Math.floor(Math.random() * 3) + 1;

        // 중복 없는 랜덤 직원 추출 함수
        const pickRandomEmployees = (count: number, excludeIds: Set<string> = new Set()) => {
            const pool = employees.filter((e) => !excludeIds.has(e.employeeId));
            const picked: Employee[] = [];
            const used = new Set<string>(excludeIds);
            while (picked.length < count && pool.length > 0) {
                const idx = Math.floor(Math.random() * pool.length);
                const emp = pool[idx];
                if (!used.has(emp.employeeId)) {
                    picked.push(emp);
                    used.add(emp.employeeId);
                }
                pool.splice(idx, 1);
            }
            return picked;
        };

        // 협의자, 결재자 선정 (중복X)
        const agreementEmployees = pickRandomEmployees(agreementCount);
        const approvalEmployees = pickRandomEmployees(
            approvalCount,
            new Set(agreementEmployees.map((e) => e.employeeId)),
        );

        // 시행자 1명 (협의/결재 제외)
        const implementationEmployees = pickRandomEmployees(
            1,
            new Set([...agreementEmployees, ...approvalEmployees].map((e) => e.employeeId)),
        );

        // 참조자 1~2명 (중복 허용)
        const referenceCount = Math.floor(Math.random() * 2) + 1;
        const referenceEmployees = pickRandomEmployees(referenceCount);

        // 단계 순서대로 steps 생성
        let order = 1;
        for (const emp of agreementEmployees) {
            steps.push(
                await this.approvalStepService.save({
                    documentId: document.documentId,
                    type: ApprovalStepType.AGREEMENT,
                    order: order++,
                    approverId: emp.employeeId,
                    isApproved: null,
                    approvedDate: null,
                    isCurrent: false,
                }),
            );
        }
        order = 1;
        for (const emp of approvalEmployees) {
            steps.push(
                await this.approvalStepService.save({
                    documentId: document.documentId,
                    type: ApprovalStepType.APPROVAL,
                    order: order++,
                    approverId: emp.employeeId,
                    isApproved: null,
                    approvedDate: null,
                    isCurrent: false,
                }),
            );
        }
        order = 1;
        for (const emp of implementationEmployees) {
            steps.push(
                await this.approvalStepService.save({
                    documentId: document.documentId,
                    type: ApprovalStepType.IMPLEMENTATION,
                    order: order++,
                    approverId: emp.employeeId,
                    isApproved: null,
                    approvedDate: null,
                    isCurrent: false,
                }),
            );
        }
        order = 1;
        for (const emp of referenceEmployees) {
            steps.push(
                await this.approvalStepService.save({
                    documentId: document.documentId,
                    type: ApprovalStepType.REFERENCE,
                    order: order++,
                    approverId: emp.employeeId,
                    isApproved: null,
                    approvedDate: null,
                    isCurrent: false,
                }),
            );
        }

        // === 상태별 후처리 ===
        // 결재/합의/시행 단계만 대상으로 처리
        const mainSteps = steps.filter(
            (s) => s.type === ApprovalStepType.AGREEMENT || s.type === ApprovalStepType.APPROVAL,
        );
        let currentStepIndex = 0;
        if (document.status === ApprovalStatus.APPROVED) {
            currentStepIndex = -1;
        } else if (document.status === ApprovalStatus.REJECTED) {
            currentStepIndex = mainSteps.length > 1 ? Math.floor(Math.random() * (mainSteps.length - 1)) + 1 : 0;
        } else {
            currentStepIndex = Math.floor(Math.random() * mainSteps.length);
        }
        for (let i = 0; i < mainSteps.length; i++) {
            if (document.status === ApprovalStatus.APPROVED) {
                mainSteps[i].isApproved = true;
                mainSteps[i].approvedDate = new Date(document.createdAt.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
                mainSteps[i].isCurrent = false;
            } else if (document.status === ApprovalStatus.REJECTED) {
                mainSteps[i].isApproved = i < currentStepIndex;
                mainSteps[i].approvedDate =
                    i < currentStepIndex
                        ? new Date(document.createdAt.getTime() + (i + 1) * 24 * 60 * 60 * 1000)
                        : null;
                mainSteps[i].isCurrent = i === currentStepIndex;
            } else {
                mainSteps[i].isApproved = i < currentStepIndex;
                mainSteps[i].approvedDate =
                    i < currentStepIndex
                        ? new Date(document.createdAt.getTime() + (i + 1) * 24 * 60 * 60 * 1000)
                        : null;
                mainSteps[i].isCurrent = i === currentStepIndex;
            }
        }

        return steps;
    }

    private getRandomStatus(): ApprovalStatus {
        const statuses = [ApprovalStatus.PENDING, ApprovalStatus.APPROVED, ApprovalStatus.REJECTED];
        const weights = [0.5, 0.45, 0.05]; // PENDING 50%, APPROVED 45%, REJECTED 5%

        const random = Math.random();
        let cumulativeWeight = 0;

        for (let i = 0; i < statuses.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                return statuses[i];
            }
        }

        return ApprovalStatus.PENDING;
    }

    private getRandomDate(): Date {
        // 최근 30일 내의 랜덤 날짜
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
        return new Date(randomTime);
    }
}
