import express from "express";
import websiteController from "../controller/websiteController";

class WebsiteRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        // routes
        router.get("/content", websiteController.loadAllContent);
        router.get("/blogs", websiteController.blogs);
        router.get("/blogs/:slug", websiteController.blogDetails);
        router.get("/plans", websiteController.plans);
        router.post("/contact", websiteController.contactForm);
        router.post("/auth/login", websiteController.login);
        router.post("/auth/signup", websiteController.signup);
        router.post("/auth/signup", websiteController.forgotPassword);
 }
}

export default new WebsiteRoutes().router;
