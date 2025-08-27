import { Router } from "express";
import collection from "../controller/uploadController";
import { verifyToken } from "../middleware/jwt";
class UploadRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { router } = this;
    router.post("/singleImage", verifyToken,  collection.singleImage);
    router.post("/multiImage", verifyToken,  collection.multiImage);
  }
}

export default new UploadRoutes().router;
