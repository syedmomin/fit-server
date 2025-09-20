"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const websiteController_1 = __importDefault(require("../controller/websiteController"));
class WebsiteRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/content", websiteController_1.default.loadAllContent);
        router.get("/layout", websiteController_1.default.layout);
        router.get("/blogs", websiteController_1.default.blogs);
        router.get("/blogs/:slug", websiteController_1.default.blogDetails);
        router.get("/plans", websiteController_1.default.plans);
        router.post("/contact", websiteController_1.default.contactForm);
        router.post("/auth/login", websiteController_1.default.login);
        router.post("/auth/signup", websiteController_1.default.signup);
        router.post("/auth/signup", websiteController_1.default.forgotPassword);
    }
}
exports.default = new WebsiteRoutes().router;
