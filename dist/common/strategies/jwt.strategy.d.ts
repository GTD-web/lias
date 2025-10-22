import { ConfigService } from '@nestjs/config';
import { DomainEmployeeService } from '../../modules_v2/domain/employee/employee.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService, configService: ConfigService);
    validate(payload: any): Promise<import("../../modules_v2/domain").Employee>;
}
export {};
