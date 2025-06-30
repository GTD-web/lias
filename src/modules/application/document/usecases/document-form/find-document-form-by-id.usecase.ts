import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentFormService } from '../../../../domain/document-form/document-form.service';
import { DocumentFormResponseDto } from '../../dtos/document-form.dto';
import { Employee } from 'src/database/entities/employee.entity';
import { AutoFillType, ApprovalStepType } from 'src/common/enums/approval.enum';
import { DataSource } from 'typeorm';
import { FormApprovalStep } from 'src/database/entities/form-approval-step.entity';
import { DomainFormApprovalStepService } from 'src/modules/domain/form-approval-step/form-approval-step.service';
import { DomainDepartmentService } from 'src/modules/domain/department/department.service';
import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';

@Injectable()
export class FindDocumentFormByIdUseCase {
    constructor(
        private readonly documentFormService: DomainDocumentFormService,
        private readonly formApprovalStepService: DomainFormApprovalStepService,
        private readonly departmentService: DomainDepartmentService,
        private readonly employeeService: DomainEmployeeService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(documentFormId: string, user: Employee): Promise<DocumentFormResponseDto> {
        const documentForm = await this.documentFormService.findOne({
            where: { documentFormId },
            relations: [
                'documentType',
                'formApprovalLine',
                'formApprovalLine.formApprovalSteps',
                'formApprovalLine.formApprovalSteps.defaultApprover',
            ],
        });

        if (!documentForm) {
            throw new NotFoundException('문서 양식을 찾을 수 없습니다.');
        }

        // APPROVAL 타입이 없고 autoFillType이 설정된 경우 자동으로 결재자 추가
        const hasApprovalSteps = documentForm.formApprovalLine?.formApprovalSteps?.some(
            (step) => step.type === ApprovalStepType.APPROVAL,
        );

        if (!hasApprovalSteps && documentForm.autoFillType !== AutoFillType.NONE) {
            const autoApprovalSteps = await this.generateAutoApprovalSteps(user, documentForm.autoFillType);
            // 기존 formApprovalSteps에 자동 생성된 APPROVAL 단계 추가
            if (documentForm.formApprovalLine) {
                documentForm.formApprovalLine.formApprovalSteps = [
                    ...documentForm.formApprovalLine.formApprovalSteps,
                    ...autoApprovalSteps,
                ];
            }
        }

        return documentForm;
    }

    private async generateAutoApprovalSteps(user: Employee, autoFillType: AutoFillType) {
        const autoApprovalSteps = [];
        const newApprovalStep = await this.formApprovalStepService.create({
            type: ApprovalStepType.APPROVAL,
            order: autoApprovalSteps.length + 1,
            defaultApprover: user,
        });

        // 기안자 본인만 추가
        autoApprovalSteps.push(newApprovalStep);
        if (autoFillType === AutoFillType.DRAFTER_SUPERIOR) {
            // 본인을 포함한 상급자들 추가
            const superiors = await this.findSuperiorsByDepartment(user.department, user.employeeId, user.position);

            // 상급자들을 순서대로 추가
            for (let index = 0; index < superiors.length; index++) {
                const superior = superiors[index];
                const newApprovalStep = await this.formApprovalStepService.create({
                    type: ApprovalStepType.APPROVAL,
                    order: autoApprovalSteps.length + 1,
                    defaultApprover: superior,
                });
                autoApprovalSteps.push(newApprovalStep);
            }
        }

        return autoApprovalSteps;
    }

    private async findSuperiorsByDepartment(
        departmentCode: string,
        currentUserId: string,
        currentUserPosition: string,
    ): Promise<Employee[]> {
        // 직급 순서 정의 (낮은 순서부터 높은 순서로)
        const positionOrder = ['직원', '파트장', 'PM', '실장', '임원'];

        // 현재 사용자의 직급 인덱스 찾기
        const currentUserPositionIndex = positionOrder.indexOf(currentUserPosition);
        if (currentUserPositionIndex === -1) {
            // 현재 사용자의 직급이 정의되지 않은 경우 빈 배열 반환
            return [];
        }

        // 현재 사용자보다 높은 직급들만 필터링
        const superiorRanks = positionOrder.slice(currentUserPositionIndex + 1);
        if (superiorRanks.length === 0) {
            // 상급자가 없는 경우 빈 배열 반환
            return [];
        }

        // 현재 부서부터 상위 부서까지 순서대로 flat하게 만들기
        const departmentHierarchy = await this.getDepartmentHierarchy(departmentCode);

        // 각 부서에서 직원을 제외한 직급의 인원 찾기
        const superiors = await this.findSuperiorsInHierarchy(departmentHierarchy, currentUserId, superiorRanks);
        return superiors;
    }

    private async getDepartmentHierarchy(departmentCode: string): Promise<string[]> {
        const hierarchy: string[] = [departmentCode];

        // 재귀적으로 상위 부서들을 찾기
        const findUpperDepts = async (deptCode: string) => {
            const dept = await this.departmentService.findOne({
                where: { departmentCode: deptCode },
            });

            if (dept && dept.parentDepartmentId) {
                const parentDept = await this.departmentService.findOne({
                    where: { departmentId: dept.parentDepartmentId },
                });

                if (parentDept) {
                    hierarchy.push(parentDept.departmentCode);
                    await findUpperDepts(parentDept.departmentCode);
                }
            }
        };

        await findUpperDepts(departmentCode);
        return hierarchy;
    }

    private async findSuperiorsInHierarchy(
        departmentHierarchy: string[],
        currentUserId: string,
        superiorPositions: string[],
    ): Promise<Employee[]> {
        const superiors: Employee[] = [];

        // 각 부서를 순서대로 돌면서 상급자 찾기
        for (const dept of departmentHierarchy) {
            // 복잡한 쿼리는 DataSource를 사용 (직급별 정렬 등)
            const deptSuperiors = await this.dataSource
                .getRepository(Employee)
                .createQueryBuilder('employee')
                .where('employee.department = :department', { department: dept })
                .andWhere('employee.employeeId != :currentUserId', { currentUserId })
                .andWhere('employee.position IN (:...superiorPositions)', { superiorPositions })
                .orderBy(
                    'CASE employee.position ' +
                        superiorPositions.map((position, index) => `WHEN '${position}' THEN ${index}`).join(' ') +
                        ' END',
                    'ASC',
                )
                .getMany();

            superiors.push(...deptSuperiors);
        }

        return superiors;
    }
}
