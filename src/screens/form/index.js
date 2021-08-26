import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import { useHistory } from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

function AuthScreen({navigateProps}) {

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
            screen: 'authScreen',
        })
    } else if ((!username || !password) && btnsEnabled) {
        setBtnsEnabled(false)
        forwardMessageToMainAppFromPopup({
            enablePrimaryButton: false,
            screen: 'authScreen',
        })
    }

    const history = useHistory()

    const handleClick = () => {
        history.push('/recaptcha')
    }

    const btnRef = useRef(null)

    useEffect(() => {
        setNavigate(false)
        navigate && btnRef.current.click()
    }, [navigate, setNavigate])

    return (
        <Div>
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