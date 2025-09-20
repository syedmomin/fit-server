"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPricePlans1699999999999 = void 0;
class AddPricePlans1699999999999 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
    INSERT INTO "PricePlans" ("name", "description", "features", "highlightText", "price", "type", "highlighted", "buttonText", "discountText") VALUES
    (
        'Reset Program',
        'Busy professionals who need accountability, flexibility, and real-time adjustments to stay on track',
        'Everything in QuickStart Guide, Weekly 20–30 min coach calls, Real-time program adjustments, Personalized accountability system, Stress & recovery optimization, Monthly progress assessments, Text check-ins between sessions, Habit formation coaching',
        'MOST POPULAR',
         299,
        '10',
        true,
        'Get Started',
        ''
    ),
    (
        '1:1 Elite Coaching',
        'For executives requiring comprehensive support. Join the waitlist to be notified when spots open.',
        'Everything in Reset Program, Daily coach availability (Premium), Weekly 45-min strategy sessions, Custom nutrition planning, Form video analysis, Priority response time (2 hours), Quarterly health assessments, Event/goal specific preparation, Lifestyle integration coaching',
        'WAITLIST ONLY',
         549,
        '10',
         false,
        'Join Waitlist',
        ''
    ),
    (
        'Reset Program',
        'Busy professionals who need accountability, flexibility, and real-time adjustments to stay on track',
        'Everything in QuickStart Guide, Weekly 20–30 min coach calls, Real-time program adjustments, Personalized accountability system, Stress & recovery optimization, Monthly progress assessments, Text check-ins between sessions, Habit formation coaching',
        'MOST POPULAR',
         2870.40,
        '20',
        true,
        'Get Started',
        'Save 20% with annual billing'
    ),
    (
        '1:1 Elite Coaching',
        'For executives requiring comprehensive support. Join the waitlist to be notified when spots open.',
        'Everything in Reset Program, Daily coach availability (Premium), Weekly 45-min strategy sessions, Custom nutrition planning, Form video analysis, Priority response time (2 hours), Quarterly health assessments, Event/goal specific preparation, Lifestyle integration coaching',
        'WAITLIST ONLY',
         5270.40,
        '20',
         false,
        'Join Waitlist',
        'Save 20% with annual billing'
    );`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM "PricePlans" WHERE "id" IN (1, 2, 3);
        `);
        });
    }
}
exports.AddPricePlans1699999999999 = AddPricePlans1699999999999;
