import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UserService } from "../user";

@Injectable()
export class CronService {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Cron("0 */1 * * * *")
  async handleRemoveUserVerify() {
    await this.userService.findUserRemove();
  }
}