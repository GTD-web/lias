import { Injectable } from '@nestjs/common';
import { GetEmployeeInfoUsecase } from './usecases/getEmployeeInfo.usecase';
import { SyncEmployeeUsecase } from './usecases/syncEmployee.usecase';
import { GetDepartmentInfoUsecase } from './usecases/getDepartmentInfo.usecase';
import { SyncDepartmentUsecase } from './usecases/syncDepartment.usecase';
import { MetadataResponseDto } from './dtos/metadata-response.dto';
import { FindAllEmployeesByDepartmentUsecase } from './usecases/findAllEmployeesByDepartment.usecase';
import { GetExportAllDataUsecase } from './usecases/getExportAllData.usecase';
import { SyncAllMetadataUsecase } from './usecases/syncAllMetadata.usecase';

@Injectable()
export class MetadataService {
    constructor(
        private readonly getEmployeeInfoUsecase: GetEmployeeInfoUsecase,
        private readonly syncEmployeeUsecase: SyncEmployeeUsecase,
        private readonly getDepartmentInfoUsecase: GetDepartmentInfoUsecase,
        private readonly syncDepartmentUsecase: SyncDepartmentUsecase,
        private readonly findAllEmployeesByDepartmentUsecase: FindAllEmployeesByDepartmentUsecase,
        private readonly getExportAllDataUsecase: GetExportAllDataUsecase,
        private readonly syncAllMetadataUsecase: SyncAllMetadataUsecase,
    ) {}

    async syncEmployees(employeeNumber?: string): Promise<void> {
        const employees = await this.getEmployeeInfoUsecase.execute(employeeNumber);
        await this.syncEmployeeUsecase.execute(employees);
    }

    async syncDepartments(): Promise<void> {
        const departments = await this.getDepartmentInfoUsecase.execute();
        await this.syncDepartmentUsecase.execute(departments);
    }

    async findAllEmplyeesByDepartment(): Promise<MetadataResponseDto> {
        return this.findAllEmployeesByDepartmentUsecase.execute();
    }

    /**
     * 전체 메타데이터 동기화 (Position, Rank, Department, Employee, EmployeeDepartmentPosition)
     */
    async syncAllMetadata(): Promise<void> {
        const allData = await this.getExportAllDataUsecase.execute();
        await this.syncAllMetadataUsecase.execute(allData);
    }
}
