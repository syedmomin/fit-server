import { Request, Response } from "express";
import BaseController from "./baseController";
import termsAndConditionsService from "../services/termsAndConditions.service";
import privacyPolicyService from "../services/privacyPolicy.service";
import faqsService from "../services/faqs.service";
import homeService from "../services/home.service";

class SetupPagesController extends BaseController {
    createTermsAndConditions = async (req: Request, res: Response) => {
        try {
            const newItem = await termsAndConditionsService.Create({ ...req.body });
            this.sendResponse(res, newItem, "Terms and Conditions created successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    updateTermsAndConditions = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await termsAndConditionsService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            const updatedItem = await termsAndConditionsService.Update(Number(id), req.body);
            this.sendResponse(res, updatedItem, "Updated successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    getTermsAndConditions = async (req: Request, res: Response) => {
        try {
            const item = await termsAndConditionsService.GetAll();
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "Retrieved successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    createPrivacyPolicy = async (req: Request, res: Response) => {
        try {
            const newItem = await privacyPolicyService.Create({ ...req.body });
            this.sendResponse(res, newItem, "Privacy Policy created successfully");
        }
        catch (error: any) {
            this.sendError(res, error);
        }
    }

    updatePrivacyPolicy = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await privacyPolicyService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            const updatedItem = await privacyPolicyService.Update(Number(id), req.body);
            this.sendResponse(res, updatedItem, "Updated successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    getPrivacyPolicy = async (req: Request, res: Response) => {
        try {
            const item = await privacyPolicyService.GetAll();
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "Retrieved successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }


    createFaq = async (req: Request, res: Response) => {
        try {
            const newItem = await faqsService.Create({ ...req.body });
            this.sendResponse(res, newItem, "FAQ created successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    updateFaq = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await faqsService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            const updatedItem = await faqsService.Update(Number(id), req.body);
            this.sendResponse(res, updatedItem, "FAQ updated successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    deleteFaq = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await faqsService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            await faqsService.Delete(Number(id));
            this.sendResponse(res, null, "FAQ deleted successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }
    
    getFaq = async (req: Request, res: Response) => {
        try {
            const item = await faqsService.GetAll();
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "FAQ retrieved successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    createHomePage = async (req: Request, res: Response) => {
        try {

            const { bannerImage } = req.body;
            let imagePath = "";
            if (bannerImage && bannerImage.startsWith("data:")) {
                // Save base64 image and get path
                const imageName = `${Date.now()}.png`;
                const filePath = "home/";
                // Call your upload controller logic directly or via service
                const fs = require("fs");
                const base64Data = bannerImage.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                const fullPath = `./assets/images/${filePath}${imageName}`;
                fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });
                imagePath = `/assets/images/${filePath}${imageName}`;
            }

            const newItem = await homeService.Create({
                ...req.body,
                bannerImage: imagePath || req.body.bannerImage
            });
            this.sendResponse(res, newItem, "Home Page created successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    updateHomePage = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                return this.sendError(res, "ID is required", 400, "Validation Error");
            }
            const item = await homeService.FindById(id);
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }

            let imagePath = item.bannerImage;
            if (req.body.bannerImage && req.body.bannerImage.startsWith("data:")) {
                // Save new base64 image and get path
                const imageName = `${Date.now()}.png`;
                const filePath = "home/";
                const fs = require("fs");
                const base64Data = req.body.bannerImage.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                const fullPath = `./assets/images/${filePath}${imageName}`;
                fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });
                imagePath = `/assets/images/${filePath}${imageName}`;
            }

            const updatedItem = await homeService.Update(Number(id), {
                ...req.body,
                bannerImage: imagePath
            });

            this.sendResponse(res, updatedItem, "Home Page updated successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    getHomePage = async (req: Request, res: Response) => {
        try {
            const item = await homeService.GetAll();
            if (!item) {
                return this.sendError(res, "Not found", 404, "Not Found");
            }
            this.sendResponse(res, item, "Home Page retrieved successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }
}

export default new SetupPagesController();
