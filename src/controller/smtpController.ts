import { Request, Response } from "express";
import BaseController from "./baseController";
import smtpService from "../services/smtp.service";

class SMTPController extends BaseController {
    createSMTP = async (req: Request, res: Response) => {
        try {
            const newItem = await smtpService.Create({ ...req.body });
            this.sendResponse(res, newItem, "SMTP created successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    updateSMTP = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await smtpService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            const updatedItem = await smtpService.Update(Number(id), req.body);
            this.sendResponse(res, updatedItem, "Updated successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    getSMTP = async (req: Request, res: Response) => {
        try {
            const item = await smtpService.GetAll();
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "Retrieved successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }
}

export default new SMTPController();
