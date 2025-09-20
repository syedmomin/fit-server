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
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const puppeteer_1 = __importDefault(require("puppeteer"));
let browser = null;
const initializeBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
    const osPlatform = process.platform;
    let executablePath;
    if (osPlatform === "win32") {
        executablePath = ''; // Provide the correct path if necessary
    }
    else if (osPlatform === "linux") {
        executablePath = '/usr/bin/chromium-browser';
    }
    return yield puppeteer_1.default.launch({ executablePath });
});
const getBrowserInstance = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!browser) {
        browser = yield initializeBrowser();
    }
    return browser;
});
exports.default = (fileName_1, getData_1, ...args_1) => __awaiter(void 0, [fileName_1, getData_1, ...args_1], void 0, function* (fileName, getData, isOrientation = false, top = 15, bottom = 15, right = 10, left = 10) {
    const templatePath = path_1.default.join(__dirname, '../views', `${fileName}.ejs`);
    const html = yield ejs_1.default.renderFile(templatePath, getData);
    const browser = yield getBrowserInstance();
    const page = yield browser.newPage();
    yield page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfOptions = {
        format: 'A4',
        landscape: isOrientation,
        margin: {
            top: `${top}px`,
            right: `${right}px`,
            bottom: `${bottom}px`,
            left: `${left}px`,
        },
        printBackground: true,
        headerTemplate: `<div style="font-size: 10px; text-align: center;">Header</div>`,
        footerTemplate: `<div style="font-size: 10px; text-align: center;">Footer</div>`,
    };
    const pdfBuffer = yield page.pdf(pdfOptions);
    yield page.close();
    return pdfBuffer;
});
// Ensure to properly close the browser when the application is shutting down
process.on('exit', () => {
    if (browser) {
        browser.close();
    }
});
