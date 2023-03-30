import { makeStyles } from "@material-ui/core/styles";

export const useJobStyles = makeStyles(() => ({
  jobsContainer: {
    marginTop: 36,
    width: "100%",
},
jobsInnerContainer: {
    padding: "2.5rem 1rem 2.5rem",
    "@media only screen and (max-width:768px)": {
        padding: "2rem 0.5rem 2rem",
      },
},
  profileNameWrap: {
    margin: 0,
    padding: 0,
    border: "none",
    display: "flex",
    alignItems: "center",
    "@media only screen and (max-width:768px)": {
      display: "flex",
      alignItems: "center",
    },
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  profileName: {
    marginRight: "18px",
    "@media only screen and (max-width:767px)": {
      fontSize: 16,
    },
  },
  designation: {
    fontWeight: 300,
    fontSize: "1.125rem",
    lineHeight: "22px",
  },
  seekerDetails : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  jobDescription: {
    border: "1px solid #E3E3E4",
    borderRadius: "10px",
    marginTop: "1rem",
    padding: "1.25rem",
  },
  card: {
    justifyContent: "unset",
  },
  button: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  desktop: {
    "@media only screen and (max-width:767px)": {
      display: "none",
    },
  },
  mobile: {
    "@media only screen and (min-width:768px)": {
      display: "none",
    },
  }
}));