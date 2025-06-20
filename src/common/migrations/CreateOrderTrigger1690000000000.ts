import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTrigger1690000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE OR REPLACE FUNCTION set_order_value()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."order" IS NULL THEN
          SELECT COALESCE(MAX("order"), 0) + 1 INTO NEW."order"
          FROM form_approval_lines
          WHERE "employeeId" = NEW."employeeId";
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

        await queryRunner.query(`
      CREATE TRIGGER set_order_before_insert
      BEFORE INSERT ON form_approval_lines
      FOR EACH ROW
      EXECUTE FUNCTION set_order_value();
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_order_before_insert ON form_approval_lines;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_order_value();`);
    }
}
