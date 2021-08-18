import React, { Component } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

class Recaptcha extends Component {
    render() {
        return (
            <Div>
                <label><p>Recaptcha Screen</p></label>

                <Link to="/mfa">
                    <button style={{ marginTop: '20px'}} type="button">
                        Continue
                    </button>
                </Link>
            </Div>
        );
    }
}

export default Recaptcha