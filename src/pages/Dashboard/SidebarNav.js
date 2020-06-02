import React, { forwardRef, useEffect, useState, Fragment } from "react";
import { NavLink as RouterLink, withRouter } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  removeToken,
  removeUserId,
  removeRoleId,
  isLoggedIn,
} from "../../utils/auth";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: "gray",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
  },
  active: {
    color: "primary",
    "& $icon": {
      color: "primary",
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;
  const classes = useStyles();

  const logout = () => {
    removeToken();
    removeUserId();
    removeRoleId();
    props.history.push("/");
    localStorage.clear();
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <Fragment>
          <ListItem className={classes.item} disableGutters key={page.title}>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
          <ListItem className={classes.item} disableGutters>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              onClick={() => logout()}
            >
              <div className={classes.icon}>
                <ExitToAppIcon />
              </div>
              Logout
            </Button>
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default withRouter(SidebarNav);
