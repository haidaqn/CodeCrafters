import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";
import { ROLE } from "../../types";

@Entity({ name: "users" })
export class User extends BaseEntityDefault {
  @Column({ type: "varchar", length: 100 })
  fullName: string;

  @Column({ type: "varchar", length: 15, nullable: true, unique: true })
  phone: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 100, unique: true })
  username: string;

  @Column({ type: "text", nullable: true })
  avatar?: string;

  @Column({ type: "int", default: 0 })
  totalSolved: number;

  @Column({ type: "boolean", default: false })
  isBlocked: boolean;

  @Column({ type: "text", nullable: true })
  refreshToken: string;

  @Column({ type: "boolean", default: false })
  emailVerified: boolean;

  @Column({ type: "varchar", length: 10, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: "" })
  googleId: string;

  @Column({
    type: "enum",
    enum: ROLE,
    default: ROLE.USER
  })
  role: ROLE;
}
