import { combineReducers } from "redux";

import authReducer, { initialState as authState } from "./auth/reducer";
import contactReducer, {
  initialState as contactState,
} from "./contact/reducer";
import messagesReducer, {
  initialState as messagesState,
} from "./messages/reducer";
import notificationReducer, {
  initialState as notificationState,
} from "./notification/reducer";
import profileReducer, {
  initialState as profileState,
} from "./profile/reducer";
import shoutoutReducer, {
  initialState as shoutoutState,
} from "./shoutout/reducer";
import searchReducer, { initialState as searchState } from "./search/reducer";
import uiReducer, { initialState as uiState } from "./ui/reducer";

export const initialState = {
  ui: uiState,
  auth: authState,
  notification: notificationState,
  profile: profileState,
  contact: contactState,
  search: searchState,
  messages: messagesState,
  shoutout: shoutoutState,
};

export default combineReducers({
  ui: uiReducer,
  auth: authReducer,
  notification: notificationReducer,
  profile: profileReducer,
  contact: contactReducer,
  search: searchReducer,
  messages: messagesReducer,
  shoutout: shoutoutReducer,
});
