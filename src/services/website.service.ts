import dataSource from "../config/db";
import Blog from "../entities/blog";
import ContactForm from "../entities/contactForm";
import Faq from "../entities/faqs";
import GeneralSettings from "../entities/general";
import Home from "../entities/home";
import SocialMedia from "../entities/socialMedia";
import TermsAndConditions from "../entities/termsAndCondition";
import User from "../entities/user";
import { BlogCategoriesArray } from "../enums/blogCategories";


class WebsiteService {
    async LoadAllContent() {
        const home = await dataSource.getRepository(Home).findOne({ where: { id: 1 } });
        const general = await dataSource.getRepository(GeneralSettings).findOne({ where: { id: 1 } });
        const socialMedia = await dataSource.getRepository(SocialMedia).findOne({ where: { id: 1 } });
        const latestBlog = await dataSource.getRepository(Blog).find({
            order: { createdAt: "DESC" },
            take: 4
        });
        const faqs = await dataSource.getRepository(Faq).find();
        const privacyPolicy = await dataSource.getRepository(TermsAndConditions).findOne({ where: { id: 1 } });

        return { home, general, socialMedia, latestBlog, faqs, privacyPolicy };
    }


    async getBlogs(page: number = 1, limit: number = 30, filter: string = 'All') {
        const repo = dataSource.getRepository(Blog);

        let query = repo.createQueryBuilder("blog");

        if (filter && filter !== 'All') {
            query = query.where("blog.categoryId = :categoryId", { categoryId: +filter });
        }

        query = query.orderBy("blog.createdAt", "DESC");

        const [blogs, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        // har blog ka category name add karo
        const blogsWithCategoryName = blogs.map(blog => ({
            title: blog.title,
            link: blog.slug,
            image: blog.imageUrl,
            description: blog.shortDescription,
            date: blog.date.toISOString().split('T')[0],
            category: BlogCategoriesArray.find(c => c.id === blog.categoryId)?.text || "Unknown"
        }));

        // 🔹 sari categories jo Blog table me exist karti hain
        const rawCategories = await repo
            .createQueryBuilder("blog")
            .select("DISTINCT blog.categoryId", "categoryId")
            .getRawMany();

        const categories = rawCategories
            .map(rc =>
                BlogCategoriesArray.find(c => c.id === +rc.categoryId) // 👈 string → number
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
    }


    async getBlogDetails(slug: string) {
        const blog = await dataSource.getRepository(Blog).findOne({ where: { slug } });
        if (!blog) throw new Error("Blog not found");
        return blog;
    }

    async contactForm(fullName: string, phone: string, email: string, message: string) {
        const contactRepo = dataSource.getRepository(ContactForm);

        const newContact = contactRepo.create({ fullName, phone, email, message });
        return await contactRepo.save(newContact);
    }

    async Plans() {
        return await dataSource.getRepository(GeneralSettings).findOne({ where: { id: 1 } });
    }

    async login(email: string, password: string) {
        const user = await dataSource.getRepository(User).findOne({ where: { email, password } });
        if (!user) throw new Error("Invalid email or password");
        return user;
    }

    async signup(name: string, email: string, phone: string, password: string) {
        const existingUser = await dataSource.getRepository(User).findOne({
            where: [{ email }, { phone }]
        });

        if (existingUser) {
            if (existingUser.email === email) throw new Error("Email already exists");
            if (existingUser.phone === phone) throw new Error("Phone already exists");
        }
        const newUser = dataSource.getRepository(User).create({ name, email, phone, password });
        return await dataSource.getRepository(User).save(newUser);
    }

    async forgotPassword(email: string) {
        const user = await dataSource.getRepository(User).findOne({ where: { email } });
        if (!user) throw new Error("Email not found");
        // Yahan par aap password reset link bhej sakte hain
        console.log(`Password reset link sent to ${email}`);
        return;
    }
}

export default new WebsiteService();
