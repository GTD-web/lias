import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * 로그인 요청 DTO
 */
export class LoginRequestDto {
    @ApiProperty({
        description: '이메일',
        example: 'user@lumir.space',
    })
    @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다' })
    @IsNotEmpty({ message: '이메일은 필수입니다' })
    email: string;

    @ApiProperty({
        description: '비밀번호',
        example: '1234',
    })
    @IsString()
    @IsNotEmpty({ message: '비밀번호는 필수입니다' })
    @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
    password: string;
}

/**
 * 로그인 응답 DTO
 */
export class LoginResponseDto {
    @ApiProperty({
        description: 'JWT 액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string;
}
