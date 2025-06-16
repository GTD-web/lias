import { ValidateUsecase } from './usecases/validate.usecase';
import { LoginDto } from '@resource/application/auth/dto/login.dto';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateAuthInfoUsecase } from './usecases/update-auth-info.usecase';
import { CheckSystemAdminUsecase } from './usecases/system-admin.usecase';
import { GetTokenUsecase } from './usecases/get-token.usecase';
export declare class AuthService {
    private readonly validateUsecase;
    private readonly ssoLoginUsecase;
    private readonly updateAuthInfoUsecase;
    private readonly checkSystemAdminUsecase;
    private readonly getTokenUsecase;
    constructor(validateUsecase: ValidateUsecase, ssoLoginUsecase: SsoLoginUsecase, updateAuthInfoUsecase: UpdateAuthInfoUsecase, checkSystemAdminUsecase: CheckSystemAdminUsecase, getTokenUsecase: GetTokenUsecase);
    login(loginDto: LoginDto): Promise<{
        accessToken: any;
        email: any;
        name: any;
        department: any;
        position: any;
        roles: any;
    }>;
}
