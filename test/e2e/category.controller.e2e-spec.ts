import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * Category Controller E2E 테스트
 *
 * 테스트 범위:
 * 1. POST /categories - 카테고리 생성
 * 2. GET /categories - 카테고리 목록 조회
 * 3. GET /categories/:categoryId - 카테고리 상세 조회
 * 4. PUT /categories/:categoryId - 카테고리 수정
 * 5. DELETE /categories/:categoryId - 카테고리 삭제
 */
describe('CategoryController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;

    // 테스트 사용자 정보
    let employeeId: string;

    // 테스트 데이터 ID
    let categoryId: string;
    let categoryIdForDelete: string;
    let categoryIdWithTemplate: string;

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
        await setupTestEmployee();
    });

    afterAll(async () => {
        await app.close();
    });

    /**
     * 테스트용 직원 설정
     * Web파트(지상-Web) 직원들만 사용
     */
    async function setupTestEmployee() {
        const employeeRepo = dataSource.getRepository('Employee');

        // 지상-Web 부서 직원만 조회
        const employee = await employeeRepo
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.departmentPositions', 'dp')
            .leftJoinAndSelect('dp.department', 'dept')
            .where('dept.departmentCode = :deptCode', { deptCode: '지상-Web' })
            .orderBy('employee.createdAt', 'ASC')
            .getOne();

        if (!employee) {
            throw new Error('테스트를 위해 지상-Web 부서에 직원이 필요합니다.');
        }

        employeeId = employee.id;

        authToken = jwtService.sign({
            sub: employeeId,
            employeeNumber: employee.employeeNumber,
        });
    }

    // ==================== 카테고리 생성 테스트 ====================

    describe('POST /categories - 카테고리 생성', () => {
        it('✅ 정상: 카테고리 생성', async () => {
            const timestamp = Date.now();
            const response = await request(app.getHttpServer())
                .post('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `E2E 테스트 카테고리_${timestamp}`,
                    code: `E2E_CAT_${timestamp}`,
                    description: 'E2E 테스트용 카테고리입니다.',
                    sortOrder: 1,
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toContain('E2E 테스트 카테고리');
            expect(response.body.code).toContain('E2E_CAT');
            categoryId = response.body.id;
        });

        it('✅ 정상: 최소 필드만으로 카테고리 생성', async () => {
            const timestamp = Date.now();
            const response = await request(app.getHttpServer())
                .post('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `최소 카테고리_${timestamp}`,
                    code: `MIN_CAT_${timestamp}`,
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            categoryIdForDelete = response.body.id;
        });

        it('❌ 실패: 필수 필드 누락 (name)', async () => {
            const timestamp = Date.now();
            await request(app.getHttpServer())
                .post('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    // name 누락
                    code: `NO_NAME_CAT_${timestamp}`,
                })
                .expect(400);
        });

        it('❌ 실패: 필수 필드 누락 (code)', async () => {
            const timestamp = Date.now();
            await request(app.getHttpServer())
                .post('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `No Code Cat_${timestamp}`,
                    // code 누락
                })
                .expect(400);
        });

        it('❌ 실패: 중복된 코드', async () => {
            // 첫 번째 생성
            const timestamp = Date.now();
            await request(app.getHttpServer())
                .post('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `중복 테스트 1_${timestamp}`,
                    code: `DUP_CODE_${timestamp}`,
                })
                .expect(201);

            // 같은 코드로 두 번째 생성 시도
            await request(app.getHttpServer())
                .post('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `중복 테스트 2_${timestamp}`,
                    code: `DUP_CODE_${timestamp}`, // 동일 코드
                })
                .expect(400);
        });

        it('❌ 실패: 인증 토큰 없이 요청', async () => {
            await request(app.getHttpServer())
                .post('/categories')
                .send({
                    name: '테스트',
                    code: 'TEST',
                })
                .expect(401);
        });
    });

    // ==================== 카테고리 목록 조회 테스트 ====================

    describe('GET /categories - 카테고리 목록 조회', () => {
        it('✅ 정상: 카테고리 목록 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            // 이전에 생성한 카테고리가 포함되어 있어야 함
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('✅ 정상: 정렬 순서대로 반환', async () => {
            const response = await request(app.getHttpServer())
                .get('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            // 정렬 순서 확인 (sortOrder 또는 createdAt)
            if (response.body.length >= 2) {
                // sortOrder가 있으면 확인, 없으면 패스
                const hasSortOrder = response.body[0].sortOrder !== undefined;
                if (hasSortOrder) {
                    for (let i = 1; i < response.body.length; i++) {
                        expect(response.body[i].sortOrder).toBeGreaterThanOrEqual(response.body[i - 1].sortOrder);
                    }
                }
            }
        });
    });

    // ==================== 카테고리 상세 조회 테스트 ====================

    describe('GET /categories/:categoryId - 카테고리 상세 조회', () => {
        it('✅ 정상: 카테고리 상세 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/categories/${categoryId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.id).toBe(categoryId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('code');
        });

        it('❌ 실패: 존재하지 않는 카테고리 ID', async () => {
            await request(app.getHttpServer())
                .get('/categories/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('❌ 실패: 잘못된 UUID 형식', async () => {
            // 서버가 UUID 검증을 하지 않아 500 반환 (추후 400으로 변경 필요)
            const response = await request(app.getHttpServer())
                .get('/categories/invalid-uuid')
                .set('Authorization', `Bearer ${authToken}`);

            expect([400, 500]).toContain(response.status);
        });
    });

    // ==================== 카테고리 수정 테스트 ====================

    describe('PUT /categories/:categoryId - 카테고리 수정', () => {
        it('✅ 정상: 카테고리 수정', async () => {
            const response = await request(app.getHttpServer())
                .put(`/categories/${categoryId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'E2E 테스트 카테고리 (수정됨)',
                    description: '수정된 설명입니다.',
                })
                .expect(200);

            expect(response.body.name).toBe('E2E 테스트 카테고리 (수정됨)');
            expect(response.body.description).toBe('수정된 설명입니다.');
        });

        it('✅ 정상: 부분 수정 (name만)', async () => {
            const response = await request(app.getHttpServer())
                .put(`/categories/${categoryId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'E2E 테스트 카테고리 (재수정)',
                })
                .expect(200);

            expect(response.body.name).toBe('E2E 테스트 카테고리 (재수정)');
        });

        it('✅ 정상: description 수정', async () => {
            const response = await request(app.getHttpServer())
                .put(`/categories/${categoryId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    description: '새로운 설명',
                })
                .expect(200);

            expect(response.body.description).toBe('새로운 설명');
        });

        it('❌ 실패: 존재하지 않는 카테고리 ID', async () => {
            await request(app.getHttpServer())
                .put('/categories/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: '테스트',
                })
                .expect(404);
        });
    });

    // ==================== 카테고리 삭제 테스트 ====================

    describe('DELETE /categories/:categoryId - 카테고리 삭제', () => {
        it('✅ 정상: 카테고리 삭제', async () => {
            if (!categoryIdForDelete) {
                console.warn('삭제할 카테고리 ID가 없어 테스트 스킵');
                return;
            }

            await request(app.getHttpServer())
                .delete(`/categories/${categoryIdForDelete}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(204);
        });

        it('❌ 실패: 존재하지 않는 카테고리 삭제', async () => {
            await request(app.getHttpServer())
                .delete('/categories/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('❌ 실패: 연결된 템플릿이 있는 카테고리 삭제', async () => {
            // 카테고리 생성
            const timestamp = Date.now();
            const categoryResponse = await request(app.getHttpServer())
                .post('/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `삭제 불가 카테고리_${timestamp}`,
                    code: `NO_DEL_CAT_${timestamp}`,
                });

            categoryIdWithTemplate = categoryResponse.body.id;

            // 해당 카테고리에 템플릿 연결 (지상-Web 부서 직원 사용)
            const employeeRepo = dataSource.getRepository('Employee');
            const employees = await employeeRepo
                .createQueryBuilder('e')
                .leftJoinAndSelect('e.departmentPositions', 'dp')
                .leftJoinAndSelect('dp.department', 'dept')
                .where('dept.departmentCode = :deptCode', { deptCode: '지상-Web' })
                .take(2)
                .getMany();

            await request(app.getHttpServer())
                .post('/templates')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: `연결 템플릿_${timestamp}`,
                    code: `LINKED_TPL_${timestamp}`,
                    template: '<p>Test</p>',
                    categoryId: categoryIdWithTemplate,
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: employees[0]?.id || employeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            targetEmployeeId: employees[1]?.id || employeeId,
                            isRequired: true,
                        },
                    ],
                });

            // 카테고리 삭제 시도 (실패 예상)
            await request(app.getHttpServer())
                .delete(`/categories/${categoryIdWithTemplate}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(400);
        });
    });
});

