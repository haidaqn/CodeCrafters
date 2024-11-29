import { BaseEntity as TypeOrmBaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntityDefault extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}