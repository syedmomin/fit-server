import { Application } from 'express';
import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';
import UploadRoutes from './upload.routes';
import ContactRoutes from './contact.routes';
import PricePlanRoutes from './pricePlan.routes';
import BlogCategoriesRoutes from './blogCategories.routes';
import BlogsRoutes from './blogs.routes';
import SetupPagesRoutes from './setupPages.routes';
import generalRoutes from './general.routes';
import smtpRoutes from './smtp.routes';
import websiteRoutes from './website.routes';
import socialMediaRoutes from './social-media.routes';
import contactFormRoutes from './contactForm.routes';


//---------------------index-routes----------------------------
// ROUTES IMPORT
export default class Routes {
  constructor(app: Application) {
    app.use("/auth", AuthRoutes);
    app.use("/upload", UploadRoutes);
    app.use("/users", UserRoutes);
    app.use("/contacts", ContactRoutes);
    app.use("/contactForm", contactFormRoutes);
    app.use("/pricingPlans", PricePlanRoutes);
    app.use("/blogCategories", BlogCategoriesRoutes);
    app.use("/blogs", BlogsRoutes);
    app.use("/setupPages", SetupPagesRoutes);
    app.use("/general", generalRoutes);
    app.use("/smtp", smtpRoutes);
    app.use("/social", socialMediaRoutes);
    app.use("/website", websiteRoutes);
  }
}