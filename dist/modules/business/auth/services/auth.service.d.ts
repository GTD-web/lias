import { MetadataContext } from '../../../context/metadata/metadata.context';
import { LoginRequestDto, LoginResponseDto } from '../dtos/login.dto';
export declare class AuthService {
    private readonly metadataContext;
    private readonly logger;
    constructor(metadataContext: MetadataContext);
    login(dto: LoginRequestDto): Promise<LoginResponseDto>;
}
