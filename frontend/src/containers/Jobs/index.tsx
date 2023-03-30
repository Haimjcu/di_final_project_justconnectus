import { loadJobs } from "@Store/job/actions";
import { showNotification } from "@Store/notification/actions";
import { openModal } from "@Store/ui/actions";
import { ModalType } from "@Utils/constants";
import { initialState } from "@Store/rootReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import Jobs from "./Jobs";
import { SET_SELECTED_JOB } from "@Store/job/type";

const mapStateToProps = (state: typeof initialState) => ({
  jobs: state.jobs.jobs,
  isLoading: state.jobs.isLoading,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        openModal: () => dispatch(openModal(ModalType.JOB_MODAL)),
        showNotification,
        setSelectedJob: (payload) =>
          dispatch({ type: SET_SELECTED_JOB, payload }),
      },
      dispatch,
    ),
    loadJobs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);