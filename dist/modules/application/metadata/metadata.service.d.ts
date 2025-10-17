import { MetadataResponseDto } from './dtos/metadata-response.dto';
import { FindAllEmployeesByDepartmentUsecase } from './usecases/findAllEmployeesByDepartment.usecase';
import { GetExportAllDataUsecase } from './usecases/getExportAllData.usecase';
import { SyncAllMetadataUsecase } from './usecases/syncAllMetadata.usecase';
export declare class MetadataService {
    private readonly findAllEmployeesByDepartmentUsecase;
    private readonly getExportAllDataUsecase;
    private readonly syncAllMetadataUsecase;
    constructor(findAllEmployeesByDepartmentUsecase: FindAllEmployeesByDepartmentUsecase, getExportAllDataUsecase: GetExportAllDataUsecase, syncAllMetadataUsecase: SyncAllMetadataUsecase);
    findAllEmplyeesByDepartment(): Promise<MetadataResponseDto>;
    syncAllMetadata(): Promise<void>;
}
