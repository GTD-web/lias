import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * ApprovalFlowController E2E 테스트
 *
 * 테스트 범위:
 * 1. 문서양식 생성 & 결재선 연결
 * 2. 문서양식 수정 (새 버전 생성)
 * 3. 결재선 템플릿 생성/복제/버전 관리
 * 4. 결재 스냅샷 생성
 * 5. 결재선 미리보기
 * 6. 조회 API들
 */
describe('ApprovalFlowController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;
    let employeeId: string;
    let departmentId: string;
    let positionId: string;

    // 테스트 데이터 ID 저장
    let createdFormId: string;
    let createdFormVersionId: string;
    let createdTemplateId: string;
    let createdTemplateVersionId: string;
    let clonedTemplateVersionId: string;

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

        // 테스트용 부서 및 직책 조회
        const departments = await request(app.getHttpServer())
            .get('/metadata/departments')
            .set('Authorization', `Bearer ${authToken}`);

        departmentId = departments.body[0]?.id;

        const positions = await request(app.getHttpServer())
            .get('/metadata/positions')
            .set('Authorization', `Bearer ${authToken}`);

        positionId = positions.body[0]?.id;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /v2/approval-flow/forms - 문서양식 생성', () => {
        it('정상: 복제 후 수정 방식으로 문서양식 생성', async () => {
            const timestamp = Date.now();
            // 먼저 기준이 될 결재선 템플릿 생성
            const templateResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `기준 결재선_${timestamp}`,
                    description: '복제용 기준 결재선',
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

            // 템플릿 생성 실패 시 응답 확인
            if (templateResponse.status !== 201) {
                console.log('템플릿 생성 응답 상태:', templateResponse.status);
                console.log('템플릿 생성 응답 본문:', JSON.stringify(templateResponse.body, null, 2));
            }

            expect(templateResponse.status).toBe(201);
            const baseTemplateVersionId = templateResponse.body.currentVersionId;

            const response = await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formName: `휴가 신청서_${timestamp}`,
                    formCode: `VACATION_REQUEST_${timestamp}`,
                    description: '휴가 신청을 위한 문서양식',
                    useExistingLine: false,
                    baseLineTemplateVersionId: baseTemplateVersionId,
                    stepEdits: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DRAFTER_SUPERIOR',
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DEPARTMENT_HEAD',
                            isRequired: true,
                        },
                    ],
                });

            // 실패 시 응답 본문 출력
            if (response.status !== 201) {
                console.log('응답 상태:', response.status);
                console.log('응답 본문:', JSON.stringify(response.body, null, 2));
            }

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('form');
            expect(response.body.form).toHaveProperty('id');
            expect(response.body).toHaveProperty('formVersion');

            createdFormId = response.body.form.id;
            createdFormVersionId = response.body.formVersion.id;
        });

        it('정상: 기존 결재선을 참조하여 문서양식 생성', async () => {
            const timestamp = Date.now();
            // 먼저 결재선 템플릿 생성
            const templateResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `일반 결재선_${timestamp}`,
                    description: '일반적인 결재선',
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

            const response = await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formName: `지출 결의서_${timestamp}`,
                    formCode: `EXPENSE_REQUEST_${timestamp}`,
                    description: '지출 결의를 위한 문서양식',
                    useExistingLine: true,
                    lineTemplateVersionId: templateVersionId,
                })
                .expect(201);

            expect(response.body.form).toBeDefined();
        });

        it('실패: 필수 필드 누락 (formName)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formCode: 'TEST',
                    useExistingLine: false,
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (formCode)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formName: '테스트 문서',
                    useExistingLine: false,
                })
                .expect(400);
        });

        it('실패: useExistingLine=true인데 lineTemplateVersionId 누락', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formName: '테스트 문서',
                    formCode: 'TEST_FORM',
                    useExistingLine: true,
                })
                .expect(400);
        });

        it('실패: useExistingLine=false인데 baseLineTemplateVersionId 누락', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formName: '테스트 문서',
                    formCode: 'TEST_FORM',
                    useExistingLine: false,
                })
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .send({
                    formName: '테스트 문서',
                    formCode: 'TEST_FORM',
                    useExistingLine: false,
                })
                .expect(401);
        });

        it('실패: 잘못된 토큰', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', 'Bearer invalid-token')
                .send({
                    formName: '테스트 문서',
                    formCode: 'TEST_FORM',
                    useExistingLine: false,
                })
                .expect(401);
        });

        it('실패: 존재하지 않는 결재선 템플릿 버전 ID', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formName: '테스트 문서',
                    formCode: 'TEST_FORM',
                    useExistingLine: true,
                    lineTemplateVersionId: '00000000-0000-0000-0000-000000000000',
                })
                .expect(404);
        });
    });

    describe('PATCH /v2/approval-flow/forms/:formId/versions - 문서양식 수정', () => {
        it('정상: 문서양식 템플릿 수정 (새 버전 생성)', async () => {
            const response = await request(app.getHttpServer())
                .patch(`/v2/approval-flow/forms/${createdFormId}/versions`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formId: createdFormId,
                    template: '<h1>휴가 신청서 v2</h1><p>수정된 템플릿</p>',
                    versionNote: '템플릿 레이아웃 개선',
                })
                .expect(200);

            expect(response.body).toHaveProperty('newVersion');
            expect(response.body.newVersion).toHaveProperty('id');
        });

        it('정상: 결재선도 함께 변경', async () => {
            // 먼저 새로운 템플릿 버전 생성
            const newTemplate = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `변경용 템플릿_${Date.now()}`,
                    description: '개선된 결재선',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'DRAFTER_SUPERIOR',
                            isRequired: false,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DEPARTMENT_HEAD',
                            isRequired: true,
                        },
                    ],
                });

            const newTemplateVersionId = newTemplate.body.currentVersionId;

            const response = await request(app.getHttpServer())
                .patch(`/v2/approval-flow/forms/${createdFormId}/versions`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formId: createdFormId,
                    template: '<h1>휴가 신청서 v3</h1>',
                    lineTemplateVersionId: newTemplateVersionId,
                    versionNote: '협의 단계 추가',
                })
                .expect(200);

            expect(response.body.newVersion).toBeDefined();
        });

        it('실패: 존재하지 않는 문서양식 ID', async () => {
            await request(app.getHttpServer())
                .patch('/v2/approval-flow/forms/00000000-0000-0000-0000-000000000000/versions')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formId: '00000000-0000-0000-0000-000000000000',
                    template: '<h1>테스트</h1>',
                    versionNote: '수정',
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .patch(`/v2/approval-flow/forms/${createdFormId}/versions`)
                .send({
                    template: '<h1>테스트</h1>',
                })
                .expect(401);
        });
    });

    describe('POST /v2/approval-flow/templates - 결재선 템플릿 생성', () => {
        it('정상: 새로운 결재선 템플릿 생성', async () => {
            const timestamp = Date.now();
            const response = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `테스트 결재선_${timestamp}`,
                    description: '테스트용 결재선',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DRAFTER_SUPERIOR',
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DEPARTMENT_HEAD',
                            isRequired: true,
                        },
                    ],
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toContain('테스트 결재선');
            expect(response.body).toHaveProperty('currentVersionId');

            createdTemplateId = response.body.id;
            createdTemplateVersionId = response.body.currentVersionId;
        });

        it('실패: 필수 필드 누락 (name)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
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
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (steps)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: '테스트 결재선',
                    type: 'COMMON',
                    orgScope: 'ALL',
                })
                .expect(400);
        });

        it('실패: steps가 빈 배열', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: '테스트 결재선',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [],
                })
                .expect(400);
        });

        it('실패: step에 필수 필드 누락 (assigneeRule)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: '테스트 결재선',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            isRequired: true,
                        },
                    ],
                })
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .send({
                    name: '테스트 결재선',
                    steps: [],
                })
                .expect(401);
        });
    });

    describe('POST /v2/approval-flow/templates/clone - 결재선 템플릿 복제', () => {
        it('정상: 같은 템플릿의 새 버전으로 복제', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates/clone')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    baseTemplateVersionId: createdTemplateVersionId,
                    stepEdits: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'DRAFTER_SUPERIOR',
                            isRequired: false,
                        },
                    ],
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('templateId');
        });

        it('정상: 새로운 템플릿으로 분기', async () => {
            const timestamp = Date.now();
            const response = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates/clone')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    baseTemplateVersionId: createdTemplateVersionId,
                    newTemplateName: `분기된 결재선_${timestamp}`,
                    stepEdits: [],
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            clonedTemplateVersionId = response.body.id;
        });

        it('실패: 필수 필드 누락 (baseTemplateVersionId)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates/clone')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    stepEdits: [],
                })
                .expect(400);
        });

        it('실패: 존재하지 않는 소스 템플릿 버전 ID', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates/clone')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    baseTemplateVersionId: '00000000-0000-0000-0000-000000000000',
                    stepEdits: [],
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates/clone')
                .send({
                    baseTemplateVersionId: createdTemplateVersionId,
                })
                .expect(401);
        });
    });

    describe('POST /v2/approval-flow/templates/:templateId/versions - 템플릿 새 버전 생성', () => {
        it('정상: 결재선 템플릿의 새 버전 생성', async () => {
            const response = await request(app.getHttpServer())
                .post(`/v2/approval-flow/templates/${createdTemplateId}/versions`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    templateId: createdTemplateId,
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DRAFTER_SUPERIOR',
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'DRAFTER',
                            isRequired: true,
                        },
                    ],
                    versionNote: '시행 단계 추가',
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('templateId');
        });

        it('실패: 존재하지 않는 템플릿 ID', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/templates/00000000-0000-0000-0000-000000000000/versions')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    templateId: '00000000-0000-0000-0000-000000000000',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'DRAFTER_SUPERIOR',
                            isRequired: true,
                        },
                    ],
                })
                .expect(404);
        });

        it('실패: 필수 필드 누락 (steps)', async () => {
            await request(app.getHttpServer())
                .post(`/v2/approval-flow/templates/${createdTemplateId}/versions`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    changeNote: '수정',
                })
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post(`/v2/approval-flow/templates/${createdTemplateId}/versions`)
                .send({
                    steps: [],
                })
                .expect(401);
        });
    });

    describe('GET /v2/approval-flow/templates - 결재선 템플릿 목록 조회', () => {
        it('정상: 모든 결재선 템플릿 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('정상: 타입별 필터링', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/approval-flow/templates?type=COMMON')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/v2/approval-flow/templates').expect(401);
        });
    });

    describe('GET /v2/approval-flow/templates/:templateId - 템플릿 상세 조회', () => {
        it('정상: 특정 결재선 템플릿 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/v2/approval-flow/templates/${createdTemplateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', createdTemplateId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('currentVersionId');
        });

        it('실패: 존재하지 않는 템플릿 ID', async () => {
            await request(app.getHttpServer())
                .get('/v2/approval-flow/templates/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get(`/v2/approval-flow/templates/${createdTemplateId}`).expect(401);
        });
    });

    describe('GET /v2/approval-flow/forms - 문서양식 목록 조회', () => {
        it('정상: 모든 문서양식 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/v2/approval-flow/forms').expect(401);
        });
    });

    describe('GET /v2/approval-flow/forms/:formId - 문서양식 상세 조회', () => {
        it('정상: 특정 문서양식 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/v2/approval-flow/forms/${createdFormId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', createdFormId);
            expect(response.body).toHaveProperty('name');
        });

        it('실패: 존재하지 않는 문서양식 ID', async () => {
            await request(app.getHttpServer())
                .get('/v2/approval-flow/forms/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get(`/v2/approval-flow/forms/${createdFormId}`).expect(401);
        });
    });

    describe('POST /v2/approval-flow/forms/:formId/preview-approval-line - 결재선 미리보기', () => {
        it('정상: 결재선 미리보기 조회', async () => {
            const response = await request(app.getHttpServer())
                .post(`/v2/approval-flow/forms/${createdFormId}/preview-approval-line`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId: createdFormVersionId,
                })
                .expect(200);

            expect(response.body).toHaveProperty('templateName');
            expect(response.body).toHaveProperty('steps');
            expect(Array.isArray(response.body.steps)).toBe(true);
        });

        it('실패: 필수 필드 누락 (formVersionId)', async () => {
            await request(app.getHttpServer())
                .post(`/v2/approval-flow/forms/${createdFormId}/preview-approval-line`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({})
                .expect(400);
        });

        it('실패: 존재하지 않는 문서양식 ID', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-flow/forms/00000000-0000-0000-0000-000000000000/preview-approval-line')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    formVersionId: createdFormVersionId,
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post(`/v2/approval-flow/forms/${createdFormId}/preview-approval-line`)
                .send({
                    formVersionId: createdFormVersionId,
                })
                .expect(401);
        });
    });
});
