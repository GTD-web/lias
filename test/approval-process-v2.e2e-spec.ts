import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * ApprovalProcessController E2E 테스트
 *
 * 테스트 범위:
 * 1. 결재 승인
 * 2. 결재 반려
 * 3. 협의 완료
 * 4. 시행 완료
 * 5. 결재 취소
 * 6. 내 결재 대기 목록 조회
 * 7. 문서의 결재 단계 조회
 */
describe('ApprovalProcessController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;

    // 사용자별 토큰
    let drafterToken: string;
    let drafterEmployeeId: string;
    let approverToken: string;
    let approverEmployeeId: string;

    // 테스트 데이터
    let formVersionId: string;
    let documentId: string;
    let stepSnapshotId: string;
    let agreementStepId: string;
    let implementationStepId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();

        dataSource = moduleFixture.get<DataSource>(DataSource);
        jwtService = moduleFixture.get<JwtService>(JwtService);

        // 실제 DB에 존재하는 직원 조회 (최소 3명 필요)
        const employeeRepo = dataSource.getRepository('Employee');
        const employees = await employeeRepo.find({
            take: 3,
            order: { createdAt: 'ASC' },
        });

        if (!employees || employees.length < 3) {
            throw new Error('테스트를 위해서는 최소 3명 이상의 직원이 필요합니다.');
        }

        // 첫 번째 직원: 기안자
        const drafter = employees[0];
        drafterEmployeeId = drafter.id;
        drafterToken = jwtService.sign({
            sub: drafterEmployeeId,
            employeeNumber: drafter.employeeNumber,
        });

        // 두 번째 직원: 결재자
        const approver = employees[1];
        approverEmployeeId = approver.id;
        approverToken = jwtService.sign({
            sub: approverEmployeeId,
            employeeNumber: approver.employeeNumber,
        });

        // 먼저 결재선 템플릿 생성
        const timestamp = Date.now();
        const templateResponse = await request(app.getHttpServer())
            .post('/v2/approval-flow/templates')
            .set('Authorization', `Bearer ${drafterToken}`)
            .send({
                name: `테스트 결재선_${timestamp}`,
                description: '테스트용',
                type: 'COMMON',
                orgScope: 'ALL',
                steps: [
                    {
                        stepOrder: 1,
                        stepType: 'APPROVAL',
                        assigneeRule: 'FIXED',
                        defaultApproverId: approverEmployeeId,
                        isRequired: true,
                    },
                ],
            });

        const baseTemplateVersionId = templateResponse.body.currentVersionId;

        // 테스트용 문서양식 생성
        const formResponse = await request(app.getHttpServer())
            .post('/v2/approval-flow/forms')
            .set('Authorization', `Bearer ${drafterToken}`)
            .send({
                formName: `결재 테스트 양식_${timestamp}`,
                formCode: `APPROVAL_TEST_FORM_${timestamp}`,
                template: '<h1>테스트</h1>',
                useExistingLine: true,
                lineTemplateVersionId: baseTemplateVersionId,
            });

        formVersionId = formResponse.body.formVersion.id;

        // 테스트용 문서 생성 및 제출
        const docResponse = await request(app.getHttpServer())
            .post('/v2/document')
            .set('Authorization', `Bearer ${drafterToken}`)
            .send({
                formVersionId,
                title: '결재 테스트 문서',
                content: '<p>내용</p>',
            });

        documentId = docResponse.body.id;

        // 문서 제출
        await request(app.getHttpServer())
            .post(`/v2/document/${documentId}/submit`)
            .set('Authorization', `Bearer ${drafterToken}`)
            .send({
                draftContext: {},
            });

        // 결재 단계 조회하여 stepSnapshotId 가져오기
        const stepsResponse = await request(app.getHttpServer())
            .get(`/v2/approval-process/document/${documentId}/steps`)
            .set('Authorization', `Bearer ${drafterToken}`);

        stepSnapshotId = stepsResponse.body.steps[0]?.id;

        // 실제 할당된 결재자의 ID로 업데이트 (정상 테스트용)
        const actualApproverId = stepsResponse.body.steps[0]?.approverId;
        if (actualApproverId && actualApproverId !== approverEmployeeId) {
            // 실제 할당된 결재자의 토큰 생성
            const actualApprover = await employeeRepo.findOne({ where: { id: actualApproverId } });
            if (actualApprover) {
                approverEmployeeId = actualApproverId;
                approverToken = jwtService.sign({
                    sub: approverEmployeeId,
                    employeeNumber: actualApprover.employeeNumber,
                });
            }
        }
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /v2/approval-process/approve - 결재 승인', () => {
        it('정상: 결재 승인', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId,
                    comment: '승인합니다',
                })
                .expect(200);

            expect(response.body).toHaveProperty('id', stepSnapshotId);
            expect(response.body.status).toBe('APPROVED');
            expect(response.body.comment).toBe('승인합니다');
            expect(response.body).toHaveProperty('approvedAt');
        });

        it('정상: 의견 없이 승인', async () => {
            // 새 문서 생성 및 제출
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '테스트 문서 2',
                    content: '<p>내용</p>',
                });

            await request(app.getHttpServer())
                .post(`/v2/document/${docResponse.body.id}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                });

            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${docResponse.body.id}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const newStepId = stepsResponse.body.steps[0]?.id;

            const response = await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: newStepId,
                })
                .expect(200);

            expect(response.body.status).toBe('APPROVED');
        });

        it('실패: 필수 필드 누락 (stepSnapshotId)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    comment: '승인',
                })
                .expect(400);
        });

        it('실패: 존재하지 않는 stepSnapshotId', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: '00000000-0000-0000-0000-000000000000',
                })
                .expect(404);
        });

        it('실패: 권한 없는 사용자(기안자)가 승인 시도', async () => {
            // 원래 설정된 결재자 ID 사용 (beforeAll에서 업데이트되지 않은 값)
            const originalApproverId = '1c633f97-bd4e-40a6-b8f1-2d0186d7df2b'; // 전무현

            // 새 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '테스트 문서 3',
                    content: '<p>내용</p>',
                });

            await request(app.getHttpServer())
                .post(`/v2/document/${docResponse.body.id}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            employeeId: originalApproverId, // 원래 설정된 결재자로 지정
                            isRequired: true,
                        },
                    ],
                });

            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${docResponse.body.id}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const newStepId = stepsResponse.body.steps[0]?.id;

            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${drafterToken}`) // 기안자가 승인 시도 (권한 없음)
                .send({
                    stepSnapshotId: newStepId,
                })
                .expect(403);
        });

        it('실패: 이미 승인된 단계 재승인 시도', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId,
                })
                .expect(400);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .send({
                    stepSnapshotId,
                })
                .expect(401);
        });
    });

    describe('POST /v2/approval-process/reject - 결재 반려', () => {
        let rejectDocumentId: string;
        let rejectStepId: string;

        beforeAll(async () => {
            // 반려할 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '반려 테스트 문서',
                    content: '<p>내용</p>',
                });

            rejectDocumentId = docResponse.body.id;

            await request(app.getHttpServer())
                .post(`/v2/document/${rejectDocumentId}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                });

            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${rejectDocumentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            rejectStepId = stepsResponse.body.steps[0]?.id;
        });

        it('정상: 결재 반려 (사유 포함)', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/approval-process/reject')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: rejectStepId,
                    comment: '내용이 부족합니다. 수정 후 재제출 바랍니다.',
                })
                .expect(200);

            expect(response.body.id).toBe(rejectStepId);
            expect(response.body.status).toBe('REJECTED');
            expect(response.body.comment).toBe('내용이 부족합니다. 수정 후 재제출 바랍니다.');
            expect(response.body).toHaveProperty('approvedAt');
        });

        it('실패: 필수 필드 누락 (stepSnapshotId)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/reject')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    comment: '반려',
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (comment - 반려 사유)', async () => {
            // 새 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '반려 테스트 2',
                    content: '<p>내용</p>',
                });

            await request(app.getHttpServer())
                .post(`/v2/document/${docResponse.body.id}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                });

            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${docResponse.body.id}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const newStepId = stepsResponse.body.steps[0]?.id;

            await request(app.getHttpServer())
                .post('/v2/approval-process/reject')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: newStepId,
                })
                .expect(400);
        });

        it('실패: 존재하지 않는 stepSnapshotId', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/reject')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: '00000000-0000-0000-0000-000000000000',
                    comment: '반려',
                })
                .expect(404);
        });

        it('실패: 권한 없는 사용자가 반려 시도', async () => {
            // 원래 설정된 결재자 ID 사용 (beforeAll에서 업데이트되지 않은 값)
            const originalApproverId = '1c633f97-bd4e-40a6-b8f1-2d0186d7df2b'; // 전무현

            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '반려 테스트 3',
                    content: '<p>내용</p>',
                });

            await request(app.getHttpServer())
                .post(`/v2/document/${docResponse.body.id}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            employeeId: originalApproverId, // 원래 설정된 결재자로 지정
                            isRequired: true,
                        },
                    ],
                });

            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${docResponse.body.id}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const newStepId = stepsResponse.body.steps[0]?.id;

            await request(app.getHttpServer())
                .post('/v2/approval-process/reject')
                .set('Authorization', `Bearer ${drafterToken}`) // 기안자가 반려 시도 (권한 없음)
                .send({
                    stepSnapshotId: newStepId,
                    comment: '반려',
                })
                .expect(403);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/reject')
                .send({
                    stepSnapshotId: rejectStepId,
                    comment: '반려',
                })
                .expect(401);
        });
    });

    describe('POST /v2/approval-process/agreement/complete - 협의 완료', () => {
        let agreementDocumentId: string;
        let agreementStepId: string;

        beforeAll(async () => {
            // 협의 단계가 있는 결재선 템플릿 생성
            const timestamp = Date.now();
            const templateResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    name: `협의 결재선_${timestamp}`,
                    description: '협의 테스트용',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'FIXED',
                            defaultApproverId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            const agreementTemplateVersionId = templateResponse.body.currentVersionId;

            // 협의 단계가 있는 문서양식 생성
            const formResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formName: `협의 테스트 양식_${timestamp}`,
                    formCode: `AGREEMENT_TEST_FORM_${timestamp}`,
                    template: '<h1>협의 테스트</h1>',
                    useExistingLine: true,
                    lineTemplateVersionId: agreementTemplateVersionId,
                });

            const agreementFormVersionId = formResponse.body.formVersion.id;

            // 문서 생성 및 제출
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId: agreementFormVersionId,
                    title: '협의 테스트 문서',
                    content: '<p>협의 내용</p>',
                });

            agreementDocumentId = docResponse.body.id;

            await request(app.getHttpServer())
                .post(`/v2/document/${agreementDocumentId}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'FIXED',
                            employeeId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${agreementDocumentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            agreementStepId = stepsResponse.body.steps[0]?.id;

            // 실제 할당된 협의자의 ID로 업데이트
            const actualAgreementId = stepsResponse.body.steps[0]?.approverId;
            if (actualAgreementId && actualAgreementId !== approverEmployeeId) {
                const employeeRepo = dataSource.getRepository('Employee');
                const actualAgreement = await employeeRepo.findOne({ where: { id: actualAgreementId } });
                if (actualAgreement) {
                    approverEmployeeId = actualAgreementId;
                    approverToken = jwtService.sign({
                        sub: approverEmployeeId,
                        employeeNumber: actualAgreement.employeeNumber,
                    });
                }
            }
        });

        it('정상: 협의 완료', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/approval-process/agreement/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: agreementStepId,
                    comment: '검토 완료했습니다',
                })
                .expect(200);

            expect(response.body.id).toBe(agreementStepId);
            expect(response.body.status).toBe('APPROVED');
            expect(response.body.comment).toBe('검토 완료했습니다');
        });

        it('실패: 필수 필드 누락 (stepSnapshotId)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/agreement/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    comment: '협의 완료',
                })
                .expect(400);
        });

        it('실패: 존재하지 않는 stepSnapshotId', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/agreement/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: '00000000-0000-0000-0000-000000000000',
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/agreement/complete')
                .send({
                    stepSnapshotId: agreementStepId,
                })
                .expect(401);
        });
    });

    describe('POST /v2/approval-process/implementation/complete - 시행 완료', () => {
        let implementationDocumentId: string;
        let implementationStepId: string;

        beforeAll(async () => {
            // 시행 단계가 있는 결재선 템플릿 생성
            const timestamp = Date.now();
            const templateResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    name: `시행 결재선_${timestamp}`,
                    description: '시행 테스트용',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            defaultApproverId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            const implementationTemplateVersionId = templateResponse.body.currentVersionId;

            // 시행 단계가 있는 문서양식 생성
            const formResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formName: `시행 테스트 양식_${timestamp}`,
                    formCode: `IMPLEMENTATION_TEST_FORM_${timestamp}`,
                    template: '<h1>시행 테스트</h1>',
                    useExistingLine: true,
                    lineTemplateVersionId: implementationTemplateVersionId,
                });

            const implementationFormVersionId = formResponse.body.formVersion.id;

            // 문서 생성 및 제출
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId: implementationFormVersionId,
                    title: '시행 테스트 문서',
                    content: '<p>시행 내용</p>',
                });

            implementationDocumentId = docResponse.body.id;

            await request(app.getHttpServer())
                .post(`/v2/document/${implementationDocumentId}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            employeeId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${implementationDocumentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            implementationStepId = stepsResponse.body.steps[0]?.id;

            // 실제 할당된 시행자의 ID로 업데이트
            const actualImplementationId = stepsResponse.body.steps[0]?.approverId;
            if (actualImplementationId && actualImplementationId !== approverEmployeeId) {
                const employeeRepo = dataSource.getRepository('Employee');
                const actualImplementation = await employeeRepo.findOne({ where: { id: actualImplementationId } });
                if (actualImplementation) {
                    approverEmployeeId = actualImplementationId;
                    approverToken = jwtService.sign({
                        sub: approverEmployeeId,
                        employeeNumber: actualImplementation.employeeNumber,
                    });
                }
            }
        });

        it('정상: 시행 완료', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/approval-process/implementation/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: implementationStepId,
                    comment: '시행 완료했습니다',
                })
                .expect(200);

            expect(response.body.id).toBe(implementationStepId);
            expect(response.body.status).toBe('APPROVED');
            expect(response.body.comment).toBe('시행 완료했습니다');
        });

        it('실패: 필수 필드 누락 (stepSnapshotId)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/implementation/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    comment: '시행 완료',
                })
                .expect(400);
        });

        it('실패: 존재하지 않는 stepSnapshotId', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/implementation/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: '00000000-0000-0000-0000-000000000000',
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/implementation/complete')
                .send({
                    stepSnapshotId: implementationStepId,
                })
                .expect(401);
        });
    });

    describe('GET /v2/approval-process/my-pending - 내 결재 대기 목록', () => {
        it('정상: 내 결재 대기 목록 조회', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/approval-process/my-pending')
                .set('Authorization', `Bearer ${approverToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            // 대기 중인 결재가 있을 수 있음
        });

        it('정상: 기안자는 본인의 결재 대기 목록 (빈 배열 가능)', async () => {
            const response = await request(app.getHttpServer())
                .get('/v2/approval-process/my-pending')
                .set('Authorization', `Bearer ${drafterToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get('/v2/approval-process/my-pending').expect(401);
        });
    });

    describe('GET /v2/approval-process/document/:documentId/steps - 문서 결재 단계 조회', () => {
        it('정상: 문서의 모든 결재 단계 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${documentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('documentId', documentId);
            expect(response.body).toHaveProperty('steps');
            expect(Array.isArray(response.body.steps)).toBe(true);
            expect(response.body).toHaveProperty('totalSteps');
            expect(response.body).toHaveProperty('completedSteps');
            expect(response.body.steps.length).toBeGreaterThan(0);
        });

        it('정상: 다른 사용자도 결재 단계 조회 가능', async () => {
            const response = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${documentId}/steps`)
                .set('Authorization', `Bearer ${approverToken}`)
                .expect(200);

            expect(response.body.documentId).toBe(documentId);
        });

        it('실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .get('/v2/approval-process/document/00000000-0000-0000-0000-000000000000/steps')
                .set('Authorization', `Bearer ${drafterToken}`)
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer()).get(`/v2/approval-process/document/${documentId}/steps`).expect(401);
        });
    });

    describe('POST /v2/approval-process/cancel - 결재 취소', () => {
        let cancelDocumentId: string;

        beforeAll(async () => {
            // 취소할 문서 생성 및 제출
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '취소 테스트 문서',
                    content: '<p>취소할 내용</p>',
                });

            cancelDocumentId = docResponse.body.id;

            await request(app.getHttpServer())
                .post(`/v2/document/${cancelDocumentId}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                });
        });

        it('정상: 기안자가 결재 취소', async () => {
            const response = await request(app.getHttpServer())
                .post('/v2/approval-process/cancel')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentId: cancelDocumentId,
                    reason: '내용 수정이 필요하여 취소합니다',
                })
                .expect(200);

            // 취소 후 문서 상태 확인
            const docResponse = await request(app.getHttpServer())
                .get(`/v2/document/${cancelDocumentId}`)
                .set('Authorization', `Bearer ${drafterToken}`);

            expect(docResponse.body.status).toBe('CANCELLED');
        });

        it('실패: 필수 필드 누락 (documentId)', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/cancel')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    reason: '취소',
                })
                .expect(400);
        });

        it('실패: 필수 필드 누락 (reason)', async () => {
            // 새 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '취소 테스트 2',
                    content: '<p>내용</p>',
                });

            await request(app.getHttpServer())
                .post(`/v2/document/${docResponse.body.id}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                });

            await request(app.getHttpServer())
                .post('/v2/approval-process/cancel')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentId: docResponse.body.id,
                })
                .expect(400);
        });

        it('실패: 기안자가 아닌 사용자가 취소 시도', async () => {
            // 실제 존재하는 직원 중 하나를 사용 (기안자가 아닌)
            const employeeRepo = dataSource.getRepository('Employee');
            const employees = await employeeRepo.find({ take: 3 });
            const otherEmployee = employees.find((emp) => emp.id !== drafterEmployeeId);

            if (!otherEmployee) {
                throw new Error('테스트용 직원을 찾을 수 없습니다');
            }

            const originalApproverToken = jwtService.sign({
                sub: otherEmployee.id,
                employeeNumber: otherEmployee.employeeNumber,
            });

            // 새 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId,
                    title: '취소 테스트 3',
                    content: '<p>내용</p>',
                });

            await request(app.getHttpServer())
                .post(`/v2/document/${docResponse.body.id}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                });

            await request(app.getHttpServer())
                .post('/v2/approval-process/cancel')
                .set('Authorization', `Bearer ${originalApproverToken}`) // 결재자가 취소 시도 (권한 없음)
                .send({
                    documentId: docResponse.body.id,
                    reason: '취소',
                })
                .expect(403);
        });

        it('실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/cancel')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentId: '00000000-0000-0000-0000-000000000000',
                    reason: '취소',
                })
                .expect(404);
        });

        it('실패: 인증 토큰 없음', async () => {
            await request(app.getHttpServer())
                .post('/v2/approval-process/cancel')
                .send({
                    documentId: cancelDocumentId,
                    reason: '취소',
                })
                .expect(401);
        });
    });

    describe('순서 검증 테스트 - 결재 프로세스 순서 위반', () => {
        let orderTestDocumentId: string;
        let agreementStepId: string;
        let approvalStepId: string;
        let implementationStepId: string;

        beforeAll(async () => {
            // 협의 → 결재 → 시행 순서의 결재선 템플릿 생성
            const timestamp = Date.now();
            const templateResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    name: `순서 검증 결재선_${timestamp}`,
                    description: '순서 검증 테스트용',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'FIXED',
                            defaultApproverId: approverEmployeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            defaultApproverId: approverEmployeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 3,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            defaultApproverId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            const orderTestTemplateVersionId = templateResponse.body.currentVersionId;

            // 문서양식 생성
            const formResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formName: `순서 검증 양식_${timestamp}`,
                    formCode: `ORDER_TEST_FORM_${timestamp}`,
                    template: '<h1>순서 검증 테스트</h1>',
                    useExistingLine: true,
                    lineTemplateVersionId: orderTestTemplateVersionId,
                });

            const orderTestFormVersionId = formResponse.body.formVersion.id;

            // 문서 생성 (임시저장)
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId: orderTestFormVersionId,
                    title: '순서 검증 테스트 문서',
                    content: '<p>순서 검증 테스트 내용</p>',
                });

            orderTestDocumentId = docResponse.body.id;

            // 문서 제출 (customApprovalSteps로 협의 단계 포함)
            await request(app.getHttpServer())
                .post(`/v2/document/${orderTestDocumentId}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'AGREEMENT',
                            assigneeRule: 'FIXED',
                            employeeId: approverEmployeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            employeeId: approverEmployeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 3,
                            stepType: 'IMPLEMENTATION',
                            assigneeRule: 'FIXED',
                            employeeId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            // 결재 단계들 조회
            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${orderTestDocumentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            agreementStepId = stepsResponse.body.steps.find((s: any) => s.stepType === 'AGREEMENT')?.id;
            approvalStepId = stepsResponse.body.steps.find((s: any) => s.stepType === 'APPROVAL')?.id;
            implementationStepId = stepsResponse.body.steps.find((s: any) => s.stepType === 'IMPLEMENTATION')?.id;
        });

        it('실패: 협의가 완료되지 않은 상태에서 결재 시도', async () => {
            // 협의를 완료하지 않고 바로 결재 시도
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: approvalStepId,
                    comment: '결재 승인',
                })
                .expect(400);
        });

        it('실패: 협의가 완료되지 않은 상태에서 시행 시도', async () => {
            // 협의를 완료하지 않고 바로 시행 시도
            await request(app.getHttpServer())
                .post('/v2/approval-process/implementation/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: implementationStepId,
                    comment: '시행 완료',
                })
                .expect(400);
        });

        it('실패: 결재가 완료되지 않은 상태에서 시행 시도', async () => {
            // 협의 완료
            await request(app.getHttpServer())
                .post('/v2/approval-process/agreement/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: agreementStepId,
                    comment: '협의 완료',
                })
                .expect(200);

            // 결재를 완료하지 않고 바로 시행 시도
            await request(app.getHttpServer())
                .post('/v2/approval-process/implementation/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: implementationStepId,
                    comment: '시행 완료',
                })
                .expect(400);
        });

        it('정상: 올바른 순서로 결재 프로세스 진행', async () => {
            // 1. 결재 승인
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: approvalStepId,
                    comment: '결재 승인',
                })
                .expect(200);

            // 2. 시행 완료
            await request(app.getHttpServer())
                .post('/v2/approval-process/implementation/complete')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: implementationStepId,
                    comment: '시행 완료',
                })
                .expect(200);
        });
    });

    describe('순서 검증 테스트 - 다중 결재 단계 순서 위반', () => {
        let multiApprovalDocumentId: string;
        let firstApprovalStepId: string;
        let secondApprovalStepId: string;

        beforeAll(async () => {
            // 다중 결재 단계가 있는 결재선 템플릿 생성
            const timestamp = Date.now();
            const templateResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/templates')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    name: `다중 결재 순서 검증_${timestamp}`,
                    description: '다중 결재 순서 검증 테스트용',
                    type: 'COMMON',
                    orgScope: 'ALL',
                    steps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            defaultApproverId: approverEmployeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            defaultApproverId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            const multiApprovalTemplateVersionId = templateResponse.body.currentVersionId;

            // 문서양식 생성
            const formResponse = await request(app.getHttpServer())
                .post('/v2/approval-flow/forms')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formName: `다중 결재 양식_${timestamp}`,
                    formCode: `MULTI_APPROVAL_FORM_${timestamp}`,
                    template: '<h1>다중 결재 테스트</h1>',
                    useExistingLine: true,
                    lineTemplateVersionId: multiApprovalTemplateVersionId,
                });

            const multiApprovalFormVersionId = formResponse.body.formVersion.id;

            // 문서 생성 (임시저장)
            const docResponse = await request(app.getHttpServer())
                .post('/v2/document')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    formVersionId: multiApprovalFormVersionId,
                    title: '다중 결재 순서 검증 문서',
                    content: '<p>다중 결재 순서 검증 내용</p>',
                });

            multiApprovalDocumentId = docResponse.body.id;

            // 문서 제출 (customApprovalSteps로 다중 결재 단계 포함)
            await request(app.getHttpServer())
                .post(`/v2/document/${multiApprovalDocumentId}/submit`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    draftContext: {},
                    customApprovalSteps: [
                        {
                            stepOrder: 1,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            employeeId: approverEmployeeId,
                            isRequired: true,
                        },
                        {
                            stepOrder: 2,
                            stepType: 'APPROVAL',
                            assigneeRule: 'FIXED',
                            employeeId: approverEmployeeId,
                            isRequired: true,
                        },
                    ],
                });

            // 결재 단계들 조회
            const stepsResponse = await request(app.getHttpServer())
                .get(`/v2/approval-process/document/${multiApprovalDocumentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const approvalSteps = stepsResponse.body.steps.filter((s: any) => s.stepType === 'APPROVAL');
            firstApprovalStepId = approvalSteps.find((s: any) => s.stepOrder === 1)?.id;
            secondApprovalStepId = approvalSteps.find((s: any) => s.stepOrder === 2)?.id;
        });

        it('실패: 첫 번째 결재가 완료되지 않은 상태에서 두 번째 결재 시도', async () => {
            // 첫 번째 결재를 완료하지 않고 두 번째 결재 시도
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: secondApprovalStepId,
                    comment: '두 번째 결재 승인',
                })
                .expect(400);
        });

        it('정상: 올바른 순서로 다중 결재 진행', async () => {
            // 1. 첫 번째 결재 승인
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: firstApprovalStepId,
                    comment: '첫 번째 결재 승인',
                })
                .expect(200);

            // 2. 두 번째 결재 승인
            await request(app.getHttpServer())
                .post('/v2/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: secondApprovalStepId,
                    comment: '두 번째 결재 승인',
                })
                .expect(200);
        });
    });
});
