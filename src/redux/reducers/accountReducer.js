import {
  UPDATE_USER_ID,
  RESET_USER_ID,
  UPDATE_USER_DETAIL_STATE
} from "../actions/accountAction";

const initialState = {
  userRole: "",
  userRoleId: "",
  userDetails: {}
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ID:
      const { userRole, userRoleId } = action.userID;
      return { userRole, userRoleId };
    case UPDATE_USER_DETAIL_STATE:
      return {
        ...state,
        userDetails: action.userDetails
      };
    case RESET_USER_ID:
      return initialState;
    default:
      return state;
  }
};

export default accountReducer;
