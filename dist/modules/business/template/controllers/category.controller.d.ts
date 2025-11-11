import { TemplateService } from '../services/template.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
export declare class CategoryController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    createCategory(dto: CreateCategoryDto): Promise<import("../../../domain").Category>;
    getCategories(): Promise<import("../../../domain").Category[]>;
    getCategory(categoryId: string): Promise<import("../../../domain").Category>;
    updateCategory(categoryId: string, dto: UpdateCategoryDto): Promise<import("../../../domain").Category>;
    deleteCategory(categoryId: string): Promise<void>;
}
