import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import { useHistory } from "react-router-dom";
import Footer from "../footer";
import Header from "../Header";
import { ContainerInput, ContainerLabel, Checkmark } from '../checkboxStyle'

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
        //box-shadow: 0 0 10px #719ECE;
    }
`

function AuthScreen({url, iframeScreenStackSize, navigateProps, isAggregatorScreenFirstInWidgets, shouldShowMFA, background, fontColor, shouldShowError, handleErrorChange, handleMFAChange, theme, shouldDisplayIntuitFooter = false, shouldDisplayHeader = false, shouldEnableResponse =false, handleResponseChange, handleCancelButton, shouldShowCancelButton = false }) {
    const [navigate, setNavigate] = navigateProps
    const [btnsEnabled, setBtnsEnabled] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const contentRef = useRef(null)
    const [iframeData, setIFrameData] = useState({ enablePrimaryButton: false })

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    if (shouldDisplayIntuitFooter) {
        if (username && password && !btnsEnabled) {
            setBtnsEnabled(true)
            forwardMessageToMainAppFromPopup({
                enablePrimaryButton: true,
                currentScreen: 'authentication',
            }, url)
        } else if ((!username || !password) && btnsEnabled) {
            setBtnsEnabled(false)
            forwardMessageToMainAppFromPopup({
                enablePrimaryButton: false,
                currentScreen: 'authentication',
            }, url)
        }
    } else {
        if (username && password && !iframeData.enablePrimaryButton) {
            setIFrameData({enablePrimaryButton: true})

        } else if ((!username || !password) && iframeData.enablePrimaryButton) {
            setIFrameData({enablePrimaryButton: false})
        }
    }

    const history = useHistory()
    useEffect(() => {
        setNavigate('')
        navigate === 'forward' && history.push('/recaptcha')
    }, [history, navigate, setNavigate])

    const submit = (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        setTimeout(() => {
            const clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight
            const clientWidth = contentRef && contentRef.current && contentRef.current.clientWidth

            let message = {}
            if (shouldDisplayIntuitFooter) {
                message = {
                    height: `${clientHeight}px`,
                    width: clientWidth > 860 ? '860px' : `${clientWidth}px`,
                    currentScreen: 'authentication',
                }
            } else {
                message = {
                    height: `${clientHeight}px`,
                    width: clientWidth > 860 ? '860px' : `${clientWidth}px`,
                    currentScreen: 'authentication',
                    iframeScreenStackSize,
                }
            }

            forwardMessageToMainAppFromPopup(message, url)
        }, 100)
    }, [iframeScreenStackSize, shouldDisplayIntuitFooter, url])

    return (
      <div ref={contentRef}>
          <Div>
              <div className="iframeWrapper" style={{ position: 'relative', width: '100%', border: 'solid 1px transparent', borderRadius: '2px' }}>
                  {shouldDisplayHeader && <Header />}

                  <ContainerLabel theme={background} fontSize="12px" left="5px" top="1px">Enable MFA
                      <ContainerInput theme={background} type="checkbox" onChange={handleMFAChange} checked={shouldShowMFA} />
                      <Checkmark className="checkmark" height="20px" width="20px" />
                  </ContainerLabel>

                  <ContainerLabel theme={background} fontSize="12px" left="5px" top="1px">Enable Error
                      <ContainerInput theme={background} type="checkbox" onChange={handleErrorChange} checked={shouldShowError} />
                      <Checkmark className="checkmark" height="20px" width="20px"/>
                  </ContainerLabel>

                  <ContainerLabel theme={background} fontSize="12px" left="5px" top="1px">Enable String response
                      <ContainerInput theme={background} type="checkbox" onChange={handleResponseChange} checked={shouldEnableResponse} />
                      <Checkmark className="checkmark" height="20px" width="20px" />
                  </ContainerLabel>

                  <ContainerLabel theme={background} fontSize="12px" left="5px" top="1px">Show cancel button
                      <ContainerInput theme={background} type="checkbox" onChange={handleCancelButton} checked={shouldShowCancelButton} />
                      <Checkmark className="checkmark" height="20px" width="20px" />
                  </ContainerLabel>

                  <div style={{ marginBottom: shouldDisplayIntuitFooter ? '0' : '110px' }}>
                      <form onSubmit={submit}>
                          <label htmlFor="username">Username:</label><br />
                          <Input borderColor={background} placeholder="Enter your username" id="username" onChange={handleUsernameChange} value={username} type="text" style={{ marginBottom: '20px' }}/>
                          <br />
                          <label htmlFor="password">Password:</label><br />
                          <Input borderColor={background} placeholder="enter your password" id="password" onChange={handlePasswordChange} value={password} type="password"/>
                      </form>
                  </div>
                  {!shouldDisplayIntuitFooter && <Footer url={url} isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} background={background} fontColor={fontColor} iframeData={iframeData} currentScreen="authentication" screenToNavigate="recaptcha" shouldShowCancelButton={shouldShowCancelButton}/>}
              </div>
          </Div>
      </div>
    )
}

export default AuthScreen
