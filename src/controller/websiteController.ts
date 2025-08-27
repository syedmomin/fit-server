import { Request, Response } from "express";
import BaseController from "./baseController";
import websiteService from "../services/website.service";

class WebsiteController extends BaseController {
    loadAllContent = async (req: Request, res: Response) => {
        try {
            const newItem = await websiteService.LoadAllContent();
            this.sendResponse(res, newItem, "Get All Content successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    blogs = async (req: Request, res: Response) => {
        try {

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 30;
            const filter = req.query.filter as string || 'All';

            const result = await websiteService.getBlogs(page, limit, filter);
            this.sendResponse(res, result, "Get Blogs successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    blogDetails = async (req: Request, res: Response) => {
        try {
            const slug = req.params.slug;
            const item = await websiteService.getBlogDetails(slug);
            this.sendResponse(res, item, "Get Blog Details successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    plans = async (req: Request, res: Response) => {
        try {
            const item = await websiteService.Plans();
            this.sendResponse(res, item, "Get Plans successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    contactForm = async (req: Request, res: Response) => {
        try {
            const { name, phone, email, message } = req.body;
            await websiteService.contactForm(name, phone, email, message);
            this.sendResponse(res, null, "Contact form submitted successfully");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await websiteService.login(email, password);
            this.sendResponse(res, user, "Login successful");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    signup = async (req: Request, res: Response) => {
        try {
            const { fullName, email, phone, password } = req.body;
            const user = await websiteService.signup(fullName, email, phone, password);
            this.sendResponse(res, user, "Signup successful");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }

    forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            await websiteService.forgotPassword(email);
            this.sendResponse(res, null, "Password reset link sent to email");
        } catch (error: any) {
            this.sendError(res, error);
        }
    }
}

export default new WebsiteController();
