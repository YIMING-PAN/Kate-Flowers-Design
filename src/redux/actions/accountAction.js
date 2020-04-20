export const UPDATE_USER_ID = "UPDATE_USER_ID";
export const RESET_USER_ID = "RESET_USER_ID";
export const UPDATE_USER_DETAIL_STATE = "UPDATE_USER_DETAIL_STATE";

export const updateUserID = userID => ({
  type: UPDATE_USER_ID,
  userID
});

export const resetUserID = () => ({
  type: RESET_USER_ID
});
