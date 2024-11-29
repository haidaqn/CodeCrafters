import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";

@Entity({ name: "languages" })
export class Language extends BaseEntityDefault {
  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 20, unique: true })
  version: string;

  @Column({ type: "boolean", default: false })
  isActivated: boolean;
}
