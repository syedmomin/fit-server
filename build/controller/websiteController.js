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
const website_service_1 = __importDefault(require("../services/website.service"));
class WebsiteController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.loadAllContent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield website_service_1.default.LoadAllContent();
                this.sendResponse(res, newItem, "Get All Content successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.layout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield website_service_1.default.Layout();
                this.sendResponse(res, newItem, "Get Layout successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.blogs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 30;
                const filter = req.query.filter || 'All';
                const result = yield website_service_1.default.getBlogs(page, limit, filter);
                this.sendResponse(res, result, "Get Blogs successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.blogDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slug = req.params.slug;
                const item = yield website_service_1.default.getBlogDetails(slug);
                this.sendResponse(res, item, "Get Blog Details successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.plans = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield website_service_1.default.Plans();
                this.sendResponse(res, item, "Get Plans successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.contactForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, email, message } = req.body;
                yield website_service_1.default.contactForm(name, phone, email, message);
                this.sendResponse(res, null, "Contact form submitted successfully");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield website_service_1.default.login(email, password);
                this.sendResponse(res, user, "Login successful");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullName, email, phone, password } = req.body;
                const user = yield website_service_1.default.signup(fullName, email, phone, password);
                this.sendResponse(res, user, "Signup successful");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield website_service_1.default.forgotPassword(email);
                this.sendResponse(res, null, "Password reset link sent to email");
            }
            catch (error) {
                this.sendError(res, error);
            }
        });
    }
}
exports.default = new WebsiteController();
