import { LoginDto, LoginResponseDto } from '../dtos';
import { AuthService } from '../auth.service';
import { Employee } from 'src/database/entities/employee.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    me(user: Employee): Promise<Employee>;
}
