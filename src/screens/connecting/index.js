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


function Connecting({shouldShowMFA, shouldShowError}) {
  const history = useHistory()
  const query = useQuery()

  useEffect(() => {
    forwardMessageToMainAppFromPopup({
      isConnectingScreen: true,
      screen: 'connectingScreen',
    })

    console.log('shouldShowMFA: ', shouldShowMFA)
    console.log('shouldShowError: ', shouldShowError)
    const invoke = async () => {
      await sleep()

      shouldShowMFA && history.push('/mfa')
      shouldShowError && history.push('/error')

      if (!shouldShowMFA && !shouldShowError) {
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