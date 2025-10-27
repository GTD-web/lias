import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource, Not, IsNull } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * DocumentController E2E 테스트
 *
 * 테스트 범위:
 * 1. 문서 생성 (임시저장)
 * 2. 문서 수정
 * 3. 문서 제출
 * 4. 문서 조회 (단건, 목록, 상태별)
 * 5. 문서 삭제
 */
describe('DocumentController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;
    let employeeId: string;
    let formId: string;
    let formVersionId: string;

    // 테스트 데이터 ID 저장
    let createdDocumentId: string;
    let submittedDocumentId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();

        dataSource = moduleFixture.get<DataSource>(DataSource);
        jwtService = moduleFixture.get<JwtService>(JwtService);

        // 실제 DB에 존재하는 직원 조회
        const employeeRepo = dataSource.getRepository('Employee');
        const employees = await employeeRepo.find({
            take: 1,
            order: { createdAt: 'ASC' },
        });

        if (!employees || employees.length === 0) {
            throw new Error('데이터베이스에 직원 정보가 없습니다. 메타데이터를 먼저 생성해주세요.');
        }

        const testEmployee = employees[0];
        employeeId = testEmployee.id;

        // JWT 토큰 생성
        authToken = jwtService.sign({
            sub: employeeId,
            employeeNumber: testEmployee.employeeNumber,
        });

        // 먼저 결재선 템플릿 생성
        const timestamp = Date.now();
        const templateResponse = await request(app.getHttpServer())
            .post('/v2/approval-flow/templates')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: `테스트 결재선_${timestamp}`,
                description: '테스트용',
                type: 'COMMON',
                orgScope: 'ALL',
                steps: [
                    {
                        stepOrder: 1,
                        stepType: 'APPROVAL',
                        assigneeRule: 'DRAFTER_SUPERIOR',
                        isRequired: true,
                    },
                ],
            });

        const templateVersionId = templateResponse.body.currentVersionId;

        // 테스트용 문서양식 생성
        const formResponse = await request(app.getHttpServer())
            .post('/v2/approval-flow/forms')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                formName: `테스트 문서양식_${timestamp}`,
                formCode: `TEST_DOCUMENT_FORM_${timestamp}`,
                description: '테스트용',
                template: '<h1>테스트 문서</h1><p>내용: {{content}}</p>',
                useExistingLine: true,
                lineTemplateVersionId: templateVersionId,
            });

        formId = formResponse.body.form.id;
        formVersionId = formResponse.body.formVersion.id;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /v2/document - 문서 생성', () => {
        it('정상: 새로운 문서 생성 (임시저장)', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '테스트 문서 1',
                    content: '<h1>테스트</h1><p>내용입니다</p>',
                    metadata: {
                        customField: 'value',
                    },
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('테스트 문서 1');
            expect(response.body.status).toBe('DRAFT');
            expect(response.body.formVersionId).toBe(formVersionId);

            createdDocumentId = response.body.id;
        });

        it('정상: metadata 없이 문서 생성', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '테스트 문서 2',
                    content: '<p>간단한 내용</p>',
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('테스트 문서 2');
        });

        it('정상: customApprovalSteps와 함께 문서 생성', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '커스텀 결재선 문서',
                    content: '<p>커스텀 결재선이 있는 문서</p>',
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'FIXED',
                            employeeId: employeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DEPARTMENT_HEAD',
                            employeeId: null,
                            isRequired: true,
                        },
                    ],
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('커스텀 결재선 문서');
            expect(response.body.status).toBe('DRAFT');
            expect(response.body).toHaveProperty('approvalLineSnapshotId');
        });

        it('실패: 필수 필드 누락 (formVersionId)', async () => {
            await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: '테스트 문서',
                    content: '<p>내용</p>',
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (title)', async () => {
            await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    content: '<p>내용</p>',
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (content)', async () => {
            await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '테스트 문서',
                })
                .expect(400);
        });

        it('실패: 존재하지 않는 formVersionId', async () => {
            await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId: '00000000-0000-0000-0000-000000000000',
                    title: '테스트 문서',
                    content: '<p>내용</p>',
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/document')
                .send({
                    formVersionId,
                    title: '테스트 문서',
                    content: '<p>내용</p>',
                })
                .expect(401);
        });

        it('실패: 잘못된 토큰', async () => {
            await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', 'Bearer invalid-token')
                .send({
                    formVersionId,
                    title: '테스트 문서',
                    content: '<p>내용</p>',
                })
                .expect(401);
        });
    });

    describe('PUT /v2/document/:documentId - 문서 수정', () => {
        it('정상: DRAFT 상태 문서 수정', async () => {
            const response = await request(app.getHttpServer())
                .put(`/v2/document/${createdDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: '수정된 제목',
                    content: '<h1>수정</h1><p>수정된 내용입니다</p>',
                    metadata: {
                        updatedField: 'new value',
                    },
                })
                .expect(200);

            expect(response.body.id).toBe(createdDocumentId);
            expect(response.body.title).toBe('수정된 제목');
            expect(response.body.status).toBe('DRAFT');
        });

        it('정상: 일부 필드만 수정', async () => {
            const response = await request(app.getHttpServer())
                .put(`/v2/document/${createdDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: '제목만 수정',
                })
                .expect(200);

            expect(response.body.title).toBe('제목만 수정');
        });

        it('실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .put('/v2/document/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: '수정',
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .put(`/v2/document/${createdDocumentId}`)
                .send({
                    title: '수정',
                })
                .expect(401);
        });

        // 제출된 문서 수정 시도 테스트는 문서 제출 후 테스트
    });

    describe('POST /v2/document/:documentId/submit - 문서 제출', () => {
        let documentToSubmitId: string;

        beforeAll(async () => {
            // 제출할 문서 생성
            const response = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '제출할 문서',
                    content: '<p>제출할 내용</p>',
                });

            documentToSubmitId = response.body.id;
        });

        it('정상: 문서 제출', async () => {
            const response = await request(app.getHttpServer())
                .post(`/v2/document/${documentToSubmitId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    draftContext: {},
                })
                .expect(200);

            expect(response.body.id).toBe(documentToSubmitId);
            expect(response.body.status).toBe('PENDING');
            expect(response.body).toHaveProperty('approvalLineSnapshotId');
            expect(response.body).toHaveProperty('submittedAt');

            submittedDocumentId = response.body.id;
        });

        it('정상: customApprovalSteps와 함께 문서 제출', async () => {
            // 제출할 문서 생성
            const createResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '커스텀 결재선 제출 문서',
                    content: '<p>커스텀 결재선으로 제출할 문서</p>',
                });

            const documentId = createResponse.body.id;

            const response = await request(app.getHttpServer())
                .post(`/v2/document/${documentId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'FIXED',
                            employeeId: employeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            employeeId: employeeId,
                            isRequired: true,
                        },
                    ],
                });

            expect(response.status).toBe(200);

            expect(response.body.id).toBe(documentId);
            expect(response.body.status).toBe('PENDING');
            expect(response.body).toHaveProperty('approvalLineSnapshotId');
            expect(response.body).toHaveProperty('submittedAt');
        });

        it('정상: DEPARTMENT_REFERENCE 룰로 부서 전체 참조자 설정', async () => {
            // 부서 정보 조회 - 부모부서가 있는 실제 부서들만 조회
            const departmentRepo = dataSource.getRepository('Department');
            const departments = await departmentRepo.find({
                where: { parentDepartmentId: Not(IsNull()) }, // 부모부서가 있는 부서들만
                order: { createdAt: 'ASC' },
            });

            if (!departments || departments.length === 0) {
                throw new Error('데이터베이스에 하위 부서 정보가 없습니다. 메타데이터를 먼저 생성해주세요.');
            }

            // 랜덤하게 부서 선택
            const randomIndex = Math.floor(Math.random() * departments.length);
            const testDepartment = departments[randomIndex];
            const departmentId = testDepartment.id;

            // 해당 부서의 직원 수 조회
            const employeeDepartmentPositionRepo = dataSource.getRepository('EmployeeDepartmentPosition');
            const departmentEmployees = await employeeDepartmentPositionRepo.find({
                where: { departmentId },
            });

            expect(departmentEmployees.length).toBeGreaterThan(0);

            // 제출할 문서 생성
            const createResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '부서 전체 참조자 테스트 문서',
                    content: '<p>부서 전체가 참조자로 설정되는 문서</p>',
                });

            const documentId = createResponse.body.id;

            // DEPARTMENT_REFERENCE 룰로 문서 제출
            const response = await request(app.getHttpServer())
                .post(`/v2/document/${documentId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'REFERENCE',
                            assigneeRule: 'DEPARTMENT_REFERENCE',
                            departmentId: departmentId,
                            isRequired: false,
                        },
                    ],
                });

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(documentId);
            expect(response.body.status).toBe('PENDING');
            expect(response.body).toHaveProperty('approvalLineSnapshotId');

            // 생성된 스냅샷에서 참조자 수 확인
            const approvalLineSnapshotRepo = dataSource.getRepository('ApprovalLineSnapshot');
            const approvalStepSnapshotRepo = dataSource.getRepository('ApprovalStepSnapshot');

            const snapshot = await approvalLineSnapshotRepo.findOne({
                where: { documentId },
            });

            expect(snapshot).toBeDefined();

            const stepSnapshots = await approvalStepSnapshotRepo.find({
                where: { snapshotId: snapshot.id },
            });

            // 부서의 모든 직원이 참조자로 설정되었는지 확인
            expect(stepSnapshots.length).toBe(departmentEmployees.length);

            // 모든 스냅샷이 REFERENCE 타입인지 확인
            stepSnapshots.forEach((step) => {
                expect(step.stepType).toBe('REFERENCE');
                expect(step.assigneeRule).toBe('DEPARTMENT_REFERENCE');
                expect(step.required).toBe(false);
            });

            // 각 부서원이 개별적으로 참조자로 설정되었는지 확인
            const approverIds = stepSnapshots.map((step) => step.approverId);
            const departmentEmployeeIds = departmentEmployees.map((edp) => edp.employeeId);

            expect(approverIds.sort()).toEqual(departmentEmployeeIds.sort());
        });

        it('정상: 개별 직원과 부서 참조자가 혼재된 결재선 설정', async () => {
            // 부서 정보 조회 - 부모부서가 있는 실제 부서들만 조회
            const departmentRepo = dataSource.getRepository('Department');
            const departments = await departmentRepo.find({
                where: { parentDepartmentId: Not(IsNull()) }, // 부모부서가 있는 부서들만
                order: { createdAt: 'ASC' },
            });

            if (!departments || departments.length === 0) {
                throw new Error('데이터베이스에 하위 부서 정보가 없습니다. 메타데이터를 먼저 생성해주세요.');
            }

            // 랜덤하게 부서 선택
            const randomIndex = Math.floor(Math.random() * departments.length);
            const testDepartment = departments[randomIndex];
            const departmentId = testDepartment.id;

            // 해당 부서의 직원 수 조회
            const employeeDepartmentPositionRepo = dataSource.getRepository('EmployeeDepartmentPosition');
            const departmentEmployees = await employeeDepartmentPositionRepo.find({
                where: { departmentId },
            });

            expect(departmentEmployees.length).toBeGreaterThan(0);

            // 다른 부서의 직원도 조회 (개별 참조자용)
            const allEmployees = await dataSource.getRepository('Employee').find({
                take: 2,
                order: { createdAt: 'ASC' },
            });

            expect(allEmployees.length).toBeGreaterThanOrEqual(2);

            const individualEmployee1 = allEmployees[0];
            const individualEmployee2 = allEmployees[1];

            // 제출할 문서 생성
            const createResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '혼재 참조자 테스트 문서',
                    content: '<p>개별 직원과 부서가 혼재된 참조자 설정 문서</p>',
                });

            const documentId = createResponse.body.id;

            // 개별 직원과 부서 참조자가 혼재된 결재선으로 문서 제출
            const response = await request(app.getHttpServer())
                .post(`/v2/document/${documentId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            employeeId: employeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'REFERENCE',
                            assigneeRule: 'FIXED',
                            employeeId: individualEmployee1.id,
                            isRequired: false,
                        },
                        {
                            stepOrder: 3,
                            stepType: 'REFERENCE',
                            assigneeRule: 'DEPARTMENT_REFERENCE',
                            departmentId: departmentId,
                            isRequired: false,
                        },
                        {
                            stepOrder: 4,
                            stepType: 'REFERENCE',
                            assigneeRule: 'FIXED',
                            employeeId: individualEmployee2.id,
                            isRequired: false,
                        },
                    ],
                });

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(documentId);
            expect(response.body.status).toBe('PENDING');
            expect(response.body).toHaveProperty('approvalLineSnapshotId');

            // 생성된 스냅샷에서 참조자 수 확인
            const approvalLineSnapshotRepo = dataSource.getRepository('ApprovalLineSnapshot');
            const approvalStepSnapshotRepo = dataSource.getRepository('ApprovalStepSnapshot');

            const snapshot = await approvalLineSnapshotRepo.findOne({
                where: { documentId },
            });

            expect(snapshot).toBeDefined();

            const stepSnapshots = await approvalStepSnapshotRepo.find({
                where: { snapshotId: snapshot.id },
                order: { stepOrder: 'ASC' },
            });

            // 예상 참조자 수: 1(개별) + 부서원수 + 1(개별) = 부서원수 + 2
            const expectedReferenceCount = departmentEmployees.length + 2;
            const referenceSteps = stepSnapshots.filter((step) => step.stepType === 'REFERENCE');
            expect(referenceSteps.length).toBe(expectedReferenceCount);

            // 결재자 1명 + 참조자들
            const approvalSteps = stepSnapshots.filter((step) => step.stepType === 'APPROVAL');
            expect(approvalSteps.length).toBe(1);

            // 단계별 검증
            const step1 = stepSnapshots.find((step) => step.stepOrder === 1);
            expect(step1.stepType).toBe('APPROVAL');
            expect(step1.assigneeRule).toBe('FIXED');
            expect(step1.required).toBe(true);

            const step2 = stepSnapshots.find((step) => step.stepOrder === 2);
            expect(step2.stepType).toBe('REFERENCE');
            expect(step2.assigneeRule).toBe('FIXED');
            expect(step2.approverId).toBe(individualEmployee1.id);
            expect(step2.required).toBe(false);

            // 부서 참조자들 (stepOrder 3)
            const departmentReferenceSteps = stepSnapshots.filter(
                (step) =>
                    step.stepOrder === 3 &&
                    step.stepType === 'REFERENCE' &&
                    step.assigneeRule === 'DEPARTMENT_REFERENCE',
            );
            expect(departmentReferenceSteps.length).toBe(departmentEmployees.length);

            // 모든 부서 참조자가 올바른 부서원인지 확인
            const departmentReferenceApproverIds = departmentReferenceSteps.map((step) => step.approverId);
            const departmentEmployeeIds = departmentEmployees.map((edp) => edp.employeeId);
            expect(departmentReferenceApproverIds.sort()).toEqual(departmentEmployeeIds.sort());

            const step4 = stepSnapshots.find((step) => step.stepOrder === 4);
            expect(step4.stepType).toBe('REFERENCE');
            expect(step4.assigneeRule).toBe('FIXED');
            expect(step4.approverId).toBe(individualEmployee2.id);
            expect(step4.required).toBe(false);

            // 전체 참조자 ID 목록 확인
            const allReferenceApproverIds = referenceSteps.map((step) => step.approverId);
            const expectedApproverIds = [individualEmployee1.id, individualEmployee2.id, ...departmentEmployeeIds];

            expect(allReferenceApproverIds.sort()).toEqual(expectedApproverIds.sort());
        });

        it('실패: 이미 제출된 문서 재제출 시도', async () => {
            await request(app.getHttpServer())
                .post(`/v2/document/${documentToSubmitId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    draftContext: {},
                })
                .expect(400);
        });

        it('실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .post('/v2/document/00000000-0000-0000-0000-000000000000/submit')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    draftContext: {},
                })
                .expect(404);
        });

        it('실패: 필수 필드 누락 (draftContext)', async () => {
            await request(app.getHttpServer())
                .post(`/v2/document/${createdDocumentId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({})
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post(`/v2/document/${createdDocumentId}/submit`)
                .send({
                    draftContext: {},
                })
                .expect(401);
        });
    });

    describe('PUT /v2/document/:documentId - 제출된 문서 수정 불가 확인', () => {
        it('실패: 제출된 문서(PENDING) 수정 시도', async () => {
            await request(app.getHttpServer())
                .put(`/v2/document/${submittedDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: '수정 시도',
                })
                .expect(400);
        });
    });

    describe('GET /v2/document/:documentId - 문서 조회', () => {
        it('정상: 특정 문서 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/v2/document/${createdDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.id).toBe(createdDocumentId);
            expect(response.body).toHaveProperty('title');
            expect(response.body).toHaveProperty('content');
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('formVersionId');
        });

        it('실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .get('/v2/document/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get(`/v2/document/${createdDocumentId}`).expect(401);
        });
    });

    describe('GET /v2/document/my-documents - 내 문서 조회', () => {
        it('정상: 내가 작성한 모든 문서 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/document/my-documents')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            // 내가 만든 문서가 포함되어 있는지 확인
            const myDocument = response.body.find((doc: any) => doc.id === createdDocumentId);
            expect(myDocument).toBeDefined();
            expect(myDocument.drafterId).toBe(employeeId);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/v2/document/my-documents').expect(401);
        });
    });

    describe('GET /v2/document/status/:status - 상태별 문서 조회', () => {
        it('정상: DRAFT 상태 문서 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/document/status/DRAFT')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            // DRAFT 상태 문서만 포함되어야 함
            response.body.forEach((doc: any) => {
                expect(doc.status).toBe('DRAFT');
            });
        });

        it('정상: PENDING 상태 문서 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/document/status/PENDING')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('정상: APPROVED 상태 문서 조회 (빈 배열 가능)', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/document/status/APPROVED')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('실패: 잘못된 상태 값', async () => {
            await request(app.getHttpServer())
                .get('/v2/document/status/INVALID_STATUS')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/v2/document/status/DRAFT').expect(401);
        });
    });

    describe('DELETE /v2/document/:documentId - 문서 삭제', () => {
        let documentToDeleteId: string;

        beforeAll(async () => {
            // 삭제할 문서 생성
            const response = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId,
                    title: '삭제할 문서',
                    content: '<p>삭제될 내용</p>',
                });

            documentToDeleteId = response.body.id;
        });

        it('정상: DRAFT 상태 문서 삭제', async () => {
            await request(app.getHttpServer())
                .delete(`/v2/document/${documentToDeleteId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            // 삭제 후 조회 시 404
            await request(app.getHttpServer())
                .get(`/v2/document/${documentToDeleteId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('실패: 제출된 문서(PENDING) 삭제 시도', async () => {
            await request(app.getHttpServer())
                .delete(`/v2/document/${submittedDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(400);
        });

        it('실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .delete('/v2/document/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).delete(`/v2/document/${createdDocumentId}`).expect(401);
        });

        it('실패: 이미 삭제된 문서 재삭제 시도', async () => {
            await request(app.getHttpServer())
                .delete(`/v2/document/${documentToDeleteId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });
    });

    describe('권한 테스트 - 다른 사용자의 문서 접근', () => {
        let otherUserToken: string;
        let otherUserDocumentId: string;

        beforeAll(async () => {
            // 다른 사용자 조회 (첫 번째 직원과 다른 두 번째 직원)
            const employeeRepo = dataSource.getRepository('Employee');
            const employees = await employeeRepo.find({
                take: 2,
                order: { createdAt: 'ASC' },
            });

            if (!employees || employees.length < 2) {
                throw new Error('테스트를 위해서는 최소 2명 이상의 직원이 필요합니다.');
            }

            const otherEmployee = employees[1]; // 두 번째 직원 사용

            otherUserToken = jwtService.sign({
                sub: otherEmployee.id,
                employeeNumber: otherEmployee.employeeNumber,
            });

            // 다른 사용자의 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${otherUserToken}`)
                .send({
                    formVersionId,
                    title: '다른 사용자 문서',
                    content: '<p>내용</p>',
                });

            otherUserDocumentId = docResponse.body.id;
        });

        it('정상: 다른 사용자의 문서 조회는 가능 (조회 권한)', async () => {
            const response = await request(app.getHttpServer())
                .get(`/v2/document/${otherUserDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.id).toBe(otherUserDocumentId);
        });

        it('실패: 다른 사용자의 문서 수정 시도', async () => {
            await request(app.getHttpServer())
                .put(`/v2/document/${otherUserDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: '수정 시도',
                })
                .expect(403);
        });

        it('실패: 다른 사용자의 문서 삭제 시도', async () => {
            await request(app.getHttpServer())
                .delete(`/v2/document/${otherUserDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(403);
        });
    });
});
