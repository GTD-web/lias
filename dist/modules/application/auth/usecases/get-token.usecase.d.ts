import { JwtService } from '@nestjs/jwt';
import { Employee } from '@libs/entities/employee.entity';
export declare class GetTokenUsecase {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    execute(employee: Employee): Promise<{
        accessToken: string;
        email: any;
        name: any;
        department: any;
        position: any;
        roles: any;
    }>;
}
