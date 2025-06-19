"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderTrigger1690000000000 = void 0;
class CreateOrderTrigger1690000000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE OR REPLACE FUNCTION set_order_value()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."order" IS NULL THEN
          SELECT COALESCE(MAX("order"), 0) + 1 INTO NEW."order"
          FROM post
          WHERE user_id = NEW.user_id;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
        await queryRunner.query(`
      CREATE TRIGGER set_order_before_insert
      BEFORE INSERT ON post
      FOR EACH ROW
      EXECUTE FUNCTION set_order_value();
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_order_before_insert ON post;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_order_value();`);
    }
}
exports.CreateOrderTrigger1690000000000 = CreateOrderTrigger1690000000000;
//# sourceMappingURL=CreateOrderTrigger1690000000000.js.map