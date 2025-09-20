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
exports.verifyToken = void 0;
exports.signJwt = signJwt;
exports.signRefreshJwt = signRefreshJwt;
exports.verifyTokenInviteUser = verifyTokenInviteUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const secretKey = config_1.default.jwtSecretKey;
const accessTokenExpireTime = config_1.default.jwtExpireTime;
const refreshTokenExpireTime = config_1.default.refreshExpireTime;
function signJwt(object, options) {
    return jsonwebtoken_1.default.sign(object, secretKey, Object.assign(Object.assign({}, (options && options)), { expiresIn: accessTokenExpireTime }));
}
function signRefreshJwt(object, options) {
    return jsonwebtoken_1.default.sign(object, secretKey, Object.assign(Object.assign({}, (options && options)), { expiresIn: refreshTokenExpireTime }));
}
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader === "string") {
        req.token = bearerHeader.split(" ")[1];
        try {
            const verifyToken = yield jsonwebtoken_1.default.verify(req.token, secretKey);
            if (verifyToken) {
                next();
            }
        }
        catch (error) {
            res.status(401).send({ status: false, code: 401, message: "TokenExpiredError" });
        }
    }
    else {
        res.status(404).send({ status: false, message: "Token not found in headers" });
    }
});
exports.verifyToken = verifyToken;
function verifyTokenInviteUser(token) {
    return jsonwebtoken_1.default.verify(token, secretKey);
}
