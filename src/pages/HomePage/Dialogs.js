import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { lengthCheck } from "../../utils/helper";

function FormDialog(props) {
  const {
    location: { pathname: currentPath },
    history,
  } = props;
  const initialUser = window.localStorage.getItem("user") || "";
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(initialUser);

  const [values, setValues] = React.useState({
    err: {
      name: "",
      msg: "",
      warning: false,
    },
  });

  useEffect(() => {
    window.localStorage.setItem("user", user);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    localStorage.setItem("user", user);
    if (!lengthCheck(user.length, 1, 20)) {
      setValues({
        ...values,
        err: {
          name: "user",
          msg: "Please enter your Pinterest username",
        },
      });
      return;
    }
    setOpen(false);
    history.push("/stylingboard");
  };

  const handleChange = (event) => {
    const input = event.target;
    const value = input.value;
    setUser(value);
  };

  //   console.log(currentPath, history);

  return (
    <div>
      <a onClick={handleClickOpen}>Styling Board</a>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Pinterest Username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To use to this styling board, please enter your pinterest username
            here or please login first.
          </DialogContentText>
          <TextField
            autoFocus
            name={"user"}
            value={user}
            margin="dense"
            id="pinterest"
            fullWidth
            onChange={handleChange}
            label={values.err.name === "user" ? "Error" : "Pinterest Username"}
            error={values.err.name === "user" ? true : false}
            helperText={values.err.name === "user" ? values.err.msg : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(FormDialog);
