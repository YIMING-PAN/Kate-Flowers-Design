import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { AccountProfile, AccountDetails } from "./components";
import { reqGetCustomer, reqGetTradie } from "../../api/customer";
import { getRoleId } from "../../utils/auth";

import "./profile.scss";

const useStyles = makeStyles(() => ({
  root: {},
}));

const SettingProfile = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [language, setLanguage] = useState([]);
  const [introduction, setIntroduction] = useState("");

  useEffect(() => {
    const updatePageData = async () => {
      setLoading(true);
      try {
        await reqGetCustomer(getRoleId("customer")).then((res) => {
          setName(res.data.data.name);
          setAvatar(res.data.data.avatar);
          setGender(res.data.data.gender);
          setAddress(res.data.data.address);
          setMobile(res.data.data.mobile);
          setLanguage(res.data.data.language);
          setIntroduction(res.data.data.introduction);
        });
      } catch (e) {
        await reqGetTradie(getRoleId("tradie")).then((res) => {
          setName(res.data.data.name);
          setAvatar(res.data.data.avatar);
          setGender(res.data.data.gender);
          setAddress(res.data.data.address);
          setMobile(res.data.data.mobile);
          setLanguage(res.data.data.language);
          setIntroduction(res.data.data.introduction);
        });
      }
      setLoading(false);
    };
    updatePageData();
  }, []);

  const values = {
    name,
    avatar,
    gender,
    address,
    mobile,
    language,
    introduction,
  };

  return (
    <div className="profile vertical-scroll">
      <div className="profile__page">
        <div className="profile__page-header">
          <h4>Profile</h4>
        </div>
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <AccountProfile values={values} />
              <AccountDetails values={values} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SettingProfile;
