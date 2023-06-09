import { classToPlain,plainToClass } from "class-transformer";
import { Shoutouts } from "../entities/shoutout.entity";
import { ShoutoutSkills } from "../entities/shoutout.skills.entity";
import { ShoutoutModel, UpdateShoutoutModel } from "../models/shoutout.models";

const mapShoutoutToEntities = (shoutoutModel: ShoutoutModel, id: number) => {
  const { skills } = shoutoutModel;
  let shoutoutEntity = plainToClass(Shoutouts, {});
  shoutoutEntity.createdAt = new Date();
  shoutoutEntity.createdBy = id;
  shoutoutEntity.updatedAt = new Date();
  shoutoutEntity.updatedBy = id;
  shoutoutEntity.isActive = true;
  shoutoutEntity.title = shoutoutModel.title;
  shoutoutEntity.description = shoutoutModel.description;
  shoutoutEntity.country = shoutoutModel.country;
  shoutoutEntity.state = shoutoutModel.state;
  if (skills.length) {
    shoutoutEntity.skills = skills.map((skill) => {
      const shoutoutSkillEntity = plainToClass(ShoutoutSkills, {});
      shoutoutSkillEntity.skillId = skill;
      shoutoutSkillEntity.createdAt = new Date();
      shoutoutSkillEntity.createdBy = id;
      shoutoutSkillEntity.updatedAt = new Date();
      shoutoutSkillEntity.updatedBy = id;
      return shoutoutSkillEntity;
    });
  }
  return shoutoutEntity;
};
const mapShoutoutDetailToModel = (shoutouts: Shoutouts, id: number) => {
let shoutoutDetail = classToPlain(shoutouts);
const { skills, id: shoutoutId, ...rest } = shoutoutDetail;
const mappedSkill = skills.map((x: ShoutoutSkills) => ({
  id: x.skillId,
  name: x.skill.skill,
}));
rest.skills = mappedSkill;
rest.searchMetaId = null;
rest.seekerUser = {};
rest.connectorUser = {};
rest.providerUser = {};
return rest;
};

export default {
  mapShoutoutToEntities,
  mapShoutoutDetailToModel,
};
