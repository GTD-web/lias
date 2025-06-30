import { Injectable } from '@nestjs/common';
import { DataSource, Like, QueryRunner } from 'typeorm';
import { ApprovalResponseDto, CreateDraftDocumentDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { DomainFileService } from 'src/modules/domain/file/file.service';
import { ApprovalStatus } from 'src/common/enums/approval.enum';
import { Document, Employee } from 'src/database/entities';
import { DateUtil } from 'src/common/utils/date.util';

@Injectable()
export class CreateDraftUseCase {
    constructor(
        private readonly dataSource: DataSource,
        private readonly domainDocumentService: DomainDocumentService,
        private readonly domainApprovalStepService: DomainApprovalStepService,
        private readonly domainFileService: DomainFileService,
    ) {}

    async execute(user: Employee, draftData: CreateDraftDocumentDto, queryRunner: QueryRunner): Promise<Document> {
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

        return document;
    }
}
