import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { GenerateTokenRequestDto } from '../dtos';

/**
 * JWT 토큰 생성 Usecase
 *
 * 테스트 목적으로 직원번호 또는 이메일로 JWT 토큰을 생성합니다.
 * ⚠️ 개발/테스트 환경에서만 사용해야 합니다.
 */
@Injectable()
export class GenerateTokenUsecase {
    private readonly logger = new Logger(GenerateTokenUsecase.name);

    constructor(
        private readonly employeeService: DomainEmployeeService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async execute(dto: GenerateTokenRequestDto) {
        this.logger.log('JWT 토큰 생성 요청');

        // 직원번호 또는 이메일이 제공되었는지 확인
        if (!dto.employeeNumber && !dto.email) {
            throw new BadRequestException('직원번호 또는 이메일을 입력해야 합니다.');
        }

        // 직원 조회
        let employee;
        if (dto.employeeNumber) {
            employee = await this.employeeService.findByEmployeeNumber(dto.employeeNumber);
            if (!employee) {
                throw new NotFoundException(`직원을 찾을 수 없습니다 (직원번호: ${dto.employeeNumber})`);
            }
        } else if (dto.email) {
            employee = await this.employeeService.findOne({
                where: { email: dto.email },
            });
            if (!employee) {
                throw new NotFoundException(`직원을 찾을 수 없습니다 (이메일: ${dto.email})`);
            }
        }

        // JWT 토큰 생성
        const payload = {
            employeeNumber: employee.employeeNumber,
            sub: employee.id,
        };

        const accessToken = this.jwtService.sign(payload);

        // 만료 시간 가져오기 (초 단위)
        const expiresInStr = this.configService.get<string>('jwt.expiresIn') || '1h';
        // '1h' -> 3600, '2d' -> 172800 등으로 변환
        const expiresIn = this.parseExpiresIn(expiresInStr);

        this.logger.log(`JWT 토큰 생성 완료 (직원: ${employee.employeeNumber})`);

        return {
            success: true,
            message: 'JWT 토큰이 생성되었습니다.',
            accessToken,
            expiresIn,
            employee: {
                id: employee.id,
                employeeNumber: employee.employeeNumber,
                name: employee.name,
                email: employee.email,
            },
        };
    }

    /**
     * expiresIn 문자열을 초 단위로 변환
     * 예: '1h' -> 3600, '2d' -> 172800, '30m' -> 1800
     */
    private parseExpiresIn(expiresIn: string): number {
        if (typeof expiresIn === 'number') {
            return expiresIn;
        }

        const match = expiresIn.match(/^(\d+)([smhd])$/);
        if (!match) {
            return 3600; // 기본값: 1시간
        }

        const [, value, unit] = match;
        const numValue = parseInt(value, 10);

        switch (unit) {
            case 's':
                return numValue;
            case 'm':
                return numValue * 60;
            case 'h':
                return numValue * 3600;
            case 'd':
                return numValue * 86400;
            default:
                return 3600;
        }
    }
}
