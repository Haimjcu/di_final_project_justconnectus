import globalUseStyles from "@Hooks/styleHooks";
import usePush from "@Hooks/usePush";
import {
  Avatar,
  Backdrop,
  Fade,
  Grid,
  MenuItem,
  MenuList,
  Modal,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";

import useStyles from "./styles";

export default function MobileMenuModal(props: any) {
  const { closeModal, open, user, logout, loginSuccess } = props;
  const classes = useStyles();
  const push = usePush();
  const globalClasses = globalUseStyles();

  const handleClose = () => {
    closeModal();
  };

  const handleLinksClick = (url: string) => {
    push(url);
    handleClose();
  };

  const onLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Modal
      aria-labelledby="add-note-agent-modal-title"
      aria-describedby="add-note-agent-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      className={globalClasses.modal}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={clsx(globalClasses.paper, classes.paper)}>
          <Grid className="modal-root">
            <MenuList>
              {loginSuccess ? (
                <>
                                    <MenuItem
                    className={classes.headerUser}
                    onClick={() => handleLinksClick("/search")}
                  >
                    <Typography variant="h5">
                      Find a service
                    </Typography>
                  </MenuItem>

                <MenuItem
                    className={classes.headerUser}
                    onClick={() => handleLinksClick("/jobs")}
                  >
                    <Typography variant="h5">
                      Jobs
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    className={classes.headerUser}
                    onClick={() => handleLinksClick("/shoutouts")}
                  >
                    <Typography variant="h5">
                      Shoutouts
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    className={classes.headerUser}
                    onClick={() => handleLinksClick("/contacts")}
                  >
                    <Typography variant="h5">
                      Contacts
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    className={classes.headerUser}
                    onClick={() => handleLinksClick("/messages")}
                  >
                    <Typography variant="h5">
                      Messages
                    </Typography>
                  </MenuItem>
                  
                  <MenuItem
                    className={classes.headerUser}
                    onClick={() => handleLinksClick("/profile")}
                  >
                    <Avatar
                      alt={user?.firstName}
                      src={user?.profilePic ? user.profilePic : ""}
                    />
                    <Typography variant="h5">
                      {user?.firstName} {user.lastName}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <Typography variant="body1">Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => handleLinksClick("/login")}>
                    <Typography variant="body1">Sign in</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleLinksClick("/signup")}>
                    <Typography variant="body1">Join Now!</Typography>
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}

MobileMenuModal.getInitialProps = () => {
  return { namespacesRequired: ["common", "profile"] };
};
