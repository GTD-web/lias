import { Injectable } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateAuthInfoUsecase } from './usecases/update-auth-info.usecase';
import { Employee } from 'src/database/entities/employee.entity';
import { FindMeUsecase } from './usecases/find-me.usecase';

@Injectable()
export class AuthService {
    constructor(
        private readonly ssoLoginUsecase: SsoLoginUsecase,
        private readonly updateAuthInfoUsecase: UpdateAuthInfoUsecase,
        private readonly findMeUsecase: FindMeUsecase,
    ) {}

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        // // 시스템 관리자 로그인 시도
        // const systemAdminResult = await this.checkSystemAdminUsecase.execute(loginDto.email, loginDto.password);

        // if (systemAdminResult.success) {
        //     // 시스템 관리자인 경우 토큰 발급
        //     return await this.getTokenUsecase.execute(systemAdminResult.employee);
        // }

        const ssoResponse = await this.ssoLoginUsecase.execute(loginDto.email, loginDto.password);
        const updatedEmployee = await this.updateAuthInfoUsecase.execute(ssoResponse);

        return {
            accessToken: updatedEmployee.accessToken,
            email: updatedEmployee.email,
            name: updatedEmployee.name,
            department: updatedEmployee.department,
            position: updatedEmployee.position,
            rank: updatedEmployee.rank,
            roles: updatedEmployee.roles,
        };
    }

    async me(user: Employee): Promise<Employee> {
        return await this.findMeUsecase.execute(user);
    }
}
