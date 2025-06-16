import { ConfigService } from '@nestjs/config';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly employeeService;
    constructor(employeeService: DomainEmployeeService, configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
