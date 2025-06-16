import { DomainFileService } from '@src/domain/file/file.service';
import { File } from '@libs/entities/file.entity';
import { CreateFileDataDto } from '../dtos/create-filedata.dto';
import { S3Service } from '../infrastructure/s3.service';
export declare class CreateFileDataUsecase {
    private readonly fileService;
    private readonly s3Service;
    constructor(fileService: DomainFileService, s3Service: S3Service);
    retryCount: number;
    execute(createFileDataDto: CreateFileDataDto): Promise<File>;
}
