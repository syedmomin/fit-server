import express from "express";
import { verifyToken } from "../middleware/jwt";
import ContactController from "../controller/contactController";

class ContactRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        router.post("/", verifyToken, ContactController.create);
        router.put("/:id", verifyToken, ContactController.update);
        router.delete("/:id", verifyToken, ContactController.delete);
        router.get("/:id", verifyToken, ContactController.getById);
        router.get("", verifyToken, ContactController.getAll);
    }
}

export default new ContactRoutes().router;
