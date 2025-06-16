import { S3Service } from '../infrastructure/s3.service';
import { File } from '@libs/entities/file.entity';
import { DomainFileService } from '@src/domain/file/file.service';
export declare class UploadFileUsecase {
    private readonly s3Service;
    private readonly fileService;
    constructor(s3Service: S3Service, fileService: DomainFileService);
    execute(file: Express.Multer.File): Promise<File>;
}
