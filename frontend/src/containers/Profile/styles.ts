import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  grid: {
    width: "100%",
    padding: "10px 0 50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  profileLeft: {
    display: "grid",
    flex: "auto",
    maxWidth: "60%",
    "@media (max-width: 767px)": {
      maxWidth: "100%",
      padding: 0,
      order: 3,
    },
  },
}));

export const useProfileStyles = makeStyles(() => ({
  profileH3: {
    marginRight: "1.125rem",
    justifyContent: "space-between !important",
  },
  profileH5: {
    marginRight: 16,
  },
  profileText: {
    fontWeight: 300,
    // textTransform: "lowercase",
    whiteSpace: "pre-wrap",
    lineHeight: "1.625rem",
    "@media only screen and (max-width:767px)": {
      fontSize: 14,
      lineHeight: "1.25rem",
    },
  },
  boxImage: {
    // background: "#F8F8F8",
    borderRadius: 12,
    width: 80,
    height: 80,
    marginRight: 12,
    // overflow: "hidden",
    "@media only screen and (max-width:767px)": {
      width: 60,
      height: 60,
      borderRadius: 8,
    },
  },
  profileDetailsWrap: {
    // maxWidth: "calc(100% - 104px)",
    flex: "auto",
    "@media only screen and (max-width:767px)": {
      // maxWidth: "calc(100% - 72px)",
    },
  },
  profileDetailsLeft: {
    flex: "auto",
    maxWidth: "calc(100% - 150px)",
    "@media only screen and (max-width:767px)": {
      maxWidth: "100%",
    },
  },
  profileSep: {
    borderBottom: "1px solid #F8F8F8",
    paddingBottom: 36,
    marginBottom: 36,
    "&:last-child": {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottom: "none",
    },
    "@media only screen and (max-width:767px)": {
      paddingBottom: 0,
      marginBottom: 20,
      borderBottom: "none",
    },
  },
  span: {
    color: "#4884ED",
    lineHeight: "1.5rem",
    fontWeight: 600,
  },
  desc: {
    marginTop: 16,
  },
  education: {
    paddingTop: "60px",
  },
  showMoreLink: {
    // paddingLeft: 10,
  },
}));
