import {
    LOAD_JOBS_INIT,
    LOAD_JOBS_SUCCESS,
    LOAD_JOBS_FAIL,
    SET_SELECTED_JOB,
    JobsActionTypes,
    JobsState,
  } from "./type";

  export const initialState: JobsState = {
    jobs: [],
    selectedJob: {},
    isLoading: false,
  };

  const jobsReducer = (state = initialState, action: JobsActionTypes) => {
    switch (action.type) {
        case SET_SELECTED_JOB: {
            return Object.assign({}, state, {
              selectedJob: { ...action.payload },
            });
          }
          case LOAD_JOBS_INIT: {
            return Object.assign({}, state, {
              isLoading: true,
            });
          }
          case LOAD_JOBS_FAIL: {
            return Object.assign({}, state, {
              isLoading: false,
            });
          }
          case LOAD_JOBS_SUCCESS: {
            console.log(`haim ${JSON.stringify(action.payload)}`)
            return Object.assign({}, state, {                                      
                jobs: action.payload.data.data.length
                ? [...action.payload.data.data]
                : [],
                isLoading: false,
            });
          }

          default:
            return state;
        }
    };
    
export default jobsReducer;