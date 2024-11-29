import { Column, Entity } from "typeorm";
import { BaseEntityDefault } from "../../shared";

@Entity({ name: "contests" })
export class Contest extends BaseEntityDefault {
  @Column({ type: "varchar", length: 100, unique: true })
  title: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  startTime: Date;

  @Column({ type: "timestamp" })
  endTime: Date;
}
