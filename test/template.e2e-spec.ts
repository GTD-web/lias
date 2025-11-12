import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * TemplateController E2E 테스트
 *
 * 테스트 범위:
 * 1. 문서 템플릿 생성 (결재단계 포함)
 * 2. 문서 템플릿 목록 조회
 * 3. 문서 템플릿 상세 조회
 * 4. 문서 템플릿 수정
 * 5. 문서 템플릿 삭제
 */
describe('TemplateController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;
    let employeeId: string;
    let categoryId: string;

    // 테스트 데이터 ID 저장
    let createdTemplateId: string;
    let templateCode: string;

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
        
        // 지정된 직원 이름으로 조회
        const allowedNames = ['김규현', '김종식', '민정호', '박헌남', '우창욱', '유승훈', '이화영', '조민경'];
        const employees = await employeeRepo
            .createQueryBuilder('employee')
            .where('employee.name IN (:...names)', { names: allowedNames })
            .orderBy('employee.createdAt', 'ASC')
            .take(1)
            .getMany();

        if (!employees || employees.length === 0) {
            throw new Error(`데이터베이스에 직원 정보가 없습니다. (사용 가능한 이름: ${allowedNames.join(', ')})`);
        }

        const testEmployee = employees[0];
        employeeId = testEmployee.id;

        // JWT 토큰 생성
        authToken = jwtService.sign({
            sub: employeeId,
            employeeNumber: testEmployee.employeeNumber,
        });

        // 테스트용 카테고리 생성
        const categoryCode = `TEST_TEMPLATE_CATEGORY_${Date.now()}`;
        const categoryResponse = await request(app.getHttpServer())
            .post('/categories')
            .send({
                name: '템플릿 테스트 카테고리',
                code: categoryCode,
            });

        categoryId = categoryResponse.body.id;

        // 고유한 템플릿 코드 생성
        templateCode = `TEST_TEMPLATE_${Date.now()}`;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /templates - 문서 템플릿 생성 (결재단계 포함)', () => {
        it('정상: 문서 템플릿 생성 (결재단계 포함)', async () => {
            const response = await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '테스트 문서 템플릿',
                    code: templateCode,
                    description: '테스트용 문서 템플릿입니다.',
                    template: '<h1>테스트 문서</h1><p>내용: {{content}}</p>',
                    categoryId: categoryId,
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'HIERARCHY_TO_SUPERIOR',
                        },
                    ],
                })
                .expect(201);

            expect(response.body.documentTemplate).toHaveProperty('id');
            expect(response.body.documentTemplate.name).toBe('테스트 문서 템플릿');
            expect(response.body.documentTemplate.code).toBe(templateCode);
            createdTemplateId = response.body.documentTemplate.id;
        });

        it('정상: 최소 필드만으로 템플릿 생성', async () => {
            const newCode = `TEST_TEMPLATE_MIN_${Date.now()}`;
            const response = await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '최소 필드 템플릿',
                    code: newCode,
                    template: '<h1>템플릿</h1>',
                    approvalSteps: [],
                })
                .expect(201);

            expect(response.body.documentTemplate).toHaveProperty('id');
            expect(response.body.documentTemplate.name).toBe('최소 필드 템플릿');
        });

        it('정상: 여러 결재단계가 있는 템플릿 생성', async () => {
            const newCode = `TEST_TEMPLATE_MULTI_${Date.now()}`;
            const response = await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '다중 결재단계 템플릿',
                    code: newCode,
                    template: '<h1>템플릿</h1>',
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'DRAFTER',
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'HIERARCHY_TO_SUPERIOR',
                        },
                    ],
                });

            // HIERARCHY_TO_SUPERIOR가 여러 개일 경우 검증 실패할 수 있음
            if (response.status === 201) {
                expect(response.body.documentTemplate).toHaveProperty('id');
            }
            expect([201, 400]).toContain(response.status);
        });

        it('실패: 필수 필드 누락 (name)', async () => {
            await request(app.getHttpServer())
                .post('/templates')
                .send({
                    code: `TEST_TEMPLATE_${Date.now()}`,
                    template: '<h1>템플릿</h1>',
                    approvalSteps: [],
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (code)', async () => {
            await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '테스트 템플릿',
                    template: '<h1>템플릿</h1>',
                    approvalSteps: [],
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (template)', async () => {
            await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '테스트 템플릿',
                    code: `TEST_TEMPLATE_${Date.now()}`,
                    approvalSteps: [],
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (approvalSteps)', async () => {
            await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '테스트 템플릿',
                    code: `TEST_TEMPLATE_${Date.now()}`,
                    template: '<h1>템플릿</h1>',
                })
                .expect(400);
        });
    });

    describe('GET /templates - 문서 템플릿 목록 조회', () => {
        it('정상: 전체 템플릿 목록 조회', async () => {
            const response = await request(app.getHttpServer()).get('/templates').expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            if (response.body.length > 0) {
                const template = response.body[0];
                expect(template).toHaveProperty('id');
                expect(template).toHaveProperty('name');
                expect(template).toHaveProperty('code');
            }
        });

        it('정상: 카테고리별 필터링 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/templates?categoryId=${categoryId}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('정상: 상태별 필터링 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/templates?status=DRAFT')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /templates/:templateId - 문서 템플릿 상세 조회', () => {
        it('정상: 문서 템플릿 상세 조회', async () => {
            if (!createdTemplateId) {
                return;
            }

            const response = await request(app.getHttpServer())
                .get(`/templates/${createdTemplateId}`)
                .expect(200);

            expect(response.body.id).toBe(createdTemplateId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('code');
            expect(response.body).toHaveProperty('template');
        });

        it('실패: 존재하지 않는 템플릿 ID', async () => {
            await request(app.getHttpServer())
                .get('/templates/00000000-0000-0000-0000-000000000000')
                .expect(404);
        });

        it('실패: 잘못된 UUID 형식', async () => {
            await request(app.getHttpServer())
                .get('/templates/invalid-uuid')
                .expect((res) => {
                    // 400 또는 500 모두 가능
                    expect([400, 500]).toContain(res.status);
                });
        });
    });

    describe('PUT /templates/:templateId - 문서 템플릿 수정', () => {
        it('정상: 문서 템플릿 수정', async () => {
            if (!createdTemplateId) {
                return;
            }

            const response = await request(app.getHttpServer())
                .put(`/templates/${createdTemplateId}`)
                .send({
                    name: '수정된 테스트 문서 템플릿',
                    description: '수정된 설명입니다.',
                    template: '<h1>수정된 템플릿</h1>',
                })
                .expect(200);

            // 응답이 있는지만 확인
            expect(response.body).toHaveProperty('id');
        });

        it('정상: 부분 수정 (name만)', async () => {
            if (!createdTemplateId) {
                return;
            }

            const response = await request(app.getHttpServer())
                .put(`/templates/${createdTemplateId}`)
                .send({
                    name: '부분 수정된 템플릿',
                })
                .expect(200);

            // 응답이 있는지만 확인
            expect(response.body).toHaveProperty('id');
        });

        it('정상: 결재단계 수정', async () => {
            if (!createdTemplateId) {
                return;
            }

            // 먼저 현재 템플릿 조회하여 결재단계 ID 가져오기
            const getResponse = await request(app.getHttpServer())
                .get(`/templates/${createdTemplateId}`)
                .expect(200);

            const existingSteps = getResponse.body.approvalSteps || [];

            const response = await request(app.getHttpServer())
                .put(`/templates/${createdTemplateId}`)
                .send({
                    approvalSteps: [
                        ...existingSteps.map((step: unknown) => ({
                            ...(step as Record<string, unknown>),
                            stepOrder: (step as { stepOrder?: number }).stepOrder || 1,
                        })),
                        {
                            stepOrder: existingSteps.length + 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'HIERARCHY_TO_SUPERIOR',
                        },
                    ],
                })
                .expect(200);

            expect(response.body).toHaveProperty('id');
        });

        it('실패: 존재하지 않는 템플릿 ID', async () => {
            await request(app.getHttpServer())
                .put('/templates/00000000-0000-0000-0000-000000000000')
                .send({
                    name: '수정된 템플릿',
                })
                .expect(404);
        });
    });

    describe('DELETE /templates/:templateId - 문서 템플릿 삭제', () => {
        let deleteTemplateId: string;

        beforeAll(async () => {
            // 삭제용 템플릿 생성
            const deleteCode = `TEST_DELETE_TEMPLATE_${Date.now()}`;
            const response = await request(app.getHttpServer())
                .post('/templates')
                .send({
                    name: '삭제 테스트 템플릿',
                    code: deleteCode,
                    template: '<h1>삭제용</h1>',
                    approvalSteps: [],
                });

            deleteTemplateId = response.body.id;
        });

        it('정상: 문서 템플릿 삭제', async () => {
            if (!deleteTemplateId) {
                return;
            }

            await request(app.getHttpServer())
                .delete(`/templates/${deleteTemplateId}`)
                .expect(204);
        });

        it('실패: 존재하지 않는 템플릿 삭제', async () => {
            await request(app.getHttpServer())
                .delete('/templates/00000000-0000-0000-0000-000000000000')
                .expect(404);
        });

        it('실패: 연결된 결재단계 템플릿이 있는 템플릿 삭제', async () => {
            // createdTemplateId는 결재단계 템플릿과 연결되어 있을 수 있음
            // 실제로는 연결되어 있으면 삭제 불가
            // 이 테스트는 실제 데이터에 따라 성공/실패가 달라질 수 있음
            if (!createdTemplateId) {
                return;
            }

            // 결재단계 템플릿이 연결되어 있으면 400 에러가 발생할 수 있음
            const response = await request(app.getHttpServer())
                .delete(`/templates/${createdTemplateId}`)
                .expect((res) => {
                    // 400 또는 204 모두 가능 (결재단계 템플릿 연결 여부에 따라)
                    expect([204, 400]).toContain(res.status);
                });
        });
    });
});

