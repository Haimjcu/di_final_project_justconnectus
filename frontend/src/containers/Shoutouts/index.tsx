import { loadShoutouts, deleteShoutout } from "@Store/shoutout/actions";
import { showNotification } from "@Store/notification/actions";
import { openModal } from "@Store/ui/actions";
import { ModalType } from "@Utils/constants";
import { initialState } from "@Store/rootReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import Shoutouts from "./Shoutouts";
import { SET_SELECTED_SHOUTOUT } from "@Store/shoutout/type";

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
        setSelectedShoutout: (payload) =>
          dispatch({ type: SET_SELECTED_SHOUTOUT, payload }),
      },
      dispatch,
    ),
    loadShoutouts,
    deleteShoutout,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shoutouts);