export declare class MMSDepartmentResponseDto {
    constructor(department: any);
    department_code: string;
    department_name: string;
    child_departments: MMSDepartmentResponseDto[];
}
export declare class MMSDepartmentWebhookRequestDto {
    event_type: string;
    entity_type: string;
    timestamp: string;
    payload: MMSDepartmentResponseDto;
}
