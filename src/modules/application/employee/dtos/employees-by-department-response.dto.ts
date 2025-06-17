import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from './employee-response.dto';

export class EmplyeesByDepartmentResponseDto {
    @ApiProperty()
    department: string;

    @ApiProperty({
        type: [EmployeeResponseDto],
    })
    employees: EmployeeResponseDto[];
}
