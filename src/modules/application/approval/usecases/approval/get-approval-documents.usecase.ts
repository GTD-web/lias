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

        if (documents.length === 0) {
            return {
                items: [],
                meta: {
                    total,
                    page: query.page,
                    limit: query.limit,
                    hasNext: false,
                },
            };
        }

        // QueryBuilder로 최적화된 조회
        const documentIds = documents.map((doc) => doc.documentId);

        const documentData = await this.domainDocumentService
            .createQueryBuilder('document')
            .leftJoinAndSelect('document.drafter', 'drafter')
            .leftJoinAndSelect('drafter.departmentPositions', 'drafterDeptPos')
            .leftJoinAndSelect('drafterDeptPos.department', 'drafterDept')
            .leftJoinAndSelect('drafterDeptPos.position', 'drafterPos')
            .leftJoinAndSelect('drafter.currentRank', 'drafterRank')
            .leftJoinAndSelect('document.approvalSteps', 'approvalSteps')
            .leftJoinAndSelect('approvalSteps.approver', 'approver')
            .leftJoinAndSelect('approver.departmentPositions', 'approverDeptPos')
            .leftJoinAndSelect('approverDeptPos.department', 'approverDept')
            .leftJoinAndSelect('approverDeptPos.position', 'approverPos')
            .leftJoinAndSelect('approver.currentRank', 'approverRank')
            .leftJoinAndSelect('document.parentDocument', 'parentDocument')
            .leftJoinAndSelect('document.files', 'files')
            .where('document.documentId IN (:...documentIds)', { documentIds })
            .orderBy('document.createdAt', 'DESC')
            .addOrderBy('approvalSteps.order', 'ASC')
            .getMany();

        return {
            items: documentData.map((document) => {
                const currentStep = document.approvalSteps.find((step) => step.isCurrent);
                return {
                    documentId: document.documentId,
                    documentNumber: document.documentNumber,
                    documentType: document.documentType,
                    title: document.title,
                    content: document.content,
                    status: document.status,
                    retentionPeriod: document.retentionPeriod,
                    retentionPeriodUnit: document.retentionPeriodUnit,
                    retentionStartDate: document.retentionStartDate,
                    retentionEndDate: document.retentionEndDate,
                    implementDate: document.implementDate,
                    createdAt: document.createdAt,
                    updatedAt: document.updatedAt,
                    drafter: this.mapEmployeeToDto(document.drafter),
                    approvalSteps: document.approvalSteps.map((step) => ({
                        type: step.type,
                        order: step.order,
                        isApproved: step.isApproved,
                        approvedDate: step.approvedDate,
                        isCurrent: step.isCurrent,
                        createdAt: step.createdAt,
                        updatedAt: step.updatedAt,
                        approver: this.mapEmployeeToDto(step.approver),
                    })),
                    currentStep: currentStep
                        ? {
                              type: currentStep.type,
                              order: currentStep.order,
                              isApproved: currentStep.isApproved,
                              approvedDate: currentStep.approvedDate,
                              isCurrent: currentStep.isCurrent,
                              createdAt: currentStep.createdAt,
                              updatedAt: currentStep.updatedAt,
                              approver: this.mapEmployeeToDto(currentStep.approver),
                          }
                        : undefined,
                    parentDocument: document.parentDocument,
                    files: document.files || [],
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

    private mapEmployeeToDto(employee: Employee) {
        if (!employee) return null;

        // 첫 번째 부서-직책 정보 가져오기 (여러 개일 경우 첫 번째 사용)
        const primaryDeptPosition = employee.departmentPositions?.[0];
        const department = primaryDeptPosition?.department?.departmentCode || '';
        const position = primaryDeptPosition?.position?.positionTitle || '';
        const rank = employee.currentRank?.rankTitle || '';

        return {
            employeeId: employee.id,
            name: employee.name,
            employeeNumber: employee.employeeNumber,
            email: employee.email,
            department: department,
            position: position,
            rank: rank,
        };
    }

    private getQueryCondition(listType: DocumentListType, user: Employee) {
        const conditions = {
            [DocumentListType.ASSIGNED]: {
                approvalSteps: {
                    approverId: user.id,
                },
            },
            [DocumentListType.DRAFTED]: { drafterId: user.id },
            [DocumentListType.PENDING_APPROVAL]: {
                status: ApprovalStatus.PENDING,
                approvalSteps: {
                    type: ApprovalStepType.APPROVAL,
                    approvedDate: IsNull(),
                    approverId: user.id,
                    isCurrent: true,
                },
            },
            [DocumentListType.PENDING_AGREEMENT]: {
                status: ApprovalStatus.PENDING,
                approvalSteps: {
                    type: ApprovalStepType.AGREEMENT,
                    approvedDate: IsNull(),
                    approverId: user.id,
                    isCurrent: true,
                },
            },
            [DocumentListType.APPROVED]: {
                drafterId: user.id,
                status: ApprovalStatus.APPROVED,
            },
            [DocumentListType.REJECTED]: {
                drafterId: user.id,
                status: ApprovalStatus.REJECTED,
            },
            [DocumentListType.RECEIVED_REFERENCE]: {
                approvalSteps: {
                    type: ApprovalStepType.REFERENCE,
                    approverId: user.id,
                    approvedDate: IsNull(),
                },
            },
            [DocumentListType.IMPLEMENTATION]: {
                status: ApprovalStatus.APPROVED,
                approvalSteps: {
                    type: ApprovalStepType.IMPLEMENTATION,
                    approverId: user.id,
                    approvedDate: IsNull(),
                },
            },
        };

        return conditions[listType];
    }
}
