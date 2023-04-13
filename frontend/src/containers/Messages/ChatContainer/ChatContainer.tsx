import { Avatar, Box, Chip, Typography } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {
  Chat,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@pubnub/react-chat-components";
import { getTypeColor } from "@Utils/constants";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import React, { useEffect } from "react";
import openInNewTab from "@Utils/openInNewTab";

import { useStyles } from "./styles";

const ChatContainer = (props: any) => {
  const { skills, targetUser, type, channelId, loginUser, title } = props;
  const { url } = loginUser;

  const pubnub = new PubNub({
    publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY || "",
    userId: url,
  });

  useEffect(() => {
    const initData = () => {
      pubnub.subscribe({
        channels: [channelId],
      });
    };

    if (url && channelId) {
      initData();
    }
    return () => pubnub.unsubscribeAll();
  }, [channelId, pubnub, url]);

  const onSand = (messagePayload: any) => {
    console.log(messagePayload);
  };

  const classes = useStyles();
  return (
    <Box>
      <Box>
        <Box>
          { title !=="" ? (
            <Box className={classes.chipButton}>
            {title}
            </Box>        
          ) : null}

          {skills?.map((skill: any) => (
            <Chip
              key={skill.id}
              className={classes.chipSkill}
              variant="default"
              size="medium"
              label={skill.name}
            />
          ))}
        </Box>
        <Box className={classes.ChatContainer}>
          <Box className={classes.messageChatBox}>
            <Box className={classes.employeeDet}>
              <Avatar
                className={classes.employeeImage}
                src={targetUser?.profilePic}
                onClick={() => openInNewTab(`profile/${targetUser?.url}`)}
              ></Avatar>
              <ArrowBackOutlinedIcon className={classes.backIcon} />
              <Box className={classes.chatName}>
                <Typography
                  className={classes.name}
                  variant="h6"
                >{`${targetUser.firstName} ${targetUser.lastName}`}</Typography>
                <Chip
                  className={classes.designation}
                  style={getTypeColor(type)}
                  variant="default"
                  size="medium"
                  label={type}
                />
              </Box>
            </Box>
            <InfoOutlinedIcon className={classes.infoIcon} />
            <Typography className={classes.privateChip}>
              Private Chat
            </Typography>
          </Box>

          <Box className={classes.messages}>
            <PubNubProvider client={pubnub}>
              {channelId && (
                <Box className={classes.chatSection}>
                  <Chat
                    currentChannel={channelId}
                    users={[
                      {
                        name: `${loginUser.firstName} ${loginUser.lastName}`,
                        custom: {
                          title: loginUser.title,
                        },
                        email: loginUser.email,
                        externalId: null,
                        id: url,
                        profileUrl: loginUser.profilePic,
                        eTag: "",
                        updated: "",
                      },
                    ]}
                  >
                    <Box className={classes.msgChat}>
                      <MessageList fetchMessages={500}>
                        <TypingIndicator showAsMessage={true} />
                      </MessageList>
                    </Box>
                    <Box className={classes.msgInput}>
                      <MessageInput
                        typingIndicator
                        senderInfo={true}
                        onSend={onSand}
                      />
                    </Box>
                  </Chat>
                </Box>
              )}
            </PubNubProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContainer;
