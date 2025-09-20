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
const pricePlan_service_1 = __importDefault(require("../services/pricePlan.service"));
class PricePlanController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                if (!name) {
                    return this.sendError(res, "Name is required", 400, "Validation Error");
                }
                const existing = yield pricePlan_service_1.default.IsExist({ name });
                if (existing) {
                    return this.sendError(res, "Price plan with this name already exists", 400, "Duplicate Plan");
                }
                const newPlan = yield pricePlan_service_1.default.Create(Object.assign({}, req.body));
                this.sendResponse(res, newPlan, "Price plan created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Plan ID is required", 400, "Validation Error");
                }
                const plan = yield pricePlan_service_1.default.FindById(id);
                if (!plan) {
                    return this.sendError(res, "Plan not found", 404, "Not Found");
                }
                const updatedPlan = yield pricePlan_service_1.default.Update(Number(id), req.body);
                this.sendResponse(res, updatedPlan, "Plan updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Plan ID is required", 400, "Validation Error");
                }
                const plan = yield pricePlan_service_1.default.FindById(id);
                if (!plan) {
                    return this.sendError(res, "Plan not found", 404, "Not Found");
                }
                yield pricePlan_service_1.default.Delete(Number(id));
                this.sendResponse(res, null, "Plan deleted successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "Plan ID is required", 400, "Validation Error");
                }
                const plan = yield pricePlan_service_1.default.FindById(id);
                if (!plan) {
                    return this.sendError(res, "Plan not found", 404, "Not Found");
                }
                this.sendResponse(res, plan, "Plan retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const plans = yield pricePlan_service_1.default.GetAll();
                this.sendResponse(res, plans, "Plans retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new PricePlanController();
