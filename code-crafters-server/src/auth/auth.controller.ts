import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ChangePasswordDto,
  forgotPasswordDto,
  LoginDto,
  OauthSignInDto,
  Payload,
  refreshTokenDto,
  RegisterDto,
  ResendEmailDto,
  UpdateInfoDto,
  VerifyUserDto
} from "./auth.dtos";
import { JwtAuthGuard } from "./guards";
import { ReqUser } from "../decorators";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Messages } from "../config";

@Controller("api/v1/auth")
@ApiBearerAuth()
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post("verify")
  public async verifyAccount(
    @Body() verify: VerifyUserDto
  ) {
    return await this.authService.verifyAccount(verify);
  }

  @Post("login")
  public async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post("register")
  public async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post("oauth/:serviceId")
  public async oauthSso(
    @Param("serviceId") serviceId: string,
    @Body() body: OauthSignInDto
  ) {
    const user = await this.authService.oauthLogin(serviceId, body);
    const tokens = this.authService.jwtSign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      fullName: user.fullName
    });

    delete user.isBlocked;
    delete user.refreshToken;
    delete user.googleId;
    delete user.code;
    delete user.emailVerified;


    return {
      message: Messages.auth.loginSuccess,
      data: {
        user: user,
        tokens
      }
    };
  }

  @Post("forgot-password")
  public async forgotPassword(
    @Body() forgotPasswordDto: forgotPasswordDto
  ) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post("refresh-token")
  public async refreshToken(@Body() refreshToken: refreshTokenDto) {
    return await this.authService.refreshToken(refreshToken.refreshToken);
  }

  @Post("change-password")
  @UseGuards(JwtAuthGuard)
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @ReqUser() user: Payload
  ) {
    return await this.authService.changePassword(changePasswordDto, user);
  }

  @Post("resend")
  public async resendEmail(
    @Body() resendEmailDto: ResendEmailDto
  ) {
    return await this.authService.resendEmail(resendEmailDto);
  }

  @Post("update-info")
  @UseGuards(JwtAuthGuard)
  public async updateInfo(
    @Body() updateInfoDto: UpdateInfoDto,
    @ReqUser() user: Payload
  ) {
    return await this.authService.updateInfo(updateInfoDto, user);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  public async logout(
    @ReqUser() user: Payload
  ) {
    return await this.authService.logout(user);
  }
}