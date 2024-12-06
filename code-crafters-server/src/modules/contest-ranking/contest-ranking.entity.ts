import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";

@Entity({ name: "contest-ranking" })
export class ContestRanking extends BaseEntityDefault {
  @Column({ type: "int" })
  contestID: number;

  @Column({ type: "int" })
  userID: number;

  @Column({ type: "int" })
  rank: number;

  @Column({ type: "float", default: 0 })
  score: number;
}
