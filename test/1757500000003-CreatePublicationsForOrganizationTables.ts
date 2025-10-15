import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePublicationsForOrganizationTables1757500000003 implements MigrationInterface {
    name = 'CreatePublicationsForOrganizationTables1757500000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. 각 테이블에 대한 개별 publication 생성

        // Ranks 테이블 publication
        await queryRunner.query(`
            CREATE PUBLICATION ranks_publication 
            FOR TABLE ranks
            WITH (publish = 'insert, update, delete')
        `);

        // Positions 테이블 publication
        await queryRunner.query(`
            CREATE PUBLICATION positions_publication 
            FOR TABLE positions
            WITH (publish = 'insert, update, delete')
        `);

        // Departments 테이블 publication
        await queryRunner.query(`
            CREATE PUBLICATION departments_publication 
            FOR TABLE departments
            WITH (publish = 'insert, update, delete')
        `);

        // Employees 테이블 publication
        await queryRunner.query(`
            CREATE PUBLICATION employees_publication 
            FOR TABLE employees
            WITH (publish = 'insert, update, delete')
        `);

        // Employee Department Positions 테이블 publication
        await queryRunner.query(`
            CREATE PUBLICATION employee_department_positions_publication 
            FOR TABLE employee_department_positions
            WITH (publish = 'insert, update, delete')
        `);

        // 2. 통합 publication 생성 (5개 테이블 모두 포함)
        await queryRunner.query(`
            CREATE PUBLICATION organization_all_publication 
            FOR TABLE 
                ranks,
                positions,
                departments,
                employees,
                employee_department_positions
            WITH (publish = 'insert, update, delete')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Publication 삭제 (역순)
        await queryRunner.query(`DROP PUBLICATION IF EXISTS organization_all_publication`);
        await queryRunner.query(`DROP PUBLICATION IF EXISTS employee_department_positions_publication`);
        await queryRunner.query(`DROP PUBLICATION IF EXISTS employees_publication`);
        await queryRunner.query(`DROP PUBLICATION IF EXISTS departments_publication`);
        await queryRunner.query(`DROP PUBLICATION IF EXISTS positions_publication`);
        await queryRunner.query(`DROP PUBLICATION IF EXISTS ranks_publication`);
    }
}
