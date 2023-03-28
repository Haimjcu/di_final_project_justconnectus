import {
    LOAD_SHOUTOUTS_INIT,
    LOAD_SHOUTOUTS_SUCCESS,
    LOAD_SHOUTOUTS_FAIL,
    UPDATE_SHOUTOUT_INIT,
    UPDATE_SHOUTOUT_SUCCESS,
    UPDATE_SHOUTOUT_FAIL,
    DELETE_SHOUTOUT_INIT,
    DELETE_SHOUTOUT_SUCCESS,
    DELETE_SHOUTOUT_FAIL,
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
          console.log(`haim select shoutout ${JSON.stringify(action.payload)}`)
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

          case UPDATE_SHOUTOUT_INIT: {
            return Object.assign({}, state, {
              isLoading: true,
            });
          }
          case UPDATE_SHOUTOUT_FAIL: {
            return Object.assign({}, state, {
              isLoading: false,
            });
          }

          case UPDATE_SHOUTOUT_SUCCESS: {
            return Object.assign({}, state, {
              shoutoutsCount: 0,
              isLoading: false,
            });
          }

          case DELETE_SHOUTOUT_INIT: {
            return state;
          }
          case DELETE_SHOUTOUT_FAIL: {
            return state;
          }

          case DELETE_SHOUTOUT_SUCCESS: {
            console.log(`haim delete payload ${JSON.stringify(action)}`);
            const deletedRecord = action.payload.data.shoutoutid;
            console.log(`haim delete deletedRecord ${deletedRecord}`);
            console.log(`haim delete success before ${state.shoutouts.length}`);
            const shoutouts = state.shoutouts.filter((x) => x.id !== deletedRecord);
            console.log(`haim delete success afater ${shoutouts.length}`);
            return Object.assign({}, state, {
              shoutouts: shoutouts,
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