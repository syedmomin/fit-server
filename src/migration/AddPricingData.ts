import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialPricePlans1699999999999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
    INSERT INTO "PricePlans" ("id", "name", "description", "features", "price", "type") VALUES
    (
        1,
        'QuickStart Guide',
        'Desk-bound professionals who don''t know where to start and need a clear, manageable first step into fitness',
        'Al assessment + expert coach refinement, Designed for desk-bound professionals, 24-hour plan delivery, 4-week "where to start" program, 15-30 minute desk-friendly workouts, Posture correction exercises, Energy optimization guide, Simple habit-building framework',
        39.00,
        '10'
    ),
    (
        2,
        'Reset Program',
        'Busy professionals who need accountability, flexibility, and real-time adjustments to stay on track',
        'Everything in QuickStart Guide, Weekly 20–30 min coach calls, Real-time program adjustments, Personalized accountability system, Stress & recovery optimization, Monthly progress assessments, Text check-ins between sessions, Habit formation coaching',
        299.00,
        '10'
    ),
    (
        3,
        '1:1 Elite Coaching',
        'For executives requiring comprehensive support. Join the waitlist to be notified when spots open.',
        'Everything in Reset Program, Daily coach availability (Premium), Weekly 45-min strategy sessions, Custom nutrition planning, Form video analysis, Priority response time (2 hours), Quarterly health assessments, Event/goal specific preparation, Lifestyle integration coaching',
        549.00,
        '10'
    );
`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "PricePlans" WHERE "id" IN (1, 2, 3);
        `);
    }
}
