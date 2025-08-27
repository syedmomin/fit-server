import { Request, Response } from "express";
import BaseController from "./baseController";
import blogsService from "../services/blogs.service";

class BlogsController extends BaseController {
  create = async (req: Request, res: Response) => {
    try {
      const { title, slug, imageUrl } = req.body;
      if (!title || !slug) {
        return this.sendError(res, "Title and slug are required", 400, "Validation Error");
      }
      const existing = await blogsService.IsExist({ slug });
      if (existing) {
        return this.sendError(res, "Blog with this slug already exists", 400, "Duplicate Blog");
      }

      let imagePath = "";
      if (imageUrl && imageUrl.startsWith("data:")) {
        // Save base64 image and get path
        const imageName = `${slug}-${Date.now()}.png`;
        const filePath = "blogs/";
        // Call your upload controller logic directly or via service
        const fs = require("fs");
        const base64Data = imageUrl.replace(/^data:([A-Za-z-+/]+);base64,/, "");
        const fullPath = `./assets/images/${filePath}${imageName}`;
        fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });
        imagePath = `/assets/images/${filePath}${imageName}`;
      }

      const newBlog = await blogsService.Create({
        ...req.body,
        imageUrl: imagePath || req.body.imageUrl
      });
      this.sendResponse(res, newBlog, "Blog created successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Blog ID is required", 400, "Validation Error");
      }
      const blog = await blogsService.FindById(id);
      if (!blog) {
        return this.sendError(res, "Blog not found", 404, "Not Found");
      }

      let imagePath = blog.imageUrl;
      if (req.body.imageUrl && req.body.imageUrl.startsWith("data:")) {
        // Save new base64 image and get path
        const imageName = `${req.body.slug || blog.slug}-${Date.now()}.png`;
        const filePath = "blogs/";
        const fs = require("fs");
        const base64Data = req.body.imageUrl.replace(/^data:([A-Za-z-+/]+);base64,/, "");
        const fullPath = `./assets/images/${filePath}${imageName}`;
        fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });
        imagePath = `/assets/images/${filePath}${imageName}`;
      }

      const updatedBlog = await blogsService.Update(Number(id), {
        ...req.body,
        imageUrl: imagePath
      });
      this.sendResponse(res, updatedBlog, "Blog updated successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Blog ID is required", 400, "Validation Error");
      }
      const blog = await blogsService.FindById(id);
      if (!blog) {
        return this.sendError(res, "Blog not found", 404, "Not Found");
      }
      await blogsService.Delete(Number(id));
      this.sendResponse(res, null, "Blog deleted successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

 getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return this.sendError(res, "Blog ID is required", 400, "Validation Error");
      }
      const blog = await blogsService.FindById(id);
      if (!blog) {
        return this.sendError(res, "Blog not found", 404, "Not Found");
      }
      this.sendResponse(res, blog, "Blog retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const blogs = await blogsService.GetAll();
      this.sendResponse(res, blogs, "Blogs retrieved successfully");
    } catch (error: any) {
      this.sendError(res, error);
    }
  }
}

export default new BlogsController();
