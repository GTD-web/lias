import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../../common/enums/role-type.enum';

@Entity('employees')
export class Employee {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    employeeId: string;

    @Column()
    name: string;

    @Column()
    employeeNumber: string;

    @Column({ nullable: true })
    email: string;
}
