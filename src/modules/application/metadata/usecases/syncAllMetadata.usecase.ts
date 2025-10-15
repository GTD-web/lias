import { Injectable, Logger } from '@nestjs/common';
import { ExportAllDataResponseDto } from '../dtos/export-all-data.dto';
import { DomainPositionService } from '../../../domain/position/position.service';
import { DomainRankService } from '../../../domain/rank/rank.service';
import { DomainDepartmentService } from '../../../domain/department/department.service';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { DomainEmployeeDepartmentPositionService } from '../../../domain/employee-department-position/employee-department-position.service';

@Injectable()
export class SyncAllMetadataUsecase {
    private readonly logger = new Logger(SyncAllMetadataUsecase.name);

    constructor(
        private readonly positionService: DomainPositionService,
        private readonly rankService: DomainRankService,
        private readonly departmentService: DomainDepartmentService,
        private readonly employeeService: DomainEmployeeService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
    ) {}

    async execute(data: ExportAllDataResponseDto): Promise<void> {
        this.logger.log('전체 메타데이터 동기화 시작');

        try {
            // 1. Position 동기화 (다른 엔티티에서 참조하지 않음)
            await this.syncPositions(data.positions);

            // 2. Rank 동기화 (다른 엔티티에서 참조하지 않음)
            await this.syncRanks(data.ranks);

            // 3. Department 동기화
            await this.syncDepartments(data.departments);

            // 4. Employee 동기화 (Rank 참조)
            await this.syncEmployees(data.employees);

            // 5. EmployeeDepartmentPosition 동기화 (Employee, Department, Position 참조)
            await this.syncEmployeeDepartmentPositions(data.employeeDepartmentPositions);

            this.logger.log('전체 메타데이터 동기화 완료');
        } catch (error) {
            this.logger.error('전체 메타데이터 동기화 실패', error);
            throw error;
        }
    }

    private async syncPositions(positions: any[]): Promise<void> {
        this.logger.log(`Position 동기화 시작 (${positions.length}개)`);

        for (const position of positions) {
            try {
                const existing = await this.positionService.findOne({ where: { id: position.id } });

                if (existing) {
                    // 업데이트
                    existing.positionTitle = position.positionTitle;
                    existing.positionCode = position.positionCode;
                    existing.level = position.level;
                    existing.hasManagementAuthority = position.hasManagementAuthority;
                    await this.positionService.save(existing);
                    this.logger.debug(`Position 업데이트: ${position.positionTitle}`);
                } else {
                    // 생성
                    const newPosition = await this.positionService.create({
                        id: position.id,
                        positionTitle: position.positionTitle,
                        positionCode: position.positionCode,
                        level: position.level,
                        hasManagementAuthority: position.hasManagementAuthority,
                    });
                    await this.positionService.save(newPosition);
                    this.logger.debug(`Position 생성: ${position.positionTitle}`);
                }
            } catch (error) {
                this.logger.error(`Position 동기화 실패: ${position.positionTitle}`, error);
            }
        }

        this.logger.log('Position 동기화 완료');
    }

    private async syncRanks(ranks: any[]): Promise<void> {
        this.logger.log(`Rank 동기화 시작 (${ranks.length}개)`);

        for (const rank of ranks) {
            try {
                const existing = await this.rankService.findOne({ where: { id: rank.id } });

                if (existing) {
                    // 업데이트
                    existing.rankTitle = rank.rankName;
                    existing.rankCode = rank.rankCode;
                    existing.level = rank.level;
                    await this.rankService.save(existing);
                    this.logger.debug(`Rank 업데이트: ${rank.rankName}`);
                } else {
                    // 생성
                    const newRank = await this.rankService.create({
                        id: rank.id,
                        rankTitle: rank.rankName,
                        rankCode: rank.rankCode,
                        level: rank.level,
                    });
                    await this.rankService.save(newRank);
                    this.logger.debug(`Rank 생성: ${rank.rankName}`);
                }
            } catch (error) {
                this.logger.error(`Rank 동기화 실패: ${rank.rankName}`, error);
            }
        }

        this.logger.log('Rank 동기화 완료');
    }

    private async syncDepartments(departments: any[]): Promise<void> {
        this.logger.log(`Department 동기화 시작 (${departments.length}개)`);

        // 부서는 순서대로 처리 (부모 부서가 먼저 생성되어야 함)
        // order 필드를 기준으로 정렬하거나, 재귀적으로 처리
        const sortedDepartments = [...departments].sort((a, b) => a.order - b.order);

        for (const department of sortedDepartments) {
            try {
                const existing = await this.departmentService.findOne({ where: { id: department.id } });

                if (existing) {
                    // 업데이트
                    existing.departmentName = department.departmentName;
                    existing.departmentCode = department.departmentCode;
                    existing.type = department.type;
                    existing.parentDepartmentId = department.parentDepartmentId;
                    existing.order = department.order;
                    await this.departmentService.save(existing);
                    this.logger.debug(`Department 업데이트: ${department.departmentName}`);
                } else {
                    // 생성
                    const newDepartment = await this.departmentService.create({
                        id: department.id,
                        departmentName: department.departmentName,
                        departmentCode: department.departmentCode,
                        type: department.type,
                        parentDepartmentId: department.parentDepartmentId,
                        order: department.order,
                    });
                    await this.departmentService.save(newDepartment);
                    this.logger.debug(`Department 생성: ${department.departmentName}`);
                }
            } catch (error) {
                this.logger.error(`Department 동기화 실패: ${department.departmentName}`, error);
            }
        }

        this.logger.log('Department 동기화 완료');
    }

    private async syncEmployees(employees: any[]): Promise<void> {
        this.logger.log(`Employee 동기화 시작 (${employees.length}개)`);

        for (const employee of employees) {
            try {
                const existing = await this.employeeService.findOne({ where: { id: employee.id } });

                if (existing) {
                    // 업데이트
                    existing.employeeNumber = employee.employeeNumber;
                    existing.name = employee.name;
                    existing.email = employee.email;
                    existing.password = employee.password;
                    existing.phoneNumber = employee.phoneNumber;
                    existing.dateOfBirth = employee.dateOfBirth;
                    existing.gender = employee.gender;
                    existing.hireDate = employee.hireDate;
                    existing.status = employee.status;
                    existing.currentRankId = employee.currentRankId;
                    existing.terminationDate = employee.terminationDate;
                    existing.terminationReason = employee.terminationReason;
                    existing.isInitialPasswordSet = employee.isInitialPasswordSet;
                    await this.employeeService.save(existing);
                    this.logger.debug(`Employee 업데이트: ${employee.name} (${employee.employeeNumber})`);
                } else {
                    // 생성
                    const newEmployee = await this.employeeService.create({
                        id: employee.id,
                        employeeNumber: employee.employeeNumber,
                        name: employee.name,
                        email: employee.email,
                        password: employee.password,
                        phoneNumber: employee.phoneNumber,
                        dateOfBirth: employee.dateOfBirth,
                        gender: employee.gender,
                        hireDate: employee.hireDate,
                        status: employee.status,
                        currentRankId: employee.currentRankId,
                        terminationDate: employee.terminationDate,
                        terminationReason: employee.terminationReason,
                        isInitialPasswordSet: employee.isInitialPasswordSet,
                    });
                    await this.employeeService.save(newEmployee);
                    this.logger.debug(`Employee 생성: ${employee.name} (${employee.employeeNumber})`);
                }
            } catch (error) {
                this.logger.error(`Employee 동기화 실패: ${employee.name} (${employee.employeeNumber})`, error);
            }
        }

        this.logger.log('Employee 동기화 완료');
    }

    private async syncEmployeeDepartmentPositions(employeeDepartmentPositions: any[]): Promise<void> {
        this.logger.log(`EmployeeDepartmentPosition 동기화 시작 (${employeeDepartmentPositions.length}개)`);

        for (const edp of employeeDepartmentPositions) {
            try {
                const existing = await this.employeeDepartmentPositionService.findOne({ where: { id: edp.id } });

                if (existing) {
                    // 업데이트
                    existing.employeeId = edp.employeeId;
                    existing.departmentId = edp.departmentId;
                    existing.positionId = edp.positionId;
                    existing.isManager = edp.isManager;
                    await this.employeeDepartmentPositionService.save(existing);
                    this.logger.debug(`EmployeeDepartmentPosition 업데이트: ${edp.id}`);
                } else {
                    // 생성
                    const newEdp = await this.employeeDepartmentPositionService.create({
                        id: edp.id,
                        employeeId: edp.employeeId,
                        departmentId: edp.departmentId,
                        positionId: edp.positionId,
                        isManager: edp.isManager,
                    });
                    await this.employeeDepartmentPositionService.save(newEdp);
                    this.logger.debug(`EmployeeDepartmentPosition 생성: ${edp.id}`);
                }
            } catch (error) {
                this.logger.error(`EmployeeDepartmentPosition 동기화 실패: ${edp.id}`, error);
            }
        }

        this.logger.log('EmployeeDepartmentPosition 동기화 완료');
    }
}
