import { UPDATE_ISJOINING } from "../actions/chatAction";

const initialState = {
  isJoining: false
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ISJOINING:
      return {
        ...state,
        isJoining: action.isJoining
      };
    default:
      return state;
  }
};

export default chatReducer;
