import { S3Service } from '../infrastructure/s3.service';
import { DomainFileService } from '@src/domain/file/file.service';
export declare class DeleteFileUsecase {
    private readonly s3Service;
    private readonly fileService;
    constructor(s3Service: S3Service, fileService: DomainFileService);
    execute(fileId: string): Promise<void>;
}
