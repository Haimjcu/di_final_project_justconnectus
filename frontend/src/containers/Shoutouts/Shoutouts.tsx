import Loader from "@Components/Loader";
import EditSquare from "@Components/SVG/EditSquare";
import ReadMore from "@Components/ReadMore";
import ConfirmationModal from "@Components/ConfirmationModal";
import usePush from "@Hooks/usePush";
import globalUseStyles from "@Hooks/styleHooks";
import { skillStyle } from "@Containers/Profile/ManageSkills/styles";
import { useTranslation } from "@Translations";
import { Box, Button, Grid, Typography, IconButton } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { useStyles } from "./styles";
import { useProfileStyles } from "@Containers/Profile/styles";


const Shoutouts = (props: any) => {
  const globalClasses = globalUseStyles();
  const skillClasses = skillStyle();
  const { t } = useTranslation();
  const { loadShoutouts, deleteShoutout, shoutouts, shoutoutsCount, showNotification,isLoading, userId, openModal, setSelectedShoutout } = props;
  const profileClasses = useProfileStyles();
  const classes = useStyles();
  const [expanded, setExpended] = useState<{ [name: string]: boolean }>({});
  const [open, setOpen] = useState<boolean>(false);
  const [id, setSelectedId] = useState<number | null>(null);
  const push = usePush();

  const handleCreateShoutout = () => {
    setSelectedShoutout({});
    openModal();
  };

  const handleEditShoutout = (shoutout:any) => {
    setSelectedShoutout(shoutout);
    openModal();;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSuccess = async () => {
    if (id) {
      const response = await deleteShoutout({shoutoutId: id});
      if (response.success) {
        showNotification({
          type: "success",
          message: response.message || t("common:deleted_successfully"),
        });
      }
      handleClose();
    }
  };

  const handleDeleteShoutout = (shoutoutId:number) => {
    setSelectedId(shoutoutId);
    setOpen(true);
  };

  const handleSearch = (shoutout:any) => {
    setSelectedShoutout(shoutout);
    push("/search");;
  };

  const handleShowMoreLink = (value: string | number | boolean): void => {
    const selectedId = value.toString();
    setExpended({
      ...expanded,
      [selectedId]: !expanded[selectedId],
    });
  };

  useEffect(() => {
    loadShoutouts({ limit: 0, offset: 0, userId });
  },[shoutoutsCount]);


  return (
    <>
    <Box className={classes.shoutoutContainer}>

        <Box className={clsx(globalClasses.flex, classes.shoutoutHeader)}>
            <Typography  className={classes.shoutoutTitle} variant="h1">
                {t("common:my_shoutouts")}{" "}
            </Typography>
            <Button variant="contained" color="secondary"
                className={classes.actionBtn}
                onClick={() => handleCreateShoutout()}
            >
                New Shout Out
            </Button>
        </Box>
      <Box className={classes.shoutoutInnerContainer}>
        <Grid className={classes.cardCenter} container spacing={2}>
        {isLoading ? (
        <Loader style={{ margin: "150px auto 0", gridColumn: "span 2" }} />
      ) : (
          (shoutouts || []).map((shoutout: any) => (
            <Grid key={shoutout.id} item md={4} className={classes.cardContainer}>
              <Box className={classes.card}>
                <Box
                  className={clsx(
                    globalClasses.flex,
                    classes.shoutoutNameWrap,
                  )}
                >
                  <Box className={classes.detailsContainer}>
                    <Box
                      mb={1}
                      className={clsx(
                        globalClasses.flex,
                        classes.details,
                      )}
                    >
                      <Box className={clsx(
                        globalClasses.flex,
                        globalClasses.alignCenter,
                        classes.detailsHeader,
                      )}
                      >
                        <Typography
                          className={clsx(
                            classes.shoutoutHeading,
                          )}
                          variant="h6"
                        >
                          {`${shoutout?.title}`}
                        </Typography>
                        <IconButton onClick={() => handleEditShoutout(shoutout)}>
                          <EditSquare />
                        </IconButton>
                      </Box>
                      <Box>
                        <ReadMore
                          className={clsx(
                            profileClasses.desc,
                            profileClasses.profileText,
                          )}
                          expanded={expanded[shoutout.id]}
                          onClick={handleShowMoreLink}
                          limit={400}
                          id={shoutout.id}
                        >
                          {shoutout?.description || ""}
                        </ReadMore>
                      </Box>
                    </Box>
                  </Box>

                <Box
                  mt={{ xs: "12px", sm: "24px" }}
                  className={clsx(skillClasses.skillSets, classes.skillContainer)}
                >
                  {shoutout?.skills?.map((skills: any) => (
                    <Box
                      key={skills?.skill.id}
                      className={clsx(
                        skillClasses.skill,
                        classes.chips,
                      )}
                    >
                      {skills?.skill.skill}
                    </Box>
                  ))}
                </Box>

                </Box>
                <Box 
                    py={2}
                    px={{ xs: 2, sm: 5 }}
                    className={clsx(
                        globalClasses.modalFooter,
                        globalClasses.flexCenter,
                        classes.button
                    )}
                >
              <Button
                type="button" variant="outlined" color="primary"
                className={globalClasses.mobileHidden}
                onClick={() => handleDeleteShoutout(shoutout.id)}
              >
                {t("common:delete")}
              </Button>
              <Button type="button" variant="contained" color="primary"
              onClick={() => handleSearch(shoutout)}
              >
                {t("common:search")}
              </Button>
              <Button
                type="button" variant="outlined" color="primary"
                className={globalClasses.onlyMobile}
                onClick={() => handleDeleteShoutout(shoutout.id)}
              >
                {t("common:delete")}
              </Button>
                </Box>
              </Box>
            </Grid>
          ))
          )}
        </Grid>
      </Box>
    </Box>
    <ConfirmationModal
        heading={"Alert"}
        message={"Do you want to delete selected shoutout?"}
        open={open}
        onSuccess={onSuccess}
        onClose={handleClose}
      />
  </>
  );
};

export default Shoutouts;