import React, {Component, useEffect} from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

const sleep = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}

function Connecting() {
  const history = useHistory()

  useEffect(() => {
    const invoke = async () => {
      await sleep()

      history.push('/success')
    }

    await invoke()
  }, [])
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

export default Connecting