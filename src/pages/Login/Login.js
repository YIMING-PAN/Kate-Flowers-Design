import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import {
  handleVisible as handleVisibleAction,
  handleRedirect as handleRedirectAction,
} from "../../redux/actions/loginAction";
import { updateRegisterForm as updateRegisterFormAction } from "../../redux/actions/registerAction";
import { updateUserID as updateUserIDAction } from "../../redux/actions/accountAction";
import { storeToken, storeUserId, storeRoleId } from "../../utils/auth";
import { login, register, checkEmailExisted } from "../../api/auth";
//Material-UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//
import Modal from "react-animated-modal";
import validator from "validator";
import LinearIndeterminate from "../../UI/LinearIndeterminate";
import { errHandler } from "../../utils/helper";
import "./login.scss";

import SocialLogin from "./SocialLogin";
import LoginInput from "./LoginInput";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatPwd: "",
      username: "",
      checkbox: false,
      err: { type: "", msg: "" },
      isLoading: false,
      switchToRegister: false,
    };
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };
  /**
   * switch between login and register
   */
  handleToggle = () => {
    //TODO clear form
    this.setState((state) => ({
      switchToRegister: !state.switchToRegister,
      email: "",
      password: "",
      repeatPwd: "",
      username: "",
      checkbox: false,
      isLoading: false,
      err: {
        type: "",
        msg: "",
      },
    }));
  };

  registerValidator = () => {
    const { email, username, password, repeatPwd, checkbox } = this.state;
    let isError = false;
    this.setState({ err: {} });

    if (!validator.isLength(username, { min: 3 })) {
      this.setState({
        err: {
          type: "username",
          msg: "Username should be at least 3 characters",
        },
      });
      isError = true;
      return isError;
    }

    if (!validator.isEmail(email)) {
      this.setState({
        err: { type: "email", msg: "Invalid email format" },
      });
      isError = true;
      return isError;
    }

    if (!validator.isLength(password, { min: 6 })) {
      this.setState({
        err: {
          type: "password",
          msg: "Password is too simple, try another one",
        },
      });
      isError = true;
      return isError;
    }

    if (password !== repeatPwd) {
      this.setState({
        err: { type: "password", msg: "Passwords do not match" },
      });
      isError = true;
      return isError;
    }

    if (!checkbox) {
      this.setState({
        err: {
          type: "checkbox",
          msg: "You should accept the terms above",
        },
      });
      isError = true;
      return isError;
    }

    return isError;
  };

  handleRedirect = (redirectTo, role, currentPath) => {
    if (redirectTo === "/find-cleaners" && role !== "customer") {
      this.props.history.replace("/");
      return;
    }

    this.props.history.replace(redirectTo ? redirectTo : "/inspiration-board");
    window.location.reload();
  };

  /**
   * userBehavior - login/register
   */
  handleLogin = async () => {
    const { email, password } = this.state;
    const {
      redirectTo,
      handleRedirect,
      handleVisible,
      location: { pathname: currentPath },
      updateUserID,
      updatePageData,
    } = this.props;

    this.setState({ err: {}, isLoading: true }, () => {
      login(email, password)
        .then((response) => {
          this.setState({ isLoading: false }, () => {
            const { token, userId, role, roleId } = response.data.data;
            storeToken(token);
            storeUserId(userId);
            storeRoleId(role, roleId);
            const userRoleId = roleId;
            updateUserID({ userRoleId });
            updatePageData();

            this.handleRedirect(redirectTo, role, currentPath);
            redirectTo && handleRedirect(""); // reset redirectTo
            window.localStorage.setItem("email", email);

            handleVisible(false);
          });
        })
        .catch((error) => {
          if (error.response) {
            const { message } = error.response.data;
            this.setState({ err: errHandler(message), isLoading: false });
          }
        });
    });
  };

  handleRegister = () => {
    const {
      updateRegisterStatus,
      handleShowModal,
      handleVisible,
      updateRegisterForm,
    } = this.props;
    const { email, password, username } = this.state;

    if (this.registerValidator()) return;

    this.setState({ err: {}, isLoading: true }, () => {
      checkEmailExisted(email)
        .then((response) => {
          this.setState({ isLoading: false }, () => {
            updateRegisterForm({ email, password, username });
            updateRegisterStatus(true);
            window.localStorage.setItem("email", email);
            handleShowModal(true);
            handleVisible(false);
          });
        })
        .catch((error) => {
          if (error.response) {
            const { message } = error.response.data;
            this.setState({ err: errHandler(message), isLoading: false });
          }
        });
    });
  };

  renderInput = () => {
    const inputTypes = this.state.switchToRegister
      ? ["username", "email", "password", "repeatPwd"]
      : ["email", "password"];
    return inputTypes.map((type) => (
      <LoginInput
        name={type}
        err={this.state.err}
        handleChange={this.handleChange}
      />
    ));
  };

  renderInfoText = () => {
    const loginInfo = "Keep me logged in";

    if (this.state.switchToRegister) {
      return (
        <>
          I accept the
          <Link className="login-link"> Terms and Conditions </Link>
        </>
      );
    }

    return loginInfo;
  };

  handleCheckBox = () => {
    this.setState((state) => ({ checkbox: !state.checkbox }));
  };

  render() {
    const { visible, handleVisible } = this.props;
    const { err, switchToRegister, isLoading } = this.state;
    const linkClasses = classnames("login-login-button", {
      disabled: isLoading,
    });

    return (
      <React.Fragment>
        <Modal
          visible={visible}
          closemodal={() => handleVisible(false)}
          type="pulse"
        >
          {isLoading && <LinearIndeterminate />}
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div
              style={{
                marginTop: 35,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{
                  margin: 20,
                  backgroundColor: "#f50057",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {switchToRegister ? "Sign Up" : "Sign In"}
              </Typography>
              <form
                style={{
                  width: "100%", // Fix IE 11 issue.
                  marginTop: 20,
                }}
              >
                <form className="login-login-form">
                  <fieldset className="login-input-container">
                    {this.renderInput()}
                  </fieldset>
                  <div className="remember-password-container">
                    <input type="checkbox" onClick={this.handleCheckBox} />
                    <label>
                      <span className="login-info-text">
                        {this.renderInfoText()}
                      </span>
                    </label>
                    {err.type === "checkbox" && (
                      <span className="err-msg">* {err.msg}</span>
                    )}
                  </div>
                  <fieldset className="login-login-button-container">
                    <Link
                      onClick={() => {
                        switchToRegister
                          ? this.handleRegister()
                          : this.handleLogin();
                      }}
                    >
                      <Button fullWidth variant="outlined" disableElevation>
                        {switchToRegister ? "Create your account" : "Log in"}
                      </Button>
                    </Link>
                  </fieldset>
                </form>

                <Grid container justify="center" style={{ marginBottom: 20 }}>
                  <Grid item xs={6}>
                    <p>
                      {switchToRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}
                    </p>
                  </Grid>
                  <Grid item xs={3}>
                    <Link className="login-link" onClick={this.handleToggle}>
                      {switchToRegister ? "Login now" : "Register now"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  visible: state.login.visible,
  redirectTo: state.login.redirectTo,
  userRoleId: state.account.userRoleId,
});

const mapDispatchToProps = (dispatch) => ({
  handleVisible: (isVisible) => dispatch(handleVisibleAction(isVisible)),
  handleRedirect: (redirectTo) => dispatch(handleRedirectAction(redirectTo)),
  updateRegisterForm: (registerForm) =>
    dispatch(updateRegisterFormAction(registerForm)),
  updateUserID: (userID) => dispatch(updateUserIDAction(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
