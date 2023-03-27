import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  shoutoutContainer: {
    marginTop: 36,
    width: "100%",
},
shoutoutInnerContainer: {
    padding: "2.5rem 1rem 2.5rem",
    "@media only screen and (max-width:768px)": {
        padding: "2rem 0.5rem 2rem",
      },
},
shoutoutHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    "@media only screen and (max-width:768px)": {
        justifyContent: "center",
        flexDirection: "column" ,
      },
},
shoutoutTitle: {
    marginLeft: "1rem",
    fontWeight: 600,
    marginBottom: "0.75rem !important",
    "@media only screen and (max-width:768px)": {
        marginLeft: "0",
      },
},
cardCenter: {
    "@media only screen and (max-width:768px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
cardContainer: {
    "@media only screen and (max-width:768px)": {
       marginBottom: "2.5rem",
      },
},
  card: {
    background: "#FFFFFF",
    borderRadius: 10,
    border: "1px solid #E3E3E4",
    padding: "1.5rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-width:768px)": {
      padding: 0,
      border: "none",
    },
  },
  shoutoutNameWrap: {
    margin: 0,
    padding: 0,
    width: "100%",
    border: "none",
    display: "flex",
    flexDirection: "column",
    "@media only screen and (max-width:768px)": {
      display: "flex",
      alignItems: "center",
      paddingTop: "0.5rem",
      paddingBottom: "0.75rem",
      border: "1px solid #E3E3E4",
    },
  },
  detailsContainer: {
    "@media only screen and (max-width:767px)": {
      marginLeft: "0.75rem",
      marginRight: "0.75rem",
    },
  },
  shoutoutHeading: {
    fontSize: "22px",
    color: "#2B2B36",
    marginRight: "18px",
    "@media only screen and (max-width:768px)": {
      fontSize: "16px",
    },
  },
  chips: {
    padding: "0.5rem 1rem",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0.4px",
    "@media only screen and (max-width:768px)": {
      fontSize: "12px",
    },
  },
  button: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  skillContainer: {
    "@media only screen and (max-width:768px)": {
        marginLeft: "12px",
      },
  },
  actionBtn: {
    height: 54,
    color: "#ffffff",
    padding: "1.125rem 2rem",
    fontSize: "1.325rem",
    lineHeight: "1.7rem",
    marginRight: "1rem",
    "@media only screen and (max-width:768px)": {
        marginRight: "0",
      },
  },

  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  detailsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

}));