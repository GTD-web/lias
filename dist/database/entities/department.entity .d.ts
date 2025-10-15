import { DepartmentType } from '../../common/enums/department.enum';
export declare class Department {
    id: string;
    get departmentId(): string;
    departmentName: string;
    departmentCode: string;
    type: DepartmentType;
    parentDepartmentId?: string;
    order: number;
    parentDepartment?: Department;
    childDepartments: Department[];
    createdAt: Date;
    updatedAt: Date;
}
