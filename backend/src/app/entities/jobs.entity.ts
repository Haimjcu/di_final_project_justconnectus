import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base/baseEntity";

@Entity({ name: "jobs" })
export class Jobs extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "user_id" })
  public userId: number;

  @Column({ name: "shoutout_id" })
  public shoutoutId: number;

  @Column({ name: "is_active", default: true })
  public isActive: boolean;

  @Column({ name: "is_notified", default: true })
  public isNotified: boolean;
}
