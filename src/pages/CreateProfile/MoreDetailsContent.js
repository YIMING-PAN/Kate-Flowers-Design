import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./basic-information.scss";
import GoogleMapsInput from "./MapInput";
import LanguageSelector from "./LanguageSelector";

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export default function MoreDetailContent(props) {
  const {
    handleChange,
    handleLanguageSelector,
    values,
    languageLabel,
    setLanguageLabel,
  } = props;
  const [gender, setGender] = React.useState("");

  const handleChangeGender = (event) => {
    setGender(event.target.value);
    handleChange(event);
  };

  return (
    <React.Fragment>
      <div className="details-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              onChange={handleChangeGender}
              fullWidth
              name="gender"
              value={values.gender}
              label={
                values.err.name === "gender" ? "Error" : "Choose your gender"
              }
              error={values.err.name === "gender" ? true : false}
              helperText={values.err.name === "gender" ? values.err.msg : null}
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(event) => handleChange(event)}
              required
              name="mobile"
              placeholder="Mobile Number"
              value={values.mobile}
              label={values.err.name === "mobile" ? "Error" : "Mobile number?"}
              error={values.err.name === "mobile" ? true : false}
              helperText={values.err.name === "mobile" ? values.err.msg : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <GoogleMapsInput values={values} handleChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows="4"
              variant="outlined"
              fullWidth
              onChange={(event) => handleChange(event)}
              required
              name="introduction"
              placeholder="Introduction"
              value={values.introduction}
              label={
                values.err.name === "introduction"
                  ? "Error"
                  : "Tell us something about yourself?"
              }
              error={values.err.name === "introduction" ? true : false}
              helperText={
                values.err.name === "introduction" ? values.err.msg : null
              }
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
