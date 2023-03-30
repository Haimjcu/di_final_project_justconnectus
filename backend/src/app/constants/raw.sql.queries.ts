export const rawSqlQueries = {
  GET_PHONEBOOK_RECORDS_FOR_REGISTERED: `SELECT phb.id id,usr.id userId,usr.email email, usr.first_name firstName, usr.last_name lastName, 
  usr.city city, usr.state, usr.country country,usr.zip zip,usr.profile_pic profilePic, usr.title title, usr.url url
  FROM jcu_dev.phonebook phb
  inner join user usr on phb.email = usr.email OR phb.phone = usr.phone
  where phb.created_by = :userId and (:searchTerm != '' and (usr.email = :searchTerm OR usr.phone = :searchTerm) OR :searchTerm = '')
  LIMIT :limit OFFSET :offset;`,
  GET_PHONEBOOK_COUNT_FOR_REGISTERED: `SELECT COUNT(DISTINCT phb1.id) AS counts
  FROM jcu_dev.phonebook phb1
  inner join user usr1 on phb1.email = usr1.email OR phb1.phone = usr1.phone
  where phb1.created_by = :userId and (:searchTerm != '' and (usr1.email = :searchTerm OR usr1.phone = :searchTerm) OR :searchTerm = '')
  LIMIT :limit OFFSET :offset;`,
  GET_PHONEBOOK_RECORDS_FOR_NON_REGISTERED: `select phb.id id,phb.email email,phb.phone phone, phb.first_name firstName, phb.last_name lastName, phb.status status  
  from phonebook phb WHERE NOT EXISTS (SELECT id FROM user usr WHERE usr.email = phb.email OR usr.phone = phb.phone) 
  and phb.created_by = :userId and (:searchTerm != '' and (phb.email = :searchTerm OR phb.phone = :searchTerm) OR :searchTerm = '')
  LIMIT :limit OFFSET :offset;`,
  GET_PHONEBOOK_COUNT_FOR_NON_REGISTERED: `SELECT COUNT(DISTINCT phb.id) AS counts
  from phonebook phb WHERE NOT EXISTS (SELECT id FROM user usr WHERE usr.email = phb.email OR usr.phone = phb.phone) 
  and phb.created_by = :userId and (:searchTerm != '' and (phb.email = :searchTerm OR phb.phone = :searchTerm) OR :searchTerm = '')
  LIMIT :limit OFFSET :offset;`,
  GET_CONTACT_REQUESTS: `select distinct(userid) as userid from
  (select request_to as userid from request where created_by= :userId
  union all
  select created_by as userid from request where request_to= :userId) as users
  order by userid`,
  CREATE_JOBS: `INSERT INTO jobs
  (user_id, shoutout_id, is_active, is_notified, created_by, updated_by, created_at, updated_at)
  select u.user_id, :shoutoutId, 1,0, :userId, :userId, now(), now() from shoutout_skills
  left join user_skill u using(skill_id)
  where shoutout_id=:shoutoutId and user_id is not null
  and user_id != :userId and u.is_active=1
  group by user_id`,
  GET_JOB_HEADERS: `select j.shoutout_id as id ,u.url, u.first_name as firstname, u.last_name as lastname, u.profile_pic as profilePic, u.title as profileTitle, sh.title as title, sh.description as description, sh.created_by as shoutoutUserId
  from jobs j
  left join shoutout_header sh on j.shoutout_id = sh.id
  left join user u on sh.created_by = u.id
  where j.user_id=:userId`,
  GET_JOB_SKILLS: `select shoutout_id as shoutoutId, sk.id as id, sk.skill as skill
  from jobs j
  left join shoutout_skills s using(shoutout_id)
  left join skills sk on s.skill_id = sk.id
  where j.user_id=:userId`,
};
