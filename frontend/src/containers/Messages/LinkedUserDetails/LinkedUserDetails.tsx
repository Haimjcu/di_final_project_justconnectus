import SVG from "@Components/SVG";
import { Avatar, Box, Button, Chip, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useTranslation } from "@Translations";
import { ConnectStatus, ConnectType } from "@Utils/constants";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import openInNewTab from "@Utils/openInNewTab";

import { useStyles } from "./styles";

const LinkedUserDetails = (props: any) => {
  const {
    seekerUser,
    providerUser,
    addConnector,
    showNotification,
    getChatUserList,
    searchMetaId,
    connectId,
    status,
    type,
    isSeeker,
    isConnector,
    isProvider,
    connectUser,
    referenceConnectId,
    getConnectData,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartChat = async (providerId: number) => {
    if (referenceConnectId) {
      getConnectData(referenceConnectId);
    } else {
      setIsLoading(true);
      const request = { searchMetaId, providerId, connectId };
      const response = await addConnector(request);
      if (response.success) {
        showNotification({
          type: "success",
          message: response.message || t("common:chat_started"),
        });
        getChatUserList();
      } else {
        showNotification({
          type: "error",
          message: t("common:something_wrong"),
        });
      }
      setIsLoading(false);
    }
  };

  const handleConnectUser = async () => {
    setIsLoading(true);
    const response = await connectUser(connectId);
    if (response.success) {
      showNotification({
        type: "success",
        message: response.message || t("common:connected_successfully"),
      });
      getChatUserList();
    } else {
      showNotification({
        type: "error",
        message: t("common:something_wrong"),
      });
    }
    setIsLoading(false);
  };

  return (
    <Box className={classes.employeeProfile}>
      {((isSeeker && type===ConnectType.MESSAGE) || (isProvider && type===ConnectType.SHOUTOUT)) &&
      (status === ConnectStatus.CONNECTED ||
        status === ConnectStatus.CONNECTOR) ? (
        <>
          <Box>
            <Box className={classes.employeeDetails}>
              <Avatar
                className={classes.employeeImage}
                src={providerUser?.profilePic}
                onClick={() => openInNewTab(`profile/${providerUser?.url}`)}
              ></Avatar>
              <Box>
                <Box className={classes.employeeName}>
                  <Typography variant="h6">{`${providerUser.firstName} ${providerUser.lastName}`}</Typography>
                  <Chip
                    className={type===ConnectType.MESSAGE ? classes.chipProvider : classes.chipSeeker}
                    variant="default"
                    size="medium"
                    label={type===ConnectType.MESSAGE ? "Provider" : "Shoutouter"}
                  />
                </Box>
                <Typography className={classes.employeeDesignation}>
                  {providerUser.title}
                </Typography>
              </Box>
            </Box>
            {type===ConnectType.MESSAGE ? (
                <Box className={classes.chipSkills}>
                {providerUser?.skills?.map((skill: any) => (
                  <Chip
                    key={skill.id}
                    className={classes.chipSkill}
                    variant="default"
                    size="medium"
                    label={skill.skill}
                  />
                ))}
              </Box>
            ) : null}

            {!isEmpty(providerUser) ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.actionbtn}
                onClick={() => handleStartChat(providerUser.id)}
                disabled={isLoading}
              >
                Start Chat
              </Button>
            ) : null}
            <Typography className={classes.note}>
              {`NOTE: Your dialogue with the connector is confidential.The provider
    can't see it. Don't worry`}
            </Typography>
          </Box>
        </>
      ) : null}

      {isConnector ? (
        <>
          <Box>
            <Box className={classes.employeeDetails}>
              <Avatar
                className={classes.employeeImage}
                src={seekerUser?.profilePic}
                onClick={() => openInNewTab(`profile/${seekerUser?.url}`)}
              ></Avatar>
              <Box>
                <Box className={classes.employeeName}>
                  <Typography
                    className={classes.name}
                    variant="h6"
                  >{`${seekerUser.firstName} ${seekerUser.lastName}`}</Typography>
                  <Chip
                    className={classes.chipSeeker}
                    variant="default"
                    size="medium"
                    label={type===ConnectType.MESSAGE ? "Seeker" : "Shoutouter"}
                  />
                </Box>
                <Typography className={classes.employeeDesignation}>
                  {seekerUser.title}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.seprator}>
            <SVG name="linked" />
            {status === ConnectStatus.CONNECTED ? (
              <CheckCircleIcon color="primary" />
            ) : null}
          </Box>
          <Box>
            <Box className={classes.employeeDetails}>
              <Avatar
                className={classes.employeeImage}
                src={providerUser?.profilePic}
                onClick={() => openInNewTab(`profile/${providerUser?.url}`)}
              ></Avatar>
              <Box>
                <Box className={classes.employeeName}>
                  <Typography
                    className={classes.name}
                    variant="h6"
                  >{`${providerUser.firstName} ${providerUser.lastName}`}</Typography>
                  <Chip
                    className={classes.chipProvider}
                    variant="default"
                    size="medium"
                    label={type===ConnectType.MESSAGE ? "Provider" : "Jobber"}
                  />
                </Box>
                <Typography className={classes.employeeDesignation}>
                  {providerUser.title}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.chipSkills}>
              {providerUser?.skills?.map((skill: any) => (
                <Chip
                  key={skill.id}
                  className={classes.chipSkill}
                  variant="default"
                  size="medium"
                  label={skill.skill}
                />
              ))}
            </Box>
            {status === ConnectStatus.CONNECTOR ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.actionbtn}
                onClick={handleConnectUser}
                disabled={isLoading || status === ConnectStatus.CONNECTED}
              >
                Connect Users
              </Button>
            ) : null}
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default LinkedUserDetails;
