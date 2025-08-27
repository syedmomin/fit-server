import express from "express";
import { verifyToken } from "../middleware/jwt";
import contactFormController from "../controller/contactFormController";

class ContactFormRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        router.delete("/:id", verifyToken, contactFormController.delete);
        router.get("/:id", verifyToken, contactFormController.getById);
        router.get("", verifyToken, contactFormController.getAll);
        router.post("replayQuery", verifyToken,contactFormController.replayQuery);
    }
}

export default new ContactFormRoutes().router;
