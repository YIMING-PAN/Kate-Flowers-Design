import { HANDLE_VISIBLE, HANDLE_REDIRECT } from "../actions/loginAction";

const initialState = {
  visible: false,
  redirectTo: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_VISIBLE:
      return {
        ...state,
        visible: action.isVisible
      };
    case HANDLE_REDIRECT:
      return {
        ...state,
        redirectTo: action.redirectTo
      };
    default:
      return state;
  }
};
