import { Consumable } from './consumable.entity';
export declare class Maintenance {
    maintenanceId: string;
    consumableId: string;
    date: string;
    mileage: number;
    cost: number;
    images: string[];
    maintananceBy: string;
    createdAt: Date;
    updatedAt: Date;
    consumable: Consumable;
}
