import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select, { components } from "react-select";
import "./slector.scss";

const Placeholder = props => {
  return <components.Placeholder {...props} />;
};

const colourStyles = {
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: "#3f51b5"
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white"
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white"
  })
};

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 16,
    marginBottom: 20
  }
}));

const options = [
  { value: "English", label: "English" },
  { value: "Mandarin", label: "Mandarin" },
  { value: "Cantonese", label: "Cantonese" },
  { value: "French", label: "French" },
  { value: "Spanish", label: "Spanish" },
  { value: "Arabic", label: "Arabic" },
  { value: "Malay", label: "Malay" },
  { value: "Russian", label: "Russian" },
  { value: "Vanilla", label: "Vanilla" }
];

export default function LanguageSelector(props) {
  const classes = useStyles();
  // const [languageLabel, setLanguageLabel] = useState([]);
  const { handleLanguageSelector, languageLabel, setLanguageLabel } = props;

  return (
    <div className={classes.root}>
      <Select
        value={languageLabel}
        onChange={event => {
          setLanguageLabel(event);
        }}
        placeholder={"Select the language you can speak..."}
        components={{ Placeholder }}
        closeMenuOnSelect={false}
        isMulti
        options={options}
        styles={colourStyles}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#f2f7f9"
          }
        })}
      />
    </div>
  );
}
