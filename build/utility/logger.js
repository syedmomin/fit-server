"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Logger {
    static error(error) {
        const log = `[${new Date().toISOString()}] ERROR: ${(error === null || error === void 0 ? void 0 : error.stack) || error}\n`;
        fs_1.default.appendFileSync(Logger.logFile, log);
    }
    static info(message) {
        const log = `[${new Date().toISOString()}] INFO: ${message}\n`;
        fs_1.default.appendFileSync(Logger.logFile, log);
    }
}
Logger.logFile = path_1.default.join(__dirname, "../../logs/app.log");
exports.default = Logger;
