import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import InspirationBoard from "../pages/InspirationBoard/InspirationBoard";
import Catalogue from "../pages/Catalogue/Catalogue";
import Dashboard from "../pages/Dashboard/Dashboard";
import StylingBoard from "../pages/StylingBoard/StylingBoard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/inspiration-board" exact component={InspirationBoard} />
      <Route path="/catalogue" exact component={Catalogue} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/stylingboard" exact component={StylingBoard} />
      <Redirect to="/" /> {/* NOT MATCH => REDIRECT TO HOMEPAGE */}
    </Switch>
  );
};

export default Routes;
