"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGE = void 0;
const ValidationErrorMessage = {
    REQUIRED: (field) => `${field}은(는) 필수 값입니다.`,
    IS_INT: (field) => `${field}은(는) 정수여야 합니다.`,
    IS_ARRAY: (field) => `${field}은(는) 배열이어야 합니다.`,
    IS_STRING: (field) => `${field}은(는) 문자열이어야 합니다.`,
    IS_NUMBER: (field) => `${field}은(는) 숫자여야 합니다.`,
    IS_BOOLEAN: (field) => `${field}은(는) 불리언이어야 합니다.`,
    IS_DATE: (field) => `${field}은(는) 날짜여야 합니다.`,
    IS_EMAIL: (field) => `${field}은(는) 이메일 형식이어야 합니다.`,
    IS_URL: (field) => `${field}은(는) URL 형식이어야 합니다.`,
    IS_PHONE: (field) => `${field}은(는) 전화번호 형식이어야 합니다.`,
    IS_MIN: (field, min) => `${field}은(는) ${min} 이상이어야 합니다.`,
    IS_MAX: (field, max) => `${field}은(는) ${max} 이하이어야 합니다.`,
    IS_MIN_LENGTH: (field, minLength) => `${field}은(는) ${minLength} 글자 이상이어야 합니다.`,
    IS_MAX_LENGTH: (field, maxLength) => `${field}은(는) ${maxLength} 글자 이하이어야 합니다.`,
    IS_LENGTH: (field, minLength, maxLength) => `${field}은(는) ${minLength} 글자 이상 ${maxLength} 글자 이하이어야 합니다.`,
    IS_REGEX: (field, regex) => `${field}은(는) ${regex} 형식이어야 합니다.`,
    IS_ENUM: (field, enumValues) => `${field}은(는) ${enumValues.join(', ')} 중 하나여야 합니다.`,
    IS_IN: (field, values) => `${field}은(는) ${values.join(', ')} 중 하나여야 합니다.`,
    IS_NOT_IN: (field, values) => `${field}은(는) ${values.join(', ')} 중 하나여야 합니다.`,
    IS_NOT_NULL: (field) => `${field}은(는) NULL이 아니어야 합니다.`,
    IS_NULL: (field) => `${field}은(는) NULL이어야 합니다.`,
    IS_POSITIVE: (field) => `${field}은(는) 양수여야 합니다.`,
    IS_NEGATIVE: (field) => `${field}은(는) 음수여야 합니다.`,
    IS_ZERO: (field) => `${field}은(는) 0이어야 합니다.`,
    IS_NOT_ZERO: (field) => `${field}은(는) 0이 아니어야 합니다.`,
    INVALID_DATE_FORMAT: (field, format) => `${field}의 날짜 형식이 올바르지 않습니다. ${format} 형식이어야 합니다.`,
    INVALID_ARRAY_ITEM_TYPE: (field, type) => `${field}의 모든 항목은 ${type}이어야 합니다.`,
    INVALID_MILEAGE: (field) => `${field}은(는) 0 이상 999,999,999 이하의 정수여야 합니다.`,
};
const BusinessErrorMessage = {
    COMMON: {
        NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
        DUPLICATE_USER: '이미 존재하는 사용자입니다.',
        UNAUTHORIZED: '권한이 없습니다.',
    },
    AUTH: {
        USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
        INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
        SSO_LOGIN_FAILED: 'SSO 로그인에 실패했습니다.',
    },
    APPROVAL: {
        NOT_FOUND: '결재선을 찾을 수 없습니다.',
        DELETE_FAILED: '결재선 삭제에 실패했습니다.',
    },
    FILE: {
        NOT_FOUND: '요청한 파일을 찾을 수 없습니다.',
        ID_OR_PATH_REQUIRED: '파일 ID 또는 파일 경로는 필수입니다.',
    },
    EMPLOYEE: {
        NOT_FOUND: '존재하지 않는 사용자입니다.',
        SYNC_FAILED: '직원 정보 동기화에 실패했습니다.',
    },
};
exports.ERROR_MESSAGE = {
    VALIDATION: ValidationErrorMessage,
    BUSINESS: BusinessErrorMessage,
};
//# sourceMappingURL=error-message.js.map