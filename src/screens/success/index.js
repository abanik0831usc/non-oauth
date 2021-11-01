import React, { Component } from 'react'
import styled from "styled-components";

const Div = styled.div`
  padding: 0;
`

class Success extends Component {
    render() {
        return (
            <Div>
                <label style={{ display: "flex", justifyContent: 'center'}}>successfully connected to bank & data sent to IDX</label>
            </Div>
        );
    }
}

export default Success
