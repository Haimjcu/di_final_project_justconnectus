import Loader from "@Components/Loader";
import EditSquare from "@Components/SVG/EditSquare";
import globalUseStyles from "@Hooks/styleHooks";
import { skillStyle } from "@Containers/Profile/ManageSkills/styles";
import { useTranslation } from "@Translations";
import { Box, Button, Grid, Typography, IconButton } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";

import { useStyles } from "./styles";


const Shoutouts = (props: any) => {
  const globalClasses = globalUseStyles();
  const skillClasses = skillStyle();
  const { t } = useTranslation();
  const { loadShoutouts, deleteShoutout, shoutouts, shoutoutsCount, isLoading, userId, openModal, setSelectedShoutout } = props;
  const classes = useStyles();

  const handleCreateShoutout = () => {
    setSelectedShoutout({});
    openModal();
  };

  const handleEditShoutout = (shoutout:any) => {
    setSelectedShoutout(shoutout);
    openModal();;
  };

  const handleDeleteShoutout = (shoutoutId:number) => {
    deleteShoutout({shoutoutId: shoutoutId});
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
                        globalClasses.alignCenter,
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
                        <Typography variant="body2">
                        {`${shoutout?.description}`}
                        </Typography>
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
              <Button type="button" variant="contained" color="primary">
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
  </>
  );
};

export default Shoutouts;