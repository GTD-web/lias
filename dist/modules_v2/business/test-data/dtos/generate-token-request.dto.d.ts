export declare class GenerateTokenRequestDto {
    employeeNumber?: string;
    email?: string;
}
export declare class GenerateTokenResponseDto {
    success: boolean;
    message: string;
    accessToken: string;
    expiresIn: number;
    employee?: {
        id: string;
        employeeNumber: string;
        name: string;
        email: string;
    };
}
