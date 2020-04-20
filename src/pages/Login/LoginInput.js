import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";

const LoginInput = (props) => {
  const { name, err, handleChange } = props;

  let placeholder;
  let type = name;
  switch (name) {
    case "username":
      placeholder = "Username";
      break;
    case "email":
      placeholder = "Your Email Address";
      break;
    case "password":
      placeholder = "Password";
      break;
    case "repeatPwd":
      placeholder = "Repeat Password";
      type = "password";
      break;
    default:
      placeholder = "";
  }

  if (err.type === name) {
    return (
      <div className="login-input-item">
        <TextField
          type={type}
          name={name}
          className="input-item-textfield"
          error={true}
          helperText={err.msg}
          placeholder={placeholder}
          onChange={handleChange}
          variant="outlined"
        />
      </div>
    );
  }

  return (
    <div className="login-input-item">
      <TextField
        type={type}
        name={name}
        className="input-item-textfield"
        placeholder={placeholder}
        onChange={handleChange}
        variant="outlined"
      />
    </div>
  );
};

export default LoginInput;
