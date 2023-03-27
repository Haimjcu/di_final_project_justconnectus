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
    shoutoutsCount: 0,
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
            let allShoutouts =
            action.payload.data.data.length
              ? [...action.payload.data.data]
              : [];
            allShoutouts.sort((a:any, b:any) => b.num_contacts - a.num_contacts || b.id - a.id); 

            return Object.assign({}, state, {                                      
                shoutouts: allShoutouts,
                shoutoutsCount: allShoutouts.length,
                isLoading: false,
            });
          }
          case ADD_SHOUTOUT_SUCCESS: {
            return Object.assign({}, state, {
              shoutoutsCount: state.shoutoutsCount+1,
            });
          }

          default:
            return state;
        }
    };
    
export default shoutoutReducer;