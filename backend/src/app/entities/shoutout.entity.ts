import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base/baseEntity";
import { ShoutoutSkills } from "./shoutout.skills.entity";

@Entity({ name: "shoutout_header" })
export class Shoutouts extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public state: string;

  @Column()
  public country: string;

  @Column({ name: "is_active", default: true })
  public isActive: boolean;

  @OneToMany((type: string) => ShoutoutSkills, "shoutoutHeader", {
    cascade: ["insert"],
  })
  public skills: ShoutoutSkills[];
}
