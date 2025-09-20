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
exports.AddHomeData1718030000001 = void 0;
class AddHomeData1718030000001 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO "Home" ("title", "subTitle", "description", "bannerImage")
             VALUES ('Desk to Athletic in 90 Days', '.', 'AI‑tailored plans + a real coach. Train smarter, fix pain patterns, and build habits that stick without rearranging your life.', '/assets/images/home/1754201105738.png')`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "Home" WHERE "id" = 1`);
        });
    }
}
exports.AddHomeData1718030000001 = AddHomeData1718030000001;
