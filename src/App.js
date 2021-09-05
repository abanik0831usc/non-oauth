import logo from './logo.svg';
import './App.css';
import React, {useContext, useEffect, useRef, useState} from "react";
import {
  MemoryRouter as Router,
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
import ContextApp, {ContainerContext} from './Context'

function App() {
  const [navigate, setNavigate] = useState('')

  const [iframeScreenStackSize] = useContext(ContainerContext)

  const params = new URLSearchParams(document.location.search.substring(1))
  const themeInfo = params.get('theme');
  const isLaunchPoint = params.get('isAuthScreenFirstInStack') === 'true'

  const shouldDisplayIntuitFooter = typeof params.get('shouldDisplayIntuitFooter') === 'string' ? params.get('shouldDisplayIntuitFooter') === 'true' : false

  const [theme, setTheme] = useState(themeInfo)
  const [isAuthScreenFirstInStack, setIsAuthScreenFirstInStack] = useState(isLaunchPoint)


  useEffect(() => {
    receiveMessageFromMainAppToPopup(setNavigate, setTheme, setIsAuthScreenFirstInStack)
    return () => removeIframeEventListener()
  }, [isAuthScreenFirstInStack, theme, setTheme, setIsAuthScreenFirstInStack])

  const navigateProps = [navigate, setNavigate]

  const color = (themeName) => {
    switch (themeName) {
      case 'sbg2':
        return {
          background: 'rgb(44, 160, 28)',
          color: 'white',
        }
      case 'mint':
        return {
          background: '#32d9f2',
          color: 'white',
        }
      case 'ctg':
        return {
          background: '#037c8f',
          color: 'white',
        }
      case 'intuit':
        return {
          background: 'linear-gradient(to bottom, #3e6cc9 0%, #2e50b6 100%)',
          color: 'white',
        }
      case 'ck':
        return {
          background: '#008600',
          color: 'white',
        }
      default:
        return {
          background: 'linear-gradient(to bottom, #3e6cc9 0%, #2e50b6 100%)',
          color: 'white',
        }
    }
  }

  const { background, color: fontColor } = color(theme)

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
        <div style={{ width: '860px' }}>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/recaptcha">
              <Recaptcha shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} theme={theme} background={background} fontColor={fontColor} />
            </Route>
            <Route path="/mfa">
              <MFA shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} theme={theme} background={background} fontColor={fontColor} />
            </Route>
            <Route path="/connecting">
              <Connecting shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} theme={theme} handleMFAChange={handleMFAChange} handleErrorChange={handleErrorChange} shouldShowMFA={isMFAEnabled} shouldShowError={isErrorEnabled} />
            </Route>
            <Route path="/success">
              <Success shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} background={background} theme={theme} fontColor={fontColor} />
            </Route>
            <Route path="/error">
              <Error shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} isAuthScreenFirstInStack={isAuthScreenFirstInStack} theme={theme} navigateProps={navigateProps} background={background} fontColor={fontColor} />
            </Route>
            <Route path="/">
              <AuthScreen shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} isAuthScreenFirstInStack={isAuthScreenFirstInStack} theme={theme} navigateProps={navigateProps} handleMFAChange={handleMFAChange} handleErrorChange={handleErrorChange} shouldShowMFA={isMFAEnabled} shouldShowError={isErrorEnabled}  background={background} fontColor={fontColor} />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

function ContextAPIApp() {
  return (
    <ContextApp>
      <App />
    </ContextApp>
  )
}

export default ContextAPIApp;
