import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";

@Entity({ name: "test-case" })
export class TestCase extends BaseEntityDefault {
  @Column({ type: "int" })
  problemID: number;

  @Column({ type: "text" })
  input: string;

  @Column({ type: "text" })
  output: string;

  @Column({ type: "boolean", default: false })
  isActivated: boolean;
}
