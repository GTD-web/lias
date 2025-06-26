import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UpdateDraftDocumentDto, ApprovalResponseDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainFileService } from 'src/modules/domain/file/file.service';
import { ApprovalStatus } from 'src/common/enums/approval.enum';

@Injectable()
export class UpdateDraftUseCase {
    constructor(
        private readonly dataSource: DataSource,
        private readonly domainDocumentService: DomainDocumentService,
        private readonly domainApprovalStepService: DomainApprovalStepService,
        private readonly domainFileService: DomainFileService,
    ) {}

    async execute(id: string, draftData: UpdateDraftDocumentDto): Promise<ApprovalResponseDto> {
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            // 트랜잭션 시작
            await queryRunner.connect();
            await queryRunner.startTransaction();

            // 1. 기존 문서 조회
            const existingDocument = await this.domainDocumentService.findOne({
                where: { documentId: id },
                relations: ['drafter', 'approvalSteps', 'parentDocument', 'files'],
            });

            if (!existingDocument) {
                throw new NotFoundException('Document not found');
            }

            // 2. 문서 상태 검증 (PENDING일 때만 수정 가능)
            if (existingDocument.status !== ApprovalStatus.PENDING) {
                throw new BadRequestException('Only documents with PENDING status can be updated');
            }

            // 3. 결재단계 검증 (하나라도 승인된 상태면 에러)
            if (existingDocument.approvalSteps && existingDocument.approvalSteps.length > 0) {
                const hasApprovedStep = existingDocument.approvalSteps.some((step) => step.approvedDate !== null);
                if (hasApprovedStep) {
                    throw new BadRequestException('Cannot update document with approved steps');
                }
            }

            // 4. 문서 기본 정보 업데이트
            const { approvalSteps, files, ...documentUpdateData } = draftData;
            const updatedDocument = await this.domainDocumentService.update(id, documentUpdateData, { queryRunner });

            // 5. 결재단계 처리 (기존 삭제 후 새로 생성)
            if (approvalSteps) {
                // 기존 결재단계 삭제
                if (existingDocument.approvalSteps && existingDocument.approvalSteps.length > 0) {
                    await Promise.all(
                        existingDocument.approvalSteps.map((step) =>
                            this.domainApprovalStepService.delete(step.approvalStepId, { queryRunner }),
                        ),
                    );
                }

                // 새로운 결재단계 생성
                const approvalStepsData = approvalSteps.map((step) => ({
                    ...step,
                    documentId: id,
                }));

                await Promise.all(
                    approvalStepsData.map((stepData) => this.domainApprovalStepService.save(stepData, { queryRunner })),
                );
            }

            // 6. 파일 처리 (기존 파일과 비교하여 삭제/업데이트/생성)
            if (files) {
                const existingFileIds = existingDocument.files?.map((file) => file.fileId) || [];
                const newFileIds = files.map((file) => file.fileId);

                // 삭제할 파일들 (기존에 있지만 새 데이터에 없는 파일들)
                const filesToDelete = existingFileIds.filter((fileId) => !newFileIds.includes(fileId));
                if (filesToDelete.length > 0) {
                    await Promise.all(
                        filesToDelete.map((fileId) => this.domainFileService.delete(fileId, { queryRunner })),
                    );
                }

                // 업데이트/생성할 파일들
                const filesToProcess = files.map((file) => ({
                    ...file,
                    documentId: id,
                }));

                await Promise.all(
                    filesToProcess.map((fileData) => {
                        if (existingFileIds.includes(fileData.fileId)) {
                            // 기존 파일 업데이트
                            return this.domainFileService.update(fileData.fileId, fileData, { queryRunner });
                        } else {
                            // 새 파일 생성
                            return this.domainFileService.save(fileData, { queryRunner });
                        }
                    }),
                );
            }

            // 트랜잭션 커밋
            await queryRunner.commitTransaction();

            // 7. 업데이트된 문서 조회하여 반환
            const response = await this.domainDocumentService.findOne({
                where: { documentId: id },
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
