import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ChangePasswordDto,
  forgotPasswordDto,
  LoginDto,
  Payload,
  refreshTokenDto,
  RegisterDto,
  UpdateInfoDto
} from "./auth.dtos";
import { JwtAuthGuard } from "./guards";
import { ReqUser } from "../decorators";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
@ApiBearerAuth()
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post("login")
  public async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post("register")
  public async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
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