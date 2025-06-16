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
exports.BaseRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let BaseRepository = class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(entity, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.create(entity);
    }
    async save(entity, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.save(entity);
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            withDeleted: repositoryOptions?.withDeleted,
        });
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
            withDeleted: repositoryOptions?.withDeleted,
        });
    }
    async update(entityId, entityData, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        const primaryColumn = repository.metadata.primaryColumns[0].propertyName;
        await repository.update(entityId, entityData);
        const updated = await repository.findOne({
            where: { [primaryColumn]: entityId },
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            withDeleted: repositoryOptions?.withDeleted,
        });
        if (!updated) {
            throw new common_1.NotFoundException(`${this.repository.metadata.name} Entity with id ${entityId} not found`);
        }
        return updated;
    }
    async delete(entityId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        await repository.delete(entityId);
    }
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BaseRepository);
//# sourceMappingURL=base.repository.js.map