export declare const ApiDataResponse: (options: {
    status?: number;
    description: string;
    type?: "string" | "number" | "boolean" | Array<any> | object;
    isPaginated?: boolean;
}) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
