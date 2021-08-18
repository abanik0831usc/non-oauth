import React, { Component } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

class Connecting extends Component {
    render() {
        return (
            <Div>
                <label><p>Connecting...</p></label>

                <Link to="/success">
                    <button style={{ marginTop: '20px'}} type="button">
                        Continue
                    </button>
                </Link>
            </Div>
        );
    }
}

export default Connecting