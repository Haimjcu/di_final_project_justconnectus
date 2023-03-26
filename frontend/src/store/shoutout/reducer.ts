import {
    LOAD_SHOUTOUTS_INIT,
    LOAD_SHOUTOUTS_SUCCESS,
    LOAD_SHOUTOUTS_FAIL,
    SET_SELECTED_SHOUTOUT,
    ADD_SHOUTOUT_SUCCESS,
    ShoutoutActionTypes,
    ShoutoutState,
  } from "./type";

  export const initialState: ShoutoutState = {
    shoutouts: [],
    selectedShoutout: {},
    isLoading: false,
  };

  const shoutoutReducer = (state = initialState, action: ShoutoutActionTypes) => {
    switch (action.type) {
        case SET_SELECTED_SHOUTOUT: {
            return Object.assign({}, state, {
              selectedShoutout: { ...action.payload },
            });
          }
          case LOAD_SHOUTOUTS_INIT: {
            return Object.assign({}, state, {
              isLoading: true,
            });
          }
          case LOAD_SHOUTOUTS_FAIL: {
            return Object.assign({}, state, {
              isLoading: false,
            });
          }
          case LOAD_SHOUTOUTS_SUCCESS: {
            return Object.assign({}, state, {
                shoutouts: [ ...action.payload ],
            });
          }
          case ADD_SHOUTOUT_SUCCESS: {
            return Object.assign({}, state, {
                shoutouts: [ ...action.payload ],
            });
          }

          default:
            return state;
        }
    };
    
export default shoutoutReducer;