import { OnModuleInit } from '@nestjs/common';
import { SSOClient, LoginResponse, ValidateTokenResponse, Employee, GetEmployeesResponse } from '@lumir-company/sso-sdk';
export declare class SSOService implements OnModuleInit {
    private readonly ssoClient;
    private readonly logger;
    constructor(ssoClient: SSOClient);
    onModuleInit(): Promise<void>;
    login(email: string, password: string): Promise<LoginResponse>;
    verifyToken(token: string): Promise<ValidateTokenResponse>;
    refreshToken(refreshToken: string): Promise<LoginResponse>;
    checkPassword(token: string, currentPassword: string, email?: string): Promise<boolean>;
    changePassword(token: string, newPassword: string): Promise<void>;
    getEmployee(params: {
        employeeId?: string;
        employeeNumber?: string;
        withDetail?: boolean;
    }): Promise<Employee>;
    getEmployees(params?: {
        identifiers?: string[];
        withDetail?: boolean;
        includeTerminated?: boolean;
    }): Promise<GetEmployeesResponse>;
    getDepartmentHierarchy(params?: {
        rootDepartmentId?: string;
        maxDepth?: number;
        withEmployeeDetail?: boolean;
        includeTerminated?: boolean;
        includeEmptyDepartments?: boolean;
    }): Promise<import("@lumir-company/sso-sdk").GetDepartmentHierarchyResponse>;
    getEmployeesManagers(): Promise<import("@lumir-company/sso-sdk").GetEmployeesManagersResponse>;
    subscribeFcm(params: {
        employeeId?: string;
        employeeNumber?: string;
        fcmToken: string;
        deviceType: string;
    }): Promise<import("@lumir-company/sso-sdk").SubscribeFcmResponse>;
    getFcmToken(params: {
        employeeId?: string;
        employeeNumber?: string;
    }): Promise<import("@lumir-company/sso-sdk").GetFcmTokenResponse>;
    getMultipleFcmTokens(params: {
        employeeIds?: string[];
        employeeNumbers?: string[];
    }): Promise<import("@lumir-company/sso-sdk").GetMultipleFcmTokensResponse>;
    unsubscribeFcm(params: {
        employeeId?: string;
        employeeNumber?: string;
    }): Promise<boolean>;
}
