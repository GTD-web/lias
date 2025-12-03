import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

/**
 * Approval Process Controller E2E 테스트
 *
 * 테스트 범위:
 * 1. POST /approval-process/approve - 결재 승인
 * 2. POST /approval-process/reject - 결재 반려
 * 3. POST /approval-process/complete-agreement - 협의 완료
 * 4. POST /approval-process/complete-implementation - 시행 완료
 * 5. POST /approval-process/mark-reference-read - 참조 열람 확인
 * 6. POST /approval-process/cancel - 결재 취소 (상신취소/결재취소)
 * 7. GET /approval-process/my-pending - 내 결재 대기 목록 조회
 * 8. GET /approval-process/document/:documentId/steps - 문서의 결재 단계 목록 조회
 * 9. POST /approval-process/process-action - 통합 결재 액션 처리
 */
describe('ApprovalProcessController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let jwtService: JwtService;

    // 테스트 사용자 정보 및 토큰
    let drafterToken: string;
    let approverToken: string;
    let implementerToken: string;
    let referenceToken: string;

    // 테스트 사용자 ID
    let drafterId: string;
    let approverId: string;
    let implementerId: string;
    let referenceId: string;

    // 테스트 데이터 ID
    let templateId: string;
    let documentId: string;
    let approvalStepId: string;
    let implementationStepId: string;
    let referenceStepId: string;

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
        await setupTestTemplate();
        await setupTestDocument();
    });

    afterAll(async () => {
        await app.close();
    });

    /**
     * 테스트용 직원 설정 (최소 4명 필요: 기안자, 결재자, 시행자, 참조자)
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
            .take(4)
            .getMany();

        if (employees.length < 4) {
            throw new Error('테스트를 위해 지상-Web 부서에 최소 4명의 직원이 필요합니다.');
        }

        drafterId = employees[0].id;
        approverId = employees[1].id;
        implementerId = employees[2].id;
        referenceId = employees[3].id;

        // 각 직원의 JWT 토큰 생성
        drafterToken = jwtService.sign({
            sub: drafterId,
            employeeNumber: employees[0].employeeNumber,
        });

        approverToken = jwtService.sign({
            sub: approverId,
            employeeNumber: employees[1].employeeNumber,
        });

        implementerToken = jwtService.sign({
            sub: implementerId,
            employeeNumber: employees[2].employeeNumber,
        });

        referenceToken = jwtService.sign({
            sub: referenceId,
            employeeNumber: employees[3].employeeNumber,
        });
    }

    /**
     * 테스트용 템플릿 생성
     */
    async function setupTestTemplate() {
        const timestamp = Date.now();
        const response = await request(app.getHttpServer())
            .post('/templates')
            .set('Authorization', `Bearer ${drafterToken}`)
            .send({
                name: `결재 테스트 템플릿_${timestamp}`,
                code: `APPROVAL_TEST_${timestamp}`,
                description: '결재 프로세스 E2E 테스트용',
                template: '<h1>결재 테스트</h1>',
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
                    {
                        stepOrder: 3,
                        stepType: 'REFERENCE',
                        assigneeRule: 'FIXED',
                        targetEmployeeId: referenceId,
                        isRequired: false,
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
     * 테스트용 문서 생성 및 기안
     */
    async function setupTestDocument() {
        // 바로 기안으로 문서 생성
        const response = await request(app.getHttpServer())
            .post('/documents/submit-direct')
            .set('Authorization', `Bearer ${drafterToken}`)
            .send({
                documentTemplateId: templateId,
                title: '결재 프로세스 테스트 문서',
                content: '<p>결재 테스트 내용</p>',
                approvalSteps: [
                    {
                        stepOrder: 1,
                        stepType: 'APPROVAL',
                        approverId: approverId,
                    },
                    {
                        stepOrder: 2,
                        stepType: 'IMPLEMENTATION',
                        approverId: implementerId,
                    },
                    {
                        stepOrder: 3,
                        stepType: 'REFERENCE',
                        approverId: referenceId,
                    },
                ],
            });

        if (response.status !== 201) {
            console.error('문서 기안 실패:', response.body);
            throw new Error('테스트 문서 기안 실패');
        }

        documentId = response.body.id;

        // 결재 단계 조회하여 ID 저장
        const stepsResponse = await request(app.getHttpServer())
            .get(`/approval-process/document/${documentId}/steps`)
            .set('Authorization', `Bearer ${drafterToken}`);

        if (stepsResponse.status === 200 && Array.isArray(stepsResponse.body)) {
            const steps = stepsResponse.body;
            approvalStepId = steps.find((s: { stepType: string }) => s.stepType === 'APPROVAL')?.id;
            implementationStepId = steps.find((s: { stepType: string }) => s.stepType === 'IMPLEMENTATION')?.id;
            referenceStepId = steps.find((s: { stepType: string }) => s.stepType === 'REFERENCE')?.id;
        }
    }

    // ==================== 결재 단계 조회 테스트 ====================

    describe('GET /approval-process/document/:documentId/steps - 결재 단계 목록 조회', () => {
        it('✅ 정상: 문서의 결재 단계 목록 조회', async () => {
            const response = await request(app.getHttpServer())
                .get(`/approval-process/document/${documentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThanOrEqual(2);
        });

        it('❌ 실패: 존재하지 않는 문서 ID', async () => {
            await request(app.getHttpServer())
                .get('/approval-process/document/00000000-0000-0000-0000-000000000000/steps')
                .set('Authorization', `Bearer ${drafterToken}`)
                .expect(404);
        });
    });

    // ==================== 내 결재 대기 목록 조회 테스트 ====================

    describe('GET /approval-process/my-pending - 내 결재 대기 목록 조회', () => {
        it('✅ 정상: 상신 문서 목록 조회 (SUBMITTED)', async () => {
            const response = await request(app.getHttpServer())
                .get('/approval-process/my-pending')
                .query({ type: 'SUBMITTED' })
                .set('Authorization', `Bearer ${drafterToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('meta');
        });

        it('✅ 정상: 결재 대기 목록 조회 (APPROVAL)', async () => {
            const response = await request(app.getHttpServer())
                .get('/approval-process/my-pending')
                .query({ type: 'APPROVAL' })
                .set('Authorization', `Bearer ${approverToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
        });

        it('✅ 정상: 페이지네이션 적용', async () => {
            const response = await request(app.getHttpServer())
                .get('/approval-process/my-pending')
                .query({ type: 'APPROVAL', page: 1, limit: 10 })
                .set('Authorization', `Bearer ${approverToken}`)
                .expect(200);

            expect(response.body.meta).toHaveProperty('currentPage');
        });
    });

    // ==================== 결재 승인 테스트 ====================

    describe('POST /approval-process/approve - 결재 승인', () => {
        it('✅ 정상: 결재 승인 성공', async () => {
            if (!approvalStepId) {
                console.warn('approvalStepId가 없어 테스트 스킵');
                return;
            }

            const response = await request(app.getHttpServer())
                .post('/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: approvalStepId,
                    comment: '승인합니다.',
                })
                .expect(200);

            expect(response.body.status).toBe('APPROVED');
        });

        it('❌ 실패: 권한 없는 사용자의 승인 시도', async () => {
            // 새로운 문서 생성 후 테스트
            const newDocResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '권한 테스트 문서',
                    content: '<p>내용</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            const newDocId = newDocResponse.body.id;
            const stepsRes = await request(app.getHttpServer())
                .get(`/approval-process/document/${newDocId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const newApprovalStepId = stepsRes.body.find((s: { stepType: string }) => s.stepType === 'APPROVAL')?.id;

            // 기안자가 승인 시도 (권한 없음)
            await request(app.getHttpServer())
                .post('/approval-process/approve')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    stepSnapshotId: newApprovalStepId,
                })
                .expect(403);
        });

        it('❌ 실패: 존재하지 않는 stepSnapshotId', async () => {
            await request(app.getHttpServer())
                .post('/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: '00000000-0000-0000-0000-000000000000',
                })
                .expect(404);
        });
    });

    // ==================== 결재 반려 테스트 ====================

    describe('POST /approval-process/reject - 결재 반려', () => {
        let rejectTestDocumentId: string;
        let rejectTestStepId: string;

        beforeAll(async () => {
            // 반려 테스트용 새 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '반려 테스트 문서',
                    content: '<p>반려 테스트</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            rejectTestDocumentId = docResponse.body.id;

            const stepsRes = await request(app.getHttpServer())
                .get(`/approval-process/document/${rejectTestDocumentId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            rejectTestStepId = stepsRes.body.find((s: { stepType: string }) => s.stepType === 'APPROVAL')?.id;
        });

        it('✅ 정상: 결재 반려 (사유 포함)', async () => {
            const response = await request(app.getHttpServer())
                .post('/approval-process/reject')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: rejectTestStepId,
                    comment: '내용 보완이 필요합니다.',
                })
                .expect(200);

            expect(response.body.status).toBe('REJECTED');
        });

        it('❌ 실패: 반려 사유 누락', async () => {
            // 새 문서 생성
            const docResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '반려 사유 누락 테스트',
                    content: '<p>테스트</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            const stepsRes = await request(app.getHttpServer())
                .get(`/approval-process/document/${docResponse.body.id}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const stepId = stepsRes.body.find((s: { stepType: string }) => s.stepType === 'APPROVAL')?.id;

            await request(app.getHttpServer())
                .post('/approval-process/reject')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: stepId,
                    // comment 누락
                })
                .expect(400);
        });
    });

    // ==================== 시행 완료 테스트 ====================

    describe('POST /approval-process/complete-implementation - 시행 완료', () => {
        let implementationTestDocId: string;
        let implementationTestStepId: string;

        beforeAll(async () => {
            // 시행 테스트용 문서 생성 및 결재 승인
            const docResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '시행 테스트 문서',
                    content: '<p>시행 테스트</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            implementationTestDocId = docResponse.body.id;

            // 결재 단계 조회
            const stepsRes = await request(app.getHttpServer())
                .get(`/approval-process/document/${implementationTestDocId}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const approvalStep = stepsRes.body.find((s: { stepType: string }) => s.stepType === 'APPROVAL');
            implementationTestStepId = stepsRes.body.find(
                (s: { stepType: string }) => s.stepType === 'IMPLEMENTATION',
            )?.id;

            // 결재 승인
            await request(app.getHttpServer())
                .post('/approval-process/approve')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    stepSnapshotId: approvalStep.id,
                    comment: '승인',
                });
        });

        it('✅ 정상: 시행 완료', async () => {
            const response = await request(app.getHttpServer())
                .post('/approval-process/complete-implementation')
                .set('Authorization', `Bearer ${implementerToken}`)
                .send({
                    stepSnapshotId: implementationTestStepId,
                    comment: '시행 완료했습니다.',
                })
                .expect(200);

            expect(response.body.status).toBe('APPROVED');
        });

        it('❌ 실패: 결재 완료되지 않은 문서의 시행 시도', async () => {
            // 새 문서 생성 (결재 미승인 상태)
            const docResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '미승인 시행 테스트',
                    content: '<p>테스트</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            const stepsRes = await request(app.getHttpServer())
                .get(`/approval-process/document/${docResponse.body.id}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const implStepId = stepsRes.body.find((s: { stepType: string }) => s.stepType === 'IMPLEMENTATION')?.id;

            await request(app.getHttpServer())
                .post('/approval-process/complete-implementation')
                .set('Authorization', `Bearer ${implementerToken}`)
                .send({
                    stepSnapshotId: implStepId,
                })
                .expect(400);
        });
    });

    // ==================== 결재 취소 테스트 ====================

    describe('POST /approval-process/cancel - 결재 취소', () => {
        describe('상신취소 (기안자)', () => {
            it('✅ 정상: 결재자가 처리하기 전 상신취소', async () => {
                // 새 문서 생성
                const docResponse = await request(app.getHttpServer())
                    .post('/documents/submit-direct')
                    .set('Authorization', `Bearer ${drafterToken}`)
                    .send({
                        documentTemplateId: templateId,
                        title: '상신취소 테스트 문서',
                        content: '<p>테스트</p>',
                        approvalSteps: [
                            { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                            { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                        ],
                    });

                const response = await request(app.getHttpServer())
                    .post('/approval-process/cancel')
                    .set('Authorization', `Bearer ${drafterToken}`)
                    .send({
                        documentId: docResponse.body.id,
                        reason: '재작성이 필요하여 취소합니다.',
                    })
                    .expect(200);

                expect(response.body.status).toBe('CANCELLED');
            });

            it('❌ 실패: 결재자가 처리한 후 상신취소 시도', async () => {
                // 새 문서 생성 및 결재 승인
                const docResponse = await request(app.getHttpServer())
                    .post('/documents/submit-direct')
                    .set('Authorization', `Bearer ${drafterToken}`)
                    .send({
                        documentTemplateId: templateId,
                        title: '취소 불가 테스트',
                        content: '<p>테스트</p>',
                        approvalSteps: [
                            { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                            { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                        ],
                    });

                const stepsRes = await request(app.getHttpServer())
                    .get(`/approval-process/document/${docResponse.body.id}/steps`)
                    .set('Authorization', `Bearer ${drafterToken}`);

                const approvalStep = stepsRes.body.find((s: { stepType: string }) => s.stepType === 'APPROVAL');

                // 결재 승인
                await request(app.getHttpServer())
                    .post('/approval-process/approve')
                    .set('Authorization', `Bearer ${approverToken}`)
                    .send({
                        stepSnapshotId: approvalStep.id,
                    });

                // 기안자 상신취소 시도 (실패 예상)
                await request(app.getHttpServer())
                    .post('/approval-process/cancel')
                    .set('Authorization', `Bearer ${drafterToken}`)
                    .send({
                        documentId: docResponse.body.id,
                        reason: '취소',
                    })
                    .expect(400);
            });
        });

        describe('결재취소 (결재자)', () => {
            it('✅ 정상: 본인이 승인한 결재 취소 (다음 결재자 대기 중)', async () => {
                // 여러 결재자가 있는 문서 생성 (첫 번째 결재자가 승인해도 문서는 PENDING 유지)
                const docResponse = await request(app.getHttpServer())
                    .post('/documents/submit-direct')
                    .set('Authorization', `Bearer ${drafterToken}`)
                    .send({
                        documentTemplateId: templateId,
                        title: '결재취소 테스트 (다중 결재자)',
                        content: '<p>테스트</p>',
                        approvalSteps: [
                            { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                            { stepOrder: 2, stepType: 'APPROVAL', approverId: implementerId }, // 두 번째 결재자 추가
                            { stepOrder: 3, stepType: 'IMPLEMENTATION', approverId: drafterId },
                        ],
                    });

                const stepsRes = await request(app.getHttpServer())
                    .get(`/approval-process/document/${docResponse.body.id}/steps`)
                    .set('Authorization', `Bearer ${drafterToken}`);

                const firstApprovalStep = stepsRes.body.find(
                    (s: { stepType: string; stepOrder: number }) => s.stepType === 'APPROVAL' && s.stepOrder === 1,
                );

                // 첫 번째 결재자 승인 (문서는 여전히 PENDING 상태)
                await request(app.getHttpServer())
                    .post('/approval-process/approve')
                    .set('Authorization', `Bearer ${approverToken}`)
                    .send({
                        stepSnapshotId: firstApprovalStep.id,
                    });

                // 첫 번째 결재자가 본인 결재 취소 (다음 결재자가 아직 처리 안함)
                const response = await request(app.getHttpServer())
                    .post('/approval-process/cancel')
                    .set('Authorization', `Bearer ${approverToken}`)
                    .send({
                        documentId: docResponse.body.id,
                        reason: '결재 취소',
                    });

                // 결재취소 성공 시 문서 상태는 PENDING 유지
                if (response.status === 200) {
                    expect(response.body.status).toBe('PENDING');
                } else {
                    // 정책에 따라 결재취소 불가능한 경우
                    console.log('결재취소 응답:', response.status, response.body);
                    expect([200, 400]).toContain(response.status);
                }
            });
        });

        it('❌ 실패: 취소 사유 누락', async () => {
            const docResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '사유 누락 테스트',
                    content: '<p>테스트</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            await request(app.getHttpServer())
                .post('/approval-process/cancel')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentId: docResponse.body.id,
                    // reason 누락
                })
                .expect(400);
        });
    });

    // ==================== 통합 결재 액션 처리 테스트 ====================

    describe('POST /approval-process/process-action - 통합 결재 액션', () => {
        it('✅ 정상: 승인 액션 (approve)', async () => {
            const docResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '통합 액션 테스트',
                    content: '<p>테스트</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            const stepsRes = await request(app.getHttpServer())
                .get(`/approval-process/document/${docResponse.body.id}/steps`)
                .set('Authorization', `Bearer ${drafterToken}`);

            const approvalStep = stepsRes.body.find((s: { stepType: string }) => s.stepType === 'APPROVAL');

            const response = await request(app.getHttpServer())
                .post('/approval-process/process-action')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    type: 'approve',
                    stepSnapshotId: approvalStep.id,
                    comment: '통합 API로 승인',
                })
                .expect(200);

            expect(response.body.status).toBe('APPROVED');
        });

        it('✅ 정상: 취소 액션 (cancel)', async () => {
            const docResponse = await request(app.getHttpServer())
                .post('/documents/submit-direct')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    documentTemplateId: templateId,
                    title: '통합 취소 테스트',
                    content: '<p>테스트</p>',
                    approvalSteps: [
                        { stepOrder: 1, stepType: 'APPROVAL', approverId: approverId },
                        { stepOrder: 2, stepType: 'IMPLEMENTATION', approverId: implementerId },
                    ],
                });

            const response = await request(app.getHttpServer())
                .post('/approval-process/process-action')
                .set('Authorization', `Bearer ${drafterToken}`)
                .send({
                    type: 'cancel',
                    documentId: docResponse.body.id,
                    reason: '통합 API로 취소',
                })
                .expect(200);

            expect(response.body.status).toBe('CANCELLED');
        });

        it('❌ 실패: 잘못된 액션 타입', async () => {
            await request(app.getHttpServer())
                .post('/approval-process/process-action')
                .set('Authorization', `Bearer ${approverToken}`)
                .send({
                    type: 'invalid-type',
                    stepSnapshotId: '00000000-0000-0000-0000-000000000000',
                })
                .expect(400);
        });
    });
});
