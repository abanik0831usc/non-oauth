import React, { Component } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

class AuthScreen extends Component {
    render() {
        return (
            <Div>
                <form>
                    <h1>Login to Bank</h1>
                    <p>Enter your username:</p>
                    <input type="text" />

                    <p>Enter your password:</p>
                    <input type="password" />
                </form>

                <Link to="/recaptcha">
                    <button style={{ marginTop: '20px'}} type="button">
                        Continue
                    </button>
                </Link>
            </Div>
        );
    }
}

export default AuthScreen