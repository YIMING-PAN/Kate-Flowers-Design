import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { getRoleId } from "../../utils/auth";
import { reqGetCustomer } from "../../api/customer";
import { ACCOUNT_BASE_URL } from "../../routes/URLMAP";
import Profile from "./Profile";
import SidebarNav from "./SidebarNav";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    fontSize: "40px",
    minWidth: 180,
  },
  divider: {
    margin: 10,
  },
  nav: {
    marginBottom: 20,
  },
}));

const Sidebar = (props) => {
  const { name, open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: "Styling Board",
      href: `${ACCOUNT_BASE_URL}/${name}/stylingboard`,
      icon: <DashboardIcon />,
    },
    // {
    //   title: "Profile",
    //   href: `${ACCOUNT_BASE_URL}/${name}/profile`,
    //   icon: <AccountBoxIcon />,
    // },
    // {
    //   title: "Notifications",
    //   href: `${ACCOUNT_BASE_URL}/${name}/notifications`,
    //   icon: <PeopleIcon />,
    // },

    // {
    //   title: "Authentication",
    //   href: `${ACCOUNT_BASE_URL}/${name}/password`,
    //   icon: <LockOpenIcon />,
    // },
    // {
    //   title: "Profile",
    //   href: `${ACCOUNT_BASE_URL}/${name}/profile`,
    //   icon: <AccountBoxIcon />,
    // },
    // {
    //   title: "View Tasks",
    //   href: `${ACCOUNT_BASE_URL}/${name}/view-tasks`,
    //   icon: <SettingsIcon />,
    // },
  ];

  return (
    <React.Fragment>
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
