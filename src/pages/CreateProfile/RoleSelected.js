import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import "./role-selected.scss";

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: "13px",
    marginTop: theme.spacing(2)
  },
  font: {
    fontSize: 25,
    textTransform: "initial"
  }
}));

export default function RoleSelected(props) {
  const classes = useStyles();
  const { handleRole, values } = props;
  const [open, setOpen] = useState(false);

  const CUSTOMER_ROLE = "customer";
  const TRADIE_ROLE = "tradie";

  useEffect(() => {
    values.role === TRADIE_ROLE && handleOpen();
  }, [values.role]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // keep this otherwise the DoneIcon won't show up
  const keepIcon = () => {
    return null;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.font}>
        What would you like to use BYEDUST for?
      </Typography>
      <div className="role-selected-container">
        <Grid container spacing={3}>
          <div
            className={
              open ? "role-container right-panel-active" : "role-container"
            }
          >
            <div className="role-form-container role-tasker-container">
              <form action="#" className="role-form">
                <img
                  src="https://www.airtasker.com/images/homepage/home-how-it-works-step-image-2.png"
                  alt="tasker"
                  className="role-img"
                />
                <Chip
                  icon={<FaceIcon />}
                  label="Tradie"
                  color="primary"
                  onDelete={keepIcon}
                  deleteIcon={<DoneIcon />}
                />
              </form>
            </div>
            <div className="role-form-container role-user-container">
              <form action="#" className="role-form">
                <img
                  src="https://www.airtasker.com/images/homepage/home-how-it-works-step-image-1.png"
                  alt="user"
                  className="role-img"
                />
                <Chip
                  icon={<FaceIcon />}
                  label="Customer"
                  color="secondary"
                  onDelete={keepIcon}
                  deleteIcon={<DoneIcon />}
                />
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <Typography variant="body1" gutterBottom>
                    Choose the right person for your task and get it done.
                  </Typography>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      handleRole(CUSTOMER_ROLE);
                      handleClose();
                    }}
                  >
                    Or Become Customer
                  </Button>
                </div>
                <div className="overlay-panel overlay-right">
                  <Typography variant="body1" gutterBottom>
                    Tell us what you need. It's FREE to post.
                  </Typography>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      handleRole(TRADIE_ROLE);
                      handleOpen();
                    }}
                  >
                    Or Become Tradie
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </React.Fragment>
  );
}
