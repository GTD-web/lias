export declare class ConsumableMaintenanceStats {
    resourceId: string;
    resourceName: string;
    resourceType: string;
    vehicleInfoId: string;
    vehicleNumber: string;
    consumableId: string;
    consumableName: string;
    replaceCycle: number;
    notifyReplacementCycle: boolean;
    maintenanceCount: number;
    firstMaintenanceDate: Date;
    lastMaintenanceDate: Date;
    totalCost: number;
    averageCost: number;
    minMileage: number;
    maxMileage: number;
    averageMileage: number;
    averageDaysBetweenMaintenances: number;
    currentYear: number;
    currentMonth: number;
    recentMaintenanceCount: number;
    computedAt: Date;
}
