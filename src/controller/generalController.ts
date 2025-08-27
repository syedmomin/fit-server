import { Request, Response } from "express";
import BaseController from "./baseController";
import GeneralSettingsService from "../services/generalSettings.service";

class GeneralController extends BaseController {
    createGeneral = async (req: Request, res: Response) => {
        try {
            const newItem = await GeneralSettingsService.Create({ ...req.body });
            this.sendResponse(res, newItem, "General Settings created successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    updateGeneral = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await GeneralSettingsService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            const updatedItem = await GeneralSettingsService.Update(Number(id), req.body);
            this.sendResponse(res, updatedItem, "Updated successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    getGeneral = async (req: Request, res: Response) => {
        try {
            const item = await GeneralSettingsService.GetAll();
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "Retrieved successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }
}

export default new GeneralController();
