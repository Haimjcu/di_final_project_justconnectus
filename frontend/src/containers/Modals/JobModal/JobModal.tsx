import globalUseStyles from "@Hooks/styleHooks";
import ReadMore from "@Components/ReadMore";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  ButtonBase,
  Chip,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "@Translations";
import openInNewTab from "@Utils/openInNewTab";
import clsx from "clsx";
import Close from "icons/Close";
import React, {useState} from "react";
import { ModalType, getTypeColor } from "@Utils/constants";
import { useJobStyles } from "@Containers/Jobs/styles";
import { useProfileStyles } from "@Containers/Profile/styles";
import { useSearchStyles } from "@Containers/Search/SearchResult/styles";
import { skillStyle } from "@Containers/Profile/ManageSkills/styles";
import { useStyles } from "./styles";


export default function ContactInfo(props: any) {
  const {
    open,
    job,
    closeModal,
  } = props;
  const { t } = useTranslation();
  const globalClasses = globalUseStyles();
  const jobsClasses = useJobStyles();
  const searchClasses = useSearchStyles();
  const profileClasses = useProfileStyles();
  const skillClasses = skillStyle();
  const classes = useStyles();
  const [expanded, setExpended] = useState<{ [name: string]: boolean }>({});


  const handleClose = () => {
    closeModal(ModalType.JOB_MODAL);
  };

  const handleShowMoreLink = (value: string | number | boolean): void => {
    const selectedId = value.toString();
    setExpended({
      ...expanded,
      [selectedId]: !expanded[selectedId],
    });
  };

  const handleAskAbout = ( connectorId:any ) => {
    const request = {
      connectorId,
      providerId: 0,
      searchMetaId: 0,
    };
    //submitSearchMeta(request);
  };


  return (
    <Modal
      aria-labelledby="add-note-agent-modal-title"
      aria-describedby="add-note-agent-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      className={globalClasses.modalProfileView}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={clsx(globalClasses.paper, classes.profilePaper)}>
          <Grid className="modal-root">
            <Box
              className={globalClasses.modalBody}
              py={{ xs: 0, sm: 2 }}
              px={{ xs: 2, sm: 5 }}
            >
                <Button onClick={handleClose} className={clsx(globalClasses.closeIcon, classes.closeBtn)}>
                  <Close fill="#2B2B36" />
                </Button>
          <Grid className={searchClasses.cardCenter} container spacing={1}>
              <Grid key={job.id} item md={12}>
                <Box className={clsx(searchClasses.card,jobsClasses.card)}>
                  <Box
                    className={clsx(
                      globalClasses.flex,
                      classes.headerWrapper,
                    )}
                  >
                    <Box
                      className={clsx(
                        globalClasses.flex,
                        globalClasses.alignCenter,
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
                              className={jobsClasses.image}
                              alt={`${job?.firstName} ${job?.lastName}`}
                              src={job?.profilePic}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box className={clsx(searchClasses.details, jobsClasses.seekerDetails)}>
                        <Box
                          mb={1}
                          className={clsx(
                            globalClasses.flex,
                            globalClasses.alignCenter,
                          )}
                        >
                          <Typography
                            className={clsx(
                              jobsClasses.profileName,
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
                            jobsClasses.designation,
                            searchClasses.designation,
                          )}
                        >
                          {job?.profileTitle}
                        </Box>
                      </Box>
                    </Box>

                    <Box
                    className={clsx(
                      globalClasses.flex,
                      jobsClasses.profileNameWrap,
                      searchClasses.profileNameWrap,
                    )}
                    >

                      <Box className={clsx(classes.buttons, classes.onlyDesktopBtn)}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.actionBtn}
                          //onClick={handleStartChat}
                        >
                          Start Chat
                        </Button>
                      </Box>
                    </Box>

                  </Box>

                  <Box
                  className={clsx(globalClasses.flex, classes.buttons, globalClasses.onlyMobile)}
                  style={{ gap: 8, marginTop: "1 rem" }}                >
                  <ButtonBase className={clsx(classes.buttonMobile)}
                  // onClick={handleStartChat}
                  >
                  Start Chat
                  </ButtonBase>
                </Box>

                  <Box className={clsx(jobsClasses.jobDescription, classes.jobDescription)}>
                    <Box>
                      <Typography variant="h2">
                        {`${job?.title}`}
                      </Typography>
                      <Box>
                      <Typography variant="h5" className={classes.sectionHeader}>
                        {t("common:job_description")}
                      </Typography>
                        <ReadMore
                          className={clsx(
                            profileClasses.desc,
                            profileClasses.profileText,
                          )}
                          expanded={expanded[job.id]}
                          onClick={handleShowMoreLink}
                          limit={4000}
                          id={job.id}
                        >
                          {job?.description || ""}
                        </ReadMore>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h5" className={classes.sectionHeader}>
                        {t("common:skills_required")}
                      </Typography>
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

                      <Box my={{ xs: "32px", sm: "56px" }}>
                      <Box
                        mb={3}
                        className={clsx(globalClasses.flex, globalClasses.alignCenter)}
                      >
                        { job?.mutualConnections.length>0 && <Typography className={profileClasses.profileH3} variant="h4">
                          {t("common:available_connectors")}
                        </Typography> }
                      </Box>

                      {(job?.mutualConnections || []).map((item: any, index: number) => (
                      <>
                        <Box
                        key={item.id || index}
                          className={clsx(globalClasses.flexOnly,classes.mutualContainer)}
                          style={{marginBottom: "30px"}}
                        >
                          <Box
                            mr={{ xs: "12px", sm: 3 }}
                            className={clsx(profileClasses.boxImage, globalClasses.flexCenter)}
                          >
                            <Avatar
                                  className={classes.avatar}
                                  alt={`${item?.firstName} ${item?.lastName}`}
                                  src={item?.profilePic}
                                />
                          </Box>
                          <Box
                            pt={1}
                            className={clsx(
                              globalClasses.flex,
                              globalClasses.spaceBetween,
                              profileClasses.profileDetailsWrap,
                            )}
                          >
                            <Box className={profileClasses.profileDetailsLeft}>
                              <Box
                                className={clsx(
                                  globalClasses.flexOnly,
                                  globalClasses.alignCenter,
                                  classes.detailHeading,
                                )}
                              >
                                <Box
                                  className={clsx(
                                    globalClasses.flex,
                                    globalClasses.alignCenter,
                                  )}
                                >
                                  <Typography className={profileClasses.profileH5} variant="h5">
                                  {`${item?.firstName} ${item?.lastName}`}
                                  </Typography>
                                  <Chip
                                    className={classes.designation}
                                    style={getTypeColor("Connector")}
                                    variant="default"
                                    size="medium"
                                    label={"Your Contact"}
                                  />
                                </Box>
                              </Box>
                              <Box mt={1}>
                                <Typography variant="body2" style={{ fontWeight: 500 }}>{item?.title}</Typography>
                              </Box>
                            </Box>
                            <Button
                              className={clsx(classes.mobHide, classes.actionBtn)}
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleAskAbout(item.id)}
                              >
                              {`Ask ${item?.firstName}`}
                            </Button>
                          </Box>
                        </Box>
                        <Box>
                         <Button
                            className={clsx(classes.actionBtn, classes.mobileAskButton)}
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleAskAbout(item.id)}
                            >
                            {`Ask ${item?.firstName}`}
                          </Button>
                        </Box>                     
                      </>

                      ))
                      }

                      </Box>

                    ) : null }

                  </Box>

                  <Box
                    py={2}
                    px={{ xs: 2, sm: 5 }}
                    className={clsx(
                      globalClasses.modalFooter,
                      globalClasses.flexCenter,
                    )}
                  >
                    <Button
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={handleClose}
                    >
                      {t("common:close")}
                    </Button>
                  </Box>

                </Box>
              </Grid>
            </Grid>
                  
            </Box>

          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}
