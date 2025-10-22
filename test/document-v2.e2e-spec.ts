import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
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
