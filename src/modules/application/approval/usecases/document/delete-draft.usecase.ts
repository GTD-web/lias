import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainFileService } from 'src/modules/domain/file/file.service';
import { ApprovalStatus } from 'src/common/enums/approval.enum';

@Injectable()
export class DeleteDraftUseCase {
    constructor(
        private readonly dataSource: DataSource,
        private readonly domainDocumentService: DomainDocumentService,
        private readonly domainApprovalStepService: DomainApprovalStepService,
        private readonly domainFileService: DomainFileService,
    ) {}

    async execute(id: string): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            // 트랜잭션 시작
            await queryRunner.connect();
            await queryRunner.startTransaction();

            // 1. 기존 문서 조회
            const existingDocument = await this.domainDocumentService.findOne({
                where: { documentId: id },
                relations: ['approvalSteps', 'files'],
            });

            if (!existingDocument) {
                throw new NotFoundException('Document not found');
            }

            // 2. 문서 상태 검증 (PENDING일 때만 삭제 가능)
            if (existingDocument.status !== ApprovalStatus.PENDING) {
                throw new BadRequestException('Only documents with PENDING status can be deleted');
            }

            // 3. 결재단계 삭제
            if (existingDocument.approvalSteps && existingDocument.approvalSteps.length > 0) {
                await Promise.all(
                    existingDocument.approvalSteps.map((step) =>
                        this.domainApprovalStepService.delete(step.approvalStepId, { queryRunner }),
                    ),
                );
            }

            // 4. 파일 삭제
            if (existingDocument.files && existingDocument.files.length > 0) {
                await Promise.all(
                    existingDocument.files.map((file) => this.domainFileService.delete(file.fileId, { queryRunner })),
                );
            }

            // 5. 문서 삭제
            await this.domainDocumentService.delete(id, { queryRunner });

            // 트랜잭션 커밋
            await queryRunner.commitTransaction();
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
