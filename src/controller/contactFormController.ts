import { Request, Response } from "express";
import BaseController from "./baseController";
import ContactFormService from "../services/contactForm.service";

class ContactFormController extends BaseController {
   
    getAll = async (req: Request, res: Response) => {
        try {
            const items = await ContactFormService.GetAll();
            this.sendResponse(res, items, "Get all contact forms successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await ContactFormService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "Get contact form by ID successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await ContactFormService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            await ContactFormService.Delete(+id);
            this.sendResponse(res, null, "Deleted successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }


    replayQuery = async (req: Request, res: Response) => {
        try {
            const { id, replyMessage } = req.body;
            if (!id || !replyMessage) {
                return this.sendError(res, "ID and reply message are required", 400, "Validation Error");
            }
            const item = await ContactFormService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            // Assuming the service has a method to handle the reply logic
            // await this.service.ReplyToQuery(id, replyMessage);
            this.sendResponse(res, null, "Reply sent successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }
}

export default new ContactFormController();
