import { Gender, EmployeeStatus } from '../../../common/enums/employee.enum';
import { Role } from '../../../common/enums/role-type.enum';
import { Rank } from '../rank/rank.entity';
import { EmployeeDepartmentPosition } from '../employee-department-position/employee-department-position.entity';
import { Document } from '../document/document.entity';
export declare class Employee {
    id: string;
    get employeeId(): string;
    employeeNumber: string;
    name: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    hireDate: Date;
    status: EmployeeStatus;
    currentRankId?: string;
    currentRank?: Rank;
    terminationDate?: Date;
    terminationReason?: string;
    isInitialPasswordSet: boolean;
    departmentPositions?: EmployeeDepartmentPosition[];
    roles: Role[];
    draftDocuments?: Document[];
    createdAt: Date;
    updatedAt: Date;
}
