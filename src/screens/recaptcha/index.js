import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import Header from "../Header";
import Footer from "../footer";
import './recaptcha.css'
import { ContainerInput, ContainerLabel, Checkmark } from '../checkboxStyle'

const Div = styled.div`
  padding: 0;
`

function Recaptcha({url, navigateProps, shouldDisplayHeader = false, shouldDisplayIntuitFooter = false, background, fontColor }) {
  const btnRef = useRef(null)

  const [enablePrimaryButton, setEnablePrimaryButton] = useState(false)

  const handleInputChange = () => {
    setEnablePrimaryButton(prevState => !prevState)
  }

  useEffect(() => {
    if (shouldDisplayIntuitFooter) {
      forwardMessageToMainAppFromPopup({
        enablePrimaryButton,
        currentScreen: 'recaptcha',
      }, url)
    }
  }, [enablePrimaryButton, shouldDisplayIntuitFooter])

  const contentRef = useRef(null)

  useEffect(() => {
    let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight
    let clientWidth = contentRef && contentRef.current && contentRef.current.clientWidth

    const message = {
      height: `${clientHeight}px`,
      width: clientWidth > 860 ? '860px' : `${clientWidth}px`,
      currentScreen: 'recaptcha',
    }

    forwardMessageToMainAppFromPopup(message, url)
  }, [])

  const iframeData = {
    enablePrimaryButton,
  }

  const [navigate, setNavigate] = navigateProps
  const history = useHistory()
  useEffect(() => {
    setNavigate(false)
    navigate === 'forward' && history.push('/connecting')
    navigate === 'back' && history.goBack()
  }, [history, navigate, setNavigate])

  // dcdcdc
  return (
    <Div ref={contentRef}>
      <div className="iframeWrapper" style={{ position: 'relative', width: '100%', border: 'solid 1px transparent', borderRadius: '2px' }}>
        {shouldDisplayHeader && <Header />}
        <div style={{ marginBottom: shouldDisplayIntuitFooter ? '0' : '110px' }}>
          <h4>Recaptcha Screen</h4>
          <ContainerLabel theme={background}> Click to confirm you're not a robot
            <ContainerInput theme={background} type="checkbox" onChange={handleInputChange} checked={enablePrimaryButton} />
            <Checkmark className="checkmark" />
          </ContainerLabel>

        </div>
        {!shouldDisplayIntuitFooter && <Footer url={url} background={background} fontColor={fontColor} iframeData={iframeData} currentScreen="recaptcha" screenToNavigate="connecting" />}
      </div>
    </Div>
  );
}

export default Recaptcha
