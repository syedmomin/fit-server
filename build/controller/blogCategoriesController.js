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
const blogCategories_service_1 = __importDefault(require("../services/blogCategories.service"));
class BlogCategoriesController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                if (!name) {
                    return this.sendError(res, "Category name is required", 400, "Validation Error");
                }
                const existing = yield blogCategories_service_1.default.IsExist({ name });
                if (existing) {
                    return this.sendError(res, "Category already exists", 400, "Duplicate Category");
                }
                const newCategory = yield blogCategories_service_1.default.Create(Object.assign({}, req.body));
                this.sendResponse(res, newCategory, "Category created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Category ID is required", 400, "Validation Error");
                }
                const category = yield blogCategories_service_1.default.FindById(id);
                if (!category) {
                    return this.sendError(res, "Category not found", 404, "Not Found");
                }
                const updatedCategory = yield blogCategories_service_1.default.Update(Number(id), req.body);
                this.sendResponse(res, updatedCategory, "Category updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Category ID is required", 400, "Validation Error");
                }
                const category = yield blogCategories_service_1.default.FindById(id);
                if (!category) {
                    return this.sendError(res, "Category not found", 404, "Not Found");
                }
                yield blogCategories_service_1.default.Delete(Number(id));
                this.sendResponse(res, null, "Category deleted successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Category ID is required", 400, "Validation Error");
                }
                const category = yield blogCategories_service_1.default.FindById(id);
                if (!category) {
                    return this.sendError(res, "Category not found", 404, "Not Found");
                }
                this.sendResponse(res, category, "Category retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield blogCategories_service_1.default.GetAll();
                this.sendResponse(res, categories, "Categories retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new BlogCategoriesController();
