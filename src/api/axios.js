import axios from "axios";
import { getToken } from "../utils/auth";

axios.defaults.baseURL = "https://byedust-api-server.herokuapp.com";

// append authorization token since every request
const appendAuthToken = config => {
  const jwtToken = getToken();
  const Authorization = jwtToken && `Bearer ${jwtToken}`;

  return { ...config, headers: { Authorization, ...config.header } };
};

export const get = (url, config = {}) => {
  return axios.get(url, appendAuthToken(config));
};

export const post = (url, data, config = {}) => {
  return axios.post(url, data, appendAuthToken(config));
};

export const put = (url, data, config = {}) => {
  return axios.put(url, data, appendAuthToken(config));
};

export const del = (url, config = {}) => {
  return axios.delete(url, appendAuthToken(config));
};
