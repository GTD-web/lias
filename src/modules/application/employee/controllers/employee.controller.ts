import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../employee.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../../../../common/decorators/api-responses.decorator';
import { EmplyeesByDepartmentResponseDto } from '../dtos/employees-by-department-response.dto';
import { Roles } from '../../../../common/decorators/role.decorator';
import { Role } from '../../../../common/enums/role-type.enum';

@ApiTags('직원 ')
@ApiBearerAuth()
@Controller('employees')
export class UserEmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get('department')
    // @Roles(Role.USER)
    @ApiOperation({ summary: '부서별 직원 목록 조회 #사용자/참석자설정/모달' })
    @ApiDataResponse({
        status: 200,
        description: '부서별 직원 목록을 성공적으로 조회했습니다.',
        type: [EmplyeesByDepartmentResponseDto],
    })
    async findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]> {
        // return this.employeeService.findEmployeeList();
        return [];
    }
}
