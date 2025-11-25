import { AuthService } from '../services/auth.service';
import { LoginRequestDto, LoginResponseDto } from '../dtos/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginRequestDto): Promise<LoginResponseDto>;
}
