"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        router.post("/login", authController_1.default.login);
        router.post("/register", authController_1.default.register);
        router.post("/verification", authController_1.default.verification);
        router.post("/refreshToken", authController_1.default.verification);
        router.post("/changePassword", authController_1.default.changePassword);
    }
}
exports.default = new AuthRoutes().router;
