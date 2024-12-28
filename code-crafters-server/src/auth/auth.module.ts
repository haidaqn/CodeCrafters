import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MailModule, UserModule } from "../modules";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UserModule),
    forwardRef(() => MailModule),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get("auth.jwt.secret"),
        signOptions: { expiresIn: "3d" }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}