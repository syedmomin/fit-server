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
exports.InsertDummySmtpSettings1718030000006 = void 0;
class InsertDummySmtpSettings1718030000006 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      INSERT INTO "SmtpSettings" ("host", "port", "username", "password", "fromEmail")
      VALUES (
        'sandbox.smtp.mailtrap.io',
        2525,
        'a6089edcf8ef19',
        '1a846d41c4e33e',
        'noreply@fitxone.com'
      )
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      DELETE FROM "SmtpSettings"
      WHERE "host" = 'sandbox.smtp.mailtrap.io'
        AND "port" = 2525
        AND "username" = 'a6089edcf8ef19'
        AND "password" = '1a846d41c4e33e'
    `);
        });
    }
}
exports.InsertDummySmtpSettings1718030000006 = InsertDummySmtpSettings1718030000006;
