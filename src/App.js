import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthScreen from "./screens/form";
import Recaptcha from "./screens/recaptcha";
import MFA from "./screens/mfa";
import Connecting from "./screens/connecting";
import Success from "./screens/success";
import {receiveMessageFromMainAppToPopup, removeIframeEventListener} from "./utils/iframe";

function App() {
  const [navigate, setNavigate] = useState(false)

  useEffect(() => {
    receiveMessageFromMainAppToPopup(setNavigate)
    return () => removeIframeEventListener()
  }, [])

  const navigateProps = [navigate, setNavigate]

  return (
      <Router>
        <div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/recaptcha">
              <Recaptcha navigateProps={navigateProps} />
            </Route>
            <Route path="/mfa">
              <MFA navigateProps={navigateProps} />
            </Route>
            <Route path="/connecting">
              <Connecting navigateProps={navigateProps} />
            </Route>
            <Route path="/success">
              <Success navigateProps={navigateProps} />
            </Route>
            <Route path="/">
              <AuthScreen navigateProps={navigateProps} />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

function About() {
  return <div>hello about</div>
}

export default App;
