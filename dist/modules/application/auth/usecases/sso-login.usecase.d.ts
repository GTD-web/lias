import { SsoResponseDto } from '@resource/application/auth/dto/sso-response.dto';
export declare class SsoLoginUsecase {
    constructor();
    execute(email: string, password: string): Promise<SsoResponseDto>;
}
