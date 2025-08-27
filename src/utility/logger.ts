import fs from "fs";
import path from "path";

class Logger {
  private static logFile = path.join(__dirname, "../../logs/app.log");

  static error(error: any) {
    const log = `[${new Date().toISOString()}] ERROR: ${error?.stack || error}\n`;
    fs.appendFileSync(Logger.logFile, log);
  }

  static info(message: string) {
    const log = `[${new Date().toISOString()}] INFO: ${message}\n`;
    fs.appendFileSync(Logger.logFile, log);
  }
}

export default Logger;
