import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from "@material-ui/core";
import AvatarUpload from "./AvatarUpload";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 20,
    boxShadow: "none",
    backgroundColor: "inherit"
  },
  details: {
    display: "flex"
  },
  avatar: {
    marginLeft: "auto",
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: 20
  },
  uploadButton: {
    marginRight: 20
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;
  const {
    name,
    avatar,
    gender,
    address,
    mobile,
    language,
    introduction
  } = props.values;

  const classes = useStyles();

  const user = {
    timezone: "GTM-10"
  };

  const [values, setValues] = useState({
    srcimage: avatar
  });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {address}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format("hh:mm A")} ({user.timezone})
            </Typography>
          </div>
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
