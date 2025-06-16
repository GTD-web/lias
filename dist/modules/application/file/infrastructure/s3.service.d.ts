import { ConfigService } from '@nestjs/config';
import { File } from '@libs/entities/file.entity';
import { MimeType } from '@libs/enums/mime-type.enum';
export declare class S3Service {
    private readonly configService;
    private readonly s3Client;
    private readonly bucketName;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<File>;
    deleteFile(file: File): Promise<void>;
    getFileUrl(fileKey: string): string;
    generatePresignedUrl(mime: MimeType): Promise<string>;
    checkFileExists(fileKey: string): Promise<boolean>;
}
