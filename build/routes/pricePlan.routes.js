"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const pricePlanController_1 = __importDefault(require("../controller/pricePlanController"));
class PricePlanRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        router.post("/", jwt_1.verifyToken, pricePlanController_1.default.create);
        router.put("/:id", jwt_1.verifyToken, pricePlanController_1.default.update);
        router.delete("/:id", jwt_1.verifyToken, pricePlanController_1.default.delete);
        router.get("/:id", jwt_1.verifyToken, pricePlanController_1.default.getById);
        router.get("", jwt_1.verifyToken, pricePlanController_1.default.getAll);
    }
}
exports.default = new PricePlanRoutes().router;
