"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("./baseController"));
const blogs_service_1 = __importDefault(require("../services/blogs.service"));
class BlogsController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, slug, imageUrl } = req.body;
                if (!title || !slug) {
                    return this.sendError(res, "Title and slug are required", 400, "Validation Error");
                }
                const existing = yield blogs_service_1.default.IsExist({ slug });
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
                const newBlog = yield blogs_service_1.default.Create(Object.assign(Object.assign({}, req.body), { imageUrl: imagePath || req.body.imageUrl }));
                this.sendResponse(res, newBlog, "Blog created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Blog ID is required", 400, "Validation Error");
                }
                const blog = yield blogs_service_1.default.FindById(id);
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
                const updatedBlog = yield blogs_service_1.default.Update(Number(id), Object.assign(Object.assign({}, req.body), { imageUrl: imagePath }));
                this.sendResponse(res, updatedBlog, "Blog updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Blog ID is required", 400, "Validation Error");
                }
                const blog = yield blogs_service_1.default.FindById(id);
                if (!blog) {
                    return this.sendError(res, "Blog not found", 404, "Not Found");
                }
                yield blogs_service_1.default.Delete(Number(id));
                this.sendResponse(res, null, "Blog deleted successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Blog ID is required", 400, "Validation Error");
                }
                const blog = yield blogs_service_1.default.FindById(id);
                if (!blog) {
                    return this.sendError(res, "Blog not found", 404, "Not Found");
                }
                this.sendResponse(res, blog, "Blog retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield blogs_service_1.default.GetAll();
                this.sendResponse(res, blogs, "Blogs retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new BlogsController();
