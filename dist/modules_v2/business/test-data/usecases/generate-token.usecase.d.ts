import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { GenerateTokenRequestDto } from '../dtos';
export declare class GenerateTokenUsecase {
    private readonly employeeService;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    constructor(employeeService: DomainEmployeeService, jwtService: JwtService, configService: ConfigService);
    execute(dto: GenerateTokenRequestDto): Promise<{
        success: boolean;
        message: string;
        accessToken: string;
        expiresIn: number;
        employee: {
            id: any;
            employeeNumber: any;
            name: any;
            email: any;
        };
    }>;
    private parseExpiresIn;
}
