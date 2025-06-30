export declare class DbDocService {
    private readonly metadata;
    constructor();
    generateDbDocumentation(): Promise<void>;
    private generateMarkdown;
    private generateErdSection;
    private generateEntityDetailsSection;
    private generateRelationsSection;
}
