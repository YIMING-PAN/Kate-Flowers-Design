import { UPDATE_REGISTER_FORM, RESET_FORM } from "../actions/registerAction";

const initialState = {
  email: "",
  password: "",
  username: ""
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REGISTER_FORM:
      const { email, password, username } = action.registerForm;
      return {
        email,
        password,
        username
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default registerReducer;
