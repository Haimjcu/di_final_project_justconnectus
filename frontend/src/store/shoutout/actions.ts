import { QueryParamPayload } from "@Store/common/type";

import apiCall from "../config/api";
import { API_END_POINTS, API_METHODS } from "../config/constants";

import {
    ADD_SHOUTOUT_INIT,
    ADD_SHOUTOUT_SUCCESS,
    ADD_SHOUTOUT_FAIL,
    UPDATE_SHOUTOUT_INIT,
    UPDATE_SHOUTOUT_SUCCESS,
    UPDATE_SHOUTOUT_FAIL,
    DELETE_SHOUTOUT_INIT,
    DELETE_SHOUTOUT_SUCCESS,
    DELETE_SHOUTOUT_FAIL,
    LOAD_SHOUTOUTS_INIT,
    LOAD_SHOUTOUTS_SUCCESS,
    LOAD_SHOUTOUTS_FAIL
  } from "./type";

  export const createShoutout = function (data: any) {
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

  export const updateShoutout = function (data: any) {
    const { V1, SHOUTOUTS, CREATE_SHOUTOUT, UPDATE_SHOUTOUT } = API_END_POINTS;
    let url = `${V1}${SHOUTOUTS}${CREATE_SHOUTOUT}`;
    let apiArgs = {
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
    }

    data.id !== 0 ? (
      url = `${V1}${SHOUTOUTS}${UPDATE_SHOUTOUT}`,
  
      apiArgs = {
        API_CALL: {
          method: API_METHODS.POST,
        },
        data,
        url,
        TYPES: {
          initType: UPDATE_SHOUTOUT_INIT,
          successType: UPDATE_SHOUTOUT_SUCCESS,
          failureType: UPDATE_SHOUTOUT_FAIL,
        },
      }
    )
    : null;

    return apiCall(apiArgs);
  };

  export const deleteShoutout = function (data:any) {
    console.log(`haim delete action ${JSON.stringify(data)}`);
    const { V1, SHOUTOUTS, DELETE_SHOUTOUT } = API_END_POINTS;
    const url = `${V1}${SHOUTOUTS}${DELETE_SHOUTOUT}`;

    const apiArgs = {
      API_CALL: {
        method: API_METHODS.PUT,
      },
      data,
      url,
      TYPES: {
        initType: DELETE_SHOUTOUT_INIT,
        successType: DELETE_SHOUTOUT_SUCCESS,
        failureType: DELETE_SHOUTOUT_FAIL,
      },
    };
    return apiCall(apiArgs);
  };

  export const loadShoutouts = function (payload: QueryParamPayload) {
    const { V1, SHOUTOUTS, GET_ALL_SHOUTOUTS, OFFSET, LIMIT, SEARCH_TERM } =
      API_END_POINTS;
    const searchQuery = payload?.searchTerm
      ? `${SEARCH_TERM}${payload.searchTerm}`
      : "";
    const url = `${V1}${SHOUTOUTS}${GET_ALL_SHOUTOUTS}${OFFSET}${payload.offset}${LIMIT}${payload.limit}${searchQuery}`;
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