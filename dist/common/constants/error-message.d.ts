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
        APPROVAL: {
            NOT_FOUND: string;
            DELETE_FAILED: string;
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
