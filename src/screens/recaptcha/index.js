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

function Recaptcha({navigateProps, shouldDisplayHeader = false, shouldDisplayFooter = true, background, fontColor }) {
  const btnRef = useRef(null)

  const [enablePrimaryButton, setEnablePrimaryButton] = useState(false)

  const handleInputChange = () => {
    setEnablePrimaryButton(prevState => !prevState)
  }

  useEffect(() => {
    if (shouldDisplayFooter) {
      forwardMessageToMainAppFromPopup({
        enablePrimaryButton,
        currentScreen: 'recaptcha',
      })
    }
  }, [enablePrimaryButton, shouldDisplayFooter])

  const contentRef = useRef(null)

  useEffect(() => {
    let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight

    const message = {
      height: `${clientHeight}px`,
      width: '352px',
      currentScreen: 'recaptcha',
    }

    forwardMessageToMainAppFromPopup(message)
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

  return (
    <Div ref={contentRef}>
      <div className="iframeWrapper" style={{ position: 'relative', width: '100%', border: 'solid 1px #dcdcdc', borderRadius: '2px', padding: '30px 30px 0' }}>
        {shouldDisplayHeader && <Header />}
        <div style={{ marginBottom: '110px' }}>
          <h4>Recaptcha Screen</h4>
          <ContainerLabel theme={background}> Click to confirm you're not a robot
            <ContainerInput theme={background} type="checkbox" onChange={handleInputChange} checked={enablePrimaryButton} />
            <Checkmark className="checkmark" />
          </ContainerLabel>

        </div>
        {shouldDisplayFooter && <Footer background={background} fontColor={fontColor} iframeData={iframeData} currentScreen="recaptcha" screenToNavigate="connecting" />}
      </div>
    </Div>
  );
}

export default Recaptcha