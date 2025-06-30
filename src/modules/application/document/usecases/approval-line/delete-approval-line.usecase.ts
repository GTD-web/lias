import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants/error-message';
import { DomainFormApprovalLineService } from 'src/modules/domain/form-approval-line/form-approval-line.service';
import { DomainFormApprovalStepService } from 'src/modules/domain/form-approval-step/form-approval-step.service';
import { DataSource } from 'typeorm';

@Injectable()
export class DeleteApprovalLineUseCase {
    constructor(
        private readonly formApprovalLineService: DomainFormApprovalLineService,
        private readonly formApprovalStepService: DomainFormApprovalStepService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(id: string): Promise<boolean> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.formApprovalStepService.deleteByFormApprovalLineId(id, { queryRunner });
            await this.formApprovalLineService.delete(id, { queryRunner });
            await queryRunner.commitTransaction();
            return true;
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw new NotAcceptableException(ERROR_MESSAGE.BUSINESS.APPROVAL.DELETE_FAILED);
        } finally {
            await queryRunner.release();
        }
    }
}
