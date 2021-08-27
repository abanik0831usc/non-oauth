import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from "react";
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
import Error from "./screens/error";
import {
  receiveMessageFromMainAppToPopup,
  removeIframeEventListener
} from "./utils/iframe";

function App() {
  const [navigate, setNavigate] = useState('')
  const [theme, setTheme] = useState('')

  useEffect(() => {
    receiveMessageFromMainAppToPopup(setNavigate, setTheme)
    return () => removeIframeEventListener()
  }, [])

  const navigateProps = [navigate, setNavigate]

  const color = (type) => {
    switch (type) {
      case 'sbg2':
        return 'rgb(44, 160, 28)'
      case 'mint':
        return '#32d9f2'
      case 'ctg':
        return '#037c8f'
      case 'intuit':
        return 'linear-gradient(to bottom, #3e6cc9 0%, #2e50b6 100%)'
      case 'ck':
        return '#008600'
      default:
        return 'teal'
    }
  }

  const contentRef = useRef(null)

  const [isErrorEnabled, setIsErrorEnabled] = useState(false)
  const [isMFAEnabled, setIsMFAEnabled] = useState(false)

  const handleErrorChange = () => {
    setIsErrorEnabled(prevState => !prevState)
  }

  const handleMFAChange = () => {
    setIsMFAEnabled(prevState => !prevState)
  }

  return (
      <Router>
        <div style={{ background: color(theme) }}>

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
              <Connecting navigateProps={navigateProps} handleMFAChange={handleMFAChange} handleErrorChange={handleErrorChange} shouldShowMFA={isMFAEnabled} shouldShowError={isErrorEnabled} />
            </Route>
            <Route path="/success">
              <Success navigateProps={navigateProps} />
            </Route>
            <Route path="/error">
              <Error navigateProps={navigateProps} />
            </Route>
            <Route path="/">
              <AuthScreen navigateProps={navigateProps} handleMFAChange={handleMFAChange} handleErrorChange={handleErrorChange} shouldShowMFA={isMFAEnabled} shouldShowError={isErrorEnabled} />
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
