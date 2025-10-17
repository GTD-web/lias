import { Injectable } from '@nestjs/common';
import { MetadataResponseDto } from './dtos/metadata-response.dto';
import { FindAllEmployeesByDepartmentUsecase } from './usecases/findAllEmployeesByDepartment.usecase';
import { GetExportAllDataUsecase } from './usecases/getExportAllData.usecase';
import { SyncAllMetadataUsecase } from './usecases/syncAllMetadata.usecase';

@Injectable()
export class MetadataService {
    constructor(
        private readonly findAllEmployeesByDepartmentUsecase: FindAllEmployeesByDepartmentUsecase,
        private readonly getExportAllDataUsecase: GetExportAllDataUsecase,
        private readonly syncAllMetadataUsecase: SyncAllMetadataUsecase,
    ) {}

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
