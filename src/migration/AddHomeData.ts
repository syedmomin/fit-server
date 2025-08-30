import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHomeData1718030000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "Home" ("title", "subTitle", "description", "bannerImage")
             VALUES ('Desk to Athletic in 90 Days', '.', 'AI‑tailored plans + a real coach. Train smarter, fix pain patterns, and build habits that stick without rearranging your life.', '/assets/images/home/1754201105738.png')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "Home" WHERE "id" = 1`
        );
    }
}
