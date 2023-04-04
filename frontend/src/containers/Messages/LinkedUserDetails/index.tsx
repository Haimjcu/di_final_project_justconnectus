import {
  addConnector,
  connectUser,
  getChatUserList,
  getConnectData,
} from "@Store/messages/actions";
import { showNotification } from "@Store/notification/actions";
import { initialState } from "@Store/rootReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import LinkedUserDetails from "./LinkedUserDetails";

const mapStateToProps = (state: typeof initialState) => ({
  seekerUser: state.messages.connectDetail.seekerUser,
  connectorUser: state.messages.connectDetail.connectorUser,
  providerUser: state.messages.connectDetail.providerUser,
  skills: state.messages.connectDetail.skills?.map((skill) => skill.id) || [],
  sourceId: state.auth.userId,
  connectId: state.messages.connectDetail.id,
  isConnector: state.messages.connectDetail?.isConnector,
  isProvider: state.messages.connectDetail?.isProvider,
  isSeeker: state.messages.connectDetail?.isSeeker,
  status: state.messages.connectDetail?.status,
  type: state.messages.connectDetail?.type,
  tag: state.messages.connectDetail?.tag,
  searchMetaId: state.messages.connectDetail?.searchMetaId,
  referenceConnectId: state.messages.connectDetail?.referenceConnectId,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        showNotification,
      },
      dispatch,
    ),
    addConnector,
    connectUser,
    getChatUserList,
    getConnectData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkedUserDetails);
