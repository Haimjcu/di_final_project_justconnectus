import { fetchUser } from "@Store/auth/actions";
import { showNotification } from "@Store/notification/actions";
import { openModal } from "@Store/ui/actions";
import { ModalType } from "@Utils/constants";
// import { initialState } from "@Store/auth/reducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import Shoutouts from "./Shoutouts";

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        openModal: () => dispatch(openModal(ModalType.SHOUTOUT_MODAL)),
        showNotification,
      },
      dispatch,
    ),
    fetchUser,
  };
};

export default connect(null, mapDispatchToProps)(Shoutouts);