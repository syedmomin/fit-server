import express from "express";
import { verifyToken } from "../middleware/jwt";
import PricePlanController from "../controller/pricePlanController";

class PricePlanRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        router.post("/", verifyToken, PricePlanController.create);
        router.put("/:id", verifyToken, PricePlanController.update);
        router.delete("/:id", verifyToken, PricePlanController.delete);
        router.get("/:id", verifyToken, PricePlanController.getById);
        router.get("", verifyToken, PricePlanController.getAll);
    }
}

export default new PricePlanRoutes().router;
