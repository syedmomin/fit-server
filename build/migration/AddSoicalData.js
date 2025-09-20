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
exports.AddSocialMediaDummyData1718030000004 = void 0;
class AddSocialMediaDummyData1718030000004 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO "SocialMedia" ("facebook", "instagram", "twitter", "youtube", "linkedin")
             VALUES (
                'https://facebook.com/dummy',
                'https://instagram.com/dummy',
                'https://twitter.com/dummy',
                'https://youtube.com/dummy',
                'https://linkedin.com/in/dummy'
             )`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "SocialMedia" 
             WHERE "facebook" = 'https://facebook.com/dummy'
             AND "instagram" = 'https://instagram.com/dummy'
             AND "twitter" = 'https://twitter.com/dummy'
             AND "youtube" = 'https://youtube.com/dummy'
             AND "linkedin" = 'https://linkedin.com/in/dummy'`);
        });
    }
}
exports.AddSocialMediaDummyData1718030000004 = AddSocialMediaDummyData1718030000004;
