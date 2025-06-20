import { ApiProperty } from '@nestjs/swagger';

export class DepartmentResponseDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    departmentId: string;

    @ApiProperty({ example: '지상기술본부' })
    departmentName: string;

    @ApiProperty({ example: '지상기술본부' })
    departmentCode: string;

    @ApiProperty({
        type: [DepartmentResponseDto],
        example: [
            {
                departmentId: '550e8400-e29b-41d4-a716-446655440000',
                departmentName: 'Web파트',
                departmentCode: '지상-Web',
                childrenDepartments: [],
            },
        ],
    })
    childrenDepartments: DepartmentResponseDto[];
}

export class EmployeeResponseDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    employeeId: string;

    @ApiProperty({ example: '홍길동' })
    name: string;

    @ApiProperty({ example: '25001' })
    employeeNumber: string;

    @ApiProperty({ example: 'hong@lumir.space' })
    email: string;

    @ApiProperty({ example: '지상-Web' })
    department: string;

    @ApiProperty({ example: '파트장' })
    position: string;

    @ApiProperty({ example: '책임연구원' })
    rank: string;
}

export class MetadataResponseDto {
    @ApiProperty({ type: DepartmentResponseDto })
    department: DepartmentResponseDto;

    @ApiProperty({ type: [EmployeeResponseDto] })
    employees: EmployeeResponseDto[];
}
