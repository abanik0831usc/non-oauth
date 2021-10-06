import React, { Component } from 'react'
import styled from "styled-components";

const Div = styled.div`
  padding: 0;
`

class Success extends Component {
    render() {
        return (
            <Div>
                <label><p>Successfully connected</p></label>
            </Div>
        );
    }
}

export default Success
