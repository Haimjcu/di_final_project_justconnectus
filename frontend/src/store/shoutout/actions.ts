import { QueryParamPayload } from "@Store/common/type";

import apiCall from "../config/api";
import { API_END_POINTS, API_METHODS } from "../config/constants";

import {
    ADD_SHOUTOUT_INIT,
    ADD_SHOUTOUT_SUCCESS,
    ADD_SHOUTOUT_FAIL,
    LOAD_SHOUTOUTS_INIT,
    LOAD_SHOUTOUTS_SUCCESS,
    LOAD_SHOUTOUTS_FAIL,
    SET_SELECTED_SHOUTOUT,
    ShoutoutActionTypes,
    ShoutoutState,
  } from "./type";

  export const updateShoutout = function (data: any) {
    const { V1, SHOUTOUTS, CREATE_SHOUTOUT } = API_END_POINTS;
    const url = `${V1}${SHOUTOUTS}${CREATE_SHOUTOUT}`;
    const apiArgs = {
      API_CALL: {
        method: API_METHODS.POST,
      },
      data,
      url,
      TYPES: {
        initType: ADD_SHOUTOUT_INIT,
        successType: ADD_SHOUTOUT_SUCCESS,
        failureType: ADD_SHOUTOUT_FAIL,
      },
    };
    return apiCall(apiArgs);
  };

  export const loadShoutouts = function (payload: QueryParamPayload) {
    const { V1, CONTACTS, GET_ALL_REQUESTS, OFFSET, LIMIT, SEARCH_TERM } =
      API_END_POINTS;
    const searchQuery = payload?.searchTerm
      ? `${SEARCH_TERM}${payload.searchTerm}`
      : "";
    const url = `${V1}${CONTACTS}${GET_ALL_REQUESTS}${OFFSET}${payload.offset}${LIMIT}${payload.limit}${searchQuery}`;
    const apiArgs = {
      API_CALL: {
        method: API_METHODS.GET,
      },
      url,
      TYPES: {
        initType: LOAD_SHOUTOUTS_INIT,
        successType: LOAD_SHOUTOUTS_SUCCESS,
        failureType: LOAD_SHOUTOUTS_FAIL,
      },
    };
    return apiCall(apiArgs);
  };