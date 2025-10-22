"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GenerateTokenUsecase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokenUsecase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const employee_service_1 = require("../../../domain/employee/employee.service");
let GenerateTokenUsecase = GenerateTokenUsecase_1 = class GenerateTokenUsecase {
    constructor(employeeService, jwtService, configService) {
        this.employeeService = employeeService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(GenerateTokenUsecase_1.name);
    }
    async execute(dto) {
        this.logger.log('JWT 토큰 생성 요청');
        if (!dto.employeeNumber && !dto.email) {
            throw new common_1.BadRequestException('직원번호 또는 이메일을 입력해야 합니다.');
        }
        let employee;
        if (dto.employeeNumber) {
            employee = await this.employeeService.findByEmployeeNumber(dto.employeeNumber);
            if (!employee) {
                throw new common_1.NotFoundException(`직원을 찾을 수 없습니다 (직원번호: ${dto.employeeNumber})`);
            }
        }
        else if (dto.email) {
            employee = await this.employeeService.findOne({
                where: { email: dto.email },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`직원을 찾을 수 없습니다 (이메일: ${dto.email})`);
            }
        }
        const payload = {
            employeeNumber: employee.employeeNumber,
            sub: employee.id,
        };
        const accessToken = this.jwtService.sign(payload);
        const expiresInStr = this.configService.get('jwt.expiresIn') || '1h';
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
    parseExpiresIn(expiresIn) {
        if (typeof expiresIn === 'number') {
            return expiresIn;
        }
        const match = expiresIn.match(/^(\d+)([smhd])$/);
        if (!match) {
            return 3600;
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
};
exports.GenerateTokenUsecase = GenerateTokenUsecase;
exports.GenerateTokenUsecase = GenerateTokenUsecase = GenerateTokenUsecase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService,
        jwt_1.JwtService,
        config_1.ConfigService])
], GenerateTokenUsecase);
//# sourceMappingURL=generate-token.usecase.js.map