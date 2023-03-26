export const LOAD_SHOUTOUTS_INIT = "LOAD:SHOUTOUTS:INIT";
export const LOAD_SHOUTOUTS_SUCCESS = "LOAD:SHOUTOUTS:SUCCESS";
export const LOAD_SHOUTOUTS_FAIL = "LOAD:SHOUTOUTS:FAIL";
export const SET_SELECTED_SHOUTOUT = "SHOUTOUT:SET_SELECTED_SHOUTOUT";
export const ADD_SHOUTOUT_INIT = "SHOUTOUT:ADD_SHOUTOUT_INIT";
export const ADD_SHOUTOUT_FAIL = "SHOUTOUT:ADD_SHOUTOUT_FAIL";
export const ADD_SHOUTOUT_SUCCESS = "SHOUTOUT:ADD_SHOUTOUT_SUCCESS";

export interface ShoutoutState {
    shoutouts: any[];
    selectedShoutout: any;
    isLoading: false;
  }

  interface LoadShoutoutsInitAction {
    type: typeof LOAD_SHOUTOUTS_INIT;
  }

  interface LoadShoutoutsFailAction {
    type: typeof LOAD_SHOUTOUTS_FAIL;
  }


  interface FetchShoutoutsSuccessAction {
    type: typeof LOAD_SHOUTOUTS_SUCCESS;
    payload: any;
  }

  interface SetShoutoutSuccessAction {
    type: typeof SET_SELECTED_SHOUTOUT;
    payload: any;
  }

  interface CreateOrUpdateShoutoutInit {
    type: typeof ADD_SHOUTOUT_INIT;
  }

  interface CreateOrUpdateShoutoutFail {
    type: typeof ADD_SHOUTOUT_FAIL;
  }

  interface CreateOrUpdateShoutoutSuccess {
    type: typeof ADD_SHOUTOUT_SUCCESS;
    payload: any;
  }

  export type ShoutoutActionTypes =
  | LoadShoutoutsFailAction
  | LoadShoutoutsInitAction
  | FetchShoutoutsSuccessAction
  | SetShoutoutSuccessAction
  | CreateOrUpdateShoutoutInit
  | CreateOrUpdateShoutoutFail
  | CreateOrUpdateShoutoutSuccess;