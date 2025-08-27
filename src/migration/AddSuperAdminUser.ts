import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class AddSuperAdminUser1718030000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const password = await bcrypt.hash('$Admin#123', 12);
        await queryRunner.query(
            `INSERT INTO "Users" ("id", "name", "email", "role", "password", "isActive", "emailVerify", "phoneVerify")
             VALUES (uuid_generate_v4(), 'Super Admin', 'admin@admin.com', $1, $2, true, true, false)`,
            [1001,password]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "Users" WHERE "email" = 'admin@admin.com'`
        );
    }
}
