/**
 * 카테고리 생성 DTO
 */
export class CreateCategoryDto {
    name: string;
    code: string;
    description?: string;
    order?: number;
}

/**
 * 카테고리 수정 DTO
 */
export class UpdateCategoryDto {
    name?: string;
    code?: string;
    description?: string;
    order?: number;
}

