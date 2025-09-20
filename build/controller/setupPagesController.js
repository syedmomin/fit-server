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
const termsAndConditions_service_1 = __importDefault(require("../services/termsAndConditions.service"));
const privacyPolicy_service_1 = __importDefault(require("../services/privacyPolicy.service"));
const faqs_service_1 = __importDefault(require("../services/faqs.service"));
const home_service_1 = __importDefault(require("../services/home.service"));
class SetupPagesController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.createTermsAndConditions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield termsAndConditions_service_1.default.Create(Object.assign({}, req.body));
                this.sendResponse(res, newItem, "Terms and Conditions created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.updateTermsAndConditions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield termsAndConditions_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                const updatedItem = yield termsAndConditions_service_1.default.Update(Number(id), req.body);
                this.sendResponse(res, updatedItem, "Updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getTermsAndConditions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield termsAndConditions_service_1.default.GetAll();
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                this.sendResponse(res, item, "Retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.createPrivacyPolicy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield privacyPolicy_service_1.default.Create(Object.assign({}, req.body));
                this.sendResponse(res, newItem, "Privacy Policy created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.updatePrivacyPolicy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield privacyPolicy_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                const updatedItem = yield privacyPolicy_service_1.default.Update(Number(id), req.body);
                this.sendResponse(res, updatedItem, "Updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getPrivacyPolicy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield privacyPolicy_service_1.default.GetAll();
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                this.sendResponse(res, item, "Retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.createFaq = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield faqs_service_1.default.Create(Object.assign({}, req.body));
                this.sendResponse(res, newItem, "FAQ created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.updateFaq = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield faqs_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                const updatedItem = yield faqs_service_1.default.Update(Number(id), req.body);
                this.sendResponse(res, updatedItem, "FAQ updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.deleteFaq = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield faqs_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                yield faqs_service_1.default.Delete(Number(id));
                this.sendResponse(res, null, "FAQ deleted successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getFaq = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield faqs_service_1.default.GetAll();
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                this.sendResponse(res, item, "FAQ retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.createHomePage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bannerImage } = req.body;
                let imagePath = "";
                if (bannerImage && bannerImage.startsWith("data:")) {
                    // Save base64 image and get path
                    const imageName = `${Date.now()}.png`;
                    const filePath = "home/";
                    // Call your upload controller logic directly or via service
                    const fs = require("fs");
                    const base64Data = bannerImage.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                    const fullPath = `./assets/images/${filePath}${imageName}`;
                    fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });
                    imagePath = `/assets/images/${filePath}${imageName}`;
                }
                const newItem = yield home_service_1.default.Create(Object.assign(Object.assign({}, req.body), { bannerImage: imagePath || req.body.bannerImage }));
                this.sendResponse(res, newItem, "Home Page created successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.updateHomePage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return this.sendError(res, "ID is required", 400, "Validation Error");
                }
                const item = yield home_service_1.default.FindById(id);
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                let imagePath = item.bannerImage;
                if (req.body.bannerImage && req.body.bannerImage.startsWith("data:")) {
                    // Save new base64 image and get path
                    const imageName = `${Date.now()}.png`;
                    const filePath = "home/";
                    const fs = require("fs");
                    const base64Data = req.body.bannerImage.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                    const fullPath = `./assets/images/${filePath}${imageName}`;
                    fs.writeFileSync(fullPath, base64Data, { encoding: "base64" });
                    imagePath = `/assets/images/${filePath}${imageName}`;
                }
                const updatedItem = yield home_service_1.default.Update(Number(id), Object.assign(Object.assign({}, req.body), { bannerImage: imagePath }));
                this.sendResponse(res, updatedItem, "Home Page updated successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.getHomePage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield home_service_1.default.GetAll();
                if (!item) {
                    return this.sendError(res, "Not found", 404, "Not Found");
                }
                this.sendResponse(res, item, "Home Page retrieved successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new SetupPagesController();
