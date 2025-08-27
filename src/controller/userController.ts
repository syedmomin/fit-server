import { Request, Response } from "express";
import userService from "../services/user.service";
import BaseController from "./baseController";

class UserController extends BaseController {

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await userService.GetAll();
      this.sendResponse(res, users, "Users retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        return this.sendError(res, "Email is required", 400, "Validation Error");
      }
      const existingCustomer = await userService.IsExist({ email });
      if (existingCustomer) {
        return this.sendError(res, "This User Already Exists!", 400, "Duplicate User");
      }
      const newCustomer = await userService.Create({ ...req.body });
      this.sendResponse(res, newCustomer, "Add customer Successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  // Update user details
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updateColumns = req.body;
      if (!id) {
        return this.sendError(res, "User ID is required", 400, "Validation Error");
      }
      const user = await userService.FindById(id);
      if (!user) {
        return this.sendError(res, "User not found", 404, "Not Found");
      }
      const updatedUser = await userService.Update(id, updateColumns);
      this.sendResponse(res, updatedUser, "User updated successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  // Delete a user
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "User ID is required", 400, "Validation Error");
      }
      const user = await userService.FindById(id);
      if (!user) {
        return this.sendError(res, "User not found", 404, "Not Found");
      }
      await userService.Delete(id);
      this.sendResponse(res, null, "User deleted successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  // Get user by ID
  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "User ID is required", 400, "Validation Error");
      }
      const user = await userService.FindById(id);
      if (!user) {
        return this.sendError(res, "User not found", 404, "Not Found");
      }
      this.sendResponse(res, user, "User retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }
}

export default new UserController();