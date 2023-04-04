import { ConnectDetail } from "@Store/messages/type";
import { showNotification } from "@Store/notification/actions";
import { initialState } from "@Store/rootReducer";
import { ConnectStatus, ConnectType } from "@Utils/constants";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ChatContainer from "./ChatContainer";

const getTargetUser = (connectDetail: ConnectDetail) => {
  if(connectDetail.type == ConnectType.SHOUTOUT) {
    if (
      connectDetail.isProvider &&
      (connectDetail.status === ConnectStatus.CONNECTED ||
        connectDetail.status === ConnectStatus.CONNECTOR)
    ) {
      return connectDetail.connectorUser;
    } else if (
      connectDetail.isProvider &&
      connectDetail.status === ConnectStatus.PROVIDER
    ) {
      return connectDetail.seekerUser;
    } else {
      return connectDetail.providerUser;
    }
  }
  else {
    if (
      connectDetail.isSeeker &&
      (connectDetail.status === ConnectStatus.CONNECTED ||
        connectDetail.status === ConnectStatus.CONNECTOR)
    ) {
      return connectDetail.connectorUser;
    } else if (
      connectDetail.isSeeker &&
      connectDetail.status === ConnectStatus.PROVIDER
    ) {
      return connectDetail.providerUser;
    } else {
      return connectDetail.seekerUser;
    }
  }
};

const mapStateToProps = (state: typeof initialState) => ({
  skills: state.messages.connectDetail.skills || [],
  targetUser: getTargetUser(state.messages.connectDetail),
  type: state.messages.connectDetail?.tag,
  title: state.messages.connectDetail?.title || "",
  channelId: state.messages.connectDetail?.uuid || "",
  loginUser: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        showNotification,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
