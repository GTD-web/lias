import { S3Service } from '../infrastructure/s3.service';
import { MimeType } from '@libs/enums/mime-type.enum';
export declare class GetPresignedUrlUsecase {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    execute(mime: MimeType): Promise<string>;
}
