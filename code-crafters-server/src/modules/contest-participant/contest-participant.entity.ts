import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";

@Entity({ name: "contest-participant" })
export class ContestParticipant extends BaseEntityDefault {
  @Column({ type: "int" })
  contestID: number;

  @Column({ type: "int" })
  userID: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  registerTime: Date;

  @Column({ type: "float" })
  totalScore: number;
}
