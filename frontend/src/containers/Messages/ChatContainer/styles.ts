import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  searchWrap: {
    display: "flex",
    justifyContent: "spaceBetween",
    width: "100%",
    flexWrap: "wrap",
  },
  iconFilled: {
    padding: "0 1.25rem",
    background: "#26B69F",
    borderRadius: 4,
    marginLeft: "1rem",
    color: "#fff",
    display: "none",
    width: 44,
    height: 44,
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  messageBox: {
    color: "#f1f1f1",
    minWidth: 0,
  },
  // privateChat: {
  //   color: "#f3f3f3",
  //   position:"relative",
  //   display:"flex",
  //   flexDirection:"column",
  //   height:"100%",
  //   overflow:"hidden",
  //   gap:"22px",
  //   "@media (max-width: 767px)": {
  //     display: "flex",
  //     flexDirection: "column-reverse",
  //     gap: "20px",
  //   },
  // },
  messages: {
    flex: "auto",
    overflow: "hidden",
  },
  profile: {
    color: "#f6f6f6",
  },
  msgWindow: {
    backgroundColor: "#fff",
  },
  msgInput: {
    "@media (max-width: 767)": {
      position: "inherit",
      width: "100%",
    },
  },
  msgChat: {
    padding: "0px",
    marginBottom: "5px",
    overflowY: "auto",
    flex: "auto",
  },
  ChatContainer: {
    marginTop: "16px",
    border: "1px solid #E3E3E4",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "calc(100vh - 200px)",
    overflow: "hidden",
    "@media (max-width: 767px)": {
      height: "calc(100vh - 80px)",
      border: "none",
    },
  },

  messageChatBox: {
    padding: "24px",
    display: "flex",
    alignItems: "center",
    fontFamily: "inter",
    justifyContent: "space-between",
    borderBottom: "1px solid #E3E3E4",
  },
  chatparagraph: {
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 1280px) and (max-width:1600px)": {
      marginLeft: "0",
    },
  },
  chatTitle: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  profileImage: {
    marginRight: "24px",
    "@media (min-width: 1280px)": {
      marginRight: "12px",
    },
  },
  chipTitle: {
    backgroundColor: "#F0F5FE",
    borderRadius: "5px",
    color: "#4884ED",
    fontSize: "10px",
    fontFamily: "inter",
    fontWeight: 600,
    gap: "8px",
    marginRight: "80px",
    whiteSpace: "nowrap",
    width: "100%",
    "& span": {
      whiteSpace: "nowrap",
    },
    "@media (min-width: 1280px)": {
      marginRight: "10px",
      width: "100%",
      fontSize: "8px",
    },
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
  chipButton: {
    backgroundColor: "#4884ED",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontFamily: "inter",
    fontWeight: 600,
    padding: "19px 16px",
    marginBottom: "1rem",
    width: "30%",
    "& span": {
      whiteSpace: "nowrap",
    },
    "@media (max-width: 767px)": {
      fontSize: "12px",
      width: "100%",
      display: "none",
    },
  },
  employeeDet: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  infoIcon: {
    display: "none",
    fill: "#4884ED",
    "@media (max-width: 767px)": {
      display: "block",
    },
  },
  backIcon: {
    display: "none",
    fill: "#4884ED",
    "@media (max-width: 767px)": {
      display: "block",
    },
  },
  chatName: {
    fontSize: "16px",
    display: "flex",
    flexDirection: "column",
    columnGap: "8px",
    fontWeight: 500,
    "@media (max-width: 767px)": {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  chatSpan: {
    fontSize: "12px",
    fontFamily: "inter",
    fontWeight: 500,
    color: "#71717B",
  },
  time: {
    fontSize: "15px",
    fontFamily: "inter",
    fontWeight: 500,
    color: "#71717B",
    "@media (min-width: 1280px)": {
      fontSize: "12px",
    },
  },
  privateChip: {
    color: "#2B2B36",
    fontSize: "16px",
    fontWeight: 500,
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  chatMessageWindowRight: {
    marginLeft: "30%",
  },
  chatMessages: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingTop: "30px",
    paddingBottom: "10px",
  },
  chatMessageWindowleft: {
    marginRight: "30%",
  },
  chatMessageRight: {
    fontSize: "14px",
    backgroundColor: "#F0F5FE",
    padding: "16px 24px",
    borderRadius: "10px",
  },
  chatMessageleft: {
    fontSize: "14px",
    backgroundColor: "#E9F9F6",
    padding: "16px 24px",
    borderRadius: "10px",
  },
  dateRight: {
    textAlign: "start",
    fontSize: "14px",
    color: "#71717B",
  },
  dateLeft: {
    width: "100%",
    textAlign: "end",
    fontSize: "14px",
    color: "#71717B",
  },
  employeeProfile: {
    marginTop: "80px",
  },
  employeeDetails: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  employeeImage: {
    width: "43px",
    height: "43px",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  name: {
    fontSize: "16px",
    fontWeight: 500,
    "@media (max-width: 767px)": {
      whiteSpace: "nowrap",
      fontSize: "14px",
    },
    "@media (min-width: 1280px)": {
      whiteSpace: "nowrap",
    },
  },
  employeeName: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginBottom: "10px",
  },
  employeeDesignation: {
    fontSize: "16px",
    color: "#71717B",
  },
  chipProvider: {
    fontSize: "14px",
    backgroundColor: "#FEF5E5",
    color: "#F89F00",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  chipSkills: {
    marginTop: "25px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  chipSkill: {
    backgroundColor: "#F0F5FE",
    color: "#4884ED",
    border: "1px solid #4884ED",
    padding: "8px 16px",
    borderRadius: "8px",
    margin: "0 5px 10px 0",
  },
  actionbtn: {
    marginTop: "32px",
    backgroundColor: "#26B69F",
    color: "#fff",
    width: "100%",
    height: "52px",
    "@media (max-width: 767px)": {
      // fontSize:"12px",
    },
  },
  note: {
    marginTop: "64px",
    color: "#71717B",
    fontSize: "18px",
  },
  channelContent: {
    margin: "15px",
    cursor: "pointer",
  },
  chatContent: {
    height: "100%",
    maxHeight: "calc(100% - 58px)",
    display: "flex",
    flexDirection: "column",
  },
  chatSection: {
    border: "1px black",
    height: "100%",
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 767px)": {
      border: "none",
      // height: "calc(100vh - 163px)"
    },
  },
}));
