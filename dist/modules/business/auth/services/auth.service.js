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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const metadata_context_1 = require("../../../context/metadata/metadata.context");
let AuthService = AuthService_1 = class AuthService {
    constructor(metadataContext) {
        this.metadataContext = metadataContext;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async login(dto) {
        this.logger.log(`로그인 요청: ${dto.email}`);
        const result = await this.metadataContext.로그인한다(dto.email, dto.password);
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [metadata_context_1.MetadataContext])
], AuthService);
//# sourceMappingURL=auth.service.js.map