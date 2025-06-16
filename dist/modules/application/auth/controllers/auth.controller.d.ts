import { LoginDto } from '@resource/application/auth/dto/login.dto';
import { AuthService } from '@resource/application/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): any;
}
