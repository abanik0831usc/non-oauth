import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import Header from "../Header";
import Footer from "../footer";

const Div = styled.div`
  padding: 0;
`
const Input = styled.input`
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    
    &:focus {
        outline: none !important;
        border: ${({borderColor}) => `2px solid ${borderColor}`};
    }
`

function MFA({navigateProps, url, background, fontColor, shouldDisplayIntuitFooter = false, shouldDisplayHeader = false}) {
  const [iframeData, setIFrameData] = useState({ enablePrimaryButton: false, primaryButtonLabel: 'Connect' })

  useEffect(() => {
    if (shouldDisplayIntuitFooter) {
      forwardMessageToMainAppFromPopup({
        isConnectingScreen: false,
        currentScreen: 'mfa',
      }, url)
    }
  }, [])

  const [mfa, setMfa] = useState('')

  const handlemfachange = (e) => {
    setMfa(e.target.value)
  }

  const [btnsEnabled, setBtnsEnabled] = useState(false)

  if (shouldDisplayIntuitFooter) {
    if (mfa && !btnsEnabled) {
      setBtnsEnabled(true)
      forwardMessageToMainAppFromPopup({
        enablePrimaryButton: true,
        currentScreen: 'mfa',
      }, url)
    } else if (!mfa && btnsEnabled) {
      setBtnsEnabled(false)
      forwardMessageToMainAppFromPopup({
        enablePrimaryButton: false,
        currentScreen: 'mfa',
      }, url)
    }
  } else {
    if (mfa && !iframeData.enablePrimaryButton) {
      setIFrameData({ enablePrimaryButton: true })

    } else if (!mfa&& iframeData.enablePrimaryButton) {
      setIFrameData({ enablePrimaryButton: false })
    }
  }

  const contentRef = useRef(null)

  useEffect(() => {
    let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight
    let clientWidth = contentRef && contentRef.current && contentRef.current.clientWidth

    const message = {
      height: `${clientHeight}px`,
      width: clientWidth > 860 ? '860px' : `${clientWidth}px`,
      error: {
        code: '185',
        description: 'additional authentication details required',
        otherDetails: 'share all other error reasons',
      },
      primaryButtonLabel: 'Connect',
      currentScreen: 'mfa',
    }

    forwardMessageToMainAppFromPopup(message, url)
  }, [url])

  const [navigate, setNavigate] = navigateProps
  const history = useHistory()

  useEffect(() => {
    setNavigate(false)
    navigate === 'forward' && history.push({
      state: { mfa: true },
      pathname: '/connecting',
    })
    navigate === 'back' && history.push('/')
  }, [navigate, setNavigate])

  const submit = (event) => {
    event.preventDefault()
  }

  return (
    <Div ref={contentRef}>
      <div className="iframeWrapper" style={{ position: 'relative', width: '100%', border: 'solid 1px transparent', borderRadius: '2px' }}>
        {shouldDisplayHeader && <Header />}
        <div style={{ marginBottom: shouldDisplayIntuitFooter ? '0' : '110px' }}>
          <form onSubmit={submit}>
            <label htmlFor="mfa">MFA answer:</label><br />
            <Input borderColor={background} placeholder="Enter your username" id="mfa" onChange={handlemfachange} value={mfa} type="text" />
          </form>
        </div>
        {!shouldDisplayIntuitFooter && <Footer url={url} background={background} fontColor={fontColor} iframeData={iframeData} currentScreen="mfa" screenToNavigate="connecting" />}
      </div>
    </Div>
  )
}

export default MFA
