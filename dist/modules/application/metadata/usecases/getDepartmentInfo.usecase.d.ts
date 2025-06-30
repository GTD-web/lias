import { MMSDepartmentResponseDto } from '../dtos/mms-department-response.dto';
export declare class GetDepartmentInfoUsecase {
    constructor();
    execute(): Promise<MMSDepartmentResponseDto[]>;
}
