import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto, LoginResponseDto } from '../dtos/login.dto';

/**
 * 인증 컨트롤러
 */
@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '로그인',
        description: '이메일과 비밀번호로 로그인하여 JWT 토큰을 발급받습니다.',
    })
    @ApiResponse({
        status: 200,
        description: '로그인 성공',
        type: LoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패 (이메일 또는 비밀번호 불일치)',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (유효성 검증 실패)',
    })
    async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
        return await this.authService.login(dto);
    }
}

