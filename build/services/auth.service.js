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
const user_1 = __importDefault(require("../entities/user"));
const base_service_1 = require("./base.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../middleware/jwt");
class AuthService extends base_service_1.BaseService {
    verification(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = (0, jwt_1.verifyTokenInviteUser)(token);
            const user = yield this.GetOne(user_1.default, { where: { id: userId } });
            // const user = await User.findOne({ where: { id: userId } });
            // if (!user) {
            //   return { status: false, code: 404, message: "User not found" };
            // }
            if (decoded.id !== (user === null || user === void 0 ? void 0 : user.id)) {
                return { status: false, code: 401, message: "Invalid token" };
            }
            return {
                status: true,
                code: 200,
                message: "User verified successfully",
                data: Object.assign(Object.assign({}, user), { token }),
                token,
            };
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, phone, email, password, role } = data;
            const existingUser = yield this.GetOne(user_1.default, { where: { phone } });
            if (existingUser) {
                return { status: false, code: 400, message: "User Already Exists!" };
            }
            const user = yield this.Post(user_1.default, {
                name,
                phone,
                email,
                password,
                role,
                isActive: true,
                emailVerify: false,
                phoneVerify: false,
            });
            const token = (0, jwt_1.signJwt)(Object.assign({}, user));
            const refreshToken = (0, jwt_1.signRefreshJwt)(Object.assign({}, user));
            return {
                status: true,
                code: 201,
                message: "User registered successfully",
                data: Object.assign(Object.assign({}, user), { token }),
                token,
                refreshToken,
            };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield this.GetOne(user_1.default, { email });
            if (!user) {
                return { status: false, code: 404, message: "User not found" };
            }
            const comparison = yield bcrypt_1.default.compare(password, user.password);
            if (!comparison) {
                return { status: false, code: 401, message: "Invalid email or password" };
            }
            if (!user.isActive) {
                return { status: false, code: 401, message: "User is not active" };
            }
            const token = (0, jwt_1.signJwt)(Object.assign({}, user));
            const refreshToken = (0, jwt_1.signRefreshJwt)(Object.assign({}, user));
            return {
                status: true,
                code: 200,
                message: "Login successful",
                data: user,
                token,
                refreshToken,
            };
        });
    }
    changePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, oldPassword, newPassword } = data;
            const user = yield this.GetOne(user_1.default, { where: { id: userId } });
            if (!user) {
                return { status: false, code: 404, message: "User not found" };
            }
            const comparison = yield bcrypt_1.default.compare(oldPassword, user.password);
            if (!comparison) {
                return { status: false, code: 401, message: "Old password is incorrect" };
            }
            user.password = yield bcrypt_1.default.hash(newPassword, 12);
            yield user.save();
            return {
                status: true,
                code: 200,
                message: "Password changed successfully",
            };
        });
    }
}
exports.default = new AuthService();
