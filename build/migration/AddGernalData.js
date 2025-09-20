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
exports.AddGeneralSettingsData1718030000002 = void 0;
class AddGeneralSettingsData1718030000002 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO "GeneralSettings" ("email", "phone", "address", "shortIntro")
             VALUES (
                'syedmomin168@gmail.com',
                '389998236',
                'House no L-859 sector 2, North karachi, karachi, pakistan',
                'Webflow CMS template designed for tech startups looking to make an impact.'
             )`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "GeneralSettings" 
             WHERE "email" = 'syedmomin168@gmail.com' 
             AND "phone" = '389998236'`);
        });
    }
}
exports.AddGeneralSettingsData1718030000002 = AddGeneralSettingsData1718030000002;
