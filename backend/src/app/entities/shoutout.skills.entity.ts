import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import appUtilities from "../utilities/app.utilities";
import { BaseEntity } from "./base/baseEntity";

@Entity({ name: "shoutouts" })
export class Shoutouts extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "shoutout_id" })
  public shoutoutId: number;

  @Column({ name: "skill_id" })
  public skillId: number;

}
