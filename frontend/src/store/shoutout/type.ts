export const LOAD_SHOUTOUTS_INIT = "LOAD:SHOUTOUTS:INIT";
export const LOAD_SHOUTOUTS_SUCCESS = "LOAD:SHOUTOUTS:SUCCESS";
export const LOAD_SHOUTOUTS_FAIL = "LOAD:SHOUTOUTS:FAIL";
export const SET_SELECTED_SHOUTOUT = "SHOUTOUT:SET_SELECTED_SHOUTOUT";
export const ADD_SHOUTOUT_INIT = "SHOUTOUT:ADD_SHOUTOUT_INIT";
export const ADD_SHOUTOUT_FAIL = "SHOUTOUT:ADD_SHOUTOUT_FAIL";
export const ADD_SHOUTOUT_SUCCESS = "SHOUTOUT:ADD_SHOUTOUT_SUCCESS";
export const UPDATE_SHOUTOUT_INIT = "SHOUTOUT:UPDATE_SHOUTOUT_INIT";
export const UPDATE_SHOUTOUT_FAIL = "SHOUTOUT:UPDATE_SHOUTOUT_FAIL";
export const UPDATE_SHOUTOUT_SUCCESS = "SHOUTOUT:UPDATE_SHOUTOUT_SUCCESS";
export const DELETE_SHOUTOUT_INIT = "SHOUTOUT:DELETE_SHOUTOUT_INIT";
export const DELETE_SHOUTOUT_FAIL = "SHOUTOUT:DELETE_SHOUTOUT_FAIL";
export const DELETE_SHOUTOUT_SUCCESS = "SHOUTOUT:DELETE_SHOUTOUT_SUCCESS";

export interface ShoutoutState {
    shoutouts: any[];
    shoutoutsCount: number;
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

  interface CreateShoutoutInit {
    type: typeof ADD_SHOUTOUT_INIT;
  }

  interface CreateShoutoutFail {
    type: typeof ADD_SHOUTOUT_FAIL;
  }

  interface CreateShoutoutSuccess {
    type: typeof ADD_SHOUTOUT_SUCCESS;
    payload: any;
  }

  interface UpdateShoutoutInit {
    type: typeof UPDATE_SHOUTOUT_INIT;
  }

  interface UpdateShoutoutFail {
    type: typeof UPDATE_SHOUTOUT_FAIL;
  }

  interface UpdateShoutoutSuccess {
    type: typeof UPDATE_SHOUTOUT_SUCCESS;
    payload: any;
  }

  interface DeleteShoutoutInit {
    type: typeof DELETE_SHOUTOUT_INIT;
  }

  interface DeleteShoutoutFail {
    type: typeof DELETE_SHOUTOUT_FAIL;
  }

  interface DeleteShoutoutSuccess {
    type: typeof DELETE_SHOUTOUT_SUCCESS;
    payload: any;
  }

  export type ShoutoutActionTypes =
  | LoadShoutoutsFailAction
  | LoadShoutoutsInitAction
  | FetchShoutoutsSuccessAction
  | SetShoutoutSuccessAction
  | CreateShoutoutInit
  | CreateShoutoutFail
  | CreateShoutoutSuccess
  | UpdateShoutoutInit
  | UpdateShoutoutFail
  | UpdateShoutoutSuccess
  | DeleteShoutoutInit
  | DeleteShoutoutFail
  | DeleteShoutoutSuccess;