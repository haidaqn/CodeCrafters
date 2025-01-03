import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";

@Entity({ name: "languages" })
export class Language extends BaseEntityDefault {
  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @Column({ type: "varchar", length: 20 })
  version: string;

  @Column({ type: "boolean", default: true })
  isActivated: boolean;
}
