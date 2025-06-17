export declare const ENV: NodeJS.ProcessEnv;
export declare const DB_Config: (() => {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}>;
export declare const JWT_CONFIG: (() => {
    secret: string;
    expiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    expiresIn: string;
}>;
export declare const WEB_PUSH_CONFIG: (() => {
    publicKey: string;
    privateKey: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    publicKey: string;
    privateKey: string;
}>;
export declare const APP_CONFIG: (() => {
    url: string;
    port: number;
    storage: {
        type: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string;
    port: number;
    storage: {
        type: string;
    };
}>;
export declare const FIREBASE_CONFIG: (() => {
    type: string;
    projectId: string;
    privateKeyId: string;
    privateKey: string;
    clientEmail: string;
    clientId: string;
    authUri: string;
    tokenUri: string;
    authProviderX509CertUrl: string;
    clientX509CertUrl: string;
    universeDomain: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    projectId: string;
    privateKeyId: string;
    privateKey: string;
    clientEmail: string;
    clientId: string;
    authUri: string;
    tokenUri: string;
    authProviderX509CertUrl: string;
    clientX509CertUrl: string;
    universeDomain: string;
}>;
