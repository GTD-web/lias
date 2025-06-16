import { File } from '@libs/entities/file.entity';
import { UploadFileUsecase } from './usecases/upload-file.usecase';
import { DeleteFileUsecase } from './usecases/delete-file.usecase';
import { FindTemporaryFileUsecase } from './usecases/find-temporary-file.usecase';
import { GetPresignedUrlUsecase } from './usecases/get-presigned-url.usecase';
import { MimeType } from '@libs/enums/mime-type.enum';
import { CreateFileDataDto } from './dtos/create-filedata.dto';
import { CreateFileDataUsecase } from './usecases/create-file-data.usecase';
export declare class FileService {
    private readonly uploadFileUsecase;
    private readonly deleteFileUsecase;
    private readonly findTemporaryFileUsecase;
    private readonly getPresignedUrlUsecase;
    private readonly createFileDataUsecase;
    constructor(uploadFileUsecase: UploadFileUsecase, deleteFileUsecase: DeleteFileUsecase, findTemporaryFileUsecase: FindTemporaryFileUsecase, getPresignedUrlUsecase: GetPresignedUrlUsecase, createFileDataUsecase: CreateFileDataUsecase);
    deleteTemporaryFile(): Promise<void>;
    uploadFile(file: Express.Multer.File): Promise<File>;
    uploadMultipleFiles(files: Express.Multer.File[]): Promise<File[]>;
    deleteFile(fileId: string): Promise<void>;
    deleteMultipleFiles(fileIds: string[]): Promise<void>;
    getPresignedUrl(mime: MimeType): Promise<string>;
    createFileData(createFileDataDto: CreateFileDataDto): Promise<File>;
}
