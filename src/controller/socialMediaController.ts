import { Request, Response } from "express";
import BaseController from "./baseController";
import socialMediaService from "../services/socialMedia.service";

class SocialMediaController extends BaseController {
    createSocialMedia = async (req: Request, res: Response) => {
        try {
            const newItem = await socialMediaService.Create({ ...req.body });
            this.sendResponse(res, newItem, "Social Media created successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    updateSocialMedia = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await socialMediaService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            const updatedItem = await socialMediaService.Update(Number(id), req.body);
            this.sendResponse(res, updatedItem, "Updated successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    getSocialMedia = async (req: Request, res: Response) => {
        try {
            const item = await socialMediaService.GetAll();
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "Retrieved successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }
}

export default new SocialMediaController();
