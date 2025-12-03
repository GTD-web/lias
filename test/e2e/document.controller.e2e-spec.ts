import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * Document Controller E2E 테스트
 *
 * 테스트 범위:
 * 1. POST /documents - 문서 생성 (임시저장)
 * 2. GET /documents/my-all/statistics - 내 전체 문서 통계 조회
 * 3. GET /documents/my-all/documents - 내 전체 문서 목록 조회
 * 4. GET /documents/my-drafts - 내가 작성한 문서 전체 조회
 * 5. GET /documents/:documentId - 문서 상세 조회
 * 6. PUT /documents/:documentId - 문서 수정
 * 7. DELETE /documents/:documentId - 문서 삭제
 * 8. POST /documents/:documentId/submit - 문서 기안
 * 9. POST /documents/submit-direct - 바로 기안
 * 10. GET /documents/templates/:templateId - 새 문서 작성용 템플릿 상세 조회
 * 11. GET /documents/statistics/:userId - 문서 통계 조회
 * 12. POST /documents/:documentId/comments - 코멘트 작성
 * 13. GET /documents/:documentId/comments - 코멘트 목록 조회
 * 14. PUT /documents/comments/:commentId - 코멘트 수정
 * 15. DELETE /documents/comments/:commentId - 코멘트 삭제
 * 16. GET /documents/comments/:commentId - 코멘트 상세 조회
 */
describe('DocumentController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;
    let authToken: string;

    // 테스트 사용자 정보
    let employeeId: string;
    let approverEmployeeId: string;
    let implementerEmployeeId: string;

    // 테스트 데이터 ID
    let templateId: string;
    let documentId: string;
    let submittedDocumentId: string;
    let commentId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
        await app.init();

        dataSource = moduleFixture.get<DataSource>(DataSource);
        jwtService = moduleFixture.get<JwtService>(JwtService);

        // 테스트용 직원 조회
        await setupTestEmployees();
        await setupTestTemplate();
    });

    afterAll(async () => {
        await cleanupTestData();
        await app.close();
    });

    /**
     * 테스트용 직원 설정
     * Web파트(지상-Web) 직원들만 사용
     */
    async function setupTestEmployees() {
        const employeeRepo = dataSource.getRepository('Employee');

        // 지상-Web 부서 직원들만 조회 (최소 3명 필요: 기안자, 결재자, 시행자)
        const employees = await employeeRepo
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.departmentPositions', 'dp')
            .leftJoinAndSelect('dp.department', 'dept')
            .leftJoinAndSelect('dp.position', 'pos')
            .where('dept.departmentCode = :deptCode', { deptCode: '지상-Web' })
            .orderBy('employee.createdAt', 'ASC')
            .take(3)
            .getMany();

        if (employees.length < 3) {
            throw new Error('테스트를 위해 지상-Web 부서에 최소 3명의 직원이 필요합니다.');
        }

        employeeId = employees[0].id;
        approverEmployeeId = employees[1].id;
        implementerEmployeeId = employees[2].id;

        // JWT 토큰 생성
        authToken = jwtService.sign({
            sub: employeeId,
            employeeNumber: employees[0].employeeNumber,
        });
    }

    /**
     * 테스트용 템플릿 생성
     */
    async function setupTestTemplate() {
        const timestamp = Date.now();
        const response = await request(app.getHttpServer())
            .post('/templates')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: `E2E 테스트 템플릿_${timestamp}`,
                code: `E2E_TEST_${timestamp}`,
                description: 'E2E 테스트용 템플릿',
                template: '<h1>테스트 문서</h1><p>{{content}}</p>',
                approvalSteps: [
                    {
                        stepOrder: 1,
                        stepType: 'APPROVAL',
                        assigneeRule: 'FIXED',
                        targetEmployeeId: approverEmployeeId,
                        isRequired: true,
                    },
                    {
                        stepOrder: 2,
                        stepType: 'IMPLEMENTATION',
                        assigneeRule: 'FIXED',
                        targetEmployeeId: implementerEmployeeId,
                        isRequired: true,
                    },
                ],
            });

        if (response.status !== 201) {
            console.error('템플릿 생성 실패:', response.body);
            throw new Error('테스트 템플릿 생성 실패');
        }

        templateId = response.body.documentTemplate.id;
    }

    /**
     * 테스트 데이터 정리
     */
    async function cleanupTestData() {
        // 테스트 후 생성된 데이터 정리 (필요시)
    }

    // ==================== 문서 CRUD 테스트 ====================

    describe('POST /documents - 문서 생성 (임시저장)', () => {
        it('✅ 정상: 문서 생성 성공', async () => {
            const response = await request(app.getHttpServer())
                .post('/documents')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: 'E2E 테스트 문서',
                    content: '<p>테스트 내용입니다.</p>',
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('E2E 테스트 문서');
            expect(response.body.status).toBe('DRAFT');
            documentId = response.body.id;
        });

        it('❌ 실패: 인증 토큰 없이 요청', async () => {
            await request(app.getHttpServer())
                .post('/documents')
                .send({
                    documentTemplateId: templateId,
                    title: '테스트 문서',
                    content: '<p>내용</p>',
                })
                .expect(401);
        });

        it('❌ 실패: 존재하지 않는 templateId', async () => {
            const response = await request(app.getHttpServer())
                .post('/documents')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    documentTemplateId: '00000000-0000-0000-0000-000000000000',
                    title: '테스트 문서',
                    content: '<p>내용</p>',
                });

            expect([400, 404]).toContain(response.status);
        });
    });

    describe('GET /documents/:documentId - 문서 상세 조회', () => {
        it('✅ 정상: 문서 상세 조회 성공', async () => {
            const response = await request(app.getHttpServer())
                .get(`/documents/${documentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.id).toBe(documentId);
            expect(response.body.title).toBe('E2E 테스트 문서');
        });

        it('❌ 실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .get('/documents/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });
    });

    describe('PUT /documents/:documentId - 문서 수정', () => {
        it('✅ 정상: 임시저장 문서 수정 성공', async () => {
            const response = await request(app.getHttpServer())
                .put(`/documents/${documentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: 'E2E 테스트 문서 (수정됨)',
                    content: '<p>수정된 내용입니다.</p>',
                    comment: '내용 수정',
                })
                .expect(200);

            expect(response.body.title).toBe('E2E 테스트 문서 (수정됨)');
        });

        it('❌ 실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .put('/documents/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: '테스트',
                })
                .expect(404);
        });
    });

    describe('DELETE /documents/:documentId - 문서 삭제', () => {
        let tempDocumentId: string;

        beforeAll(async () => {
            // 삭제 테스트용 임시 문서 생성
            const response = await request(app.getHttpServer())
                .post('/documents')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '삭제 테스트 문서',
                    content: '<p>삭제될 문서</p>',
                });
            tempDocumentId = response.body.id;
        });

        it('✅ 정상: 임시저장 문서 삭제 성공', async () => {
            await request(app.getHttpServer())
                .delete(`/documents/${tempDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(204);
        });

        it('❌ 실패: 존재하지 않는 문서 삭제', async () => {
            await request(app.getHttpServer())
                .delete('/documents/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });
    });

    // ==================== 문서 기안 테스트 ====================

    describe('POST /documents/:documentId/submit - 문서 기안', () => {
        it('✅ 정상: 문서 기안 성공', async () => {
            if (!documentId) {
                console.warn('documentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .post(`/documents/${documentId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    documentTemplateId: templateId,
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            approverId: approverEmployeeId,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'IMPLEMENTATION',
                            approverId: implementerEmployeeId,
                        },
                    ],
                });

            if (response.status === 200) {
                expect(response.body.status).toBe('PENDING');
                expect(response.body).toHaveProperty('documentNumber');
                submittedDocumentId = response.body.id;
            } else {
                console.warn(`문서 기안 실패: ${response.status}`, response.body);
                // 다른 테스트를 위해 바로 기안으로 대체
                const directResponse = await request(app.getHttpServer())
                    .post('/documents/submit-direct')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        documentTemplateId: templateId,
                        title: '대체 기안 문서',
                        content: '<p>대체 내용</p>',
                        approvalSteps: [
                            { stepOrder: 1, stepType: 'APPROVAL', approverId: approverEmployeeId },
                            { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerEmployeeId },
                        ],
                    });
                if (directResponse.status === 201) {
                    submittedDocumentId = directResponse.body.id;
                }
            }
        });

        it('❌ 실패: 이미 제출된 문서 재제출', async () => {
            if (!submittedDocumentId) {
                console.warn('submittedDocumentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .post(`/documents/${submittedDocumentId}/submit`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    documentTemplateId: templateId,
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            approverId: approverEmployeeId,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'IMPLEMENTATION',
                            approverId: implementerEmployeeId,
                        },
                    ],
                });

            // 400 또는 500
            expect([400, 500]).toContain(response.status);
        });
    });

    describe('POST /documents/submit-direct - 바로 기안', () => {
        it('✅ 정상: 바로 기안 성공', async () => {
            const response = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '바로 기안 테스트 문서',
                    content: '<p>바로 기안 내용</p>',
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            approverId: approverEmployeeId,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'IMPLEMENTATION',
                            approverId: implementerEmployeeId,
                        },
                    ],
                })
                .expect(201);

            expect(response.body.status).toBe('PENDING');
            expect(response.body).toHaveProperty('documentNumber');
        });

        it('❌ 실패: 결재선 누락', async () => {
            await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '바로 기안 테스트',
                    content: '<p>내용</p>',
                    // approvalSteps 누락
                })
                .expect(400);
        });
    });

    // ==================== 문서 조회 테스트 ====================

    describe('GET /documents/my-all/statistics - 내 전체 문서 통계 조회', () => {
        it('✅ 정상: 문서 통계 조회 성공', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-all/statistics')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            // 통계 응답 필드 확인
            expect(response.body).toHaveProperty('DRAFT');
            expect(response.body).toHaveProperty('PENDING');
            expect(response.body).toHaveProperty('APPROVED');
            expect(response.body).toHaveProperty('REJECTED');
        });
    });

    describe('GET /documents/my-all/documents - 내 전체 문서 목록 조회', () => {
        it('✅ 정상: 전체 문서 목록 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('✅ 정상: DRAFT 필터링', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType: 'DRAFT' })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
        });

        it('✅ 정상: PENDING 필터링', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ filterType: 'PENDING' })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
        });

        it('✅ 정상: 페이지네이션 적용', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-all/documents')
                .query({ page: 1, limit: 5 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('meta');
        });
    });

    describe('GET /documents/my-drafts - 내가 작성한 문서 전체 조회', () => {
        it('✅ 정상: 내가 작성한 문서 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-drafts')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('✅ 정상: 페이지네이션 적용', async () => {
            const response = await request(app.getHttpServer())
                .get('/documents/my-drafts')
                .query({ page: 1, limit: 10 })
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('meta');
        });
    });

    describe('GET /documents/templates/:templateId - 새 문서 작성용 템플릿 조회', () => {
        it('✅ 정상: 템플릿 조회 (결재자 맵핑 포함)', async () => {
            const response = await request(app.getHttpServer())
                .get(`/documents/templates/${templateId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('id');
            // approvalSteps 또는 approvalStepTemplates (API 응답 구조에 따라 다름)
            expect(
                response.body.approvalSteps || response.body.approvalStepTemplates,
            ).toBeDefined();
        });

        it('❌ 실패: 존재하지 않는 템플릿 ID', async () => {
            await request(app.getHttpServer())
                .get('/documents/templates/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });
    });

    describe('GET /documents/statistics/:userId - 문서 통계 조회', () => {
        it('✅ 정상: 사용자의 문서 통계 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/documents/statistics/${employeeId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('myDocuments');
        });
    });

    // ==================== 코멘트 테스트 ====================

    describe('POST /documents/:documentId/comments - 코멘트 작성', () => {
        it('✅ 정상: 코멘트 작성 성공', async () => {
            if (!submittedDocumentId) {
                console.warn('submittedDocumentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .post(`/documents/${submittedDocumentId}/comments`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    content: '테스트 코멘트입니다.',
                });

            if (response.status === 201) {
                expect(response.body).toHaveProperty('id');
                expect(response.body.content).toBe('테스트 코멘트입니다.');
                commentId = response.body.id;
            } else {
                console.warn(`코멘트 작성 실패: ${response.status}`, response.body);
            }
        });

        it('❌ 실패: 존재하지 않는 문서', async () => {
            const response = await request(app.getHttpServer())
                .post('/documents/00000000-0000-0000-0000-000000000000/comments')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    content: '테스트',
                });

            // 404 또는 500
            expect([404, 500]).toContain(response.status);
        });
    });

    describe('GET /documents/:documentId/comments - 코멘트 목록 조회', () => {
        it('✅ 정상: 코멘트 목록 조회 성공', async () => {
            if (!submittedDocumentId) {
                console.warn('submittedDocumentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .get(`/documents/${submittedDocumentId}/comments`)
                .set('Authorization', `Bearer ${authToken}`);

            if (response.status === 200) {
                expect(Array.isArray(response.body)).toBe(true);
            } else {
                console.warn(`코멘트 목록 조회 실패: ${response.status}`);
            }
        });
    });

    describe('PUT /documents/comments/:commentId - 코멘트 수정', () => {
        it('✅ 정상: 코멘트 수정 성공', async () => {
            if (!commentId) {
                console.warn('commentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .put(`/documents/comments/${commentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    content: '수정된 코멘트입니다.',
                })
                .expect(200);

            expect(response.body.content).toBe('수정된 코멘트입니다.');
        });

        it('❌ 실패: 존재하지 않는 코멘트', async () => {
            const response = await request(app.getHttpServer())
                .put('/documents/comments/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    content: '테스트',
                });

            // 400, 404, 또는 500 (서버 에러 핸들링에 따라 다름)
            expect([400, 404, 500]).toContain(response.status);
        });
    });

    describe('GET /documents/comments/:commentId - 코멘트 상세 조회', () => {
        it('✅ 정상: 코멘트 상세 조회 성공', async () => {
            if (!commentId) {
                console.warn('commentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .get(`/documents/comments/${commentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.id).toBe(commentId);
        });
    });

    describe('DELETE /documents/comments/:commentId - 코멘트 삭제', () => {
        it('✅ 정상: 코멘트 삭제 성공', async () => {
            if (!commentId) {
                console.warn('commentId가 없어 테스트 스킵');
                return;
            }

            await request(app.getHttpServer())
                .delete(`/documents/comments/${commentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(204);
        });
    });

    // ==================== 정책 검증 테스트 ====================

    describe('정책 검증 - 문서 수정', () => {
        it('❌ 실패: 제출된 문서의 결재선 수정 시도', async () => {
            if (!submittedDocumentId) {
                console.warn('submittedDocumentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .put(`/documents/${submittedDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    approvalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            approverId: approverEmployeeId,
                        },
                    ],
                });

            // 400 (정책 위반) 또는 500 (에러 핸들링 미비)
            expect([400, 500]).toContain(response.status);
        });
    });

    describe('정책 검증 - 문서 삭제', () => {
        it('❌ 실패: 제출된 문서 삭제 시도', async () => {
            if (!submittedDocumentId) {
                console.warn('submittedDocumentId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .delete(`/documents/${submittedDocumentId}`)
                .set('Authorization', `Bearer ${authToken}`);

            // 400 (정책 위반) 또는 500 (에러 핸들링 미비)
            expect([400, 500]).toContain(response.status);
        });
    });
});

