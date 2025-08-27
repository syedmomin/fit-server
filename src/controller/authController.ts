import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
    async verification(req: Request, res: Response) {
        try {
            const { token, userId } = req.body;
            const result = await AuthService.verification(token, userId);
            res.status(result.code).send(result);
        } catch (error: any) {
          res.status(500).send({ message: "Internal Server Error", error: error.message });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({ message: "Internal Server Error", error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({ message: "Internal Server Error", error: error.message });
        }
    }

    async changePassword(req: Request, res: Response) {
        try {
            const result = await AuthService.changePassword(req.body);
            res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({ message: "Internal Server Error", error: error.message });
        }
    }
}

export default new AuthController();