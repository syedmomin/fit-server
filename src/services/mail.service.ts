import nodemailer from "nodemailer";
import SmtpSettings from "../entities/smtp";
import dataSource from "../config/db";
import ejs from "ejs";
import path from "path";

// SMTP config cache
let cachedSmtp: SmtpSettings | null = null;

// Load and cache SMTP config
export async function getSmtpConfig(): Promise<SmtpSettings | null> {
  if (cachedSmtp) return cachedSmtp;
  const smtpRepo = dataSource.getRepository(SmtpSettings);
  const smtp = await smtpRepo.findOneBy({});
  if (smtp) cachedSmtp = smtp;
  return smtp;
}

// Reset SMTP cache (optional, if you want to refresh config)
export function resetSmtpCache() {
  cachedSmtp = null;
}

// Check SMTP credentials
export async function checkSmtpCredentials(): Promise<boolean> {
  const smtp = await getSmtpConfig();
  if (!smtp) return false;
  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465, // true for 465, false for other ports
      auth: {
        user: smtp.username,
        pass: smtp.password,
      },
    });
    await transporter.verify();
    return true;
  } catch (error) {
    return false;
  }
}

// Check SMTP credentials from DB (uses cache)
export async function checkSmtpFromDb(): Promise<boolean> {
  return await checkSmtpCredentials();
}

// Utility to render email template
async function renderEmailTemplate(options: {
  subject: string;
  headerTitle: string;
  userName: string;
  messageBody: string;
  showButton?: boolean;
  buttonLink?: string;
  buttonText?: string;
  appName?: string;
}) {
  const templatePath = path.join(__dirname, "../views/email.ejs");
  return await ejs.renderFile(templatePath, {
    ...options,
    year: new Date().getFullYear(),
    appName: options.appName || "Fitnox",
  });
}

// Send welcome email to user
export async function welcomeUser(toEmail: string, userName: string) {
  const smtp = await getSmtpConfig();
  if (!smtp || !toEmail || !userName) return;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: {
      user: smtp.username,
      pass: smtp.password,
    },
  });

  const html = await renderEmailTemplate({
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

  await transporter.sendMail({
    from: smtp.fromEmail,
    to: toEmail,
    subject: "Welcome to Fitnox!",
    html,
  });
}

// Send reply to user query
export async function replyQuery(
  toEmail: string,
  userName: string,
  replyMessage: string
) {
  const smtp = await getSmtpConfig();
  if (!smtp || !toEmail || !userName || !replyMessage) return;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: {
      user: smtp.username,
      pass: smtp.password,
    },
  });

  const html = await renderEmailTemplate({
    subject: "Your Query Reply",
    headerTitle: "Query Reply",
    userName,
    messageBody: replyMessage,
    appName: "Fitnox",
  });

  await transporter.sendMail({
    from: smtp.fromEmail,
    to: toEmail,
    subject: "Your Query Reply",
    html,
  });
}
