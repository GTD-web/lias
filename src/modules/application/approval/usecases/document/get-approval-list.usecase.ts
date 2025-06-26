import { Injectable } from '@nestjs/common';
import { ApprovalResponseDto } from '../../dtos';
import { DomainDocumentService } from 'src/modules/domain/document/document.service';
import { ApprovalStatus, ApprovalStepType } from 'src/common/enums/approval.enum';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { In, IsNull, Not } from 'typeorm';
import { Employee } from 'src/database/entities/employee.entity';

@Injectable()
export class GetApprovalListUseCase {
    constructor(private readonly domainDocumentService: DomainDocumentService) {}

    async execute(
        user: Employee,
        query: PaginationQueryDto,
        status: ApprovalStatus | ApprovalStatus[],
        stepType: ApprovalStepType | ApprovalStepType[],
    ): Promise<PaginationData<ApprovalResponseDto>> {
        const offset = (query.page - 1) * query.limit;
        console.log(user.employeeId);
        const [documents, total] = await this.domainDocumentService.findAndCount({
            where: {
                ...(status
                    ? {
                          status: In(Array.isArray(status) ? status : [status]),
                          //   drafterId: user.employeeId,
                      }
                    : {}),
                ...(stepType
                    ? {
                          approvalSteps: {
                              type: In(Array.isArray(stepType) ? stepType : [stepType]),
                              //   approvedDate: IsNull(),
                              approverId: user.employeeId,
                          },
                      }
                    : {}),
            },
            relations: ['drafter', 'approvalSteps', 'parentDocument', 'files', 'approvalSteps.approver'],
            skip: offset,
            take: query.limit,
            order: {
                createdAt: 'DESC',
            },
        });
        console.log(
            JSON.stringify(
                documents.map((document) => {
                    console.log(
                        document.approvalSteps
                            .map((step) => {
                                return {
                                    approverId: step.approver.employeeId,
                                    approver: step.approver.name,
                                    type: step.type,
                                    isApproved: step.isApproved,
                                    approvedDate: step.approvedDate,
                                };
                            })
                            .filter((step) => step.approverId === user.employeeId),
                    );
                    return {
                        documentId: document.documentId,
                        title: document.title,
                        status: document.status,
                        createdAt: document.createdAt,
                        drafter: document.drafter.name,
                        approver: document.approvalSteps
                            .map((step) => {
                                return {
                                    approverId: step.approver.employeeId,
                                    approver: step.approver.name,
                                    type: step.type,
                                    isApproved: step.isApproved,
                                    approvedDate: step.approvedDate,
                                };
                            })
                            .filter((step) => step.approverId === user.employeeId),
                    };
                }),
                null,
                2,
            ),
        );
        return {
            items: documents,
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }
}
