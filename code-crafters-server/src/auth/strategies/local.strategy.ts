import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import type { Payload } from "../auth.dtos";
import { UserService } from "src/modules";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: UserService) {
    super();
  }

  public async validate(account: string, password: string): Promise<Payload> {
    const user = await this.auth.validateUser({ account, password });
    if (!user) throw new UnauthorizedException("Wrong Username or Password");
    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked
    };
  }
}

