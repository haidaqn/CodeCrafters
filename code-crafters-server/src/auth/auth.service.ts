import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  ChangePasswordDto,
  forgotPasswordDto,
  LoginDto,
  OauthSignInDto,
  Payload,
  RegisterDto,
  SignUser,
  UpdateInfoDto,
  VerifyUserDto
} from "./auth.dtos";
import { Messages } from "../config";
import { UserService } from "../modules";
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import { randomPassword, randomString } from "../utils";
import { hashSync } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { google, oauth2_v2 } from "googleapis";
import { QuerySsoUser } from "../types";

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
      }
    };

  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findByUser(registerDto.email, registerDto.username);

    if (user) {
      throw new Error(Messages.auth.error);
    }

    const code = await this.randomCode();

    const newUser = await this.userService.createUsers({ ...registerDto, code });

    if (!newUser) {
      throw new Error(Messages.auth.registerFailed);
    }
    const html = `
      Your account has been successfully created. Use the code below to activate your account:
      <br/><b>${code}</b>
      <br/>Note: This code is valid for 5 minutes only.
    `;
    const subject = "Account Activation Code - CODE CRAFTER!!";

    const send = {
      to: registerDto.email,
      html,
      subject
    };

    await this.mailService.sendMail(send);

    return {
      message: Messages.auth.registerSuccess
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

  async oauthLogin(serviceID: string, data: OauthSignInDto) {
    const createUserBySSO = async (query: QuerySsoUser, payload: { fullName: string; email: string }) => {
      const existingUser = await this.userService.findByGoogleId(query.googleId);
      if (!existingUser) {
        const checkUserEmail = await this.userService.findByEmail(payload.email);
        if (checkUserEmail) throw new HttpException(Messages.auth.emailUsed, HttpStatus.BAD_REQUEST);
        const newUser = await this.userService.createUsers({
          email: payload.email,
          fullName: payload.fullName,
          password: "",
          googleId: query.googleId,
          username: "",
          emailVerified: true
        });
        if (!newUser) {
          throw new Error(Messages.auth.registerFailed);
        }
        return newUser;
      } else return existingUser;
    };
    switch (serviceID) {
      case "google":
        const {
          redirect_uri,
          code,
          access_token
        } = data;
        const googleConfig = this.config.get("auth.google");
        const oauth2Client = new google.auth.OAuth2(googleConfig.client_id, googleConfig.client_secret, redirect_uri);
        const oauth2 = google.oauth2({
          auth: oauth2Client,
          version: "v2"
        });
        let userInfo: oauth2_v2.Schema$Userinfo;
        if (code) {
          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);
          userInfo = (await oauth2.userinfo.get()).data;
        } else if (access_token) {
          const ticket = await oauth2Client.verifyIdToken({
            idToken: access_token,
            audience: googleConfig.client_id
          });
          const payload = ticket.getPayload();
          userInfo = {
            id: payload?.sub,
            email: payload?.email,
            verified_email: payload?.email_verified,
            picture: payload?.picture,
            name: payload?.name,
            given_name: payload?.given_name,
            family_name: payload?.family_name
          };
        } else {
          throw new HttpException("MISSING_CREDENTIALS", HttpStatus.FORBIDDEN);
        }
        return await createUserBySSO({
          googleId: userInfo.id
        }, {
          email: userInfo.email,
          fullName: userInfo.name
        });
      default:
        throw new HttpException("INVALID_OAUTH_SERVICE", HttpStatus.FORBIDDEN);
    }
  }

  async verifyAccount(verify: VerifyUserDto) {
    const { email, code } = verify;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new HttpException(Messages.auth.notFound, HttpStatus.BAD_REQUEST);

    const verificationCode = await this.userService.findByEmailAndCode(email, code);

    if (!verificationCode) return false;

    user.emailVerified = true;
    user.code = "";

    await user.save();

    return {
      message: "EMAIL_VERIFIED",
      status: HttpStatus.OK
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

  jwtSign(User: SignUser) {
    return {
      access_token: this.signUser(User),
      refresh_token: this.getRefreshToken(User)
    };
  }
  // private function

  private signUser(User: SignUser) {
    return this.jwtService.sign(User);
  }

  private getRefreshToken(User: SignUser) {
    return this.jwtService.sign(User, {
      secret: this.config.get("auth.jwt.refreshSecret"),
      expiresIn: "7d"
    });
  }

  private async randomCode() {
    let valid = false;
    let verificationCode: string;
    while (!valid) {
      verificationCode = randomString().toUpperCase();
      const user = await this.userService.findByCode(verificationCode);
      valid = !user;
    }
    return verificationCode;
  }
}