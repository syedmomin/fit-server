"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const contactFormController_1 = __importDefault(require("../controller/contactFormController"));
class ContactFormRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        router.delete("/:id", jwt_1.verifyToken, contactFormController_1.default.delete);
        router.get("/:id", jwt_1.verifyToken, contactFormController_1.default.getById);
        router.get("", jwt_1.verifyToken, contactFormController_1.default.getAll);
        router.post("replayQuery", jwt_1.verifyToken, contactFormController_1.default.replayQuery);
    }
}
exports.default = new ContactFormRoutes().router;
