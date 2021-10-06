import logo from './logo.svg';
import './App.css';
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
  MemoryRouter as Router,
  BrowserRouter,
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
import {useUriInfo} from "./utils/singleton";

function App() {
  const [navigate, setNavigate] = useState('')

  const [iframeScreenStackSize] = useContext(ContainerContext)
  const [theme, setTheme] = useState('')
  const [isAggregatorScreenFirstInWidgets, setIsAggregatorScreenFirstInWidgets] = useState(null)
  const [shouldDisplayIntuitFooter, setShouldDisplayIntuitFooter] = useState(null)
  const [originUrl, setOriginUrl] = useState(null)

  const { themeInfo, isLaunchPoint, url, displayFooter } = useUriInfo()

  useLayoutEffect(() => {
    setTheme(themeInfo)
    setIsAggregatorScreenFirstInWidgets(isLaunchPoint)
    setOriginUrl(url)
    setShouldDisplayIntuitFooter(displayFooter)
  }, [displayFooter, isLaunchPoint, themeInfo, url])

  useEffect(() => {
    receiveMessageFromMainAppToPopup(setNavigate, setTheme, setIsAggregatorScreenFirstInWidgets)
    return () => removeIframeEventListener()
  }, [isAggregatorScreenFirstInWidgets, theme, setTheme, setIsAggregatorScreenFirstInWidgets])

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
      <BrowserRouter>
        <div style={{ width: '100%' }}>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/recaptcha">
              <Recaptcha shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} theme={theme} background={background} fontColor={fontColor} url={originUrl} />
            </Route>
            <Route path="/mfa">
              <MFA shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} theme={theme} background={background} fontColor={fontColor} url={originUrl} />
            </Route>
            <Route path="/connecting">
              <Connecting shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} theme={theme} handleMFAChange={handleMFAChange} handleErrorChange={handleErrorChange} shouldShowMFA={isMFAEnabled} shouldShowError={isErrorEnabled} url={originUrl} />
            </Route>
            <Route path="/success">
              <Success shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} navigateProps={navigateProps} background={background} theme={theme} fontColor={fontColor} url={originUrl} />
            </Route>
            <Route path="/error">
              <Error shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} navigateProps={navigateProps} background={background} fontColor={fontColor}url={originUrl} />
            </Route>
            <Route path="/">
              <AuthScreen shouldDisplayIntuitFooter={shouldDisplayIntuitFooter} iframeScreenStackSize={iframeScreenStackSize} isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} theme={theme} navigateProps={navigateProps} handleMFAChange={handleMFAChange} handleErrorChange={handleErrorChange} shouldShowMFA={isMFAEnabled} shouldShowError={isErrorEnabled} url={originUrl} background={background} fontColor={fontColor} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
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
