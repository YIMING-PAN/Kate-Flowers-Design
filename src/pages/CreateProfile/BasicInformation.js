import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import GoogleMapsInput from "./MapInput";
import "./basic-information.scss";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  font: {
    fontSize: 25,
    textTransform: "initial"
  }
}));

export default function BasicInformation(props) {
  const { handleChange, values } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.font}>
        Tell us about yourself to set up your profile
      </Typography>
      <div className="basic-information-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={event => handleChange(event)}
              required
              name="fullname"
              placeholder="Fullname"
              value={values.fullname}
              label={
                values.err.name === "fullname" ? "Error" : "What's your name?"
              }
              error={values.err.name === "fullname" ? true : false}
              helperText={values.err.name === "fullname" && values.err.msg}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <GoogleMapsInput values={values} handleChange={handleChange} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
