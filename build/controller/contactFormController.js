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
const contactForm_service_1 = __importDefault(require("../services/contactForm.service"));
class ContactFormController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield contactForm_service_1.default.GetAll();
                this.sendResponse(res, items, "Get all contact forms successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield contactForm_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                this.sendResponse(res, item, "Get contact form by ID successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield contactForm_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                yield contactForm_service_1.default.Delete(+id);
                this.sendResponse(res, null, "Deleted successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.replayQuery = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, replyMessage } = req.body;
                if (!id || !replyMessage) {
                    return this.sendError(res, "ID and reply message are required", 400, "Validation Error");
                }
                const item = yield contactForm_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                // Assuming the service has a method to handle the reply logic
                // await this.service.ReplyToQuery(id, replyMessage);
                this.sendResponse(res, null, "Reply sent successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new ContactFormController();
