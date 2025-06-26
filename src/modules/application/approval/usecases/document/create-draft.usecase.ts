import { Injectable } from '@nestjs/common';
import { DataSource, Like } from 'typeorm';
import { ApprovalResponseDto, CreateDraftDocumentDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainFileService } from 'src/modules/domain/file/file.service';
import { ApprovalStatus } from 'src/common/enums/approval.enum';
import { Employee } from 'src/database/entities/employee.entity';
import { DateUtil } from 'src/common/utils/date.util';

@Injectable()
export class CreateDraftUseCase {
    constructor(
        private readonly dataSource: DataSource,
        private readonly domainDocumentService: DomainDocumentService,
        private readonly domainApprovalStepService: DomainApprovalStepService,
        private readonly domainFileService: DomainFileService,
    ) {}

    async execute(user: Employee, draftData: CreateDraftDocumentDto): Promise<ApprovalResponseDto> {
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            // 트랜잭션 시작
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const year = new Date().getFullYear();
            // 1. 문서 생성
            const [_, count] = await this.domainDocumentService.findAndCount({
                where: {
                    documentNumber: Like(`${draftData.documentNumber}-${year}-%`),
                },
            });

            const nextCount = count + 1;
            const formattedCount = nextCount.toString().padStart(4, '0');
            const document = await this.domainDocumentService.save(
                {
                    ...draftData,
                    drafterId: user.employeeId,
                    status: ApprovalStatus.PENDING,
                    documentNumber: `${draftData.documentNumber}-${year}-${formattedCount}`,
                },
                { queryRunner },
            );

            // 2. 결재 단계 데이터 생성 (문서 ID 추가)
            if (draftData.approvalSteps && draftData.approvalSteps.length > 0) {
                const approvalStepsData = draftData.approvalSteps.map((step) => ({
                    ...step,
                    documentId: document.documentId, // 생성된 문서 ID 추가
                }));

                await Promise.all(
                    approvalStepsData.map((stepData) => this.domainApprovalStepService.save(stepData, { queryRunner })),
                );
            }

            // 3. 파일 데이터 생성 (문서 ID 추가)
            if (draftData.files && draftData.files.length > 0) {
                const filesData = draftData.files.map((file) => ({
                    ...file,
                    documentId: document.documentId, // 생성된 문서 ID 추가
                }));

                await Promise.all(
                    filesData.map((fileData) =>
                        this.domainFileService.update(fileData.fileId, fileData, { queryRunner }),
                    ),
                );
            }

            // 트랜잭션 커밋
            await queryRunner.commitTransaction();

            // 5. 기안자가 결재해야하는 결재 단계를 승인으로 변경
            if (draftData.approvalSteps && draftData.approvalSteps.length > 0) {
                const approvalSteps = await this.domainApprovalStepService.findOne({
                    where: {
                        documentId: document.documentId,
                        approverId: user.employeeId,
                    },
                });
                if (approvalSteps) {
                    await this.domainApprovalStepService.update(
                        approvalSteps.approvalStepId,
                        {
                            isApproved: true,
                            approvedDate: DateUtil.now().toDate(),
                        },
                        { queryRunner },
                    );
                }
            }

            // 4. 생성된 문서와 관계 데이터를 포함한 응답 생성
            const response: ApprovalResponseDto = await this.domainDocumentService.findOne({
                where: {
                    documentId: document.documentId,
                },
                relations: ['drafter', 'approvalSteps', 'parentDocument', 'files'],
            });

            return response;
        } catch (error) {
            // 트랜잭션 롤백
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // queryRunner 해제
            await queryRunner.release();
        }
    }
}
