import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * MetadataQueryController E2E 테스트
 *
 * 테스트 범위:
 * 1. 부서 목록 조회
 * 2. 부서별 직원 조회
 * 3. 직급 목록 조회
 * 4. 직원 검색
 * 5. 직원 상세 조회
 */
describe('MetadataQueryController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;
    let employeeId: string;
    let departmentId: string;
    let positionId: string;

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

        // 테스트용 부서 및 직급 ID 미리 조회
        const departmentsResponse = await request(app.getHttpServer())
            .get('/metadata/departments')
            .set('Authorization', `Bearer ${authToken}`);

        if (departmentsResponse.body.length > 0) {
            departmentId = departmentsResponse.body[0].id;
        }

        const positionsResponse = await request(app.getHttpServer())
            .get('/metadata/positions')
            .set('Authorization', `Bearer ${authToken}`);

        if (positionsResponse.body.length > 0) {
            positionId = positionsResponse.body[0].id;
        }
    });

    afterAll(async () => {
        await app.close();
    });

    describe('GET /metadata/departments - 부서 목록 조회', () => {
        it('정상: 모든 부서 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/departments')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            if (response.body.length > 0) {
                const department = response.body[0];
                expect(department).toHaveProperty('id');
                expect(department).toHaveProperty('departmentName');
                expect(department).toHaveProperty('departmentCode');
            }
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/metadata/departments').expect(401);
        });

        it('실패: 잘못된 토큰', async () => {
            await request(app.getHttpServer())
                .get('/metadata/departments')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);
        });
    });

    describe('GET /metadata/departments/:departmentId/employees - 부서별 직원 조회', () => {
        it('정상: 특정 부서의 직원 목록 조회', async () => {
            if (!departmentId) {
                console.log('테스트용 부서가 없어 테스트를 건너뜁니다.');
                return;
            }

            const response = await request(app.getHttpServer())
                .get(`/metadata/departments/${departmentId}/employees`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            if (response.body.length > 0) {
                const employee = response.body[0];
                expect(employee).toHaveProperty('id');
                expect(employee).toHaveProperty('name');
                expect(employee).toHaveProperty('employeeNumber');
            }
        });

        it('실패: 존재하지 않는 부서 ID', async () => {
            await request(app.getHttpServer())
                .get('/metadata/departments/00000000-0000-0000-0000-000000000000/employees')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('실패: 잘못된 UUID 형식', async () => {
            await request(app.getHttpServer())
                .get('/metadata/departments/invalid-uuid/employees')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            if (!departmentId) return;

            await request(app.getHttpServer()).get(`/metadata/departments/${departmentId}/employees`).expect(401);
        });
    });

    describe('GET /metadata/positions - 직급 목록 조회', () => {
        it('정상: 모든 직급 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/positions')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            if (response.body.length > 0) {
                const position = response.body[0];
                expect(position).toHaveProperty('id');
                expect(position).toHaveProperty('positionTitle');
                expect(position).toHaveProperty('positionCode');
                expect(position).toHaveProperty('level'); // 실제 필드명은 'level'
            }
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/metadata/positions').expect(401);
        });

        it('실패: 잘못된 토큰', async () => {
            await request(app.getHttpServer())
                .get('/metadata/positions')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);
        });
    });

    describe('GET /metadata/employees - 직원 검색', () => {
        it('정상: 모든 직원 조회 (필터 없음)', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            const employee = response.body[0];
            expect(employee).toHaveProperty('id');
            expect(employee).toHaveProperty('name');
            expect(employee).toHaveProperty('employeeNumber');
        });

        it('정상: 이름으로 검색', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees?search=홍길동')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            if (response.body.length > 0) {
                const employee = response.body[0];
                expect(employee.name).toContain('홍길동');
            }
        });

        it('정상: 직원번호로 검색', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees?search=TEST001')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            if (response.body.length > 0) {
                const employee = response.body[0];
                expect(employee.employeeNumber).toContain('TEST001');
            }
        });

        it('정상: 부서별 필터링', async () => {
            if (!departmentId) {
                console.log('테스트용 부서가 없어 테스트를 건너뜁니다.');
                return;
            }

            const response = await request(app.getHttpServer())
                .get(`/metadata/employees?departmentId=${departmentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('정상: 검색어 + 부서 조합 필터', async () => {
            if (!departmentId) return;

            const response = await request(app.getHttpServer())
                .get(`/metadata/employees?search=홍&departmentId=${departmentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('정상: 검색 결과 없음 (빈 배열 반환)', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees?search=존재하지않는이름12345')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });

        it('정상: 빈 검색어 (전체 조회와 동일)', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees?search=')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('실패: 잘못된 departmentId UUID 형식', async () => {
            await request(app.getHttpServer())
                .get('/metadata/employees?departmentId=invalid-uuid')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/metadata/employees').expect(401);
        });
    });

    describe('GET /metadata/employees/:employeeId - 직원 상세 조회', () => {
        it('정상: 특정 직원 상세 정보 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/metadata/employees/${employeeId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', employeeId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('employeeNumber');
            expect(response.body).toHaveProperty('email');
        });

        it('정상: 다른 직원 정보 조회', async () => {
            // 먼저 다른 직원을 조회
            const employeesResponse = await request(app.getHttpServer())
                .get('/metadata/employees')
                .set('Authorization', `Bearer ${authToken}`);

            if (employeesResponse.body.length > 1) {
                const otherEmployee = employeesResponse.body.find((emp: any) => emp.id !== employeeId);

                if (otherEmployee) {
                    const response = await request(app.getHttpServer())
                        .get(`/metadata/employees/${otherEmployee.id}`)
                        .set('Authorization', `Bearer ${authToken}`)
                        .expect(200);

                    expect(response.body.id).toBe(otherEmployee.id);
                }
            }
        });

        it('실패: 존재하지 않는 직원 ID', async () => {
            await request(app.getHttpServer())
                .get('/metadata/employees/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('실패: 잘못된 UUID 형식', async () => {
            await request(app.getHttpServer())
                .get('/metadata/employees/invalid-uuid')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get(`/metadata/employees/${employeeId}`).expect(401);
        });

        it('실패: 잘못된 토큰', async () => {
            await request(app.getHttpServer())
                .get(`/metadata/employees/${employeeId}`)
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);
        });
    });

    describe('메타데이터 조회 성능 테스트', () => {
        it('정상: 여러 메타데이터를 순차적으로 조회해도 정상 동작', async () => {
            // 부서 조회
            const departmentsResponse = await request(app.getHttpServer())
                .get('/metadata/departments')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(departmentsResponse.body)).toBe(true);

            // 직급 조회
            const positionsResponse = await request(app.getHttpServer())
                .get('/metadata/positions')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(positionsResponse.body)).toBe(true);

            // 직원 조회
            const employeesResponse = await request(app.getHttpServer())
                .get('/metadata/employees')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(employeesResponse.body)).toBe(true);

            // 특정 직원 조회
            const employeeResponse = await request(app.getHttpServer())
                .get(`/metadata/employees/${employeeId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(employeeResponse.body.id).toBe(employeeId);
        });
    });

    describe('메타데이터 조회 - 특수 케이스', () => {
        it('정상: 한글 검색어 처리', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees?search=김')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('정상: 공백이 포함된 검색어', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees?search=홍 길동')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('정상: 특수문자가 포함된 검색어', async () => {
            const response = await request(app.getHttpServer())
                .get('/metadata/employees?search=test@')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('정상: 매우 긴 검색어', async () => {
            const longSearchTerm = 'a'.repeat(100);
            const response = await request(app.getHttpServer())
                .get(`/metadata/employees?search=${longSearchTerm}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});
