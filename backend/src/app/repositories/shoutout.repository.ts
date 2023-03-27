import {
    EntityRepository,
    getManager,
    getRepository,
    Repository,
  } from "typeorm";
  import { Shoutouts } from "../entities/shoutout.entity";
  import { ShoutoutSkills } from "../entities/shoutout.skills.entity";
  import { Skills } from "../entities/skills.entity";
  import {ShoutoutModel} from "../models/shoutout.models";
  import appUtilities from "../utilities/app.utilities";
  
  @EntityRepository(Shoutouts)
  export class ShoutoutRepository extends Repository<Shoutouts> {
    public async createShoutout(shoutoutEntity: Shoutouts) {
      try {
        return await getManager().transaction(
          async (transactionalEntityManager) => {
            const { skills, ...shoutoutHeader } = shoutoutEntity;
            const response = await transactionalEntityManager.insert(
              Shoutouts,
              shoutoutHeader
            );
            if (appUtilities.isArrayNotNullOrEmpty(skills)) {
              const mappedSkills = skills.map((skill) => ({
                ...skill,
                shoutoutId: response.raw.insertId,
                createdAt: shoutoutEntity.createdAt,
                createdBy: shoutoutEntity.createdBy,
                updatedAt: shoutoutEntity.updatedAt,
                updatedBy: shoutoutEntity.updatedBy
              }));
              await transactionalEntityManager.insert(ShoutoutSkills, mappedSkills);
            }
            return response.raw.insertId;
          }
        );
      } catch (error) {
        throw error;
      }
    }

    public async getShoutouts( userId: number) {
        const shoutouts = await getRepository(Shoutouts)
          .createQueryBuilder(Shoutouts.name)
          .innerJoinAndSelect(`${Shoutouts.name}.skills`, `${ShoutoutSkills.name}`)
          .innerJoinAndSelect(`${ShoutoutSkills.name}.skill`, `${Skills.name}`)
          .where(
            `${Shoutouts.name}.created_by = :userId and ${Shoutouts.name}.is_active = 1`,
            { userId }
          )
          .getMany();
        return {shoutouts};
      }

}