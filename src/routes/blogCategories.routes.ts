import express from "express";
import { verifyToken } from "../middleware/jwt";
import BlogsController from "../controller/blogsController";

class BlogCategoriesRoutes {
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { router } = this;
        router.post("/", verifyToken, BlogsController.create);
        router.put("/:id", verifyToken, BlogsController.update);
        router.delete("/:id", verifyToken, BlogsController.delete);
        router.get("/:id", verifyToken, BlogsController.getById);
        router.get("", verifyToken, BlogsController.getAll);
    }
}

export default new BlogCategoriesRoutes().router;
