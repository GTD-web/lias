import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { PaginationMetaDto } from '../dtos/paginate-response.dto';
import { ErrorResponseDto, BaseResponseDto } from '../dtos/response.dto';

// 공통 에러 응답 데코레이터
const ApiCommonErrors = () =>
    applyDecorators(
        ApiBadRequestResponse({ description: '잘못된 요청입니다.', type: ErrorResponseDto }), // 하나만 예시로 표시
        ApiUnauthorizedResponse({ description: '인증되지 않은 요청입니다.' }),
        ApiForbiddenResponse({ description: '권한이 없습니다.' }),
        ApiNotFoundResponse({ description: '리소스를 찾을 수 없습니다.' }),
        ApiConflictResponse({ description: '중복된 리소스입니다.' }),
        ApiInternalServerErrorResponse({ description: '서버 에러가 발생했습니다.' }),
    );

// 단일 응답 데코레이터
export const ApiDataResponse = (options: {
    status?: number;
    description: string;
    type?: 'string' | 'number' | 'boolean' | Array<any> | object;
    isPaginated?: boolean;
}) => {
    if (!options.type) {
        return applyDecorators(
            ApiOkResponse({
                status: options.status || 200,
                description: options.description || '성공적으로 처리되었습니다.',
            }),
            ApiCommonErrors(),
        );
    }
    const isArray = Array.isArray(options.type);
    const isObject = typeof options.type !== 'string';
    const type = isArray ? options.type[0] : options.type;
    let property;

    switch (typeof options.type) {
        case 'string':
            property = {
                success: { type: 'boolean', example: true },
                data: { type: type },
                message: { type: 'string', example: options.description },
            };
            break;
        default:
            property = { $ref: getSchemaPath(type) };
    }

    if (isArray) {
        property = {
            type: 'array',
            items: property,
        };
    }

    const schema = isObject
        ? {
              allOf: [
                  {
                      $ref: getSchemaPath(BaseResponseDto),
                  },
                  {
                      properties: {
                          data: options.isPaginated
                              ? {
                                    type: 'object',
                                    properties: {
                                        items: {
                                            type: 'array',
                                            items: property,
                                        },
                                        meta: {
                                            $ref: getSchemaPath(PaginationMetaDto),
                                        },
                                    },
                                }
                              : property,
                      },
                  },
              ],
          }
        : {
              properties: property,
          };

    return applyDecorators(
        ApiOkResponse({
            status: options.status || 200,
            description: options.description || '성공적으로 처리되었습니다.',
            schema,
        }),
        ApiCommonErrors(),
    );
};
