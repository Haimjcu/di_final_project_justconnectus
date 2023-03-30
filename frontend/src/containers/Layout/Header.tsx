import usePush from "@Hooks/usePush";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import { ModalType, UserStatus } from "@Utils/constants";
import React, { useMemo } from "react";

import { useStyles } from "./styles";

const Header = (props: any) => {
  const classes = useStyles();
  const push = usePush();
  const handleLinksClick = (url: string) => {
    setSelectedShoutout({});
    push(url);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { loginSuccess, user, logout, openModal, mobileMenuOpen, closeModal, setSelectedShoutout  } =
    props;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    handleClose();
    logout();
  };

  const handleProfileClick = (url: string) => {
    setSelectedShoutout({});
    push(url);
    handleClose();
  };

  const handleHamburgerClick = () => {
    openModal(ModalType.MOBILE_MENU_MODAL);
  };

  const closeMobileMenu = () => {
    closeModal(ModalType.MOBILE_MENU_MODAL);
  };

  const isProfileCompleted = useMemo(
    () => user?.status === UserStatus.COMPLETED,
    [user],
  );

  return (
    <Box className={classes.root} position="sticky">
      <AppBar elevation={0} position="relative" color="transparent">
        <Toolbar className={classes.toolbar}>
          <Box>
            <img
              src="/static/images/logo-justconnectus.png"
              className={classes.logo}
            />
          </Box>
          <Box
            className={classes.menuBox}
            sx={{ display: { xs: "none", md: "flex" } }}
            style={{ justifyContent: !isProfileCompleted ? "flex-end" : "" }}
          >
            {isProfileCompleted ? (
              <>
                <Link
                  component="button"
                  onClick={() => handleLinksClick("/search")}
                >
                  <Typography variant="h5" className={classes.title}>
                    Find a service
                  </Typography>
                </Link>
                <Link
                  component="button"
                  // onClick={() => handleLinksClick("/jobs")}
                >
                  <Typography variant="h5" className={classes.title}>
                    Jobs
                  </Typography>
                </Link>
                <Link
                  component="button"
                  onClick={() => handleLinksClick("/shoutouts")}
                >
                  <Typography variant="h5" className={classes.title}>
                    Shout Outs
                  </Typography>
                </Link>
                <Link
                  component="button"
                  onClick={() => handleLinksClick("/contacts")}
                >
                  <Typography variant="h5" className={classes.title}>
                    Contacts
                  </Typography>
                </Link>
                <Link
                  component="button"
                  onClick={() => handleLinksClick("/messages")}
                >
                  <Typography variant="h5" className={classes.title}>
                    Messages
                  </Typography>
                </Link>
              </>
            ) : null}

            {loginSuccess ? (
              <Box>
                <Link
                  component="button"
                  onClick={handleClick}
                  className={classes.menuButton}
                >
                  <Avatar
                    alt={user?.firstName}
                    src={user?.profilePic ? user.profilePic : ""}
                  />
                  <Typography variant="h5" className={classes.title}>
                    {user?.firstName} {user.lastName}
                  </Typography>
                  <ExpandMoreIcon />
                </Link>
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  className={classes.headerDropdownStyle}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  {isProfileCompleted ? (
                    <MenuItem onClick={() => handleProfileClick("/profile")}>
                      <span>Profile</span>
                    </MenuItem>
                  ) : null}
                  {/* <MenuItem onClick={() => handleProfileClick("/profile")}>
                    <IconButton className={classes.headerIcon}>
                      <SearchIcon />
                    </IconButton>
                    <span>Find a service</span>
                  </MenuItem> */}
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Button onClick={() => handleLinksClick("/signup")}>
                  Join Now!
                </Button>
                <Button onClick={() => handleLinksClick("/login")}>
                  Sign in
                </Button>
              </>
            )}
          </Box>
          <Box
            className={classes.menuBox}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              className={classes.hamburger}
              onClick={mobileMenuOpen ? closeMobileMenu : handleHamburgerClick}
            >
              {mobileMenuOpen ? (
                <CloseIcon color="primary" fontSize="large" />
              ) : (
                <MenuIcon color="primary" fontSize="large" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
