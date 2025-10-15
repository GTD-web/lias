export declare class ExportDepartmentDto {
    id: string;
    departmentName: string;
    departmentCode: string;
    type: string;
    parentDepartmentId?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ExportEmployeeDto {
    id: string;
    employeeNumber: string;
    name: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    gender?: string;
    hireDate: Date;
    status: string;
    currentRankId?: string;
    terminationDate?: Date;
    terminationReason?: string;
    isInitialPasswordSet: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ExportPositionDto {
    id: string;
    positionTitle: string;
    positionCode: string;
    level: number;
    hasManagementAuthority: boolean;
}
export declare class ExportRankDto {
    id: string;
    rankName: string;
    rankCode: string;
    level: number;
}
export declare class ExportEmployeeDepartmentPositionDto {
    id: string;
    employeeId: string;
    departmentId: string;
    positionId: string;
    isManager: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ExportAllDataResponseDto {
    departments: ExportDepartmentDto[];
    employees: ExportEmployeeDto[];
    positions: ExportPositionDto[];
    ranks: ExportRankDto[];
    employeeDepartmentPositions: ExportEmployeeDepartmentPositionDto[];
    totalCounts: {
        departments: number;
        employees: number;
        positions: number;
        ranks: number;
        employeeDepartmentPositions: number;
    };
    exportedAt: Date;
}
