import { updateShoutout } from "@Store/shoutout/actions";
import { showNotification } from "@Store/notification/actions";
import { getCountries, getStatesByCountryCode } from "@Store/profile/actions";
import { initialState } from "@Store/rootReducer";
import { getSkills } from "@Store/profile/actions";
import { closeModal } from "@Store/ui/actions";
import { ModalType } from "@Utils/constants";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ShoutoutModal from "./ShoutoutModal";

const mapStateToProps = (state: typeof initialState) => ({
  open: state.ui.modal[ModalType.SHOUTOUT_MODAL] || false,
  title: state.shoutout.selectedShoutout.title || "",
  description: state.shoutout.selectedShoutout.description || "",
  skills: state.profile.skills,
  country: state.auth.user.country,
  state: state.auth.user.state,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        closeModal: () =>
          dispatch(closeModal(ModalType.SHOUTOUT_MODAL)),
        showNotification,
      },
      dispatch,
    ),
    updateShoutout,
    getSkills,
    getCountries,
    getStatesByCountryCode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoutoutModal);