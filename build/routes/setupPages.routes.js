"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const setupPagesController_1 = __importDefault(require("../controller/setupPagesController"));
class SetupPagesRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        // termsAndConditions routes
        router.get("/termsAndConditions/", jwt_1.verifyToken, setupPagesController_1.default.getTermsAndConditions);
        router.post("/termsAndConditions/", jwt_1.verifyToken, setupPagesController_1.default.createTermsAndConditions);
        router.put("/termsAndConditions/:id", jwt_1.verifyToken, setupPagesController_1.default.updateTermsAndConditions);
        // privacyPolicy routes
        router.post("/privacyPolicy/", jwt_1.verifyToken, setupPagesController_1.default.createPrivacyPolicy);
        router.put("/privacyPolicy/:id", jwt_1.verifyToken, setupPagesController_1.default.updatePrivacyPolicy);
        router.get("/privacyPolicy/", jwt_1.verifyToken, setupPagesController_1.default.getPrivacyPolicy);
        // faqs routes
        router.get("/faqs/", jwt_1.verifyToken, setupPagesController_1.default.getFaq);
        router.post("/faqs/", jwt_1.verifyToken, setupPagesController_1.default.createFaq);
        router.put("/faqs/:id", jwt_1.verifyToken, setupPagesController_1.default.updateFaq);
        router.delete("/faqs/:id", jwt_1.verifyToken, setupPagesController_1.default.deleteFaq);
        // home routes
        router.get("/homePage/", jwt_1.verifyToken, setupPagesController_1.default.getHomePage);
        router.post("/homePage/", jwt_1.verifyToken, setupPagesController_1.default.createHomePage);
        router.put("/homePage/:id", jwt_1.verifyToken, setupPagesController_1.default.updateHomePage);
    }
}
exports.default = new SetupPagesRoutes().router;
