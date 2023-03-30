import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  mutualContainer: {
    marginBottom: "30px !important",
},
profilePaper: {
  width: 800,
  height: "100%",
},
avatar: {
  width: theme.spacing(7),
  height: theme.spacing(7),
},
detailHeading: {
  justifyContent: "space-between",
},
designation: {
  backgroundColor: "#E9F9F6",
  borderRadius: "5px",
  color: "#26B69F",
  fontSize: "14px",
  fontFamily: "inter",
  fontWeight: 600,
  whiteSpace: "nowrap",
},
actionBtn: {
  height: 54,
  minWidth: "200px !important",
},
mobHide: {
  "@media only screen and (max-width:768px)": {
    display: "none",
    alignContent: "center",
  },
},
mobileAskButton: {
  display: "none",
"@media only screen and (max-width:768px)": {
  display: "block",
  margin: "10px auto 0px",
  width: "80%",
},
},
jobDescription: {
  border: "none !important",
  marginTop: "0",
},
sectionHeader: {
  marginTop: "1.5rem",
},
closeBtn: {
  display: "flex !important",
  right: "0px !important",
},
buttons: {
  display: "flex",
  gap: "8px",
  flexDirection: "column",
  flexBasis: "45%",
  "& button": {
    fontSize: "18px",
    flex: "auto",
    minWidth: "50%",
    padding: "1rem 2rem",
    "@media only screen and (max-width:768px)": {
      minWidth: "100%",
      display: "flex",
      flexWrap: "wrap",
      fontSize: "16px",
    },
  },
  "& .MuiButton-containedSecondary": {
    color: "#fff",
  },
  "& .MuiButton-outlinedSecondary": {
    "@media only screen and (max-width:768px)": {
      display: "none",
    },
  },
},
onlyDesktopBtn: {
    "@media only screen and (max-width:768px)": {
        display: "none !important",
      },
},
buttonMobile: {
  display: "none",
  fontFamily: "Inter",
  padding: "12px 8px",
  gap: 8,
  flex: "auto",
  maxWidth: "50%",
  background: "#4884ED",
  color: "#ffffff",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: "1.25rem",
  lineHeight: "24px",
  border: "none",
  maxHeight: 60,
  "@media only screen and (max-width:767px)": {
    minWidth: "100%",
    fontSize: "16px",
    fontWeight: "500",
  },
},
headerWrapper: {
  justifyContent: "space-between",
},
}));

export default useStyles;