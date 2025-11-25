import { Injectable, Logger } from '@nestjs/common';
import { MetadataContext } from '../../../context/metadata/metadata.context';
import { LoginRequestDto, LoginResponseDto } from '../dtos/login.dto';

/**
 * Auth 서비스
 * 인증 관련 비즈니스 로직을 처리합니다.
 */
@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly metadataContext: MetadataContext) {}

    /**
     * 로그인
     */
    async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
        this.logger.log(`로그인 요청: ${dto.email}`);

        const result = await this.metadataContext.로그인한다(dto.email, dto.password);

        return result;
    }
}

