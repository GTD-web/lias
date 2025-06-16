export declare const ERROR_MESSAGE: {
    VALIDATION: {
        REQUIRED: (field: string) => string;
        IS_INT: (field: string) => string;
        IS_ARRAY: (field: string) => string;
        IS_STRING: (field: string) => string;
        IS_NUMBER: (field: string) => string;
        IS_BOOLEAN: (field: string) => string;
        IS_DATE: (field: string) => string;
        IS_EMAIL: (field: string) => string;
        IS_URL: (field: string) => string;
        IS_PHONE: (field: string) => string;
        IS_MIN: (field: string, min: number) => string;
        IS_MAX: (field: string, max: number) => string;
        IS_MIN_LENGTH: (field: string, minLength: number) => string;
        IS_MAX_LENGTH: (field: string, maxLength: number) => string;
        IS_LENGTH: (field: string, minLength: number, maxLength: number) => string;
        IS_REGEX: (field: string, regex: string) => string;
        IS_ENUM: (field: string, enumValues: string[]) => string;
        IS_IN: (field: string, values: string[]) => string;
        IS_NOT_IN: (field: string, values: string[]) => string;
        IS_NOT_NULL: (field: string) => string;
        IS_NULL: (field: string) => string;
        IS_POSITIVE: (field: string) => string;
        IS_NEGATIVE: (field: string) => string;
        IS_ZERO: (field: string) => string;
        IS_NOT_ZERO: (field: string) => string;
        INVALID_DATE_FORMAT: (field: string, format: string) => string;
        INVALID_ARRAY_ITEM_TYPE: (field: string, type: string) => string;
        INVALID_MILEAGE: (field: string) => string;
    };
    BUSINESS: {
        COMMON: {
            NOT_FOUND: string;
            DUPLICATE_USER: string;
            UNAUTHORIZED: string;
        };
        AUTH: {
            USER_NOT_FOUND: string;
            INVALID_PASSWORD: string;
            SSO_LOGIN_FAILED: string;
        };
        RESOURCE: {
            NOT_FOUND: string;
            INVALID_STATUS: string;
            HAS_RESOURCES: string;
            IS_AVAILABLE: string;
            GROUP_ID_REQUIRED: string;
            MANAGERS_REQUIRED: string;
            UNSUPPORTED_TYPE: (type: string) => string;
            FAILED_CREATE: string;
            FAILED_UPDATE: string;
            FAILED_DELETE: string;
            FAILED_REORDER: string;
            DATE_REQUIRED: string;
            INVALID_DATE_RANGE: string;
            TIME_RANGE_CONFLICT: string;
        };
        RESOURCE_GROUP: {
            NOT_FOUND: string;
            FAILED_REORDER: string;
        };
        RESOURCE_MANAGER: {
            NOT_FOUND: string;
        };
        VEHICLE_INFO: {
            NOT_FOUND: string;
            FAILED_RETURN: string;
        };
        CONSUMABLE: {
            NOT_FOUND: string;
            UNAUTHORIZED: string;
            ALREADY_EXISTS: string;
        };
        MAINTENANCE: {
            NOT_FOUND: string;
            UNAUTHORIZED: string;
            INVALID_DATE: string;
        };
        RESERVATION: {
            NOT_FOUND: string;
            TIME_CONFLICT: string;
            INVALID_DATE_RANGE: string;
            CANNOT_UPDATE_ACCOMMODATION_TIME: string;
            CANNOT_UPDATE_STATUS: (status: string) => string;
            INVALID_RESOURCE_TYPE: string;
            CANNOT_RETURN_STATUS: (status: string) => string;
            VEHICLE_NOT_FOUND: string;
            VEHICLE_ALREADY_RETURNED: string;
            INVALID_MILEAGE: string;
            RESOURCE_UNAVAILABLE: string;
        };
        FILE: {
            NOT_FOUND: string;
            ID_OR_PATH_REQUIRED: string;
        };
        EMPLOYEE: {
            NOT_FOUND: string;
            SYNC_FAILED: string;
        };
    };
};
