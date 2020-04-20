import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  }
}));

const ColorCircularProgress = withStyles({
  root: {
    color: "#50B9D7",
    height: 10
  }
})(CircularProgress);

export default function LoadingSpinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorCircularProgress />
    </div>
  );
}
