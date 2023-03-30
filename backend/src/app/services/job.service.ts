import { getCustomRepository } from "typeorm";
import { JobsRepository } from "../repositories/jobs.repository";
import responseFormatter from "../utilities/response.formatter";
import graphqlService from "../services/graphql.service";

/**
 * Get All Jobs
 *
 * @returns Request
 */
const getAllJobs = async (userId: number) => {
  const {jobHeaders} = await getCustomRepository(
    JobsRepository
  ).getJobHeaders( userId);

  const {jobSkills} = await getCustomRepository(
    JobsRepository
  ).getJobSkills( userId);

  const jobs: any = [];

  const jobsPromises = await jobHeaders.map(async (jobHeader:any) =>{

    const skills = jobSkills.filter((x:any) => x.shoutoutId==jobHeader.id).map((skill:any) => {
      return {
        id: skill.id,
        skill: skill.skill
      }
    });

    const query = `# Shared contacts of $user_1 and $user_2 (sorted by first_name, last_name)
    {
      var(func: eq(User.mysql_user_id,  ${userId})) {
            user_1_contacts as User.has_contacts {
            }
        }
      
        var(func: eq(User.mysql_user_id, ${jobHeader.shoutoutUserId})) {
            user_2_contacts as User.has_contacts {
            }
        }
    
        sharedcontacts(func: uid(user_1_contacts), orderasc: User.first_name, orderasc: User.last_name) @filter(uid(user_2_contacts)) {
            uid: uid
            id: User.mysql_user_id
            profilePic: User.image_url
            firstName: User.first_name
            lastName: User.last_name
            title: User.title
        }
    }`;
    const mututalConnections = await graphqlService.runQuery(query);

    const job = {
      id: jobHeader.id,
      url: jobHeader.url,
      firstname: jobHeader.firstname,
      lastname: jobHeader.lastname,
      profilePic: jobHeader.profilePic,
      profileTitle: jobHeader.profileTitle,
      title: jobHeader.title,
      description: jobHeader.description,
      skills: skills,
      mutualConnections: mututalConnections.sharedcontacts,
    }
    jobs.push(job)

  }
  );

  await Promise.all(jobsPromises);

  return responseFormatter.formatResponse(
    jobs,
    0,0,0
  );
};

export default {
  getAllJobs,
};
