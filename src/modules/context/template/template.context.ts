import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainApprovalStepTemplateService } from '../../domain/approval-step-template/approval-step-template.service';
import { DomainCategoryService } from '../../domain/category/category.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { Employee } from '../../domain/employee/employee.entity';
import { Department } from '../../domain/department/department.entity';
import { Position } from '../../domain/position/position.entity';
import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../common/enums/approval.enum';
import { ApprovalRuleValidator } from '../../../common/utils/approval-rule-validator';
import { withTransaction } from '../../../common/utils/transaction.util';
import {
    CreateDocumentTemplateDto,
    UpdateDocumentTemplateDto,
    CreateApprovalStepTemplateDto,
    UpdateApprovalStepTemplateDto,
} from './dtos/template.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/category.dto';

/**
 * 템플릿 컨텍스트
 *
 * 역할:
 * - 문서 템플릿의 생성/수정/삭제/조회
 * - 결재단계 템플릿의 생성/수정/삭제/조회
 * - 템플릿과 결재단계 템플릿의 연관 관리
 */
@Injectable()
export class TemplateContext {
    private readonly logger = new Logger(TemplateContext.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly documentTemplateService: DomainDocumentTemplateService,
        private readonly approvalStepTemplateService: DomainApprovalStepTemplateService,
        private readonly categoryService: DomainCategoryService,
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
        private readonly positionService: DomainPositionService,
    ) {}

    /**
     * 1. 문서 템플릿 생성
     */
    async createDocumentTemplate(dto: CreateDocumentTemplateDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 템플릿 생성 시작: ${dto.name}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 카테고리 확인 (있는 경우)
                if (dto.categoryId) {
                    const category = await this.categoryService.findOne({
                        where: { id: dto.categoryId },
                        queryRunner,
                    });
                    if (!category) {
                        throw new NotFoundException(`카테고리를 찾을 수 없습니다: ${dto.categoryId}`);
                    }
                }

                const templateEntity = await this.documentTemplateService.create(
                    {
                        name: dto.name,
                        code: dto.code,
                        description: dto.description,
                        template: dto.template || '',
                        status: dto.status || DocumentTemplateStatus.DRAFT,
                        categoryId: dto.categoryId,
                    },
                    { queryRunner },
                );

                const template = await this.documentTemplateService.save(templateEntity, { queryRunner });

                this.logger.log(`문서 템플릿 생성 완료: ${template.id}`);
                return template;
            },
            externalQueryRunner,
        );
    }

    /**
     * 2. 문서 템플릿 수정
     */
    async updateDocumentTemplate(
        templateId: string,
        dto: UpdateDocumentTemplateDto,
        externalQueryRunner?: QueryRunner,
    ) {
        this.logger.log(`문서 템플릿 수정 시작: ${templateId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const template = await this.documentTemplateService.findOne({
                    where: { id: templateId },
                    queryRunner,
                });

                if (!template) {
                    throw new NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
                }

                // 카테고리 확인 (변경하는 경우)
                if (dto.categoryId !== undefined) {
                    if (dto.categoryId) {
                        const category = await this.categoryService.findOne({
                            where: { id: dto.categoryId },
                            queryRunner,
                        });
                        if (!category) {
                            throw new NotFoundException(`카테고리를 찾을 수 없습니다: ${dto.categoryId}`);
                        }
                    }
                }

                const updated = await this.documentTemplateService.update(
                    templateId,
                    {
                        ...(dto.name && { name: dto.name }),
                        ...(dto.code && { code: dto.code }),
                        ...(dto.description !== undefined && { description: dto.description }),
                        ...(dto.template !== undefined && { template: dto.template }),
                        ...(dto.status && { status: dto.status }),
                        ...(dto.categoryId !== undefined && { categoryId: dto.categoryId }),
                    },
                    { queryRunner },
                );

                this.logger.log(`문서 템플릿 수정 완료: ${templateId}`);
                return updated;
            },
            externalQueryRunner,
        );
    }

    /**
     * 3. 문서 템플릿 삭제
     * 연결된 결재단계 템플릿도 함께 삭제됩니다.
     */
    async deleteDocumentTemplate(templateId: string, externalQueryRunner?: QueryRunner) {
        this.logger.log(`문서 템플릿 삭제 시작: ${templateId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const template = await this.documentTemplateService.findOne({
                    where: { id: templateId },
                    queryRunner,
                });

                if (!template) {
                    throw new NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
                }

                // 연결된 결재단계 템플릿 조회
                const steps = await this.approvalStepTemplateService.findAll({
                    where: { documentTemplateId: templateId },
                    queryRunner,
                });

                // 연결된 결재단계 템플릿 삭제
                for (const step of steps) {
                    await this.approvalStepTemplateService.delete(step.id, { queryRunner });
                    this.logger.debug(`결재단계 템플릿 삭제: ${step.id}`);
                }

                // 문서 템플릿 삭제
                await this.documentTemplateService.delete(templateId, { queryRunner });
                this.logger.log(`문서 템플릿 삭제 완료: ${templateId}, 결재단계 템플릿 ${steps.length}개 함께 삭제`);
            },
            externalQueryRunner,
        );
    }

    /**
     * 4. 문서 템플릿 조회
     */
    async getDocumentTemplate(templateId: string) {
        this.logger.debug(`문서 템플릿 조회: ${templateId}`);
        const template = await this.documentTemplateService.findOne({
            where: { id: templateId },
            relations: ['category', 'approvalStepTemplates'],
        });

        if (!template) {
            throw new NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
        }

        return template;
    }

    /**
     * 4-1. 문서 템플릿 상세 조회 (결재자 정보 맵핑 포함)
     * AssigneeRule을 기반으로 실제 적용될 결재자 정보를 맵핑하여 반환합니다.
     *
     * @param templateId 문서 템플릿 ID
     * @param drafterId 기안자 ID (결재자 정보 맵핑을 위해 필요)
     */
    async getDocumentTemplateWithMappedApprovers(templateId: string, drafterId: string) {
        this.logger.debug(`문서 템플릿 상세 조회 (결재자 맵핑): ${templateId}, 기안자: ${drafterId}`);

        // 1. 문서 템플릿 조회
        const template = await this.documentTemplateService.findOne({
            where: { id: templateId },
            relations: ['category', 'approvalStepTemplates', 'approvalStepTemplates.targetEmployee'],
        });

        if (!template) {
            throw new NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${templateId}`);
        }

        // 2. 기안자 정보 조회
        const drafter = await this.employeeService.findOne({
            where: { id: drafterId },
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });

        if (!drafter) {
            throw new NotFoundException(`기안자를 찾을 수 없습니다: ${drafterId}`);
        }

        // 3. 기안자의 현재 부서 및 직책 정보
        const currentDepartmentPosition =
            drafter.departmentPositions?.find((dp) => dp.isManager) || drafter.departmentPositions?.[0];
        if (!currentDepartmentPosition) {
            throw new BadRequestException(`기안자의 부서/직책 정보를 찾을 수 없습니다: ${drafterId}`);
        }

        const drafterDepartment = currentDepartmentPosition.department;
        const drafterPosition = currentDepartmentPosition.position;

        // 4. 각 결재단계 템플릿에 대해 결재자 정보 맵핑
        const mappedSteps = await Promise.all(
            template.approvalStepTemplates.map(async (step) => {
                const mappedStep: any = {
                    ...step,
                    mappedApprovers: [],
                };

                switch (step.assigneeRule) {
                    case AssigneeRule.FIXED:
                        // 고정 결재자: targetEmployeeId에 지정된 직원
                        if (step.targetEmployeeId && step.targetEmployee) {
                            mappedStep.mappedApprovers = [
                                {
                                    employeeId: step.targetEmployee.id,
                                    employeeNumber: step.targetEmployee.employeeNumber,
                                    name: step.targetEmployee.name,
                                    email: step.targetEmployee.email,
                                    type: 'FIXED',
                                },
                            ];
                            delete mappedStep.targetEmployee;
                        }
                        break;

                    case AssigneeRule.DRAFTER:
                        // 기안자
                        mappedStep.mappedApprovers = [
                            {
                                employeeId: drafter.id,
                                employeeNumber: drafter.employeeNumber,
                                name: drafter.name,
                                email: drafter.email,
                                type: 'DRAFTER',
                            },
                        ];
                        break;

                    case AssigneeRule.HIERARCHY_TO_SUPERIOR:
                        // 기안자와 기안자의 직속 상급자
                        const superior = await this.findDirectSuperior(drafter, drafterDepartment, drafterPosition);
                        mappedStep.mappedApprovers = [
                            {
                                employeeId: drafter.id,
                                employeeNumber: drafter.employeeNumber,
                                name: drafter.name,
                                email: drafter.email,
                                type: 'DRAFTER',
                            },
                        ];
                        if (superior) {
                            mappedStep.mappedApprovers.push({
                                employeeId: superior.id,
                                employeeNumber: superior.employeeNumber,
                                name: superior.name,
                                email: superior.email,
                                type: 'SUPERIOR',
                            });
                        }
                        break;

                    case AssigneeRule.HIERARCHY_TO_POSITION:
                        // 기안자부터 기안자 소속부서의 부서장과 최상위부서의 부서장까지
                        // - 기안자가 일반직원인 경우: 기안자 → 기안자의 부서의 부서장 → 최상위부서의 부서장까지
                        // - 기안자가 부서장인 경우: 기안자 → 최상위부서의 부서장까지
                        const hierarchyApprovers = await this.findHierarchyApprovers(
                            drafter,
                            drafterDepartment,
                            drafterPosition,
                            step.targetPositionId,
                        );
                        mappedStep.mappedApprovers = hierarchyApprovers;
                        delete mappedStep.targetPosition;
                        break;

                    case AssigneeRule.DEPARTMENT_REFERENCE:
                        // 부서 전체 참조: targetDepartmentId에 지정된 부서의 모든 직원
                        if (step.targetDepartmentId) {
                            const departmentEmployees = await this.findDepartmentEmployees(step.targetDepartmentId);
                            mappedStep.mappedApprovers = departmentEmployees.map((emp) => ({
                                employeeId: emp.id,
                                employeeNumber: emp.employeeNumber,
                                name: emp.name,
                                email: emp.email,
                                type: 'DEPARTMENT_REFERENCE',
                            }));
                            mappedStep.targetDepartment = await this.departmentService.findOne({
                                where: { id: step.targetDepartmentId },
                            });

                            // delete mappedStep.targetDepartment;
                        }
                        break;
                }

                return mappedStep;
            }),
        );

        return {
            ...template,
            drafter: {
                id: drafter.id,
                employeeNumber: drafter.employeeNumber,
                name: drafter.name,
                email: drafter.email,
                department: {
                    id: drafterDepartment.id,
                    departmentName: drafterDepartment.departmentName,
                    departmentCode: drafterDepartment.departmentCode,
                },
                position: {
                    id: drafterPosition.id,
                    positionTitle: drafterPosition.positionTitle,
                    positionCode: drafterPosition.positionCode,
                    level: drafterPosition.level,
                },
            },
            approvalStepTemplates: mappedSteps.sort((a, b) => a.stepOrder - b.stepOrder),
        };
    }

    /**
     * 직속 상급자 찾기
     * 같은 부서에서 더 높은 직책을 가진 직원을 찾습니다.
     */
    private async findDirectSuperior(
        employee: Employee,
        department: Department,
        position: Position,
    ): Promise<Employee | null> {
        // 같은 부서의 모든 직원 조회
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });

        // 같은 부서에서 더 높은 직책(낮은 level)을 가진 직원 찾기
        const superiors = allEmployees.filter((emp) => {
            const empDeptPos = emp.departmentPositions?.find((dp) => dp.departmentId === department.id);
            if (!empDeptPos || emp.id === employee.id) return false;
            const empPosition = empDeptPos.position;
            return empPosition && empPosition.level < position.level;
        });

        // 가장 가까운 상급자 (가장 낮은 level)
        if (superiors.length > 0) {
            superiors.sort((a, b) => {
                const aDeptPos = a.departmentPositions?.find((dp) => dp.departmentId === department.id);
                const bDeptPos = b.departmentPositions?.find((dp) => dp.departmentId === department.id);
                const aLevel = aDeptPos?.position?.level || 999;
                const bLevel = bDeptPos?.position?.level || 999;
                return aLevel - bLevel;
            });
            return superiors[0];
        }

        return null;
    }

    /**
     * 계층 구조 상의 결재자들 찾기
     * 기안자부터 최상위 부서의 부서장까지의 결재자를 찾습니다.
     *
     * 로직:
     * - 기안자가 일반직원인 경우: 기안자 → 기안자의 부서의 부서장 → 최상위부서의 부서장까지
     * - 기안자가 부서장인 경우: 기안자 → 최상위부서의 부서장까지
     */
    private async findHierarchyApprovers(
        drafter: Employee,
        drafterDepartment: Department,
        drafterPosition: Position,
        targetPositionId?: string,
    ): Promise<any[]> {
        const approvers: any[] = [];

        // 1. 기안자 추가
        approvers.push({
            employeeId: drafter.id,
            employeeNumber: drafter.employeeNumber,
            name: drafter.name,
            email: drafter.email,
            type: 'DRAFTER',
        });

        // 2. 기안자가 부서장인지 확인
        const isDrafterDepartmentHead =
            drafterPosition.hasManagementAuthority || (await this.isDepartmentHead(drafter, drafterDepartment));

        // 3. 기안자의 부서부터 최상위 부서까지의 경로 찾기
        const departmentPath = await this.getDepartmentPathToRoot(drafterDepartment);

        // 4. 기안자가 부서장이 아닌 경우, 기안자의 부서의 부서장 추가
        if (!isDrafterDepartmentHead) {
            const drafterDeptHead = await this.findDepartmentHead(drafterDepartment.id);
            if (drafterDeptHead && drafterDeptHead.id !== drafter.id) {
                approvers.push({
                    employeeId: drafterDeptHead.id,
                    employeeNumber: drafterDeptHead.employeeNumber,
                    name: drafterDeptHead.name,
                    email: drafterDeptHead.email,
                    type: 'HIERARCHY',
                    departmentId: drafterDepartment.id,
                    departmentName: drafterDepartment.departmentName,
                    role: '부서장',
                });
            }
        }

        // 5. 상위 부서들의 부서장 찾기 (기안자의 부서 제외)
        const parentDepartments = departmentPath.slice(1); // 기안자의 부서 제외
        for (const dept of parentDepartments) {
            const deptHead = await this.findDepartmentHead(dept.id);
            if (deptHead && !approvers.find((a) => a.employeeId === deptHead.id)) {
                approvers.push({
                    employeeId: deptHead.id,
                    employeeNumber: deptHead.employeeNumber,
                    name: deptHead.name,
                    email: deptHead.email,
                    type: 'HIERARCHY',
                    departmentId: dept.id,
                    departmentName: dept.departmentName,
                    role: '부서장',
                });
            }
        }

        return approvers;
    }

    /**
     * 기안자가 부서장인지 확인
     */
    private async isDepartmentHead(employee: Employee, department: Department): Promise<boolean> {
        const deptPos = employee.departmentPositions?.find((dp) => dp.departmentId === department.id);
        if (!deptPos) return false;

        // 해당 부서에서 가장 높은 직책(가장 낮은 level)을 가진 직원인지 확인
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.position'],
        });

        const deptEmployees = allEmployees.filter((emp) => {
            return emp.departmentPositions?.some((dp) => dp.departmentId === department.id);
        });

        if (deptEmployees.length === 0) return false;

        const minLevel = Math.min(
            ...deptEmployees
                .map((emp) => {
                    const dp = emp.departmentPositions?.find((d) => d.departmentId === department.id);
                    return dp?.position?.level ?? 999;
                })
                .filter((level) => level !== 999),
        );

        const empDeptPos = employee.departmentPositions?.find((dp) => dp.departmentId === department.id);
        return empDeptPos?.position?.level === minLevel;
    }

    /**
     * 부서장 찾기
     * 부서에서 가장 높은 직책(가장 낮은 level)을 가진 직원을 찾습니다.
     */
    private async findDepartmentHead(departmentId: string): Promise<Employee | null> {
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });

        const deptEmployees = allEmployees.filter((emp) => {
            return emp.departmentPositions?.some((dp) => dp.departmentId === departmentId);
        });

        if (deptEmployees.length === 0) return null;

        // 가장 높은 직책(가장 낮은 level)을 가진 직원 찾기
        let departmentHead: Employee | null = null;
        let minLevel = 999;

        for (const emp of deptEmployees) {
            const deptPos = emp.departmentPositions?.find((dp) => dp.departmentId === departmentId);
            if (deptPos?.position) {
                // hasManagementAuthority가 true인 직원 우선
                if (deptPos.position.hasManagementAuthority) {
                    return emp;
                }
                // level이 더 낮은(높은 직책) 직원 찾기
                if (deptPos.position.level < minLevel) {
                    minLevel = deptPos.position.level;
                    departmentHead = emp;
                }
            }
        }

        return departmentHead;
    }

    /**
     * 부서부터 최상위 부서까지의 경로 찾기
     */
    private async getDepartmentPathToRoot(department: Department): Promise<Department[]> {
        const path: Department[] = [department];
        let current = department;

        while (current.parentDepartmentId) {
            const parent = await this.departmentService.findOne({
                where: { id: current.parentDepartmentId },
            });
            if (parent) {
                path.push(parent);
                current = parent;
            } else {
                break;
            }
        }

        return path;
    }

    /**
     * 특정 부서와 직책을 가진 직원 찾기
     */
    private async findEmployeesByDepartmentAndPosition(departmentId: string, positionId?: string): Promise<Employee[]> {
        // EmployeeDepartmentPosition을 통해 조회해야 함
        // TODO: DomainEmployeeDepartmentPositionService가 필요할 수 있음
        // 임시로 employeeService를 통해 조회
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions', 'departmentPositions.department', 'departmentPositions.position'],
        });

        return allEmployees.filter((emp) => {
            const deptPos = emp.departmentPositions?.find((dp) => dp.departmentId === departmentId);
            if (!deptPos) return false;
            if (positionId) {
                return deptPos.positionId === positionId;
            }
            return true;
        });
    }

    /**
     * 부서의 모든 직원 찾기
     */
    private async findDepartmentEmployees(departmentId: string): Promise<Employee[]> {
        const allEmployees = await this.employeeService.findAll({
            relations: ['departmentPositions'],
        });

        return allEmployees.filter((emp) => {
            return emp.departmentPositions?.some((dp) => dp.departmentId === departmentId);
        });
    }

    /**
     * 5. 문서 템플릿 목록 조회 (검색, 페이지네이션, 정렬 포함)
     */
    async getDocumentTemplates(query: {
        searchKeyword?: string;
        categoryId?: string;
        status?: DocumentTemplateStatus;
        sortOrder?: 'LATEST' | 'OLDEST';
        page?: number;
        limit?: number;
    }) {
        this.logger.debug(`문서 템플릿 목록 조회: ${JSON.stringify(query)}`);

        const { searchKeyword, categoryId, status, sortOrder = 'LATEST', page = 1, limit = 20 } = query;

        // 페이지네이션 계산
        const skip = (page - 1) * limit;

        // 기본 QueryBuilder 생성 (join 없이)
        const baseQb = this.documentTemplateService.createQueryBuilder('template');

        // 검색어 필터
        if (searchKeyword) {
            baseQb.andWhere('(template.name LIKE :keyword OR template.description LIKE :keyword)', {
                keyword: `%${searchKeyword}%`,
            });
        }

        // 카테고리 필터
        if (categoryId) {
            baseQb.andWhere('template.categoryId = :categoryId', { categoryId });
        }

        // // 상태 필터
        // if (status) {
        //     baseQb.andWhere('template.status = :status', { status });
        // }

        // 정렬
        if (sortOrder === 'LATEST') {
            baseQb.orderBy('template.createdAt', 'DESC');
        } else {
            baseQb.orderBy('template.createdAt', 'ASC');
        }

        // 1단계: 전체 개수 조회
        const totalItems = await baseQb.getCount();

        // 2단계: 페이지네이션 적용하여 template ID만 조회 (중복 없이)
        const templateIds = await baseQb.clone().select('template.id').skip(skip).take(limit).getRawMany();

        this.logger.debug(
            `페이지네이션 적용: skip=${skip}, limit=${limit}, 조회된 ID 개수=${templateIds.length}, 전체=${totalItems}`,
        );

        // 3단계: ID 기준으로 전체 데이터 조회 (category, approvalSteps 포함)
        let templates = [];
        if (templateIds.length > 0) {
            const ids = templateIds.map((item) => item.template_id);

            const templatesMap = await this.documentTemplateService
                .createQueryBuilder('template')
                .leftJoinAndSelect('template.category', 'category')
                .leftJoinAndSelect('template.approvalStepTemplates', 'approvalSteps')
                .whereInIds(ids)
                .orderBy('approvalSteps.stepOrder', 'ASC')
                .getMany();

            // ID 순서대로 정렬 (페이지네이션 순서 유지)
            const templateMap = new Map(templatesMap.map((tmpl) => [tmpl.id, tmpl]));
            templates = ids.map((id) => templateMap.get(id)).filter((tmpl) => tmpl !== undefined);
        }

        // 페이징 메타데이터 계산
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: templates,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
            },
        };
    }

    /**
     * 6. 결재단계 템플릿 생성
     */
    async createApprovalStepTemplate(dto: CreateApprovalStepTemplateDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`결재단계 템플릿 생성 시작: documentTemplateId=${dto.documentTemplateId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 문서 템플릿 확인
                const documentTemplate = await this.documentTemplateService.findOne({
                    where: { id: dto.documentTemplateId },
                    queryRunner,
                });

                if (!documentTemplate) {
                    throw new NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${dto.documentTemplateId}`);
                }

                // 규칙 검증
                const validation = ApprovalRuleValidator.validateComplete(dto.stepType, dto.assigneeRule, {
                    targetEmployeeId: dto.targetEmployeeId,
                    targetDepartmentId: dto.targetDepartmentId,
                    targetPositionId: dto.targetPositionId,
                });

                if (!validation.isValid) {
                    throw new BadRequestException(`검증 실패: ${validation.errors.join(', ')}`);
                }

                // 기존 단계들의 순서 확인
                const existingSteps = await this.approvalStepTemplateService.findAll({
                    where: { documentTemplateId: dto.documentTemplateId },
                    queryRunner,
                });

                const maxOrder = existingSteps.length > 0 ? Math.max(...existingSteps.map((s) => s.stepOrder)) : 0;
                const stepOrder = dto.stepOrder || maxOrder + 1;

                // 순서 중복 확인
                const duplicateOrder = existingSteps.find((s) => s.stepOrder === stepOrder);
                if (duplicateOrder) {
                    throw new BadRequestException(`이미 ${stepOrder}번째 순서의 단계가 존재합니다.`);
                }

                const stepEntity = await this.approvalStepTemplateService.create(
                    {
                        documentTemplateId: dto.documentTemplateId,
                        stepOrder,
                        stepType: dto.stepType,
                        assigneeRule: dto.assigneeRule,
                        targetEmployeeId: dto.targetEmployeeId,
                        targetDepartmentId: dto.targetDepartmentId,
                        targetPositionId: dto.targetPositionId,
                    },
                    { queryRunner },
                );

                const step = await this.approvalStepTemplateService.save(stepEntity, { queryRunner });

                this.logger.log(`결재단계 템플릿 생성 완료: ${step.id}`);
                return step;
            },
            externalQueryRunner,
        );
    }

    /**
     * 7. 결재단계 템플릿 수정
     */
    async updateApprovalStepTemplate(
        stepId: string,
        dto: UpdateApprovalStepTemplateDto,
        externalQueryRunner?: QueryRunner,
    ) {
        this.logger.log(`결재단계 템플릿 수정 시작: ${stepId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const step = await this.approvalStepTemplateService.findOne({
                    where: { id: stepId },
                    queryRunner,
                });

                if (!step) {
                    throw new NotFoundException(`결재단계 템플릿을 찾을 수 없습니다: ${stepId}`);
                }

                // 규칙 검증 (변경하는 경우)
                if (dto.stepType || dto.assigneeRule) {
                    const stepType = dto.stepType || step.stepType;
                    const assigneeRule = dto.assigneeRule || step.assigneeRule;

                    const validation = ApprovalRuleValidator.validateComplete(stepType, assigneeRule, {
                        targetEmployeeId: dto.targetEmployeeId ?? step.targetEmployeeId,
                        targetDepartmentId: dto.targetDepartmentId ?? step.targetDepartmentId,
                        targetPositionId: dto.targetPositionId ?? step.targetPositionId,
                    });

                    if (!validation.isValid) {
                        throw new BadRequestException(`검증 실패: ${validation.errors.join(', ')}`);
                    }
                }

                // 순서 변경 시 중복 확인
                if (dto.stepOrder !== undefined && dto.stepOrder !== step.stepOrder) {
                    const existingSteps = await this.approvalStepTemplateService.findAll({
                        where: { documentTemplateId: step.documentTemplateId },
                        queryRunner,
                    });

                    const duplicateOrder = existingSteps.find((s) => s.id !== stepId && s.stepOrder === dto.stepOrder);
                    if (duplicateOrder) {
                        throw new BadRequestException(`이미 ${dto.stepOrder}번째 순서의 단계가 존재합니다.`);
                    }
                }

                const updated = await this.approvalStepTemplateService.update(
                    stepId,
                    {
                        ...(dto.stepOrder !== undefined && { stepOrder: dto.stepOrder }),
                        ...(dto.stepType && { stepType: dto.stepType }),
                        ...(dto.assigneeRule && { assigneeRule: dto.assigneeRule }),
                        ...(dto.targetEmployeeId !== undefined && { targetEmployeeId: dto.targetEmployeeId }),
                        ...(dto.targetDepartmentId !== undefined && {
                            targetDepartmentId: dto.targetDepartmentId,
                        }),
                        ...(dto.targetPositionId !== undefined && { targetPositionId: dto.targetPositionId }),
                    },
                    { queryRunner },
                );

                this.logger.log(`결재단계 템플릿 수정 완료: ${stepId}`);
                return updated;
            },
            externalQueryRunner,
        );
    }

    /**
     * 8. 결재단계 템플릿 삭제
     */
    async deleteApprovalStepTemplate(stepId: string, externalQueryRunner?: QueryRunner) {
        this.logger.log(`결재단계 템플릿 삭제 시작: ${stepId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const step = await this.approvalStepTemplateService.findOne({
                    where: { id: stepId },
                    queryRunner,
                });

                if (!step) {
                    throw new NotFoundException(`결재단계 템플릿을 찾을 수 없습니다: ${stepId}`);
                }

                await this.approvalStepTemplateService.delete(stepId, { queryRunner });
                this.logger.log(`결재단계 템플릿 삭제 완료: ${stepId}`);
            },
            externalQueryRunner,
        );
    }

    /**
     * 10. 문서 템플릿의 결재단계 템플릿 목록 조회 (상세 정보 포함)
     */
    async getApprovalStepTemplatesByDocumentTemplate(documentTemplateId: string) {
        this.logger.debug(`결재단계 템플릿 목록 조회: documentTemplateId=${documentTemplateId}`);

        const steps = await this.approvalStepTemplateService.findAll({
            where: { documentTemplateId },
            relations: ['targetEmployee', 'targetDepartment', 'targetPosition'],
            order: { stepOrder: 'ASC' },
        });

        // 각 step에 상세 정보 추가
        const stepsWithDetails = await Promise.all(
            steps.map(async (step) => {
                const stepDetail: any = { ...step };

                // 직원 정보
                if (step.targetEmployeeId && step.targetEmployee) {
                    stepDetail.targetEmployee = {
                        id: step.targetEmployee.id,
                        employeeNumber: step.targetEmployee.employeeNumber,
                        name: step.targetEmployee.name,
                        email: step.targetEmployee.email,
                    };
                }

                // 부서 정보
                if (step.targetDepartmentId && step.targetDepartment) {
                    stepDetail.targetDepartment = {
                        id: step.targetDepartment.id,
                        departmentCode: step.targetDepartment.departmentCode,
                        departmentName: step.targetDepartment.departmentName,
                    };
                }

                // 직책 정보
                if (step.targetPositionId && step.targetPosition) {
                    stepDetail.targetPosition = {
                        id: step.targetPosition.id,
                        positionCode: step.targetPosition.positionCode,
                        positionTitle: step.targetPosition.positionTitle,
                        level: step.targetPosition.level,
                        hasManagementAuthority: step.targetPosition.hasManagementAuthority,
                    };
                }

                return stepDetail;
            }),
        );

        return stepsWithDetails;
    }

    /**
     * 11. 카테고리 생성
     */
    async createCategory(dto: CreateCategoryDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`카테고리 생성 시작: ${dto.name}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 코드 중복 확인
                const existingCategory = await this.categoryService.findOne({
                    where: { code: dto.code },
                    queryRunner,
                });

                if (existingCategory) {
                    throw new BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
                }

                const categoryEntity = await this.categoryService.create(
                    {
                        name: dto.name,
                        code: dto.code,
                        description: dto.description,
                        order: dto.order ?? 0,
                    },
                    { queryRunner },
                );

                const category = await this.categoryService.save(categoryEntity, { queryRunner });

                this.logger.log(`카테고리 생성 완료: ${category.id}`);
                return category;
            },
            externalQueryRunner,
        );
    }

    /**
     * 12. 카테고리 수정
     */
    async updateCategory(categoryId: string, dto: UpdateCategoryDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`카테고리 수정 시작: ${categoryId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const category = await this.categoryService.findOne({
                    where: { id: categoryId },
                    queryRunner,
                });

                if (!category) {
                    throw new NotFoundException(`카테고리를 찾을 수 없습니다: ${categoryId}`);
                }

                // 코드 변경 시 중복 확인
                if (dto.code && dto.code !== category.code) {
                    const existingCategory = await this.categoryService.findOne({
                        where: { code: dto.code },
                        queryRunner,
                    });

                    if (existingCategory) {
                        throw new BadRequestException(`이미 존재하는 카테고리 코드입니다: ${dto.code}`);
                    }
                }

                const updated = await this.categoryService.update(
                    categoryId,
                    {
                        ...(dto.name && { name: dto.name }),
                        ...(dto.code && { code: dto.code }),
                        ...(dto.description !== undefined && { description: dto.description }),
                        ...(dto.order !== undefined && { order: dto.order }),
                    },
                    { queryRunner },
                );

                this.logger.log(`카테고리 수정 완료: ${categoryId}`);
                return updated;
            },
            externalQueryRunner,
        );
    }

    /**
     * 13. 카테고리 삭제
     */
    async deleteCategory(categoryId: string, externalQueryRunner?: QueryRunner) {
        this.logger.log(`카테고리 삭제 시작: ${categoryId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                const category = await this.categoryService.findOne({
                    where: { id: categoryId },
                    relations: ['documentTemplates'],
                    queryRunner,
                });

                if (!category) {
                    throw new NotFoundException(`카테고리를 찾을 수 없습니다: ${categoryId}`);
                }

                // 연결된 문서 템플릿 확인
                if (category.documentTemplates && category.documentTemplates.length > 0) {
                    throw new BadRequestException(
                        `연결된 문서 템플릿이 있어 삭제할 수 없습니다. 먼저 문서 템플릿의 카테고리를 변경하세요.`,
                    );
                }

                await this.categoryService.delete(categoryId, { queryRunner });
                this.logger.log(`카테고리 삭제 완료: ${categoryId}`);
            },
            externalQueryRunner,
        );
    }

    /**
     * 14. 카테고리 조회 (단건)
     */
    async getCategory(categoryId: string) {
        this.logger.debug(`카테고리 조회: ${categoryId}`);
        const category = await this.categoryService.findOne({
            where: { id: categoryId },
            relations: ['documentTemplates'],
        });

        if (!category) {
            throw new NotFoundException(`카테고리를 찾을 수 없습니다: ${categoryId}`);
        }

        return category;
    }

    /**
     * 15. 카테고리 목록 조회
     */
    async getCategories() {
        this.logger.debug('카테고리 목록 조회');
        return await this.categoryService.findAll({
            relations: ['documentTemplates'],
            order: { order: 'ASC', createdAt: 'ASC' },
        });
    }
}
