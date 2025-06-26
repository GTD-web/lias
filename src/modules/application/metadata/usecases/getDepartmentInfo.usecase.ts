import { Injectable } from '@nestjs/common';
import { MMSDepartmentResponseDto } from '../dtos/mms-department-response.dto';
import axios from 'axios';

@Injectable()
export class GetDepartmentInfoUsecase {
    constructor() {}

    async execute(): Promise<MMSDepartmentResponseDto[]> {
        const url = `${process.env.METADATA_MANAGER_URL}/api/departments?hierarchy=true`;
        const result = await axios.get(url);
        return result.data.map((department) => new MMSDepartmentResponseDto(department));
    }
}
