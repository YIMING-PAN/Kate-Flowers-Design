import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ProfileStepper from "./ProfileStepper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import LinearIndeterminate from "../../UI/LinearIndeterminate";
import "./create-profile.scss";

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: 25,
    textTransform: "initial",
  },
  modal: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100%",
    zIndex: 101,
  },
}));

export default function CreateProfile(props) {
  const {
    showModal,
    showModalExitWarning,
    handleShowModal,
    handleCloseModal,
    handleCloseModalExitWarning,
    handleExitEditing,
    updateRegisterStatus,
    updatePageData
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const classes = useStyles();

  const handleOnClose = () => {
    if (isFinish) {
      handleExitEditing();
      return;
    }
    handleCloseModal();
  };

  return (
    <React.Fragment>
      <Modal
        className={classes.modal}
        open={showModal}
        onClose={handleOnClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="profile-box">
          {isLoading && <LinearIndeterminate />}
          <div className="profile-box-container">
            <div className="profile-title text-center"><h2>Welcome To Kate Dawes Flower Design</h2></div>
            <Divider />
            <ProfileStepper
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsFinish={setIsFinish}
              showModal={showModal}
              handleShowModal={handleShowModal}
              handleCloseModal={handleCloseModal}
              updateRegisterStatus={updateRegisterStatus}
              updatePageData={updatePageData}
            />
          </div>
        </div>
      </Modal>
      <Dialog
        open={showModalExitWarning}
        onClose={handleCloseModalExitWarning}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" gutterBottom className={classes.font}>
            Warning
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sorry, you cannot close the window until you finish the
            registration.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModalExitWarning}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            BACK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
