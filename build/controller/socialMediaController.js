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
const socialMedia_service_1 = __importDefault(require("../services/socialMedia.service"));
class SocialMediaController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.createSocialMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield socialMedia_service_1.default.Create(Object.assign({}, req.body));
                this.sendResponse(res, newItem, "Social Media created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.updateSocialMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield socialMedia_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                const updatedItem = yield socialMedia_service_1.default.Update(Number(id), req.body);
                this.sendResponse(res, updatedItem, "Updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getSocialMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield socialMedia_service_1.default.GetAll();
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                this.sendResponse(res, item, "Retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new SocialMediaController();
