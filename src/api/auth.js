import { post } from "./axios";

const LOGIN_URL = "/api/auth";
const REGISTER_URL = "/api/users";
const CHECK_EMAIL_URL = "/api/users/check";

export const login = (email, password) => {
  const data = {
    email,
    password
  };
  return post(LOGIN_URL, data);
};

export const register = registerForm => {
  return post(REGISTER_URL, registerForm);
};

export const checkEmailExisted = email => {
  const data = { email };
  return post(CHECK_EMAIL_URL, data);
};
