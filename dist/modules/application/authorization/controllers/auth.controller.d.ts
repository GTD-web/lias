import { LoginDto } from '../dtos';
import { AuthService } from '../auth.service';
import { Employee } from 'src/database/entities/employee.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): any;
    me(user: Employee): any;
}
