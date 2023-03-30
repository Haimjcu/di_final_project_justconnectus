import { QueryParamPayload } from "@Store/common/type";

import apiCall from "../config/api";
import { API_END_POINTS, API_METHODS } from "../config/constants";

import {
  LOAD_JOBS_INIT,
  LOAD_JOBS_SUCCESS,
  LOAD_JOBS_FAIL
  } from "./type";

  export const loadJobs = function (payload: QueryParamPayload) {
    const { V1, JOBS, GET_ALL_JOBS, OFFSET, LIMIT, SEARCH_TERM } =
      API_END_POINTS;
    const searchQuery = payload?.searchTerm
      ? `${SEARCH_TERM}${payload.searchTerm}`
      : "";
    const url = `${V1}${JOBS}${GET_ALL_JOBS}${OFFSET}${payload.offset}${LIMIT}${payload.limit}${searchQuery}`;
    const apiArgs = {
      API_CALL: {
        method: API_METHODS.GET,
      },
      url,
      TYPES: {
        initType: LOAD_JOBS_INIT,
        successType: LOAD_JOBS_SUCCESS,
        failureType: LOAD_JOBS_FAIL,
      },
    };
    return apiCall(apiArgs);
  };