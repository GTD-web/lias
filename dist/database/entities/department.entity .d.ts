export declare class Department {
    departmentId: string;
    departmentCode: string;
    departmentName: string;
    parentDepartmentId: string;
    parentDepartment: Department;
    childrenDepartments: Department[];
}
