import express from "express";
import { verifyToken } from "../middleware/jwt";
import SetupPagesController from "../controller/setupPagesController";

class SetupPagesRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        // termsAndConditions routes
        router.get("/termsAndConditions/", verifyToken, SetupPagesController.getTermsAndConditions);
        router.post("/termsAndConditions/", verifyToken, SetupPagesController.createTermsAndConditions);
        router.put("/termsAndConditions/:id", verifyToken, SetupPagesController.updateTermsAndConditions);

        // faqs routes
        router.get("/faqs/", verifyToken, SetupPagesController.getFaq);
        router.post("/faqs/", verifyToken, SetupPagesController.createFaq);
        router.put("/faqs/:id", verifyToken, SetupPagesController.updateFaq);
        router.delete("/faqs/:id", verifyToken, SetupPagesController.deleteFaq);

        // home routes
        router.get("/homePage/", verifyToken, SetupPagesController.getHomePage);
        router.post("/homePage/", verifyToken, SetupPagesController.createHomePage);
        router.put("/homePage/:id", verifyToken, SetupPagesController.updateHomePage);
    }
}

export default new SetupPagesRoutes().router;
