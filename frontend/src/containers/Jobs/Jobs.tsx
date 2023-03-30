import Loader from "@Components/Loader";
import ReadMore from "@Components/ReadMore";
import globalUseStyles from "@Hooks/styleHooks";
import { skillStyle } from "@Containers/Profile/ManageSkills/styles";
import {Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import openInNewTab from "@Utils/openInNewTab";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { useJobStyles } from "./styles";
import { useProfileStyles } from "@Containers/Profile/styles";
import { useSearchStyles } from "@Containers/Search/SearchResult/styles";


const Shoutouts = (props: any) => {
  const globalClasses = globalUseStyles();
  const skillClasses = skillStyle();
  const { loadJobs, jobs, isLoading, userId, openModal, setSelectedJob } = props;
  const classes = useJobStyles();
  const searchClasses = useSearchStyles();
  const profileClasses = useProfileStyles();
  const [expanded, setExpended] = useState<{ [name: string]: boolean }>({});

  useEffect(() => {
    loadJobs({ limit: 0, offset: 0, userId });
  },[]);

 const handleShowMoreLink = (value: string | number | boolean): void => {
  const selectedId = value.toString();
  setExpended({
    ...expanded,
    [selectedId]: !expanded[selectedId],
  });
};

const handleShowMore = (job:any) => {
  setSelectedJob(job);
  openModal();;
};

  return (
    <>
    <Box className={classes.jobsContainer}>

      <Box className={classes.jobsInnerContainer}>
        <Grid className={searchClasses.cardCenter} container spacing={2}>
        {isLoading ? (
        <Loader style={{ margin: "150px auto 0", gridColumn: "span 2" }} />
      ) : (
          (jobs || []).map((job: any) => (
              <Grid key={job.id} item md={4}>
                <Box className={clsx(searchClasses.card,classes.card)}>
                  <Box
                    className={clsx(
                      globalClasses.flex,
                      classes.profileNameWrap,
                      searchClasses.profileNameWrap,
                    )}
                  >
                    <Box
                      className={clsx(
                        globalClasses.flexCenter,
                        searchClasses.providerImg,
                      )}
                      onClick={() => openInNewTab(`profile/${job?.url}`)}
                    >
                      <Grid container>
                        <Grid
                          className={clsx(
                            searchClasses.filePreview,
                            searchClasses.imgMobile,
                            searchClasses.providerImg,
                          )}
                        >
                          <Avatar
                            className={classes.image}
                            alt={`${job?.firstName} ${job?.lastName}`}
                            src={job?.profilePic}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className={clsx(searchClasses.details, classes.seekerDetails)}>
                      <Box
                        mb={1}
                        className={clsx(
                          globalClasses.flex,
                          globalClasses.alignCenter,
                        )}
                      >
                        <Typography
                          className={clsx(
                            classes.profileName,
                            searchClasses.profileHeading,
                          )}
                          variant="h6"
                        >
                          {`${job?.firstname} ${job?.lastname}`}
                        </Typography>
                        <Box className={searchClasses.providerTag}>
                          Posted by
                        </Box>
                      </Box>
                      <Box
                        mb={1}
                        className={clsx(
                          classes.designation,
                          searchClasses.designation,
                        )}
                      >
                        {job?.profileTitle}
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.jobDescription}>
                    <Box>
                      <Typography variant="h6">
                        {`${job?.title}`}
                      </Typography>
                      <Box>
                        <ReadMore
                          className={clsx(
                            profileClasses.desc,
                            profileClasses.profileText,
                          )}
                          expanded={expanded[job.id]}
                          onClick={handleShowMoreLink}
                          limit={400}
                          id={job.id}
                        >
                          {job?.description || ""}
                        </ReadMore>
                      </Box>
                    </Box>
                    <Box
                      mt={{ xs: "12px", sm: "24px" }}
                      className={skillClasses.skillSets}
                    >
                      {job?.skills?.map((skill: any) => (
                        <Box
                          key={skill.id}
                          className={clsx(
                            skillClasses.skill,
                            searchClasses.chips,
                          )}
                        >
                          {skill?.skill}
                        </Box>
                      ))}
                    </Box>
                    { job?.mutualConnections.length ? (
                    <Box
                      mt={{ xs: "12px", sm: "24px" }}
                      className={clsx(
                        skillClasses.skillSets,
                        searchClasses.moreContactsToAsk,
                      )}
                    >
                      <AvatarGroup max={5}>
                          {job?.mutualConnections
                          ?.slice(0, 4)
                          .map((mutualConnection: any) => (
                            <Avatar
                              key={mutualConnection?.id}
                              alt={`${mutualConnection?.firstName} ${mutualConnection?.lastName}`}
                              src={mutualConnection?.profilePic}
                            />
                          ))}
                      </AvatarGroup>
                      {job?.mutualConnections?.length > 4
                        ? `+ ${job?.mutualConnections?.length - 4} ${
                            job?.mutualConnections?.length - 4 > 1
                              ? `contacts`
                              : `contact`
                          } you can ask`
                        : ""}
                    </Box>
                    ) : null }

                    <Box className={clsx(searchClasses.buttons, classes.desktop)}>
                      <Button
                        className={clsx(
                          searchClasses.mobHide,
                          searchClasses.actionBtn,
                        )}
                        variant="outlined"
                        color="primary"
                        onClick={() => handleShowMore(job)}
                      >
                        Show more
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={searchClasses.actionBtn}
                        //onClick={() =>handleStartChat(provider.id, connection.id)}
                      >
                        Start Chat
                      </Button>
                    </Box>


                    <Box 
                      py={2}
                      px={{ xs: 2, sm: 5 }}
                      className={clsx(
                          globalClasses.modalFooter,
                          globalClasses.flexCenter,
                          classes.button,
                          classes.mobile
                      )}
                      >
                      <Button
                        type="button" variant="outlined" color="primary"
                        className={globalClasses.mobileHidden}
                        //onClick={() =>handleStartChat(provider.id, connection.id)}
                      >
                        Start Chat
                      </Button>
                      <Button type="button" variant="contained" color="primary"
                      onClick={() => handleShowMore(job)}
                      >
                        Show more
                      </Button>
                      <Button
                        type="button" variant="outlined" color="primary"
                        className={globalClasses.onlyMobile}
                        //onClick={() =>handleStartChat(provider.id, connection.id)}
                      >
                        Start Chat
                      </Button>
                    </Box>

                  </Box>
                </Box>
              </Grid>
            ))
          )
        }
        </Grid>
      </Box>
    </Box>
  </>
  );
};

export default Shoutouts;