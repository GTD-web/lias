import { Repository } from 'typeorm';
import { File } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainFileRepository extends BaseRepository<File> {
    constructor(repository: Repository<File>);
}
