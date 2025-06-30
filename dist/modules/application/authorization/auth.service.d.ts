import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateAuthInfoUsecase } from './usecases/update-auth-info.usecase';
import { Employee } from 'src/database/entities/employee.entity';
import { FindMeUsecase } from './usecases/find-me.usecase';
export declare class AuthService {
    private readonly ssoLoginUsecase;
    private readonly updateAuthInfoUsecase;
    private readonly findMeUsecase;
    constructor(ssoLoginUsecase: SsoLoginUsecase, updateAuthInfoUsecase: UpdateAuthInfoUsecase, findMeUsecase: FindMeUsecase);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    me(user: Employee): Promise<Employee>;
}
