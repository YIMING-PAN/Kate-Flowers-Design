import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { RESET_FORM } from "../../redux/actions/registerAction";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BasicInformation from "./BasicInformation";
import MoreDetails from "./MoreDetails";
import { lengthCheck } from "../../utils/helper";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RoleSelected from "./RoleSelected";
import { storeToken, storeUserId, storeRoleId } from "../../utils/auth";
import { TASK_URL } from "../../routes/URLMAP";
import { register } from "../../api/auth";
import { addRole } from "../../api/register";
import "./basic-information.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  font: {
    fontSize: 25,
    textTransform: "initial",
  },
}));

function getSteps() {
  return ["More Details"];
}

function getStepContent(
  step,
  handleChange,
  handleAvatar,
  handleLanguageSelector,
  handleRole,
  values,
  languageLabel,
  setLanguageLabel
) {
  switch (step) {
    case 0:
      return (
        <MoreDetails
          values={values}
          handleChange={handleChange}
          handleAvatar={handleAvatar}
          handleLanguageSelector={handleLanguageSelector}
          languageLabel={languageLabel}
          setLanguageLabel={setLanguageLabel}
        />
      );
    default:
      return "Unknown step";
  }
}

function ProfileStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [languageLabel, setLanguageLabel] = useState([]);
  const [skipped, setSkipped] = useState(new Set());
  const {
    handleShowModal,
    setIsFinish,
    isLoading,
    setIsLoading,
    updateRegisterStatus,
    updatePageData,
  } = props;

  const [values, setValues] = useState({
    location: "",
    language: [],
    gender: "",
    mobile: "",
    introduction: "",
    role: "customer",
    srcimage:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
    err: {
      name: "",
      msg: "",
      warning: false,
    },
  });

  const registerForm = useSelector((state) => state.register);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      updateRegisterStatus(false);
      dispatch({ type: RESET_FORM });
    };
  }, []);

  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 0;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    if (event.name) {
      setValues({ ...values, [event.name]: event.value });
      return;
    }
    const key = event.target.name;
    const value = event.target.value;

    setValues({ ...values, [key]: value });
  };

  const handleAvatar = (value) => {
    setValues({ ...values, srcimage: value });
  };

  const handleLanguageSelector = (event) => {
    const { value } = event[event.length - 1];
    setValues({ ...values, language: values.language.concat(value) });
  };

  const handleRole = (role) => {
    setValues({ ...values, role });
  };

  const closeModel = () => {
    handleShowModal(false);
    window.location.reload();
  };

  const addUser = async (roleId) => {
    const formWithRole = { ...registerForm, role: values.role, roleId };

    try {
      const response = await register(formWithRole);
      const { token, userId } = response.data.data;
      storeToken(token);
      storeUserId(userId);
      storeRoleId(values.role, roleId);
      setIsLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      setValues({ err: { name: "request", msg: message } });
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    // add customer/tradie
    const fullname = props.username;
    const {
      location,
      language,
      gender,
      mobile,
      introduction,
      role,
      srcimage,
    } = values;
    let roleId;

    setIsLoading(true);
    try {
      const response = await addRole(
        role,
        fullname,
        gender,
        location,
        mobile,
        introduction,
        srcimage,
        language
      );
      const { _id } = response.data.data;
      roleId = _id;

      // pass the new customer/tradie id in register form
      // user - register
      if (!roleId) return new Error("role id is not defined");
      await addUser(roleId);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        setValues({ err: { name: "request", msg: message } });
        setIsLoading(false);
      }
    }
  };

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        if (!lengthCheck(values.gender.length, 1, 10)) {
          setValues({
            ...values,
            err: {
              name: "gender",
              msg: "Please select your gender",
            },
          });
          return;
        }
        if (!lengthCheck(values.mobile.length, 9, 15)) {
          setValues({
            ...values,
            err: {
              name: "mobile",
              msg: "Please set a valid mobile number",
            },
          });
          return;
        }
        await handleRegister();
        updatePageData();

        setIsFinish(true);
        break;
      default:
        return;
    }
    // Once pass validation, set err empty
    activeStep !== 1 && setValues({ ...values, err: { name: "", msg: "" } });
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = async () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setOpen(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    await handleRegister();
    updatePageData();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWarningClose = () => {
    setValues({
      ...values,
      err: {
        warning: false,
      },
    });
  };

  const renderFinishPage = () => {
    if (values.err.name === "request")
      return (
        <Alert variant="filled" severity="error">
          {values.err.msg}
        </Alert>
      );

    return (
      <div className="all-finish">
        <Typography variant="h6" gutterBottom className={classes.font}>
          All steps completed - Congrats!
        </Typography>
        <div className="redirect-container">
          <Link to="/">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={closeModel}
              style={{ marginTop: 60, width: "50%" }}
            >
              Get Start Now
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div>
        {activeStep === steps.length ? (
          renderFinishPage()
        ) : (
          <div>
            <div className="profile-content">
              <Typography className={classes.instructions} component={"span"}>
                {getStepContent(
                  activeStep,
                  handleChange,
                  handleAvatar,
                  handleLanguageSelector,
                  handleRole,
                  values,
                  languageLabel,
                  setLanguageLabel
                )}
              </Typography>
            </div>
            <div className="profile-content-button">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.font}
                      >
                        Are you sure you want to skip this step?
                      </Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        You can choose to skip this step now, and then you can
                        set it or change it later in your account settings.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Set Now
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                        className={classes.button}
                      >
                        Skip
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )}
              <React.Fragment>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
                <Dialog
                  open={values.err.warning}
                  onClose={handleWarningClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You must choose a role.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleWarningClose}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Set Now
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.register.username,
});

export default connect(mapStateToProps)(withRouter(ProfileStepper));
