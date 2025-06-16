import { DomainResourceService } from '@src/domain/resource/resource.service';
export declare class CheckAvailabilityUsecase {
    private readonly resourceService;
    constructor(resourceService: DomainResourceService);
    execute(resourceId: string, startDate: string, endDate: string, reservationId?: string): Promise<boolean>;
}
