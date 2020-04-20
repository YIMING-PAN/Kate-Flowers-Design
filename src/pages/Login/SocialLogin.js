import React from "react";
import { Link } from "react-router-dom";

export default function SocialLogin() {
  return (
    <div className="login-third-party-login">
      <p className="login-button-info-text login-info-text">
        - OR EASILY USING -
      </p>
      <div className="social-login-button">
        <Link className="social-button" id="facebook-connect">
          {" "}
          <span>Facebook</span>
        </Link>
        <Link className="social-button" id="google-connect">
          {" "}
          <span>Google</span>
        </Link>
        <Link className="social-button" id="twitter-connect">
          {" "}
          <span>Twitter</span>
        </Link>
      </div>
    </div>
  );
}
