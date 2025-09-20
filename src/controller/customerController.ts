import { Request, Response } from "express";
import ContactService from "../services/contact.service";

class collection {
  create = async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        phone,
        address,
        alternateNumber,
        city,
        country,
        customerType,
      } = req.body;

      const existingCustomer = await ContactService.IsExist({ phone });

      if (existingCustomer) {
        return res.status(400).send({
          status: false,
          code: 400,
          message: "This Customer Already Exists!",
        });
      }

      const newCustomer = await ContactService.Create({ ...req.body });

      res.status(200).send({
        code: 200,
        status: true,
        message: "Add customer Successfully",
        data: newCustomer,
      });
    } catch (error: any) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id, ...updateColumns } = req.body;

      const existingCustomer = await ContactService.FindById(id);

      if (!existingCustomer) {
        return res.status(404).send({
          status: false,
          code: 404,
          message: "Customer not found",
        });
      }
      await ContactService.Update(id, updateColumns);

      res.status(200).send({
        code: 200,
        status: true,
        message: "Update customer Successfully",
        data: existingCustomer,
      });
    } catch (error: any) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const existingCustomer = await ContactService.FindById(id);

      if (!existingCustomer) {
        return res.status(404).send({
          status: false,
          code: 404,
          message: "Customer not found",
        });
      }

      await ContactService.Delete(id);

      res.status(200).send({
        code: 200,
        status: true,
        message: "Delete customer Successfully",
      });
    } catch (error: any) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const customers = await ContactService.GetAll();

      if (customers.length > 0) {
        res.status(200).send({
          code: 200,
          status: true,
          message: "Get all customer",
          data: customers,
        });
      } else {
        res.status(206).send({
          code: 206,
          status: false,
          message: "customer Not Exist!",
        });
      }
    } catch (error: any) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  };

 getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const existingCustomer = await ContactService.FindById(id);

      if (!existingCustomer) {
        return res.status(404).send({
          status: false,
          code: 404,
          message: "Customer not found",
        });
      }

      res.status(200).send({
        code: 200,
        status: true,
        message: "Get customer",
        data: existingCustomer,
      });
    } catch (error: any) {
      res.status(500).send({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  };
}; 

export default new collection();
