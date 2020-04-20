export const lengthCheck = (length, min, max) => {
  if (length < min || length > max) {
    return false;
  }
  return true;
};

export const getPreviousPath = currentPath => {
  const loginIndex = currentPath.indexOf("/login");
  return currentPath.substr(0, loginIndex);
};

export const isIncluded = (container, str) =>
  container.search(str) === -1 ? false : true;

export const setError = (name, specified = "") => {
  return { name, msg: `Invalid ${name}. ${specified}` };
};

/**
 * - Login: type => "all"
 * - Register: type => specified error input
 * @param {*} message error message
 */
export const errHandler = message => {
  // const type = message.split('"')[1] || "all";
  let err = {};
  const allType = ["email", "password", "username"];
  message = message.replace(/\"/g, "");

  allType.forEach(type => {
    if (isIncluded(message, type)) {
      err = { type, msg: message };
    }
  });
  return err;
};
