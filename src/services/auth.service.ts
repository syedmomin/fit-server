import User from "../entities/user";
import { BaseService } from "./base.service";
import bcrypt from "bcrypt";
import { signJwt, signRefreshJwt, verifyTokenInviteUser } from "../middleware/jwt";

class AuthService extends BaseService<User> {
  async verification(token: string, userId: number) {
    const decoded = verifyTokenInviteUser(token);
    const user = await this.GetOne(User, { where: { id: userId } });
    // const user = await User.findOne({ where: { id: userId } });
    // if (!user) {
    //   return { status: false, code: 404, message: "User not found" };
    // }
    if (decoded.id !== user?.id) {
      return { status: false, code: 401, message: "Invalid token" };
    }
    return {
      status: true,
      code: 200,
      message: "User verified successfully",
      data: { ...user, token },
      token,
    };
  }

  async register(data: any) {
    const { name, phone, email, password, role } = data;
    const existingUser = await this.GetOne(User,{ where: { phone } });
    if (existingUser) {
      return { status: false, code: 400, message: "User Already Exists!" };
    }
    const user = await this.Post(User, {
      name,
      phone,
      email,
      password,
      role,
      isActive: true,
      emailVerify: false,
      phoneVerify: false,
    });
    const token = signJwt({ ...user });
    const refreshToken = signRefreshJwt({ ...user });
    return {
      status: true,
      code: 201,
      message: "User registered successfully",
      data: { ...user, token },
      token,
      refreshToken,
    };
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await this.GetOne(User,{ email  });
    if (!user) {
      return { status: false, code: 404, message: "User not found" };
    }
    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      return { status: false, code: 401, message: "Invalid email or password" };
    }
    if (!user.isActive) {
      return { status: false, code: 401, message: "User is not active" };
    }
    const token = signJwt({ ...user });
    const refreshToken = signRefreshJwt({ ...user });
    return {
      status: true,
      code: 200,
      message: "Login successful",
      data: user,
      token,
      refreshToken,
    };
  }

  async changePassword(data: any) {
    const { userId, oldPassword, newPassword } = data;
    const user = await this.GetOne(User,{ where: { id: userId } });
    if (!user) {
      return { status: false, code: 404, message: "User not found" };
    }
    const comparison = await bcrypt.compare(oldPassword, user.password);
    if (!comparison) {
      return { status: false, code: 401, message: "Old password is incorrect" };
    }
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    return {
      status: true,
      code: 200,
      message: "Password changed successfully",
    }; 
  }
}

export default new AuthService();