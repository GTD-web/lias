export declare class BaseResponseDto<T> {
    success: boolean;
    data: T;
    message?: string;
}
export declare class ErrorResponseDto {
    success: boolean;
    statusCode: number;
    message: string;
}
