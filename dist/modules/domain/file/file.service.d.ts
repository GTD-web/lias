import { File } from '../../../database/entities';
import { BaseService } from '../../../common/services/base.service';
import { DomainFileRepository } from './file.repository';
import { ConfigService } from '@nestjs/config';
export declare class DomainFileService extends BaseService<File> {
    private readonly fileRepository;
    private readonly configService;
    constructor(fileRepository: DomainFileRepository, configService: ConfigService);
}
