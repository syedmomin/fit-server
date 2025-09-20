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
const db_1 = __importDefault(require("../config/db"));
const blog_1 = __importDefault(require("../entities/blog"));
const contactForm_1 = __importDefault(require("../entities/contactForm"));
const faqs_1 = __importDefault(require("../entities/faqs"));
const general_1 = __importDefault(require("../entities/general"));
const home_1 = __importDefault(require("../entities/home"));
const pricePlan_1 = __importDefault(require("../entities/pricePlan"));
const privacyPolicy_1 = __importDefault(require("../entities/privacyPolicy"));
const socialMedia_1 = __importDefault(require("../entities/socialMedia"));
const termsAndCondition_1 = __importDefault(require("../entities/termsAndCondition"));
const user_1 = __importDefault(require("../entities/user"));
const blogCategories_1 = require("../enums/blogCategories");
const mail_service_1 = require("./mail.service");
class WebsiteService {
    LoadAllContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const latestBlog = yield db_1.default.getRepository(blog_1.default).find({
                order: { createdAt: "DESC" },
                take: 4
            });
            const faqs = yield db_1.default.getRepository(faqs_1.default).find();
            const privacyAndPolicy = yield db_1.default.getRepository(privacyPolicy_1.default).findOne({ where: { id: 1 } });
            const termsAndCondition = yield db_1.default.getRepository(termsAndCondition_1.default).findOne({ where: { id: 1 } });
            return { latestBlog, faqs, privacyAndPolicy, termsAndCondition };
        });
    }
    Layout() {
        return __awaiter(this, void 0, void 0, function* () {
            const home = yield db_1.default.getRepository(home_1.default).findOne({ where: { id: 1 } });
            const general = yield db_1.default.getRepository(general_1.default).findOne({ where: { id: 1 } });
            const socialMedia = yield db_1.default.getRepository(socialMedia_1.default).findOne({ where: { id: 1 } });
            return { home, general, socialMedia };
        });
    }
    getBlogs() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 30, filter = 'All') {
            const repo = db_1.default.getRepository(blog_1.default);
            let query = repo.createQueryBuilder("blog");
            if (filter && filter !== 'All') {
                query = query.where("blog.categoryId = :categoryId", { categoryId: +filter });
            }
            query = query.orderBy("blog.createdAt", "DESC");
            const [blogs, total] = yield query
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            // har blog ka category name add karo
            const blogsWithCategoryName = blogs.map(blog => {
                var _a;
                return ({
                    title: blog.title,
                    link: blog.slug,
                    image: blog.imageUrl,
                    description: blog.shortDescription,
                    date: blog.date.toISOString().split('T')[0],
                    category: ((_a = blogCategories_1.BlogCategoriesArray.find(c => c.id === blog.categoryId)) === null || _a === void 0 ? void 0 : _a.text) || "Unknown"
                });
            });
            // 🔹 sari categories jo Blog table me exist karti hain
            const rawCategories = yield repo
                .createQueryBuilder("blog")
                .select("DISTINCT blog.categoryId", "categoryId")
                .getRawMany();
            const categories = rawCategories
                .map(rc => blogCategories_1.BlogCategoriesArray.find(c => c.id === +rc.categoryId) // 👈 string → number
            )
                .filter(Boolean);
            return {
                blogs: blogsWithCategoryName,
                categories, // ✅ full table se nikali gayi categories
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        });
    }
    getBlogDetails(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.default.getRepository(blog_1.default).findOne({ where: { slug } });
            if (!blog)
                throw new Error("Blog not found");
            return blog;
        });
    }
    contactForm(fullName, phone, email, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepo = db_1.default.getRepository(contactForm_1.default);
            const newContact = contactRepo.create({ fullName, phone, email, message });
            return yield contactRepo.save(newContact);
        });
    }
    Plans() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.getRepository(pricePlan_1.default).find();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.default.getRepository(user_1.default).findOne({ where: { email, password } });
            if (!user)
                throw new Error("Invalid email or password");
            return user;
        });
    }
    signup(name, email, phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield db_1.default.getRepository(user_1.default).findOne({
                where: [{ email }, { phone }]
            });
            if (existingUser) {
                if (existingUser.email === email)
                    throw new Error("Email already exists");
                if (existingUser.phone === phone)
                    throw new Error("Phone already exists");
            }
            const newUser = db_1.default.getRepository(user_1.default).create({ name, email, phone, password });
            const savedUser = yield db_1.default.getRepository(user_1.default).save(newUser);
            // Send welcome email after signup (no SMTP config needed)
            yield (0, mail_service_1.welcomeUser)(email, name);
            return savedUser;
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.default.getRepository(user_1.default).findOne({ where: { email } });
            if (!user)
                throw new Error("Email not found");
            // Yahan par aap password reset link bhej sakte hain
            console.log(`Password reset link sent to ${email}`);
            return;
        });
    }
}
exports.default = new WebsiteService();
