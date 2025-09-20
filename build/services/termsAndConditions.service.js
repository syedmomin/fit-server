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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const termsAndCondition_1 = __importDefault(require("../entities/termsAndCondition"));
const base_service_1 = require("./base.service");
class TermsAndConditionsService extends base_service_1.BaseService {
    FindById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GetOne(termsAndCondition_1.default, { id: id });
        });
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Get(termsAndCondition_1.default, {});
        });
    }
    Update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Put(termsAndCondition_1.default, id, body);
        });
    }
    IsExist(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GetOne(termsAndCondition_1.default, filter);
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.SoftDelete(termsAndCondition_1.default, id);
        });
    }
    Create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Post(termsAndCondition_1.default, body);
        });
    }
}
exports.default = new TermsAndConditionsService();
