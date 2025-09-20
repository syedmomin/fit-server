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
const contact_service_1 = __importDefault(require("../services/contact.service"));
class ContactController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return this.sendError(res, "Email is required", 400, "Validation Error");
                }
                const existingCustomer = yield contact_service_1.default.IsExist({ email });
                if (existingCustomer) {
                    return this.sendError(res, "This customer Already Exists!", 400, "Duplicate customer");
                }
                const newCustomer = yield contact_service_1.default.Create(Object.assign({}, req.body));
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
                    return this.sendError(res, "Customer ID is required", 400, "Validation Error");
                }
                const user = yield contact_service_1.default.FindById(id);
                if (!user) {
                    return this.sendError(res, "Customer not found", 404, "Not Found");
                }
                const updatedCustomer = yield contact_service_1.default.Update(Number(id), updateColumns);
                this.sendResponse(res, updatedCustomer, "Customer updated successfully");
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
                    return this.sendError(res, "Customer ID is required", 400, "Validation Error");
                }
                const user = yield contact_service_1.default.FindById(id);
                if (!user) {
                    return this.sendError(res, "Customer not found", 404, "Not Found");
                }
                yield contact_service_1.default.Delete(Number(id));
                this.sendResponse(res, null, "Customer deleted successfully");
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
                    return this.sendError(res, "Customer ID is required", 400, "Validation Error");
                }
                const user = yield contact_service_1.default.FindById(id);
                if (!user) {
                    return this.sendError(res, "Customer not found", 404, "Not Found");
                }
                this.sendResponse(res, user, "Customer retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield contact_service_1.default.GetAll();
                this.sendResponse(res, users, "Customers retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new ContactController();
