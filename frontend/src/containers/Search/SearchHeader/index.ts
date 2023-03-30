import { USER_LOGOUT } from "@Store/auth/type";
import { initialState } from "@Store/rootReducer";
import { closeModal, openModal } from "@Store/ui/actions";
import { ModalType } from "@Utils/constants";
import { SET_SELECTED_SHOUTOUT } from "@Store/shoutout/type";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import Header from "./Header";

const mapStateToProps = (state: typeof initialState) => ({
  loginSuccess: state.auth?.loginSuccess,
  mobileMenuOpen: state.ui.modal[ModalType.MOBILE_MENU_MODAL] || false,
  user: {
    firstName: state.auth.user?.firstName,
    lastName: state.auth.user?.lastName,
    profilePic: state.auth.user?.profilePic,
    status: state.auth.user?.status,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      logout: () => () => dispatch({ type: USER_LOGOUT }),
      openModal: (modal: string) => dispatch(openModal(modal)),
      closeModal: (modal: string) => dispatch(closeModal(modal)),
      setSelectedShoutout: (payload) =>
      dispatch({ type: SET_SELECTED_SHOUTOUT, payload }),
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
