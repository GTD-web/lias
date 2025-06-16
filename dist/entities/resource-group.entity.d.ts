import { Resource } from './resource.entity';
import { ResourceType } from '../enums/resource-type.enum';
export declare class ResourceGroup {
    resourceGroupId: string;
    title: string;
    description: string;
    parentResourceGroupId: string;
    type: ResourceType;
    order: number;
    resources: Resource[];
    parent: ResourceGroup;
    children: ResourceGroup[];
}
