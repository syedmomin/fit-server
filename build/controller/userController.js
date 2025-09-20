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
const user_service_1 = __importDefault(require("../services/user.service"));
const baseController_1 = __importDefault(require("./baseController"));
class UserController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.GetAll();
                this.sendResponse(res, users, "Users retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return this.sendError(res, "Email is required", 400, "Validation Error");
                }
                const existingCustomer = yield user_service_1.default.IsExist({ email });
                if (existingCustomer) {
                    return this.sendError(res, "This User Already Exists!", 400, "Duplicate User");
                }
                const newCustomer = yield user_service_1.default.Create(Object.assign({}, req.body));
                this.sendResponse(res, newCustomer, "Add customer Successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        // Update user details
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updateColumns = req.body;
                if (!id) {
                    return this.sendError(res, "User ID is required", 400, "Validation Error");
                }
                const user = yield user_service_1.default.FindById(id);
                if (!user) {
                    return this.sendError(res, "User not found", 404, "Not Found");
                }
                const updatedUser = yield user_service_1.default.Update(id, updateColumns);
                this.sendResponse(res, updatedUser, "User updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        // Delete a user
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "User ID is required", 400, "Validation Error");
                }
                const user = yield user_service_1.default.FindById(id);
                if (!user) {
                    return this.sendError(res, "User not found", 404, "Not Found");
                }
                yield user_service_1.default.Delete(id);
                this.sendResponse(res, null, "User deleted successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        // Get user by ID
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "User ID is required", 400, "Validation Error");
                }
                const user = yield user_service_1.default.FindById(id);
                if (!user) {
                    return this.sendError(res, "User not found", 404, "Not Found");
                }
                this.sendResponse(res, user, "User retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new UserController();
