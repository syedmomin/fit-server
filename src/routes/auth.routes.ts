import express from "express";
import AuthController from "../controller/authController";

class AuthRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes(); 
    }

    private initializeRoutes() {
        const { router } = this;
        
        router.post("/login", AuthController.login);
        router.post("/register", AuthController.register);
        router.post("/verification", AuthController.verification);
        router.post("/refreshToken", AuthController.verification);
        router.post("/changePassword", AuthController.changePassword);
    }
}

export default new AuthRoutes().router;
