import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
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

function AuthScreen({navigateProps, shouldShowMFA, background, fontColor, shouldShowError, handleErrorChange, handleMFAChange, theme = "sbg2", shouldDisplayFooter = true, shouldDisplayHeader = false }) {
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

    if (shouldDisplayFooter) {
        if (username && password && !iframeData.enablePrimaryButton) {
            setIFrameData({ enablePrimaryButton: true })

        } else if ((!username || !password) && iframeData.enablePrimaryButton) {
           setIFrameData({ enablePrimaryButton: false })
        }
    } else {
        if (username && password && !btnsEnabled) {
            setBtnsEnabled(true)
            forwardMessageToMainAppFromPopup({
                enablePrimaryButton: true,
                currentScreen: 'authentication',
            })
        } else if ((!username || !password) && btnsEnabled) {
            setBtnsEnabled(false)
            forwardMessageToMainAppFromPopup({
                enablePrimaryButton: false,
                currentScreen: 'authentication',
            })
        }

    }

    useEffect(() => {
        let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight
        let clientWidth = contentRef && contentRef.current && contentRef.current.clientWidth

        let message = {}
        if (shouldDisplayFooter) {
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
            }
        }

        forwardMessageToMainAppFromPopup(message)
    }, [])

    const history = useHistory()
    useEffect(() => {
        setNavigate('')
        navigate === 'forward' && history.push('/recaptcha')
    }, [history, navigate, setNavigate])

    return (
      <Div ref={contentRef}>
          <div className="iframeWrapper" style={{ position: 'relative', width: '100%', border: 'solid 1px transparent', borderRadius: '2px', padding: '30px 30px 0' }}>
              {shouldDisplayHeader && <Header />}

              <ContainerLabel theme={background} fontSize="12px" left="5px" top="1px">Enable MFA
                  <ContainerInput theme={background} type="checkbox" onChange={handleMFAChange} checked={shouldShowMFA} />
                  <Checkmark className="checkmark" height="20px" width="20px" />
              </ContainerLabel>

              <ContainerLabel theme={background} fontSize="12px" left="5px" top="1px">Enable Error
                  <ContainerInput theme={background} type="checkbox" onChange={handleErrorChange} checked={shouldShowError} />
                  <Checkmark className="checkmark" height="20px" width="20px"/>
              </ContainerLabel>

              <div style={{ marginBottom: '110px' }}>
                   <form>
                       <label htmlFor="username">Username:</label><br />
                       <Input borderColor={background} placeholder="Enter your username" id="username" onChange={handleUsernameChange} value={username} type="text" style={{ marginBottom: '20px' }}/>
                       <br />
                       <label htmlFor="password">Password:</label><br />
                        <Input borderColor={background} placeholder="enter your password" id="password" onChange={handlePasswordChange} value={password} type="password"/>
                   </form>
              </div>
              {shouldDisplayFooter && <Footer background={background} fontColor={fontColor} iframeData={iframeData} currentScreen="authentication" screenToNavigate="recaptcha" />}
          </div>
      </Div>
    )
}

export default AuthScreen