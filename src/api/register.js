import { post } from "./axios";

const CUSTOMER_URL = "/api/customers";
const TRADIE_URL = "/api/tradies";

// add customer / tradie
export const addRole = (
  role,
  name,
  gender,
  address,
  mobile,
  introduction,
  avatar,
  language
) => {
  const data = {
    name,
    gender,
    address,
    mobile,
    introduction,
    avatar,
    language
  };
  const url = role === "customer" ? CUSTOMER_URL : TRADIE_URL;
  return post(url, data);
};
