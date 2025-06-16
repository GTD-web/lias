import { FileService } from '@resource/application/file/file.service';
import { MimeType } from '@libs/enums/mime-type.enum';
import { CreateFileDataDto } from '../dtos/create-filedata.dto';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File): Promise<any>;
    uploadMultipleFiles(files: Express.Multer.File[]): Promise<any>;
    deleteMultipleFiles(fileIds: string[]): Promise<void>;
    getPresignedUrl(mime: MimeType): Promise<any>;
    createFileData(createFileDataDto: CreateFileDataDto): Promise<any>;
    deleteFile(fileId: string): Promise<void>;
}
