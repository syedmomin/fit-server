"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const socialMediaController_1 = __importDefault(require("../controller/socialMediaController"));
class SocialMediaRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/", jwt_1.verifyToken, socialMediaController_1.default.getSocialMedia);
        router.post("/", jwt_1.verifyToken, socialMediaController_1.default.createSocialMedia);
        router.put("/:id", jwt_1.verifyToken, socialMediaController_1.default.updateSocialMedia);
    }
}
exports.default = new SocialMediaRoutes().router;
