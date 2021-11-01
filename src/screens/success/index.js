import React, { Component } from 'react'
import styled from "styled-components";

const Div = styled.div`
  padding: 0;
  height: 360px;
`

class Success extends Component {
    render() {
        return (
            <Div>
                <label style={{ display: "flex", height: '100%', justifyContent: 'center', alignItems: 'center' }}>successfully connected to bank & data sent to IDX</label>
            </Div>
        );
    }
}

export default Success
