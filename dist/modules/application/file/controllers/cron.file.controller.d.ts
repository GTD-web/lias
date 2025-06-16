import { FileService } from '../file.service';
export declare class CronFileController {
    private readonly fileService;
    constructor(fileService: FileService);
    deleteTemporaryFile(): Promise<void>;
}
