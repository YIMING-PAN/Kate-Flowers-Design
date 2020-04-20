import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AvatarUpload from "./AvatarUpload";
import MoreDetailContent from "./MoreDetailsContent";

const useStyles = makeStyles(theme => ({
  field: {
    "& .MuiTextField-root": {
      // marginBottom: theme.spacing(4)
    }
  }
}));

export default function MoreDetails(props) {
  const {
    handleChange,
    handleAvatar,
    handleLanguageSelector,
    values,
    languageLabel,
    setLanguageLabel
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.field}>
      <div className="title">
        <AvatarUpload
          values={values}
          handleChange={handleChange}
          handleAvatar={handleAvatar}
        />
        <MoreDetailContent
          values={values}
          handleChange={handleChange}
          handleLanguageSelector={handleLanguageSelector}
          languageLabel={languageLabel}
          setLanguageLabel={setLanguageLabel}
        />
      </div>
    </div>
  );
}
