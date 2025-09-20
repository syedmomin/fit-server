"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const smtpController_1 = __importDefault(require("../controller/smtpController"));
class SMTPRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/", jwt_1.verifyToken, smtpController_1.default.getSMTP);
        router.post("/", jwt_1.verifyToken, smtpController_1.default.createSMTP);
        router.put("/:id", jwt_1.verifyToken, smtpController_1.default.updateSMTP);
    }
}
exports.default = new SMTPRoutes().router;
