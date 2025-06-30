export declare class ApiDocService {
    private readonly logger;
    constructor();
    private MAX_RETRIES;
    private RETRY_DELAY;
    private data;
    getApiJson(retries?: number): Promise<void>;
    private getControllers;
    private getSchemaType;
    private renderSchemaJson;
    private getExampleValue;
    private resolveSchema;
    generateApiDocs(): Promise<void>;
    private saveMarkdown;
}
