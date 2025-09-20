"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const generalController_1 = __importDefault(require("../controller/generalController"));
class GeneralRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/", jwt_1.verifyToken, generalController_1.default.getGeneral);
        router.post("/", jwt_1.verifyToken, generalController_1.default.createGeneral);
        router.put("/:id", jwt_1.verifyToken, generalController_1.default.updateGeneral);
    }
}
exports.default = new GeneralRoutes().router;
