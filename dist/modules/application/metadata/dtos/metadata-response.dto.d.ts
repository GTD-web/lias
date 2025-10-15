export declare class DepartmentResponseDto {
    departmentId: string;
    departmentName: string;
    departmentCode: string;
    childrenDepartments: DepartmentResponseDto[];
}
export declare class EmployeeResponseDto {
    employeeId: string;
    name: string;
    employeeNumber: string;
    email?: string;
    department?: string;
    position?: string;
    rank?: string;
}
export declare class MetadataResponseDto {
    department: DepartmentResponseDto;
    employees: EmployeeResponseDto[];
}
