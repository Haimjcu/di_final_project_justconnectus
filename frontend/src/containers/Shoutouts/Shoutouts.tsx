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
  const { fetchUser, openModal } = props;
  const classes = useStyles();

  const handleCreateShoutout = () => {
    openModal();
  };

  useEffect(() => {
    fetchUser();
  });

  const shoutoutList = [{
    id: 99,
    title: "java developer",
    description: "Our client is a UK subsidiary of a global financial house working in multiple markets and asset classes.",
    skills: [{id:1, name:"thebest"},{id:2, name:"best"},{id:3, name:"tshoutet"},{id:4, name:"thebdddest"},{id:5, name:"thebohyearest"}],
  },
  {
    id: 98,
    title: "java developer",
    description: "Our client is a UK subsidiary of a global financial house working in multiple markets and asset classes.",
    skills: [{id:1, name:"thebest"}],
  },
  {
    id: 97,
    title: "java developer",
    description: "Our client is a UK subsidiary of a global financial house working in multiple markets and asset classes.",
    skills: [{id:1, name:"thebest"}],
  } ]

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
          {shoutoutList.map((shoutout: any) => (
            <Grid key={shoutout.id} item md={4} className={classes.cardContainer}>
              <Box className={classes.card}>
                <Box
                  className={clsx(
                    globalClasses.flex,
                    classes.shoutoutNameWrap,
                  )}
                >
                  <Box className={classes.details}>
                    <Box
                      mb={1}
                      className={clsx(
                        globalClasses.flex,
                        globalClasses.alignCenter,
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
                      <IconButton>
                        <EditSquare />
                    </IconButton>
                      <Typography variant="body2">
                      {`${shoutout?.description}`}
                      </Typography>
                    </Box>
                  </Box>

                <Box
                  mt={{ xs: "12px", sm: "24px" }}
                  className={clsx(skillClasses.skillSets, classes.skillContainer)}
                >
                  {shoutout?.skills?.map((skill: any) => (
                    <Box
                      key={skill.id}
                      className={clsx(
                        skillClasses.skill,
                        classes.chips,
                      )}
                    >
                      {skill?.name}
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
                //onClick={handleClose}
              >
                {t("common:delete")}
              </Button>
              <Button type="button" variant="contained" color="primary">
                {t("common:search")}
              </Button>
              <Button
                type="button" variant="outlined" color="primary"
                className={globalClasses.onlyMobile}
                //onClick={handleClose}
              >
                {t("common:delete")}
              </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  </>
  );
};

export default Shoutouts;