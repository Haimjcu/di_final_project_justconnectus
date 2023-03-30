import { showNotification } from "@Store/notification/actions";
import { initialState } from "@Store/rootReducer";
import { closeModal } from "@Store/ui/actions";
import { ModalType } from "@Utils/constants";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ShoutoutModal from "./JobModal";

const mapStateToProps = (state: typeof initialState) => ({
  open: state.ui.modal[ModalType.JOB_MODAL] || false,
  job: state.jobs.selectedJob || {},
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        closeModal: () =>
          dispatch(closeModal(ModalType.JOB_MODAL)),
        showNotification,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoutoutModal);