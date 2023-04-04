export const LOAD_SEARCH_CHAT_LIST_INIT = "LOAD:SEARCH_CHAT_LIST:INIT";
export const LOAD_SEARCH_CHAT_LIST_SUCCESS = "LOAD:SEARCH_CHAT_LIST:SUCCESS";
export const LOAD_SEARCH_CHAT_LIST_FAIL = "LOAD:SEARCH_CHAT_LIST:FAIL";

export const LOAD_CONNECT_DETAILS_INIT = "LOAD:CONNECT_DETAILS:INIT";
export const LOAD_CONNECT_DETAILS_SUCCESS = "LOAD:CONNECT_DETAILS:SUCCESS";
export const LOAD_CONNECT_DETAILS_FAIL = "LOAD:CONNECT_DETAILS:FAIL";

export interface MessagesState {
  list: any[];
  connectDetail: ConnectDetail;
  isChatUserLoading: boolean;
  isChatLoading: boolean;
}

export type ConnectDetail = {
  uuid: string;
  createdBy?: number;
  updatedBy?: any;
  createdAt?: any;
  updatedAt?: any;
  id?: number;
  userId?: number;
  skills: Skill[];
  status?: string;
  type?: string;
  tag?: string;
  seekerUser: ConnectedUser;
  connectorUser?: ConnectedUser;
  providerUser?: ConnectedUser;
  referenceConnectId?: number;
  searchMetaId?: number;
  isProvider?: boolean;
  isConnector?: boolean;
  isSeeker?: boolean;
  title?: string;
};

export interface Skill {
  id: number;
  name: string;
}

export interface ConnectedUser {
  createdBy?: any;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  firstName: string;
  lastName: string;
  title?: any;
  email: string;
  status?: any;
  city?: any;
  state?: any;
  country?: any;
  zip?: any;
  phone?: any;
  mobile?: any;
  website?: any;
  description: string;
  profilePic?: any;
  publicPic?: any;
  url: string;
  isActive: boolean;
  skills: Skill[];
}

interface FetchConnectDetailSuccessAction {
  type: typeof LOAD_CONNECT_DETAILS_SUCCESS;
  payload: any;
}

interface FetchConnectDetailInitAction {
  type: typeof LOAD_CONNECT_DETAILS_INIT;
}

interface FetchConnectDetailFailedAction {
  type: typeof LOAD_CONNECT_DETAILS_FAIL;
}

interface FetchSearchChatListSuccessAction {
  type: typeof LOAD_SEARCH_CHAT_LIST_SUCCESS;
  payload: any;
}

interface FetchSearchChatListInitAction {
  type: typeof LOAD_SEARCH_CHAT_LIST_INIT;
}

interface FetchSearchChatListFailedAction {
  type: typeof LOAD_SEARCH_CHAT_LIST_FAIL;
}

export type MessagesActionTypes =
  | FetchConnectDetailSuccessAction
  | FetchSearchChatListSuccessAction
  | FetchConnectDetailInitAction
  | FetchConnectDetailFailedAction
  | FetchSearchChatListInitAction
  | FetchSearchChatListFailedAction;
