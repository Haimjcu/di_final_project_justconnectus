import { EntityRepository, getRepository, Repository, getManager } from "typeorm";
import { Jobs } from "../entities/jobs.entity";
import { User } from "../entities/user.entity";
import { ContactResponseModel } from "../models/contact.models";
import { QueryParams } from "../models/query.params.model";
import contactMappingUtilities from "../utilities/contact.mapping.utilities";
import { rawSqlQueries } from "../constants";

@EntityRepository(Jobs)
export class JobsRepository extends Repository<Jobs> {
  public async createOrUpdate(entity: Jobs): Promise<Jobs> {
    await this.save(entity);
    return entity;
  }

  public async createJobs(userId: number, shoutoutId: number) {
    const connection = getManager().connection;
    const [escapedQuery, escapedParams] =
      connection.driver.escapeQueryWithParameters(
        rawSqlQueries.CREATE_JOBS,
        {
          userId,
          shoutoutId,
        },
        {}
      );
    const jobs = await getManager().query(escapedQuery, escapedParams);
    return { jobs };
  }

  public async getJobHeaders(userId: number) {
    const connection = getManager().connection;
    const [escapedQuery, escapedParams] =
      connection.driver.escapeQueryWithParameters(
        rawSqlQueries.GET_JOB_HEADERS,
        {
          userId,
        },
        {}
      );
    const jobHeaders = await getManager().query(escapedQuery, escapedParams);
    return { jobHeaders };
  }

  public async getJobSkills(userId: number) {
    const connection = getManager().connection;
    const [escapedQuery, escapedParams] =
      connection.driver.escapeQueryWithParameters(
        rawSqlQueries.GET_JOB_SKILLS,
        {
          userId,
        },
        {}
      );
    const jobSkills = await getManager().query(escapedQuery, escapedParams);
    return { jobSkills };
  }


  public async updateIsNotified(id: number) {
    const job = await getRepository(Jobs).findOne({
      where: {
        id: id
      },
    });
    if (job) {
      job.isNotified = true;
      await this.createOrUpdate(job);
    }
  } 

}
