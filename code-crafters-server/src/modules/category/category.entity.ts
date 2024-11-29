import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";

@Entity({ name: "categories" })
export class Category extends BaseEntityDefault {
  @Column({ type: "varchar", length: 50, unique: true })
  name: string;
}
