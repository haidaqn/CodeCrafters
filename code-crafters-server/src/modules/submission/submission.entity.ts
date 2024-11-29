import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";
import { STATUS_SUBMISSION } from "../../types";

@Entity({ name: "submissions" })
export class Submission extends BaseEntityDefault {
  @Column({ type: "int" })
  userID: number;

  @Column({ type: "int" })
  problemID: number;

  @Column({ type: "int" })
  languageID: number;

  @Column({ type: "text" })
  code: string;

  @Column({
    type: "enum",
    enum: STATUS_SUBMISSION,
    default: STATUS_SUBMISSION.PENDING
  })
  status: STATUS_SUBMISSION;

  @Column({ type: "float" })
  executionTime: number;

  @Column({ type: "float" })
  memoryUsed: number;
}
