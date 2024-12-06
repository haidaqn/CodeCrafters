import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";
import { DIFFICULT } from "../../types";

@Entity({ name: "problems" })
export class Problem extends BaseEntityDefault {
  @Column({ type: "varchar", length: 100, unique: true })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: DIFFICULT,
    default: DIFFICULT.EASY
  })
  difficult: DIFFICULT;

  @Column({ type: "float" })
  timeLimit: number;

  @Column({ type: "int" })
  categoryID: number;

  @Column({ type: "int", nullable: true })
  contestID?: number;

  @Column({ type: "int", default: 0 })
  totalSubmit: number;

  @Column({ type: "int", default: 0 })
  acceptedSubmission: number;

  @Column({ type: "int" })
  points: number;

  @Column({ type: "boolean", default: false })
  isActivated: boolean;
}
