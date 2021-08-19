import React, { useState } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";

const Div = styled.div`
  padding: 20px;
`

function AuthScreen() {

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

    return (
        <Div>
            <form>
                <h1>Login to Bank</h1>
                <p>Enter your username:</p>
                <input onChange={handleUsernameChange} value={username} type="text" />

                <p>Enter your password:</p>
                <input onChange={handlePasswordChange} value={password} type="password" />
            </form>

            <Link to="/recaptcha">
                <button style={{ marginTop: '20px'}} type="button">
                    Continue
                </button>
            </Link>
        </Div>
    );
}

export default AuthScreen