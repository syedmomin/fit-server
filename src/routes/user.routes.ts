import express from "express";
import UserController from "../controller/userController";
import { verifyToken } from "../middleware/jwt";

class UserRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        router.post("/", verifyToken, UserController.create);
        router.put("/:id", verifyToken, UserController.update);
        router.delete("/:id", verifyToken, UserController.delete);
        router.get("/:id", verifyToken, UserController.getById);
        router.get("", verifyToken, UserController.getAll);
    }
}

export default new UserRoutes().router;
