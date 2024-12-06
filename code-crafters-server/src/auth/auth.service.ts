import { HttpStatus, Injectable } from "@nestjs/common";
import {
  ChangePasswordDto,
  forgotPasswordDto,
  LoginDto,
  Payload,
  RegisterDto,
  SignUser,
  UpdateInfoDto
} from "./auth.dtos";
import { Messages } from "../config";
import { UserService } from "../modules";
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import { randomPassword } from "../utils";
import { hashSync } from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailerService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
  }

  async logout(user: Payload) {
    const userFound = await this.userService.findByID(user.id);

    if (!userFound) {
      throw new Error(Messages.auth.notFound);
    }

    await this.userService.updateUser({ id: user.id, refreshToken: "" });

    return {
      message: Messages.auth.logout
    };

  }

  async login(loginDto: LoginDto) {
    if (!loginDto.account) {
      throw new Error(Messages.auth.emailOrUserName);
    }

    const user = await this.userService.validateUser(loginDto);

    if (!user) {
      throw new Error(Messages.auth.wrongEmailUserNamePassword);
    }

    const tokens = this.jwtSign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      fullName: user.fullName
    });

    await this.userService.updateUser({ id: user.id, refreshToken: tokens.refresh_token });

    delete user.isBlocked;
    delete user.refreshToken;
    delete user.role;

    return {
      message: Messages.auth.loginSuccess,
      data: {
        tokens,
        user
      },
      status: HttpStatus.OK
    };

  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findByUser(registerDto.email, registerDto.username);

    if (user) {
      throw new Error(Messages.auth.emailOrUserName);
    }

    const newUser = await this.userService.createUsers(registerDto);

    if (!newUser) {
      throw new Error(Messages.auth.registerFailed);
    }

    return {
      message: Messages.auth.registerSuccess,
      status: HttpStatus.OK
    };
  }

  async forgotPassword(forgetPasswordDto: forgotPasswordDto) {
    const user = await this.userService.findByUser(forgetPasswordDto.account, forgetPasswordDto.account);

    if (!user) {
      throw new Error(Messages.auth.notFound);
    }

    const newPassword = randomPassword(10);

    const passwordHash = hashSync(newPassword, 10);

    await this.userService.updateUser({ id: user.id, password: passwordHash });

    const html = `Your account is ${forgetPasswordDto.account} \nYour password is ${newPassword}`;
    const subject = "Re-issue password CODE CRAFTER!!";

    const send = {
      to: forgetPasswordDto.account,
      html,
      subject
    };

    await this.mailService.sendMail(send);

    return {
      message: Messages.auth.passwordChanged
    };

  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.decode(refreshToken) as unknown as Payload;

    const user = await this.userService.findByID(payload.id);

    if (!user) {
      throw new Error(Messages.auth.notFound);
    }

    if (user.refreshToken !== refreshToken) {
      throw new Error(Messages.auth.refreshTokenInvalid);
    }

    const tokens = this.jwtSign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      fullName: user.fullName
    });

    await this.userService.updateUser({ id: user.id, refreshToken: tokens.refresh_token });

    return {
      message: Messages.auth.refreshToken,
      data: tokens
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto, user: Payload) {
    const userFound = await this.userService.findByID(user.id);

    if (!userFound) {
      throw new Error(Messages.auth.notFound);
    }

    const isMatch = await this.userService.comparePassword(changePasswordDto.oldPassword, userFound.password);

    if (!isMatch) {
      throw new Error(Messages.auth.wrongPassword);
    }

    const passwordHash = hashSync(changePasswordDto.newPassword, 10);

    await this.userService.updateUser({ id: user.id, password: passwordHash });

    return {
      message: Messages.auth.passwordChanged
    };
  }

  async updateInfo(
    updateInfo: UpdateInfoDto, user: Payload
  ) {
    const userFound = await this.userService.findByID(user.id);

    if (!userFound) {
      throw new Error(Messages.auth.notFound);
    }

    const userUpdate = await this.userService.updateUser({ id: user.id, ...updateInfo });

    return {
      message: Messages.auth.updateInfo,
      data: userUpdate
    };

  }

  private signUser(User: SignUser) {
    return this.jwtService.sign(User);
  }

  private getRefreshToken(User: SignUser) {
    return this.jwtService.sign(User, {
      secret: this.config.get("auth.jwt.refreshSecret"),
      expiresIn: "7d"
    });
  }

  private jwtSign(User: SignUser) {
    return {
      access_token: this.signUser(User),
      refresh_token: this.getRefreshToken(User)
    };
  }
}