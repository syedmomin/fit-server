import express from "express";
import { verifyToken } from "../middleware/jwt";
import SMTPController from "../controller/smtpController";

class SMTPRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/", verifyToken, SMTPController.getSMTP);
        router.post("/", verifyToken, SMTPController.createSMTP);
        router.put("/:id", verifyToken, SMTPController.updateSMTP);
 }
}

export default new SMTPRoutes().router;
