import { Injectable } from '@nestjs/common';
import { ApprovalResponseDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { ApprovalStatus, ApprovalStepType, DocumentListType } from 'src/common/enums/approval.enum';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { In, IsNull, Not } from 'typeorm';
import { Employee } from 'src/database/entities/employee.entity';

@Injectable()
export class GetApprovalDocumentsUseCase {
    constructor(private readonly domainDocumentService: DomainDocumentService) {}

    async execute(
        user: Employee,
        query: PaginationQueryDto,
        listType: DocumentListType,
    ): Promise<PaginationData<ApprovalResponseDto>> {
        const offset = (query.page - 1) * query.limit;
        const [documents, total] = await this.domainDocumentService.findAndCount({
            where: this.getQueryCondition(listType, user),
            relations: ['approvalSteps'],
            skip: offset,
            take: query.limit,
        });
        const documentData = await this.domainDocumentService.findAll({
            where: {
                documentId: In(documents.map((document) => document.documentId)),
            },
            relations: ['drafter', 'approvalSteps', 'approvalSteps.approver', 'parentDocument', 'files'],
            order: {
                createdAt: 'DESC',
                approvalSteps: {
                    order: 'ASC',
                },
            },
        });
        return {
            items: documentData.map((document) => {
                const currentStep = document.approvalSteps.find((step) => step.isCurrent);
                return {
                    ...document,
                    currentStep: currentStep,
                };
            }),
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }

    private getQueryCondition(listType: DocumentListType, user: Employee) {
        const conditions = {
            [DocumentListType.DRAFTED]: { drafterId: user.employeeId },
            [DocumentListType.PENDING_APPROVAL]: {
                status: ApprovalStatus.PENDING,
                approvalSteps: {
                    type: ApprovalStepType.APPROVAL,
                    approvedDate: IsNull(),
                    approverId: user.employeeId,
                    isCurrent: true,
                },
            },
            [DocumentListType.PENDING_AGREEMENT]: {
                status: ApprovalStatus.PENDING,
                approvalSteps: {
                    type: ApprovalStepType.AGREEMENT,
                    approvedDate: IsNull(),
                    approverId: user.employeeId,
                    isCurrent: true,
                },
            },
            [DocumentListType.APPROVED]: {
                drafterId: user.employeeId,
                status: ApprovalStatus.APPROVED,
            },
            [DocumentListType.REJECTED]: {
                drafterId: user.employeeId,
                status: ApprovalStatus.REJECTED,
            },
            [DocumentListType.RECEIVED_REFERENCE]: {
                approvalSteps: {
                    type: ApprovalStepType.REFERENCE,
                    approverId: user.employeeId,
                },
            },
            [DocumentListType.IMPLEMENTATION]: {
                status: ApprovalStatus.APPROVED,
                approvalSteps: {
                    type: ApprovalStepType.IMPLEMENTATION,
                    approverId: user.employeeId,
                },
            },
        };

        return conditions[listType];
    }
}
