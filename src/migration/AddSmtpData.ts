import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDummySmtpSettings1718030000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "SmtpSettings" ("host", "port", "username", "password", "fromEmail")
      VALUES (
        'sandbox.smtp.mailtrap.io',
        2525,
        'a6089edcf8ef19',
        '1a846d41c4e33e',
        'noreply@fitxone.com'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "SmtpSettings"
      WHERE "host" = 'sandbox.smtp.mailtrap.io'
        AND "port" = 2525
        AND "username" = 'a6089edcf8ef19'
        AND "password" = '1a846d41c4e33e'
    `);
  }
}
