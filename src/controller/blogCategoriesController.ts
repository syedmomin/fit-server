import { Request, Response } from "express";
import BaseController from "./baseController";
import blogCategoriesService from "../services/blogCategories.service";

class BlogCategoriesController extends BaseController {
  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        return this.sendError(res, "Category name is required", 400, "Validation Error");
      }
      const existing = await blogCategoriesService.IsExist({ name });
      if (existing) {
        return this.sendError(res, "Category already exists", 400, "Duplicate Category");
      }
      const newCategory = await blogCategoriesService.Create({ ...req.body });
      this.sendResponse(res, newCategory, "Category created successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Category ID is required", 400, "Validation Error");
      }
      const category = await blogCategoriesService.FindById(id);
      if (!category) {
        return this.sendError(res, "Category not found", 404, "Not Found");
      }
      const updatedCategory = await blogCategoriesService.Update(Number(id), req.body);
      this.sendResponse(res, updatedCategory, "Category updated successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Category ID is required", 400, "Validation Error");
      }
      const category = await blogCategoriesService.FindById(id);
      if (!category) {
        return this.sendError(res, "Category not found", 404, "Not Found");
      }
      await blogCategoriesService.Delete(Number(id));
      this.sendResponse(res, null, "Category deleted successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

 getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Category ID is required", 400, "Validation Error");
      }
      const category = await blogCategoriesService.FindById(id);
      if (!category) {
        return this.sendError(res, "Category not found", 404, "Not Found");
      }
      this.sendResponse(res, category, "Category retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await blogCategoriesService.GetAll();
      this.sendResponse(res, categories, "Categories retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }
}

export default new BlogCategoriesController();
