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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainFormService = void 0;
const common_1 = require("@nestjs/common");
const form_repository_1 = require("./form.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainFormService = class DomainFormService extends base_service_1.BaseService {
    constructor(formRepository) {
        super(formRepository);
        this.formRepository = formRepository;
    }
    async findByFormId(id) {
        const form = await this.formRepository.findOne({ where: { id } });
        if (!form) {
            throw new common_1.NotFoundException('양식을 찾을 수 없습니다.');
        }
        return form;
    }
    async findByStatus(status) {
        return this.formRepository.findByStatus(status);
    }
    async findActiveForms() {
        return this.formRepository.findActiveForms();
    }
};
exports.DomainFormService = DomainFormService;
exports.DomainFormService = DomainFormService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_repository_1.DomainFormRepository])
], DomainFormService);
//# sourceMappingURL=form.service.js.map