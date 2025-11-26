import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * 내 전체 문서 API 일관성 E2E 테스트
 *
 * 테스트 목적:
 * - /documents/my-all/statistics API에서 반환하는 각 필터 타입별 count와
 * - /documents/my-all/documents API에서 해당 필터 타입으로 조회한 실제 문서 개수가 일치하는지 확인
 *
 * 테스트 범위:
 * 1. DRAFT (임시저장)
 * 2. RECEIVED (수신함)
 * 3. PENDING (상신함)
 * 4. PENDING_AGREEMENT (합의함)
 * 5. PENDING_APPROVAL (결재함)
 * 6. IMPLEMENTATION (시행함)
 * 7. APPROVED (기결함)
 * 8. REJECTED (반려함)
 * 9. RECEIVED_REFERENCE (수신참조함)
 */
describe('내 전체 문서 API 일관성 테스트 (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;
    let employeeId: string;

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

        console.log(`\n테스트 사용자: ${testEmployee.name} (ID: ${employeeId})`);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('통계 API와 문서 목록 API 일관성 검증', () => {
        let statistics: Record<string, number>;

        it('1. 통계 API 호출 성공', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-all/statistics')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            statistics = response.body;

            console.log('\n📊 통계 API 응답:');
            console.log(JSON.stringify(statistics, null, 2));

            // 응답 구조 검증
            expect(statistics).toBeDefined();
            expect(typeof statistics).toBe('object');
        });

        it('2. DRAFT 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'DRAFT';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('3. RECEIVED 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'RECEIVED';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('4. PENDING 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'PENDING';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('5. PENDING_AGREEMENT 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'PENDING_AGREEMENT';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('6. PENDING_APPROVAL 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'PENDING_APPROVAL';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('7. IMPLEMENTATION 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'IMPLEMENTATION';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('8. APPROVED 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'APPROVED';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('9. REJECTED 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'REJECTED';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });

        it('10. RECEIVED_REFERENCE 필터 - 통계와 실제 문서 개수 일치', async () => {
            const filterType = 'RECEIVED_REFERENCE';
            const statCount = statistics[filterType] || 0;

            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data, meta } = response.body;

            console.log(`\n✅ ${filterType}: 통계=${statCount}, 실제=${meta.totalItems}`);

            expect(meta.totalItems).toBe(statCount);
            expect(data.length).toBeLessThanOrEqual(statCount);
        });
    });

    describe('PENDING_AGREEMENT 승인 상태별 일관성 검증', () => {
        it('11. PENDING_AGREEMENT 전체 = SCHEDULED + CURRENT + COMPLETED', async () => {
            const filterType = 'PENDING_AGREEMENT';

            // 전체 개수 조회
            const allResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const totalCount = allResponse.body.meta.totalItems;

            // SCHEDULED 개수 조회
            const scheduledResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, approvalStatus: 'SCHEDULED', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const scheduledCount = scheduledResponse.body.meta.totalItems;

            // CURRENT 개수 조회
            const currentResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, approvalStatus: 'CURRENT', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const currentCount = currentResponse.body.meta.totalItems;

            // COMPLETED 개수 조회
            const completedResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, approvalStatus: 'COMPLETED', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const completedCount = completedResponse.body.meta.totalItems;

            console.log(`\n📊 PENDING_AGREEMENT 승인 상태별 개수:`);
            console.log(`  전체: ${totalCount}`);
            console.log(`  SCHEDULED: ${scheduledCount}`);
            console.log(`  CURRENT: ${currentCount}`);
            console.log(`  COMPLETED: ${completedCount}`);
            console.log(`  합계: ${scheduledCount + currentCount + completedCount}`);

            expect(totalCount).toBe(scheduledCount + currentCount + completedCount);
        });
    });

    describe('PENDING_APPROVAL 승인 상태별 일관성 검증', () => {
        it('12. PENDING_APPROVAL 전체 = SCHEDULED + CURRENT + COMPLETED', async () => {
            const filterType = 'PENDING_APPROVAL';

            // 전체 개수 조회
            const allResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const totalCount = allResponse.body.meta.totalItems;

            // SCHEDULED 개수 조회
            const scheduledResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, approvalStatus: 'SCHEDULED', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const scheduledCount = scheduledResponse.body.meta.totalItems;

            // CURRENT 개수 조회
            const currentResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, approvalStatus: 'CURRENT', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const currentCount = currentResponse.body.meta.totalItems;

            // COMPLETED 개수 조회
            const completedResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, approvalStatus: 'COMPLETED', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const completedCount = completedResponse.body.meta.totalItems;

            console.log(`\n📊 PENDING_APPROVAL 승인 상태별 개수:`);
            console.log(`  전체: ${totalCount}`);
            console.log(`  SCHEDULED: ${scheduledCount}`);
            console.log(`  CURRENT: ${currentCount}`);
            console.log(`  COMPLETED: ${completedCount}`);
            console.log(`  합계: ${scheduledCount + currentCount + completedCount}`);

            expect(totalCount).toBe(scheduledCount + currentCount + completedCount);
        });
    });

    describe('RECEIVED_REFERENCE 열람 상태별 일관성 검증', () => {
        it('13. RECEIVED_REFERENCE 전체 = READ + UNREAD', async () => {
            const filterType = 'RECEIVED_REFERENCE';

            // 전체 개수 조회
            const allResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const totalCount = allResponse.body.meta.totalItems;

            // READ 개수 조회
            const readResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, referenceReadStatus: 'READ', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const readCount = readResponse.body.meta.totalItems;

            // UNREAD 개수 조회
            const unreadResponse = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, referenceReadStatus: 'UNREAD', limit: 100 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const unreadCount = unreadResponse.body.meta.totalItems;

            console.log(`\n📊 RECEIVED_REFERENCE 열람 상태별 개수:`);
            console.log(`  전체: ${totalCount}`);
            console.log(`  READ: ${readCount}`);
            console.log(`  UNREAD: ${unreadCount}`);
            console.log(`  합계: ${readCount + unreadCount}`);

            expect(totalCount).toBe(readCount + unreadCount);
        });
    });

    describe('페이지네이션 정확성 검증', () => {
        it('14. 페이지네이션이 올바르게 동작하는지 확인', async () => {
            const filterType = 'PENDING';

            // 전체 개수 조회 (limit=5)
            const page1Response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType, page: 1, limit: 5 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            const { data: page1Data, meta: page1Meta } = page1Response.body;

            console.log(`\n📄 페이지네이션 테스트 (PENDING 필터):`);
            console.log(`  전체 문서: ${page1Meta.totalItems}개`);
            console.log(`  전체 페이지: ${page1Meta.totalPages}개`);
            console.log(`  1페이지 문서: ${page1Data.length}개`);

            // 1페이지 데이터가 limit보다 작거나 같아야 함
            expect(page1Data.length).toBeLessThanOrEqual(5);

            // totalItems가 0이 아니면 추가 검증
            if (page1Meta.totalItems > 5) {
                // 2페이지 조회
                const page2Response = await request(app.getHttpServer())
                    .get('/documents/my-all/documents')
                    .query({ filterType, page: 2, limit: 5 })
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(200);

                const { data: page2Data, meta: page2Meta } = page2Response.body;

                console.log(`  2페이지 문서: ${page2Data.length}개`);

                // 1페이지와 2페이지의 문서 ID가 중복되지 않아야 함
                const page1Ids = page1Data.map((doc: { id: string }) => doc.id);
                const page2Ids = page2Data.map((doc: { id: string }) => doc.id);
                const duplicates = page1Ids.filter((id: string) => page2Ids.includes(id));

                console.log(`  중복 문서: ${duplicates.length}개`);

                expect(duplicates.length).toBe(0);

                // 총 개수는 동일해야 함
                expect(page1Meta.totalItems).toBe(page2Meta.totalItems);
            }
        });
    });

    describe('전체 문서 합계 검증', () => {
        it('15. 모든 필터의 문서를 합쳤을 때 중복이 있는지 확인 (참고용)', async () => {
            const filterTypes = [
                'DRAFT',
                'RECEIVED',
                'PENDING',
                'PENDING_AGREEMENT',
                'PENDING_APPROVAL',
                'IMPLEMENTATION',
                'APPROVED',
                'REJECTED',
                'RECEIVED_REFERENCE',
            ];

            const allDocumentIds = new Set<string>();
            const filterCounts: Record<string, number> = {};

            for (const filterType of filterTypes) {
                const response = await request(app.getHttpServer())
                    .get('/documents/my-all/documents')
                    .query({ filterType, limit: 1000 })
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(200);

                const { data, meta } = response.body;
                filterCounts[filterType] = meta.totalItems;

                data.forEach((doc: { id: string }) => {
                    allDocumentIds.add(doc.id);
                });
            }

            console.log(`\n📊 전체 필터 문서 분석:`);
            Object.entries(filterCounts).forEach(([filter, count]) => {
                console.log(`  ${filter}: ${count}개`);
            });

            const totalFilteredDocs = Object.values(filterCounts).reduce((sum, count) => sum + count, 0);
            const uniqueDocs = allDocumentIds.size;

            console.log(`\n  필터별 합계: ${totalFilteredDocs}개`);
            console.log(`  고유 문서: ${uniqueDocs}개`);
            console.log(`  중복도: ${(((totalFilteredDocs - uniqueDocs) / totalFilteredDocs) * 100).toFixed(2)}%`);

            // 이 테스트는 참고용이므로 실패하지 않음
            expect(uniqueDocs).toBeGreaterThan(0);
        });
    });
});

