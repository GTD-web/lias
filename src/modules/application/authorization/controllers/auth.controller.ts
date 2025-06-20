import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../../../../common/decorators/public.decorator';
import { ApiDataResponse } from '../../../../common/decorators/api-responses.decorator';
import { LoginDto, LoginResponseDto } from '../dtos';
import { AuthService } from '../auth.service';
import { User } from 'src/common/decorators/user.decorator';
import { Employee } from 'src/database/entities/employee.entity';

@ApiTags('인증 ')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    @ApiOperation({ summary: '로그인' })
    @ApiDataResponse({ status: 201, description: '로그인 성공', type: LoginResponseDto })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('me')
    @ApiOperation({ summary: '사용자 정보 조회' })
    @ApiDataResponse({ status: 200, description: '사용자 정보 조회 성공', type: User })
    me(@User() user: Employee) {
        console.log(user);
        return this.authService.me(user);
    }
}
