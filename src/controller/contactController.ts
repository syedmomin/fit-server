import { Request, Response } from "express";
import BaseController from "./baseController";
import contactService from "../services/contact.service";

class ContactController extends BaseController {

  create = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        return this.sendError(res, "Email is required", 400, "Validation Error");
      }
      const existingCustomer = await contactService.IsExist({ email });
      if (existingCustomer) {
        return this.sendError(res, "This customer Already Exists!", 400, "Duplicate customer");
      }
      const newCustomer = await contactService.Create({ ...req.body });
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
        return this.sendError(res, "Customer ID is required", 400, "Validation Error");
      }
      const user = await contactService.FindById(id);
      if (!user) {
        return this.sendError(res, "Customer not found", 404, "Not Found");
      }
      const updatedCustomer = await contactService.Update(Number(id), updateColumns);
      this.sendResponse(res, updatedCustomer, "Customer updated successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  // Delete a user
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Customer ID is required", 400, "Validation Error");
      }
      const user = await contactService.FindById(id);
      if (!user) {
        return this.sendError(res, "Customer not found", 404, "Not Found");
      }
      await contactService.Delete(Number(id));
      this.sendResponse(res, null, "Customer deleted successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  // Get user by ID
 getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Customer ID is required", 400, "Validation Error");
      }
      const user = await contactService.FindById(id);
      if (!user) {
        return this.sendError(res, "Customer not found", 404, "Not Found");
      }
      this.sendResponse(res, user, "Customer retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  
  getAll = async (req: Request, res: Response) => {
    try {
      const users = await contactService.GetAll();
      this.sendResponse(res, users, "Customers retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

}

export default new ContactController();