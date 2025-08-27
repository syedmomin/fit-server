import { Request, Response } from "express";
import BaseController from "./baseController";
import pricePlanService from "../services/pricePlan.service";

class PricePlanController extends BaseController {
  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        return this.sendError(res, "Name is required", 400, "Validation Error");
      }
      const existing = await pricePlanService.IsExist({ name });
      if (existing) {
        return this.sendError(res, "Price plan with this name already exists", 400, "Duplicate Plan");
      }
      const newPlan = await pricePlanService.Create({ ...req.body });
      this.sendResponse(res, newPlan, "Price plan created successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Plan ID is required", 400, "Validation Error");
      }
      const plan = await pricePlanService.FindById(id);
      if (!plan) {
        return this.sendError(res, "Plan not found", 404, "Not Found");
      }
      const updatedPlan = await pricePlanService.Update(Number(id), req.body);
      this.sendResponse(res, updatedPlan, "Plan updated successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Plan ID is required", 400, "Validation Error");
      }
      const plan = await pricePlanService.FindById(id);
      if (!plan) {
        return this.sendError(res, "Plan not found", 404, "Not Found");
      }
      await pricePlanService.Delete(Number(id));
      this.sendResponse(res, null, "Plan deleted successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

 getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Plan ID is required", 400, "Validation Error");
      }
      const plan = await pricePlanService.FindById(id);
      if (!plan) {
        return this.sendError(res, "Plan not found", 404, "Not Found");
      }
      this.sendResponse(res, plan, "Plan retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const plans = await pricePlanService.GetAll();
      this.sendResponse(res, plans, "Plans retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }
}

export default new PricePlanController();
