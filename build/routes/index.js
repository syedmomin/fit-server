"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const upload_routes_1 = __importDefault(require("./upload.routes"));
const contact_routes_1 = __importDefault(require("./contact.routes"));
const pricePlan_routes_1 = __importDefault(require("./pricePlan.routes"));
const blogCategories_routes_1 = __importDefault(require("./blogCategories.routes"));
const blogs_routes_1 = __importDefault(require("./blogs.routes"));
const setupPages_routes_1 = __importDefault(require("./setupPages.routes"));
const general_routes_1 = __importDefault(require("./general.routes"));
const smtp_routes_1 = __importDefault(require("./smtp.routes"));
const website_routes_1 = __importDefault(require("./website.routes"));
const social_media_routes_1 = __importDefault(require("./social-media.routes"));
const contactForm_routes_1 = __importDefault(require("./contactForm.routes"));
//---------------------index-routes----------------------------
// ROUTES IMPORT
class Routes {
    constructor(app) {
        app.use("/auth", auth_routes_1.default);
        app.use("/upload", upload_routes_1.default);
        app.use("/users", user_routes_1.default);
        app.use("/contacts", contact_routes_1.default);
        app.use("/contactForm", contactForm_routes_1.default);
        app.use("/pricingPlans", pricePlan_routes_1.default);
        app.use("/blogCategories", blogCategories_routes_1.default);
        app.use("/blogs", blogs_routes_1.default);
        app.use("/setupPages", setupPages_routes_1.default);
        app.use("/general", general_routes_1.default);
        app.use("/smtp", smtp_routes_1.default);
        app.use("/social", social_media_routes_1.default);
        app.use("/website", website_routes_1.default);
    }
}
exports.default = Routes;
