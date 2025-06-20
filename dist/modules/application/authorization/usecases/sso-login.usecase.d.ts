import { SsoResponseDto } from '../dtos/sso-response.dto';
export declare class SsoLoginUsecase {
    constructor();
    execute(email: string, password: string): Promise<SsoResponseDto>;
}
