import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Messages } from "src/config";
import { Payload } from "src/auth";
import { UserService } from "../user.service";
import { PERMISSIONS_KEY } from "../decorators/permission.decorator";
import { ROLE } from "../../../types";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private user: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<ROLE[]>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user }: { user: Payload } = request;
    if (!user || !requiredPermissions.includes(user["role"] as any)) throw new UnauthorizedException(Messages.common.actionNotPermitted);
    return true;
  }
}
