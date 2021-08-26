import React, {Component, useEffect} from 'react'
import styled from "styled-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";

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

function useQuery() {
  return new URLSearchParams(useLocation().search)
}


function Connecting() {
  const history = useHistory()
  const query = useQuery()

  useEffect(() => {
    forwardMessageToMainAppFromPopup({
      isConnectingScreen: true,
      screen: 'connectingScreen',
    })

    const invoke = async () => {
      await sleep()
      if (!query.get('mfa')) {
        history.push('/mfa')
      } else {
        forwardMessageToMainAppFromPopup({
          responseToken: '1234567890',
        })
      }
    }

    invoke()
  }, [history])
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