import { Column, Entity,   JoinColumn, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base/baseEntity";
import { Shoutouts } from "./shoutout.entity";
import { Skills } from "./skills.entity";

@Entity({ name: "shoutout_skills" })
export class ShoutoutSkills extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "shoutout_id" })
  public shoutoutId: number;

  @Column({ name: "skill_id" })
  public skillId: number;

  @ManyToOne((type: string) => Shoutouts, "skills")
  @JoinColumn({ name: "shoutout_id" })
  public shoutoutHeader: Shoutouts;

  @ManyToOne((type: string) => Skills, "shoutoutSkills")
  @JoinColumn({ name: "skill_id" })
  public skill: Skills;
}
