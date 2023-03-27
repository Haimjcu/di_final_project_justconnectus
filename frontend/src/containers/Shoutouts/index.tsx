import { loadShoutouts } from "@Store/shoutout/actions";
import { showNotification } from "@Store/notification/actions";
import { openModal } from "@Store/ui/actions";
import { ModalType } from "@Utils/constants";
import { initialState } from "@Store/rootReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import Shoutouts from "./Shoutouts";

const mapStateToProps = (state: typeof initialState) => ({
  shoutouts: state.shoutout.shoutouts,
  shoutoutsCount: state.shoutout.shoutoutsCount,
  isLoading: state.shoutout.isLoading,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        openModal: () => dispatch(openModal(ModalType.SHOUTOUT_MODAL)),
        showNotification,
      },
      dispatch,
    ),
    loadShoutouts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shoutouts);