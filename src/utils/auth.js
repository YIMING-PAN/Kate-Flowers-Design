import jwt from "jsonwebtoken";
const JWT_TOKEN_NAME = "jwt-token";
const USER_ID_NAME = "userId";
const CUSTOMER_ID_NAME = "customerId";
const TRADIE_ID_NAME = "tradieId";

export const isLoggedIn = () => {
  const token = localStorage.getItem(JWT_TOKEN_NAME); // !! => boolean

  if (!token) return false;

  const decodedToken = jwt.decode(token);
  const expirationTime = decodedToken.exp * 1000; // exp: second; Date.now(): millisecond
  const isExpired = Date.now() - expirationTime > 0; // now - past > 0 => expired

  return !isExpired;
};

// Token
export const storeToken = token => {
  localStorage.setItem(JWT_TOKEN_NAME, token);
};

export const getToken = () => {
  return localStorage.getItem(JWT_TOKEN_NAME);
};

export const removeToken = () => {
  return localStorage.removeItem(JWT_TOKEN_NAME);
};

// User id
export const storeUserId = userId => {
  localStorage.setItem(USER_ID_NAME, userId);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID_NAME);
};

export const removeUserId = () => {
  return localStorage.removeItem(USER_ID_NAME);
};

// Role id
export const storeRoleId = (role, roleId) => {
  switch (role) {
    case "customer":
      localStorage.setItem(CUSTOMER_ID_NAME, roleId);
      break;
    case "tradie":
      localStorage.setItem(TRADIE_ID_NAME, roleId);
      break;
    default:
      return;
  }
};

export const getRoleId = role => {
  switch (role) {
    case "customer":
      return localStorage.getItem(CUSTOMER_ID_NAME);
    case "tradie":
      return localStorage.getItem(TRADIE_ID_NAME);
    default:
      return null;
  }
};

export const removeRoleId = () => {
  localStorage.removeItem(TRADIE_ID_NAME);
  localStorage.removeItem(CUSTOMER_ID_NAME);
};
