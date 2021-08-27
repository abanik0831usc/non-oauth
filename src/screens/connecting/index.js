import React, {Component, useEffect, useRef} from 'react'
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


function Connecting({shouldShowMFA, shouldShowError, handleErrorChange, handleMFAChange}) {
  const history = useHistory()
  const query = useQuery()

  useEffect(() => {
    let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight
    forwardMessageToMainAppFromPopup({
      height: `${clientHeight}px`,
      width: '352px',
      isConnectingScreen: true,
      screen: 'connecting',
    })

    const invoke = async () => {
      await sleep()

      if (shouldShowMFA) {
        handleMFAChange()
        history.push('/mfa')
      }

      if (shouldShowError) {
        handleErrorChange()
        history.push('/error')
      }

      if (!shouldShowMFA && !shouldShowError) {
        forwardMessageToMainAppFromPopup({
          responseToken: "awb.eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..THBnfZ4z1r8UZlAV1099YA.bOAFIloOovCmJRLaTz5kZNT73ORVznU7UrZsLx-YEdC9MVtI6x3IhX5lvBEArk4GaNR3xY-uxg8avuBdZ0FIc5cloXLhypkoWcKCFyTy91HD3AsauauDvwZ3yaDxy9DZ9hLlQ10ZM-iark8NdaM4yZfDltOoqtMF48uELfx1Aqq-CbmmyG0w79uHFetzQSczB5luUYpxGTPygDxmszS5fuqu7iH6RfnZvvKewXX6ZZs8-OLvG-g4FRKYJuZUOMta5VViPO4ByXfuFal3OKWcszs9ucgBuSgypbOL7r_RsnBC2zq673uchqw7QV_YKJdHSTN0_NCKqD2wQ57EKZZ1AW9bhdwzWullD1YA1f7vX_VJYW-JFJOhz8nBpjcoVPVNCaebQz9aT5KnQwf2vlcZf9IVVVUXFslTNepg9uZgyrhO1BKEswYg1rYruZqZUmPFHfRLH1_dtJujKaTLfmC102P8v2ENNBrnfYnySAyqcpc.lIUnhkU0qwNm1HUllFUlWw",
          screen: 'connecting',
        })
      }
    }

    invoke()
  }, [history])

  const contentRef = useRef(null)

  return (
    <Div ref={contentRef}>
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