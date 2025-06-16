"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDataResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const paginate_response_dto_1 = require("../dtos/paginate-response.dto");
const response_dto_1 = require("../dtos/response.dto");
const ApiCommonErrors = () => (0, common_1.applyDecorators)((0, swagger_1.ApiBadRequestResponse)({ description: '잘못된 요청입니다.', type: response_dto_1.ErrorResponseDto }), (0, swagger_1.ApiUnauthorizedResponse)({ description: '인증되지 않은 요청입니다.' }), (0, swagger_1.ApiForbiddenResponse)({ description: '권한이 없습니다.' }), (0, swagger_1.ApiNotFoundResponse)({ description: '리소스를 찾을 수 없습니다.' }), (0, swagger_1.ApiConflictResponse)({ description: '중복된 리소스입니다.' }), (0, swagger_1.ApiInternalServerErrorResponse)({ description: '서버 에러가 발생했습니다.' }));
const ApiDataResponse = (options) => {
    const schema = options.type
        ? {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(response_dto_1.BaseResponseDto),
                },
                {
                    properties: {
                        data: options.isPaginated || Array.isArray(options.type)
                            ? {
                                type: 'object',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: { $ref: (0, swagger_1.getSchemaPath)(options.type[0]) },
                                    },
                                    meta: {
                                        $ref: (0, swagger_1.getSchemaPath)(paginate_response_dto_1.PaginationMetaDto),
                                    },
                                },
                            }
                            : {
                                $ref: (0, swagger_1.getSchemaPath)(options.type),
                            },
                    },
                },
            ],
        }
        : {
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: options.description },
            },
        };
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        status: options.status || 200,
        description: options.description || '성공적으로 처리되었습니다.',
        schema,
    }), ApiCommonErrors());
};
exports.ApiDataResponse = ApiDataResponse;
//# sourceMappingURL=api-responses.decorator.js.map