import React, { Fragment } from "react";
import Routes from "./routes/Routes";
import Navigation from "./pages/HomePage/Navigation";

function App() {
  return (
    <Fragment>
      <Navigation />
      <Routes />
    </Fragment>
  );
}

export default App;
