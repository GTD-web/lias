import { ApiProperty } from '@nestjs/swagger';

export class MMSDepartmentResponseDto {
    constructor(department: any) {
        this.department_code = department.department_code;
        this.department_name = department.department_name;
        this.child_departments = department.child_departments;
    }

    @ApiProperty({ description: '부서 코드', example: '1234567890' })
    department_code: string;

    @ApiProperty({ description: '부서 이름', example: '부서 이름' })
    department_name: string;

    @ApiProperty({ description: '자식 부서', type: [MMSDepartmentResponseDto] })
    child_departments: MMSDepartmentResponseDto[];
}

export class MMSDepartmentWebhookRequestDto {
    @ApiProperty({ description: '이벤트 타입', example: 'employee.updated' })
    event_type: string;

    @ApiProperty({ description: '엔티티 타입', example: 'employee' })
    entity_type: string;

    @ApiProperty({ description: '타임스탬프', example: '2025-04-29T02:11:51.794Z' })
    timestamp: string;

    @ApiProperty({ description: '페이로드' })
    payload: MMSDepartmentResponseDto;
}
