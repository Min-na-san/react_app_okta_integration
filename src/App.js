import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security, SecureRoute } from "@okta/okta-react";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
// import { Redirect } from "react-router-dom/cjs/react-router-dom";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-91326861.okta.com/oauth2/default",
  clientId: "0oad3ejybtlUbYXm45d7",
  redirectUri: window.location.origin + "/login/callback",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(
        toRelativeUrl(originalUri || "/", window.location.origin)
      );
    };
  }

  render() {
    return (
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={this.restoreOriginalUri}
      >
        {/* this page will
        become secure and need to authenticate before loading it */}
        <Route path="/" exact={true} component={Home} />

        <Route path="/login/callback" component={LoginCallback} />
        <SecureRoute path="/profile" component={Profile} />
        <Route path="/staff" exact={true} component={Home} />
        {/* <Redirect from="/login/callback" to="/profile" exact={true} /> */}
      </Security>
    );
  }
}

const AppWithRouterAccess = withRouter(App);

class RouterApp extends Component {
  render() {
    return (
      <Router>
        <AppWithRouterAccess />
      </Router>
    );
  }
}

export default RouterApp;
