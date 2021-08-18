import React, { Component } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

class MFA extends Component {
    render() {
        return (
            <Div>
                <form>
                    <h1>MFA answer</h1>
                    <p>text:</p>
                    <input type="text" />
                </form>

                <Link to="/connecting">
                    <button style={{ marginTop: '20px'}} type="button">
                        Connect
                    </button>
                </Link>
            </Div>
        );
    }
}

export default MFA