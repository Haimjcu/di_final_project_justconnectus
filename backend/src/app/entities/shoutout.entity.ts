import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import appUtilities from "../utilities/app.utilities";
import { BaseEntity } from "./base/baseEntity";

@Entity({ name: "shoutout" })
export class Shoutouts extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "title" })
  public title: string;

  @Column()
  public description: string;

  @Column()
  public state: string;

  @Column()
  public country: string;

  @Column({ name: "is_active", default: true })
  public isActive: boolean;
}
