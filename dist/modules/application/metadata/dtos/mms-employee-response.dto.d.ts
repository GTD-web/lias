export declare class MMSEmployeeResponseDto {
    constructor(employee: any);
    id: string;
    employee_number: string;
    name: string;
    email: string;
    phone_number: string;
    date_of_birth: Date;
    gender: string;
    hire_date: Date;
    status: string;
    department: string;
    position: string;
    rank: string;
}
export declare class MMSEmployeeWebhookRequestDto {
    event_type: string;
    entity_type: string;
    timestamp: string;
    payload: MMSEmployeeResponseDto;
}
