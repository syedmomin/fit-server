"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utility/logger"));
class BaseController {
    sendResponse(res, data, message = "Success", code = 200) {
        res.status(code).send({
            status: true,
            code,
            message,
            data,
        });
    }
    sendError(res, error, code = 500, message = "Something went wrong") {
        logger_1.default.error(error);
        res.status(error.code || 500).send({
            status: false,
            code: error.code || 500,
            message: error.message || "Something went wrong",
        });
    }
}
exports.default = BaseController;
