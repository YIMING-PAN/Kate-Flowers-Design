import querystring from "querystring";
import { get, post } from "./axios";

const API_TASK_URL = "/api/tasks";
const USER_URL = "users";
const CUSTOMER_URL = "customers";
const TRADIE_URL = "tradies";

/**
 * [Params]
 * - pagination: page, pageSize
 * - priceRange: minPrice, maxPrice
 * - search: keywords
 * - sort: field name
 */
export const reqGetAllTasks = (
  page = 1,
  pageSize = 10,
  minPrice = 5,
  maxPrice = 9999,
  sort = "",
  q = "" // search key
) => {
  const stringField = querystring.stringify({
    page,
    pageSize,
    minPrice,
    maxPrice,
    sort,
    q
  });
  const url = `${API_TASK_URL}?${stringField}`;

  return get(url);
};

export const reqGetTask = id => {
  const url = `${API_TASK_URL}/${id}`;

  return get(url);
};

export const reqPostTask = (taskDetails, customerId) => {
  const url = `${API_TASK_URL}/${CUSTOMER_URL}/${customerId}`;

  return post(url, taskDetails);
};

export const reqAddOffer = (data, taskId, tradieId) => {
  const url = `${API_TASK_URL}/${taskId}/${TRADIE_URL}/${tradieId}`;

  return post(url, data);
};
