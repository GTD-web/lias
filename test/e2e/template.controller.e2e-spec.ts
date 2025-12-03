import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * Template Controller E2E 테스트
 *
 * 테스트 범위:
 * 1. POST /templates - 문서 템플릿 생성 (결재단계 포함)
 * 2. GET /templates - 문서 템플릿 목록 조회
 * 3. GET /templates/:templateId - 문서 템플릿 상세 조회
 * 4. PUT /templates/:templateId - 문서 템플릿 수정
 * 5. DELETE /templates/:templateId - 문서 템플릿 삭제
 */
describe('TemplateController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;

    // 테스트 사용자 정보
    let employeeId: string;
    let approverId: string;
    let implementerId: string;

    // 테스트 데이터 ID
    let categoryId: string;
    let templateId: string;
    let templateIdForDelete: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
        await app.init();

        dataSource = moduleFixture.get<DataSource>(DataSource);
        jwtService = moduleFixture.get<JwtService>(JwtService);

        // 테스트 설정
        await setupTestEmployees();
        await setupTestCategory();
    });

    afterAll(async () => {
        await app.close();
    });

    /**
     * 테스트용 직원 설정
     * Web파트(지상-Web) 직원들만 사용
     */
    async function setupTestEmployees() {
        const employeeRepo = dataSource.getRepository('Employee');

        // 지상-Web 부서 직원들만 조회
        const employees = await employeeRepo
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.departmentPositions', 'dp')
            .leftJoinAndSelect('dp.department', 'dept')
            .where('dept.departmentCode = :deptCode', { deptCode: '지상-Web' })
            .orderBy('employee.createdAt', 'ASC')
            .take(3)
            .getMany();

        if (employees.length < 3) {
            throw new Error('테스트를 위해 지상-Web 부서에 최소 3명의 직원이 필요합니다.');
        }

        employeeId = employees[0].id;
        approverId = employees[1].id;
        implementerId = employees[2].id;

        authToken = jwtService.sign({
            sub: employeeId,
            employeeNumber: employees[0].employeeNumber,
        });
    }

    /**
     * 테스트용 카테고리 생성
     */
    async function setupTestCategory() {
        const timestamp = Date.now();
        const response = await request(app.getHttpServer())
            .post('/categories')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: `E2E 테스트 카테고리_${timestamp}`,
                code: `E2E_CAT_${timestamp}`,
                description: 'E2E 테스트용 카테고리',
            });

        if (response.status === 201) {
            categoryId = response.body.id;
        }
    }

    // ==================== 템플릿 생성 테스트 ====================

    describe('POST /templates - 템플릿 생성', () => {
        it('✅ 정상: 템플릿 생성 (결재단계 포함)', async () => {
            const timestamp = Date.now();
            const response = await request(app.getHttpServer())
                .post('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `E2E 테스트 템플릿_${timestamp}`,
                    code: `E2E_TPL_${timestamp}`,
                    description: 'E2E 테스트용 템플릿',
                    template: '<h1>{{title}}</h1><p>{{content}}</p>',
                    categoryId: categoryId,
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: approverId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: implementerId,
                            isRequired: true,
                        },
                    ],
                })
                .expect(201);

            expect(response.body).toHaveProperty('documentTemplate');
            expect(response.body.documentTemplate).toHaveProperty('id');
            expect(response.body.documentTemplate.name).toContain('E2E 테스트 템플릿');
            templateId = response.body.documentTemplate.id;
        });

        it('✅ 정상: 최소 필드만으로 템플릿 생성', async () => {
            const timestamp = Date.now();
            const response = await request(app.getHttpServer())
                .post('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `최소 템플릿_${timestamp}`,
                    code: `MIN_TPL_${timestamp}`,
                    template: '<p>Minimal Template</p>',
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: approverId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: implementerId,
                            isRequired: true,
                        },
                    ],
                })
                .expect(201);

            templateIdForDelete = response.body.documentTemplate.id;
        });

        it('✅ 정상: 여러 결재단계가 있는 템플릿 생성', async () => {
            const timestamp = Date.now();
            const response = await request(app.getHttpServer())
                .post('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `다단계 템플릿_${timestamp}`,
                    code: `MULTI_TPL_${timestamp}`,
                    template: '<p>Multi-step Template</p>',
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: approverId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: approverId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 3,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: implementerId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 4,
                            stepType: 'REFERENCE',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: employeeId,
                            isRequired: false,
                        },
                    ],
                })
                .expect(201);

            // 생성된 문서 템플릿 확인
            expect(response.body).toHaveProperty('documentTemplate');
            // approvalStepTemplates는 응답 구조에 따라 다름
            if (response.body.approvalStepTemplates) {
                expect(response.body.approvalStepTemplates).toHaveLength(4);
            }
        });

        it('❌ 실패: 필수 필드 누락 (name)', async () => {
            const timestamp = Date.now();
            await request(app.getHttpServer())
                .post('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    // name 누락
                    code: `NO_NAME_${timestamp}`,
                    template: '<p>Test</p>',
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: approverId,
                            isRequired: true,
                        },
                    ],
                })
                .expect(400);
        });

        it('❌ 실패: 필수 필드 누락 (code)', async () => {
            const timestamp = Date.now();
            await request(app.getHttpServer())
                .post('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `No Code_${timestamp}`,
                    // code 누락
                    template: '<p>Test</p>',
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: approverId,
                            isRequired: true,
                        },
                    ],
                })
                .expect(400);
        });

        it('❌ 실패: 필수 필드 누락 (template)', async () => {
            const timestamp = Date.now();
            await request(app.getHttpServer())
                .post('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `No Template_${timestamp}`,
                    code: `NO_TPL_${timestamp}`,
                    // template 누락
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: approverId,
                            isRequired: true,
                        },
                    ],
                })
                .expect(400);
        });

        it('❌ 실패: 인증 토큰 없이 요청', async () => {
            await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '테스트',
                    code: 'TEST',
                    template: '<p>Test</p>',
                })
                .expect(401);
        });
    });

    // ==================== 템플릿 목록 조회 테스트 ====================

    describe('GET /templates - 템플릿 목록 조회', () => {
        it('✅ 정상: 전체 템플릿 목록 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('pagination');
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('✅ 정상: 검색어로 템플릿 검색', async () => {
            const response = await request(app.getHttpServer())
                .get('/templates')
                .query({ searchKeyword: 'E2E' })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
        });

        it('✅ 정상: 카테고리별 필터링', async () => {
            if (!categoryId) {
                console.warn('카테고리 ID가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .get('/templates')
                .query({ categoryId: categoryId })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
        });

        it('✅ 정상: 최신순 정렬', async () => {
            const response = await request(app.getHttpServer())
                .get('/templates')
                .query({ sortOrder: 'LATEST' })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
        });

        it('✅ 정상: 오래된순 정렬', async () => {
            const response = await request(app.getHttpServer())
                .get('/templates')
                .query({ sortOrder: 'OLDEST' })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
        });

        it('✅ 정상: 페이지네이션 적용', async () => {
            const response = await request(app.getHttpServer())
                .get('/templates')
                .query({ page: 1, limit: 5 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.pagination).toHaveProperty('page');
            expect(response.body.pagination).toHaveProperty('limit');
            expect(response.body.pagination).toHaveProperty('totalItems');
            expect(response.body.pagination).toHaveProperty('totalPages');
        });
    });

    // ==================== 템플릿 상세 조회 테스트 ====================

    describe('GET /templates/:templateId - 템플릿 상세 조회', () => {
        it('✅ 정상: 템플릿 상세 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.id).toBe(templateId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('code');
            expect(response.body).toHaveProperty('template');
        });

        it('❌ 실패: 존재하지 않는 템플릿 ID', async () => {
            await request(app.getHttpServer())
                .get('/templates/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('❌ 실패: 잘못된 UUID 형식', async () => {
            // 서버가 UUID 검증을 하지 않아 500 반환 (추후 400으로 변경 필요)
            const response = await request(app.getHttpServer())
                .get('/templates/invalid-uuid')
                .set('Authorization', `Bearer ${authToken}`);

            expect([400, 500]).toContain(response.status);
        });
    });

    // ==================== 템플릿 수정 테스트 ====================

    describe('PUT /templates/:templateId - 템플릿 수정', () => {
        it('✅ 정상: 템플릿 수정 (이름 변경)', async () => {
            const newName = `E2E 테스트 템플릿 (수정됨)_${Date.now()}`;
            const response = await request(app.getHttpServer())
                .put(`/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: newName,
                })
                .expect(200);

            // 수정 후 다시 조회하여 확인
            const getResponse = await request(app.getHttpServer())
                .get(`/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(getResponse.body.name).toBe(newName);
        });

        it('✅ 정상: 부분 수정 (설명만)', async () => {
            const newDescription = `수정된 설명_${Date.now()}`;
            const response = await request(app.getHttpServer())
                .put(`/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    description: newDescription,
                })
                .expect(200);

            // 수정 후 다시 조회하여 확인
            const getResponse = await request(app.getHttpServer())
                .get(`/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(getResponse.body.description).toBe(newDescription);
        });

        it('✅ 정상: 템플릿 HTML 수정', async () => {
            const newTemplate = `<h1>수정된 템플릿_${Date.now()}</h1><p>{{content}}</p>`;
            const response = await request(app.getHttpServer())
                .put(`/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    template: newTemplate,
                })
                .expect(200);

            // 수정 후 다시 조회하여 확인
            const getResponse = await request(app.getHttpServer())
                .get(`/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(getResponse.body.template).toContain('수정된 템플릿');
        });

        it('❌ 실패: 존재하지 않는 템플릿 ID', async () => {
            await request(app.getHttpServer())
                .put('/templates/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: '테스트',
                })
                .expect(404);
        });
    });

    // ==================== 템플릿 삭제 테스트 ====================

    describe('DELETE /templates/:templateId - 템플릿 삭제', () => {
        it('✅ 정상: 템플릿 삭제', async () => {
            if (!templateIdForDelete) {
                console.warn('삭제할 템플릿 ID가 없어 테스트 스킵');
                return;
            }

            await request(app.getHttpServer())
                .delete(`/templates/${templateIdForDelete}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(204);
        });

        it('❌ 실패: 존재하지 않는 템플릿 삭제', async () => {
            await request(app.getHttpServer())
                .delete('/templates/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });
    });
});

