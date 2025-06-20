import { Injectable } from '@nestjs/common';
import { SsoResponseDto } from '../dtos/sso-response.dto';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { Employee } from '../../../../database/entities/employee.entity';

@Injectable()
export class UpdateAuthInfoUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(ssoResponse: SsoResponseDto): Promise<Employee> {
        const employee = await this.employeeService.findOne({
            where: {
                employeeNumber: ssoResponse.employeeNumber,
            },
        });
        // employee.password = ssoResponse.password;
        // employee.mobile = ssoResponse.phoneNumber;
        employee.accessToken = ssoResponse.accessToken;
        employee.expiredAt = ssoResponse.expiresAt;
        employee.department = ssoResponse.department;
        employee.position = ssoResponse.position;
        employee.rank = ssoResponse.rank;

        return await this.employeeService.update(employee.employeeId, employee);
    }
}
