import React, {Component, useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import './loader.css'
const Div = styled.div`
  padding: 0;
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


function Connecting({shouldShowMFA, shouldShowError, handleErrorChange, handleMFAChange, shouldDisplayHeader = false, shouldDisplayIntuitFooter = false, background, fontColor }) {
  const history = useHistory()
  const query = useQuery()

  const [isFetching, setIsFetching] = useState(true)
  useEffect(() => {
    let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight
    let clientWidth = contentRef && contentRef.current && contentRef.current.clientWidth

    const invoke = async () => {
      forwardMessageToMainAppFromPopup({
        height: `${clientHeight}px`,
        width: clientWidth > 860 ? '860px' : `${clientWidth}px`,
        isConnectingScreen: true,
        currentScreen: 'connecting',
      })

      await sleep()

      setIsFetching(false)
      if (shouldShowMFA) {
        handleMFAChange()
        return history.push('/mfa')
      }

      if (shouldShowError) {
        handleErrorChange()
        return history.push('/error')
      }

      if (!shouldShowMFA && !shouldShowError) {
        forwardMessageToMainAppFromPopup({
          responseToken: "awb.eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..THBnfZ4z1r8UZlAV1099YA.bOAFIloOovCmJRLaTz5kZNT73ORVznU7UrZsLx-YEdC9MVtI6x3IhX5lvBEArk4GaNR3xY-uxg8avuBdZ0FIc5cloXLhypkoWcKCFyTy91HD3AsauauDvwZ3yaDxy9DZ9hLlQ10ZM-iark8NdaM4yZfDltOoqtMF48uELfx1Aqq-CbmmyG0w79uHFetzQSczB5luUYpxGTPygDxmszS5fuqu7iH6RfnZvvKewXX6ZZs8-OLvG-g4FRKYJuZUOMta5VViPO4ByXfuFal3OKWcszs9ucgBuSgypbOL7r_RsnBC2zq673uchqw7QV_YKJdHSTN0_NCKqD2wQ57EKZZ1AW9bhdwzWullD1YA1f7vX_VJYW-JFJOhz8nBpjcoVPVNCaebQz9aT5KnQwf2vlcZf9IVVVUXFslTNepg9uZgyrhO1BKEswYg1rYruZqZUmPFHfRLH1_dtJujKaTLfmC102P8v2ENNBrnfYnySAyqcpc.lIUnhkU0qwNm1HUllFUlWw",
          currentScreen: 'connecting',
        })
      }
    }

    invoke()
  }, [])

  const contentRef = useRef(null)

  return (
    <Div ref={contentRef}>
      <div className="iframeWrapper" style={{ position: 'relative', width: '100%', border: 'solid 1px transparent', borderRadius: '2px' }}>
        <div style={{ marginBottom: '110px' }}>
          <h4>Connecting Screen</h4>
          {isFetching ? <>
            <div className="spinner">
              <div className="dot1" />
              <div className="dot2"/>
            </div>
            <label style={{ display: "flex", justifyContent: 'center'}}>Connecting to bank...</label>
          </> :
            <label style={{ display: "flex", justifyContent: 'center'}}>successfully connected to bank & data sent to IDX</label>
          }
        </div>
      </div>
    </Div>
  )
}

export default Connecting
