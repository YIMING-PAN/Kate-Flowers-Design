import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 5,
    backgroundColor: "#ffa640"
  },
  bar: {
    backgroundColor: "#49c5b6"
  }
})(LinearProgress);

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress />
    </div>
  );
}
