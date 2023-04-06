/**********Server***********/
export const SERVER = "http://127.0.0.1:4001";
export const SOCKET = "http://127.0.0.1:5000";

/**********Authentication***********/
export const SIGNIN_LINK = `${SERVER}/auth/signin`;
export const CHANGE_LINK = `${SERVER}/auth/changePassword`;
export const DEFAULT_LINK = `${SERVER}/auth/defaultPassword`;
export const LOGOUT_LINK = `${SERVER}/auth/logout`;
export const SIGNUP_LINK = `${SERVER}/auth/signup`;

/**********Chat***********/
export const CHAT_LINK = `${SERVER}/chat`;

/**********SETTINGS***********/
export const ALLUSER_LINK = `${SERVER}/user/all`;
export const ALLPENDING_USER_LINK = `${SERVER}/user/pending`;
export const ACCEPT_REMOVE_USER_LINK = `${SERVER}/user`;
export const ACCEPTAll_LINK = `${SERVER}/user/acceptAll`;
export const REMOVEAll_LINK = `${SERVER}/user/removeAll`;

export const CHANGEROLE_LINK = `${SERVER}/user`;
