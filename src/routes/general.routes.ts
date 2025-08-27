import express from "express";
import { verifyToken } from "../middleware/jwt";
import GeneralController from "../controller/generalController";

class GeneralRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/", verifyToken, GeneralController.getGeneral);
        router.post("/", verifyToken, GeneralController.createGeneral);
        router.put("/:id", verifyToken, GeneralController.updateGeneral);
 }
}

export default new GeneralRoutes().router;
