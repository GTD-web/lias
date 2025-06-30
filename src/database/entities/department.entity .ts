import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn('uuid')
    departmentId: string;

    @Column({ unique: true, comment: '부서 코드' })
    departmentCode: string;

    @Column({ comment: '부서 이름' })
    departmentName: string;

    @Column({ nullable: true, comment: '부모 부서 ID' })
    parentDepartmentId: string;

    @ManyToOne(() => Department, (department) => department.departmentId)
    @JoinColumn({ name: 'parentDepartmentId' })
    parentDepartment: Department;

    @OneToMany(() => Department, (department) => department.parentDepartment)
    childrenDepartments: Department[];
}
