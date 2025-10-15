import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DomainEmployeeDepartmentPositionRepository } from './employee-department-position.repository';
import { BaseService } from '../../../common/services/base.service';
import { EmployeeDepartmentPosition } from '../../../database/entities';

@Injectable()
export class DomainEmployeeDepartmentPositionService extends BaseService<EmployeeDepartmentPosition> {
    constructor(private readonly employeeDepartmentPositionRepository: DomainEmployeeDepartmentPositionRepository) {
        super(employeeDepartmentPositionRepository);
    }

    /**
     * ID로 찾기
     */
    async findById(id: string): Promise<EmployeeDepartmentPosition> {
        const edp = await this.employeeDepartmentPositionRepository.findOne({
            where: { id },
            relations: ['employee', 'department', 'position'],
        });
        if (!edp) {
            throw new NotFoundException('직원-부서-직책 정보를 찾을 수 없습니다.');
        }
        return edp;
    }

    /**
     * 특정 직원의 모든 부서-직책 정보 조회
     */
    async findByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition[]> {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId },
            relations: ['department', 'position'],
            order: { createdAt: 'DESC' },
        });
    }

    /**
     * 특정 부서의 모든 직원 조회
     */
    async findByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]> {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            relations: ['employee', 'position'],
            order: { createdAt: 'ASC' },
        });
    }

    /**
     * 특정 부서의 관리자 조회
     */
    async findManagersByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]> {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId, isManager: true },
            relations: ['employee', 'position'],
            order: { createdAt: 'ASC' },
        });
    }

    /**
     * 특정 직원의 특정 부서에서의 정보 조회
     */
    async findByEmployeeAndDepartment(
        employeeId: string,
        departmentId: string,
    ): Promise<EmployeeDepartmentPosition | null> {
        return await this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId, departmentId },
            relations: ['employee', 'department', 'position'],
        });
    }

    /**
     * 직원-부서-직책 정보 생성 (중복 체크 포함)
     */
    async createEmployeeDepartmentPosition(
        employeeId: string,
        departmentId: string,
        positionId: string,
        isManager: boolean = false,
    ): Promise<EmployeeDepartmentPosition> {
        // 중복 체크
        const existing = await this.findByEmployeeAndDepartment(employeeId, departmentId);
        if (existing) {
            throw new ConflictException('해당 직원은 이미 이 부서에 배정되어 있습니다.');
        }

        const edp = await this.employeeDepartmentPositionRepository.create({
            employeeId,
            departmentId,
            positionId,
            isManager,
        });

        return await this.employeeDepartmentPositionRepository.save(edp);
    }

    /**
     * 직원의 부서-직책 정보 업데이트
     */
    async updateEmployeeDepartmentPosition(
        id: string,
        positionId?: string,
        isManager?: boolean,
    ): Promise<EmployeeDepartmentPosition> {
        const edp = await this.findById(id);

        if (positionId !== undefined) {
            edp.positionId = positionId;
        }
        if (isManager !== undefined) {
            edp.isManager = isManager;
        }

        return await this.employeeDepartmentPositionRepository.save(edp);
    }

    /**
     * 직원의 부서 배정 제거
     */
    async removeEmployeeDepartmentPosition(id: string): Promise<void> {
        await this.employeeDepartmentPositionRepository.delete(id);
    }

    /**
     * 특정 직책을 가진 모든 직원 조회
     */
    async findByPositionId(positionId: string): Promise<EmployeeDepartmentPosition[]> {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { positionId },
            relations: ['employee', 'department'],
            order: { createdAt: 'ASC' },
        });
    }

    /**
     * 모든 관리자 조회
     */
    async findAllManagers(): Promise<EmployeeDepartmentPosition[]> {
        return await this.employeeDepartmentPositionRepository.findAll({
            where: { isManager: true },
            relations: ['employee', 'department', 'position'],
            order: { createdAt: 'ASC' },
        });
    }
}
