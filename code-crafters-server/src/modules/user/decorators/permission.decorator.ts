import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ROLE } from "src/types";
import { PermissionGuard } from "../guards/permission.guard";

export const PERMISSIONS_KEY = "Permissions";

export const Permission = (...permissions: string[]) => {
  return applyDecorators(
    SetMetadata(PERMISSIONS_KEY, permissions),
    UseGuards(PermissionGuard)
  );
};

export const AdminRequired = () => Permission(ROLE.ADMIN);
export const UserRequired = () => Permission(ROLE.USER);