import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGeneralSettingsData1718030000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "GeneralSettings" ("email", "phone", "address", "shortIntro")
             VALUES (
                'syedmomin168@gmail.com',
                '389998236',
                'House no L-859 sector 2, North karachi, karachi, pakistan',
                'Webflow CMS template designed for tech startups looking to make an impact.'
             )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "GeneralSettings" 
             WHERE "email" = 'syedmomin168@gmail.com' 
             AND "phone" = '389998236'`
        );
    }
}
