export const LOAD_JOBS_INIT = "LOAD:JOBS:INIT";
export const LOAD_JOBS_SUCCESS = "LOAD:JOBS:SUCCESS";
export const LOAD_JOBS_FAIL = "LOAD:JOBS:FAIL";
export const SET_SELECTED_JOB = "JOB:SET_SELECTED_JOB";

export interface JobsState {
    jobs: any[];
    selectedJob: any;
    isLoading: false;
  }

  interface LoadJobsInitAction {
    type: typeof LOAD_JOBS_INIT;
  }

  interface LoadJobsFailAction {
    type: typeof LOAD_JOBS_FAIL;
  }

  interface FetchJobsSuccessAction {
    type: typeof LOAD_JOBS_SUCCESS;
    payload: any;
  }

  interface SetJobSuccessAction {
    type: typeof SET_SELECTED_JOB;
    payload: any;
  }

  export type JobsActionTypes =
  | LoadJobsFailAction
  | LoadJobsInitAction
  | FetchJobsSuccessAction
  | SetJobSuccessAction;