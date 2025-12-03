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
exports.DomainCommentService = void 0;
const common_1 = require("@nestjs/common");
const comment_repository_1 = require("./comment.repository");
const base_service_1 = require("../../../common/services/base.service");
const comment_entity_1 = require("./comment.entity");
let DomainCommentService = class DomainCommentService extends base_service_1.BaseService {
    constructor(commentRepository) {
        super(commentRepository);
        this.commentRepository = commentRepository;
    }
    async createComment(params, queryRunner) {
        const comment = new comment_entity_1.Comment();
        comment.문서를설정한다(params.documentId);
        comment.작성자를설정한다(params.authorId);
        comment.내용을설정한다(params.content);
        if (params.parentCommentId) {
            comment.부모코멘트를설정한다(params.parentCommentId);
        }
        return await this.commentRepository.save(comment, { queryRunner });
    }
    async updateComment(comment, content, queryRunner) {
        comment.내용을설정한다(content);
        return await this.commentRepository.save(comment, { queryRunner });
    }
    async deleteComment(comment, queryRunner) {
        comment.삭제한다();
        return await this.commentRepository.save(comment, { queryRunner });
    }
};
exports.DomainCommentService = DomainCommentService;
exports.DomainCommentService = DomainCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comment_repository_1.DomainCommentRepository])
], DomainCommentService);
//# sourceMappingURL=comment.service.js.map