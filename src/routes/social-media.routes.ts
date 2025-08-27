import express from "express";
import { verifyToken } from "../middleware/jwt";
import SocialMediaController from "../controller/socialMediaController";

class SocialMediaRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/", verifyToken, SocialMediaController.getSocialMedia);
        router.post("/", verifyToken, SocialMediaController.createSocialMedia);
        router.put("/:id", verifyToken, SocialMediaController.updateSocialMedia);
 }
}

export default new SocialMediaRoutes().router;
