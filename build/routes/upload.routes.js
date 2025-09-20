"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = __importDefault(require("../controller/uploadController"));
const jwt_1 = require("../middleware/jwt");
class UploadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { router } = this;
        router.post("/singleImage", jwt_1.verifyToken, uploadController_1.default.singleImage);
        router.post("/multiImage", jwt_1.verifyToken, uploadController_1.default.multiImage);
    }
}
exports.default = new UploadRoutes().router;
