import { Injectable } from '@nestjs/common';
import { ExportAllDataResponseDto } from '../dtos/export-all-data.dto';
import axios from 'axios';

@Injectable()
export class GetExportAllDataUsecase {
    constructor() {}

    async execute(): Promise<ExportAllDataResponseDto> {
        const url = `${process.env.SSO_API_URL}/api/organization/export/all`;
        const result = await axios.get(url);
        return result.data;
    }
}
