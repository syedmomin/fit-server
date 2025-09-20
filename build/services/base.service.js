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
exports.BaseService = void 0;
const logger_1 = __importDefault(require("../utility/logger"));
class BaseService {
    GetOne(modal_1) {
        return __awaiter(this, arguments, void 0, function* (modal, filter = {}, relations, isDeleted = false) {
            try {
                let getDetails = {};
                getDetails.where = Object.assign(Object.assign({}, filter), { isDeleted });
                if (relations) {
                    getDetails.relations = relations;
                }
                return yield modal.findOne(getDetails);
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    Get(modal_1) {
        return __awaiter(this, arguments, void 0, function* (modal, filter = {}, relations, isDeleted = false) {
            try {
                let getDetails = {};
                getDetails.where = Object.assign(Object.assign({}, filter), { isDeleted });
                if (relations) {
                    getDetails.relations = relations;
                }
                return yield modal.find(getDetails);
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    Post(modal, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const create = modal.create(Object.assign({}, body));
                return yield create.save();
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    Put(modal, id, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield modal.update(id, Object.assign({}, filter));
                // Return updated entity
                return yield modal.findOne({ where: { id } });
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    SoftDelete(modal, id, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = Object.assign(Object.assign({}, (filter || {})), { isDeleted: true });
                return yield modal.update(id, body);
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    HardDelete(modal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield modal.delete({ id });
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
}
exports.BaseService = BaseService;
