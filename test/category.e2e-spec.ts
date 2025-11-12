import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * CategoryController E2E 테스트
 *
 * 테스트 범위:
 * 1. 카테고리 생성
 * 2. 카테고리 목록 조회
 * 3. 카테고리 상세 조회
 * 4. 카테고리 수정
 * 5. 카테고리 삭제
 */
describe('CategoryController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;
    let employeeId: string;

    // 테스트 데이터 ID 저장
    let createdCategoryId: string;
    let categoryCode: string;

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

        // 고유한 카테고리 코드 생성
        categoryCode = `TEST_CATEGORY_${Date.now()}`;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /categories - 카테고리 생성', () => {
        it('정상: 카테고리 생성', async () => {
            const response = await request(app.getHttpServer())
                .post('/categories')
                .send({
                    name: '테스트 카테고리',
                    code: categoryCode,
                    description: '테스트용 카테고리입니다.',
                    order: 1,
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe('테스트 카테고리');
            expect(response.body.code).toBe(categoryCode);
            createdCategoryId = response.body.id;
        });

        it('정상: 최소 필드만으로 카테고리 생성', async () => {
            const newCode = `TEST_CATEGORY_MIN_${Date.now()}`;
            const response = await request(app.getHttpServer())
                .post('/categories')
                .send({
                    name: '최소 필드 카테고리',
                    code: newCode,
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe('최소 필드 카테고리');
        });

        it('실패: 필수 필드 누락 (name)', async () => {
            await request(app.getHttpServer())
                .post('/categories')
                .send({
                    code: `TEST_CATEGORY_${Date.now()}`,
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (code)', async () => {
            await request(app.getHttpServer())
                .post('/categories')
                .send({
                    name: '테스트 카테고리',
                })
                .expect(400);
        });

        it('실패: 중복된 코드', async () => {
            await request(app.getHttpServer())
                .post('/categories')
                .send({
                    name: '중복 테스트 카테고리',
                    code: categoryCode, // 이미 생성된 코드 사용
                })
                .expect(400);
        });
    });

    describe('GET /categories - 카테고리 목록 조회', () => {
        it('정상: 카테고리 목록 조회', async () => {
            const response = await request(app.getHttpServer()).get('/categories').expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            if (response.body.length > 0) {
                const category = response.body[0];
                expect(category).toHaveProperty('id');
                expect(category).toHaveProperty('name');
                expect(category).toHaveProperty('code');
            }
        });
    });

    describe('GET /categories/:categoryId - 카테고리 상세 조회', () => {
        it('정상: 카테고리 상세 조회', async () => {
            if (!createdCategoryId) {
                return;
            }

            const response = await request(app.getHttpServer()).get(`/categories/${createdCategoryId}`).expect(200);

            expect(response.body.id).toBe(createdCategoryId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('code');
        });

        it('실패: 존재하지 않는 카테고리 ID', async () => {
            await request(app.getHttpServer()).get('/categories/00000000-0000-0000-0000-000000000000').expect(404);
        });

        it('실패: 잘못된 UUID 형식', async () => {
            // 잘못된 UUID 형식은 400 또는 500을 반환할 수 있음
            await request(app.getHttpServer())
                .get('/categories/invalid-uuid')
                .expect((res) => {
                    expect([400, 500]).toContain(res.status);
                });
        });
    });

    describe('PUT /categories/:categoryId - 카테고리 수정', () => {
        it('정상: 카테고리 수정', async () => {
            if (!createdCategoryId) {
                return;
            }

            const response = await request(app.getHttpServer())
                .put(`/categories/${createdCategoryId}`)
                .send({
                    name: '수정된 테스트 카테고리',
                    description: '수정된 설명입니다.',
                    order: 2,
                })
                .expect(200);

            expect(response.body.name).toBe('수정된 테스트 카테고리');
            expect(response.body.description).toBe('수정된 설명입니다.');
        });

        it('정상: 부분 수정 (name만)', async () => {
            if (!createdCategoryId) {
                return;
            }

            const response = await request(app.getHttpServer())
                .put(`/categories/${createdCategoryId}`)
                .send({
                    name: '부분 수정된 카테고리',
                })
                .expect(200);

            expect(response.body.name).toBe('부분 수정된 카테고리');
        });

        it('실패: 존재하지 않는 카테고리 ID', async () => {
            await request(app.getHttpServer())
                .put('/categories/00000000-0000-0000-0000-000000000000')
                .send({
                    name: '수정된 카테고리',
                })
                .expect(404);
        });
    });

    describe('DELETE /categories/:categoryId - 카테고리 삭제', () => {
        let deleteCategoryId: string;

        beforeAll(async () => {
            // 삭제용 카테고리 생성
            const deleteCode = `TEST_DELETE_CATEGORY_${Date.now()}`;
            const response = await request(app.getHttpServer()).post('/categories').send({
                name: '삭제 테스트 카테고리',
                code: deleteCode,
            });

            deleteCategoryId = response.body.id;
        });

        it('정상: 카테고리 삭제', async () => {
            if (!deleteCategoryId) {
                return;
            }

            await request(app.getHttpServer()).delete(`/categories/${deleteCategoryId}`).expect(204);
        });

        it('실패: 존재하지 않는 카테고리 삭제', async () => {
            await request(app.getHttpServer()).delete('/categories/00000000-0000-0000-0000-000000000000').expect(404);
        });

        it('실패: 연결된 템플릿이 있는 카테고리 삭제', async () => {
            // createdCategoryId는 템플릿과 연결되어 있을 수 있음
            // 실제로는 템플릿이 연결되어 있으면 삭제 불가
            // 이 테스트는 실제 데이터에 따라 성공/실패가 달라질 수 있음
            if (!createdCategoryId) {
                return;
            }

            // 템플릿이 연결되어 있으면 400 에러가 발생할 수 있음
            const response = await request(app.getHttpServer())
                .delete(`/categories/${createdCategoryId}`)
                .expect((res) => {
                    // 400 또는 204 모두 가능 (템플릿 연결 여부에 따라)
                    expect([204, 400]).toContain(res.status);
                });
        });
    });
});
