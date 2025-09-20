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
exports.getSmtpConfig = getSmtpConfig;
exports.resetSmtpCache = resetSmtpCache;
exports.checkSmtpCredentials = checkSmtpCredentials;
exports.checkSmtpFromDb = checkSmtpFromDb;
exports.welcomeUser = welcomeUser;
exports.replyQuery = replyQuery;
const nodemailer_1 = __importDefault(require("nodemailer"));
const smtp_1 = __importDefault(require("../entities/smtp"));
const db_1 = __importDefault(require("../config/db"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
// SMTP config cache
let cachedSmtp = null;
// Load and cache SMTP config
function getSmtpConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedSmtp)
            return cachedSmtp;
        const smtpRepo = db_1.default.getRepository(smtp_1.default);
        const smtp = yield smtpRepo.findOneBy({});
        if (smtp)
            cachedSmtp = smtp;
        return smtp;
    });
}
// Reset SMTP cache (optional, if you want to refresh config)
function resetSmtpCache() {
    cachedSmtp = null;
}
// Check SMTP credentials
function checkSmtpCredentials() {
    return __awaiter(this, void 0, void 0, function* () {
        const smtp = yield getSmtpConfig();
        if (!smtp)
            return false;
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: smtp.host,
                port: smtp.port,
                secure: smtp.port === 465, // true for 465, false for other ports
                auth: {
                    user: smtp.username,
                    pass: smtp.password,
                },
            });
            yield transporter.verify();
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
// Check SMTP credentials from DB (uses cache)
function checkSmtpFromDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield checkSmtpCredentials();
    });
}
// Utility to render email template
function renderEmailTemplate(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const templatePath = path_1.default.join(__dirname, "../views/email.ejs");
        return yield ejs_1.default.renderFile(templatePath, Object.assign(Object.assign({}, options), { year: new Date().getFullYear(), appName: options.appName || "Fitnox" }));
    });
}
// Send welcome email to user
function welcomeUser(toEmail, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const smtp = yield getSmtpConfig();
        if (!smtp || !toEmail || !userName)
            return;
        const transporter = nodemailer_1.default.createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.port === 465,
            auth: {
                user: smtp.username,
                pass: smtp.password,
            },
        });
        const html = yield renderEmailTemplate({
            subject: "Welcome to Fitnox!",
            headerTitle: "Welcome!",
            userName,
            messageBody: `
    <p>Welcome to <strong>Fitnox</strong> — we're thrilled to have you! 🎉</p>
    <p>Your fitness journey starts here. Let’s achieve your goals together.</p>
    <p>Please verify your email to get started:</p>
  `,
            buttonLink: `https://yourdomain.com/verify-email?token=22`,
            buttonText: "Verify Email",
            appName: "Fitnox",
            showButton: true,
        });
        yield transporter.sendMail({
            from: smtp.fromEmail,
            to: toEmail,
            subject: "Welcome to Fitnox!",
            html,
        });
    });
}
// Send reply to user query
function replyQuery(toEmail, userName, replyMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        const smtp = yield getSmtpConfig();
        if (!smtp || !toEmail || !userName || !replyMessage)
            return;
        const transporter = nodemailer_1.default.createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.port === 465,
            auth: {
                user: smtp.username,
                pass: smtp.password,
            },
        });
        const html = yield renderEmailTemplate({
            subject: "Your Query Reply",
            headerTitle: "Query Reply",
            userName,
            messageBody: replyMessage,
            appName: "Fitnox",
        });
        yield transporter.sendMail({
            from: smtp.fromEmail,
            to: toEmail,
            subject: "Your Query Reply",
            html,
        });
    });
}
