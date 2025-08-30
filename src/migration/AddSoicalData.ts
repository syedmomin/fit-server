import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSocialMediaDummyData1718030000004 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "SocialMedia" ("facebook", "instagram", "twitter", "youtube", "linkedin")
             VALUES (
                'https://facebook.com/dummy',
                'https://instagram.com/dummy',
                'https://twitter.com/dummy',
                'https://youtube.com/dummy',
                'https://linkedin.com/in/dummy'
             )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "SocialMedia" 
             WHERE "facebook" = 'https://facebook.com/dummy'
             AND "instagram" = 'https://instagram.com/dummy'
             AND "twitter" = 'https://twitter.com/dummy'
             AND "youtube" = 'https://youtube.com/dummy'
             AND "linkedin" = 'https://linkedin.com/in/dummy'`
        );
    }
}
