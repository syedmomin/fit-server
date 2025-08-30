import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFaqsData1718030000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `INSERT INTO "Faqs" ("question", "answer", "sortOrder") VALUES
        ('How quickly will I see results?', 'Most clients report feeling more energized within 2 weeks, seeing visible changes in 4-6 weeks, and significant transformation by 12 weeks. Your timeline depends on consistency and starting point.', 0),
        ('How do I join the 1:1 Elite waitlist?', 'Due to high demand and limited coach availability, our 1:1 Elite Coaching operates on a waitlist basis. Join the list to be notified as soon as a spot opens. Priority is given to current Reset members.', 0),
        ('What if I travel frequently?', 'Perfect—that''s exactly why we exist. All plans include travel-friendly workouts, and Reset/Elite coaches adjust your program based on your location and available equipment.', 0),
        ('How are coaches matched?', 'Based on your assessment, we match you with a specialist in your specific goals—whether that''s weight loss, strength, mobility, or athletic performance.', 0)`
    );
}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "Faqs" WHERE "id" IN (3, 4, 5, 6)`
        );
    }
}
