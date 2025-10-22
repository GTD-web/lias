import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class GenerateTokenRequestDto {
    @ApiProperty({
        description: '직원 번호',
        example: '20230001',
        required: false,
    })
    @IsOptional()
    @IsString()
    employeeNumber?: string;

    @ApiProperty({
        description: '이메일',
        example: 'user@company.com',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email?: string;
}

export class GenerateTokenResponseDto {
    @ApiProperty({ description: '성공 여부' })
    success: boolean;

    @ApiProperty({ description: '메시지' })
    message: string;

    @ApiProperty({ description: 'JWT 액세스 토큰' })
    accessToken: string;

    @ApiProperty({ description: '토큰 만료 시간 (초)' })
    expiresIn: number;

    @ApiProperty({ description: '직원 정보', required: false })
    employee?: {
        id: string;
        employeeNumber: string;
        name: string;
        email: string;
    };
}
