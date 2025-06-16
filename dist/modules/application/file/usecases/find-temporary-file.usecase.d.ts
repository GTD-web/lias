import { File } from '@libs/entities/file.entity';
import { DomainFileService } from '@src/domain/file/file.service';
export declare class FindTemporaryFileUsecase {
    private readonly fileService;
    constructor(fileService: DomainFileService);
    execute(): Promise<File[]>;
}
