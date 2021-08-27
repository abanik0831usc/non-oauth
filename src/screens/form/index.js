import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import { useHistory } from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

function AuthScreen({navigateProps, shouldShowMFA, shouldShowError, handleErrorChange, handleMFAChange}) {

    const [navigate, setNavigate] = navigateProps
    const [btnsEnabled, setBtnsEnabled] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    if (username && password && !btnsEnabled) {
        setBtnsEnabled(true)
        forwardMessageToMainAppFromPopup({
            enablePrimaryButton: true,
            screen: 'auth',
        })
    } else if ((!username || !password) && btnsEnabled) {
        setBtnsEnabled(false)
        forwardMessageToMainAppFromPopup({
            enablePrimaryButton: false,
            screen: 'auth',
        })
    }

    const history = useHistory()

    const handleClick = () => {
        history.push('/recaptcha')
    }

    const btnRef = useRef(null)

    useEffect(() => {
        setNavigate('')
        navigate === 'forward' && btnRef.current.click()
    }, [navigate, setNavigate])

    const contentRef = useRef(null)

    useEffect(() => {
        let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight

        console.log('contentRef.current.clientHeight: ', contentRef.current.clientHeight)
        const message = {
            height: clientHeight > 352 ? '352px' : `${clientHeight}px`,
            width: '352px',
            screen: 'auth',
        }

        forwardMessageToMainAppFromPopup(message)
    }, [])

    return (
        <Div ref={contentRef}>
            <label>Enable MFA:</label>
            <input
              name="recaptcha"
              type="checkbox"
              checked={shouldShowMFA}
              onChange={handleMFAChange} />
            <br/>

            <label>Enable Error:</label>
            <input
              name="recaptcha"
              type="checkbox"
              checked={shouldShowError}
              onChange={handleErrorChange} />
            <form>
                <h1>Login to Bank</h1>
                <p>Enter your username:</p>
                <input onChange={handleUsernameChange} value={username} type="text" />

                <p>Enter your password:</p>
                <input onChange={handlePasswordChange} value={password} type="password" />
            </form>

            <button ref={btnRef} style={{ marginTop: '20px'}} type="button" onClick={handleClick}>
                Continue
            </button>
        </Div>
    );
}

export default AuthScreen