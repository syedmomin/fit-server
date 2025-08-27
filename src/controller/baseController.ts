import { Response } from "express";
import Logger from "../utility/logger";

export default class BaseController {
    sendResponse(res: Response, data: any, message = "Success", code = 200) {
        res.status(code).send({
            status: true,
            code,
            message,
            data,
        });
    }

    sendError(res: Response, error: any, code = 500, message = "Something went wrong") {
        Logger.error(error);
        res.status(error.code || 500).send({
        status: false,
        code: error.code || 500,
        message: error.message || "Something went wrong",
    });
    }
}
