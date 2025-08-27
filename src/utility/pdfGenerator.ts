import ejs from 'ejs';
import path from 'path';
import puppeteer, { Browser } from 'puppeteer';

let browser: Browser | null = null;

const initializeBrowser = async (): Promise<Browser> => {
    const osPlatform = process.platform;
    let executablePath;
    if (osPlatform === "win32") {
        executablePath = ''; // Provide the correct path if necessary
    } else if (osPlatform === "linux") {
        executablePath = '/usr/bin/chromium-browser';
    }
    return await puppeteer.launch({ executablePath });
};

const getBrowserInstance = async (): Promise<Browser> => {
    if (!browser) {
        browser = await initializeBrowser();
    }
    return browser;
};

export default async (
    fileName: string,
    getData: object,
    isOrientation: boolean = false,
    top: number = 15,
    bottom: number = 15,
    right: number = 10,
    left: number = 10
): Promise<Buffer> => {
    const templatePath = path.join(__dirname, '../views', `${fileName}.ejs`);
    const html: string = await ejs.renderFile(templatePath, getData);

    const browser = await getBrowserInstance();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfOptions: puppeteer.PDFOptions = {
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

    const pdfBuffer = await page.pdf(pdfOptions);

    await page.close();

    return pdfBuffer;
};

// Ensure to properly close the browser when the application is shutting down
process.on('exit', () => {
    if (browser) {
        browser.close();
    }
});
