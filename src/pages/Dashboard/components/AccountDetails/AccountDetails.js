import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import GoogleMapsInput from "./MapInput";
import LanguageSelector from "./LanguageSelector";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const genders = [
  {
    value: "Male",
    label: "Male"
  },
  {
    value: "Female",
    label: "Female"
  }
];

const useStyles = makeStyles(() => ({
  root: { boxShadow: "none", backgroundColor: "inherit" }
}));

const AccountDetails = props => {
  const [changeGender, setChangeGender] = React.useState("");
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
  const [languageLabel, setLanguageLabel] = useState([]);

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: "Shen",
    lastName: "Zhi",
    email: "shen.zhi@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA"
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeGender = event => {
    setChangeGender(event.target.value);
    handleChange(event);
  };

  const states = [
    {
      value: "alabama",
      label: "Alabama"
    },
    {
      value: "new-york",
      label: "New York"
    },
    {
      value: "san-francisco",
      label: "San Francisco"
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                onChange={event => handleChange(event)}
                required
                label="Full name"
                name="fullname"
                placeholder="Fullname"
                variant="outlined"
                value={name}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <GoogleMapsInput address={address} handleChange={handleChange} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                onChange={handleChangeGender}
                fullWidth
                variant="outlined"
                name="gender"
                value={gender}
                label={"Gender"}
              >
                {genders.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                onChange={event => handleChange(event)}
                required
                variant="outlined"
                name="mobile"
                value={mobile}
                label={"Mobile"}
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <LanguageSelector
                languageLabel={languageLabel}
                setLanguageLabel={setLanguageLabel}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                multiline
                rows="4"
                variant="outlined"
                fullWidth
                onChange={event => handleChange(event)}
                required
                name="introduction"
                value={introduction}
                label={"Introduction"}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
