import React, { Fragment, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormDialog from "../HomePage/Dialogs";
import Script from "react-load-script";

import "./stylingboard.scss";

class StylingBoard extends React.Component {
  componentDidMount() {
    this.renderUsername();
  }

  componentDidUpdate(_, prevState) {
    const scriptLoaded = this.state;

    if (scriptLoaded !== prevState) {
      this.renderUsername();
    }
  }

  renderUsername = () => {
    const initialUser = window.localStorage.getItem("user") || "";
    const scriptLoaded = this.state;

    if (initialUser.length > 0 && scriptLoaded) {
      return (
        <Fragment>
          <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
          <a
            data-pin-do="embedUser"
            data-pin-board-width="800"
            data-pin-scale-height="700"
            data-pin-scale-width="800"
            href={`https://www.pinterest.com/${initialUser || ""}/ `}
          ></a>
        </Fragment>
      );
    }

    return <FormDialog />;
  };

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  render() {
    const scriptLoaded = this.state;
    return (
      <Fragment>
        <div className="pin-board">
          <Script
            url="https://assets.pinterest.com/js/pinit.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
          {scriptLoaded ? this.renderUsername() : <CircularProgress />}
        </div>

        <div id="post-wrapper" class="normal" data-sticky-header="1">
          <div class="container">
            <div class="post-container">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StylingBoard;
