import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";

const Div = styled.div`
  padding: 20px;
`

function MFA({navigateProps}) {
  const [navigate, setNavigate] = navigateProps
  const history = useHistory()

  const handleClick = () => {
    history.push('/connecting?mfa=true')
  }

  const btnRef = useRef(null)

  useEffect(() => {
    forwardMessageToMainAppFromPopup({
      isConnectingScreen: false,
      screen: 'mfa',
    })

    setNavigate(false)
    navigate === 'forward' && btnRef.current.click()
    navigate === 'back' && history.push('/')
  }, [navigate, setNavigate])

  const [mfa, setMfa] = useState('')

  const handlemfachange = (e) => {
    setMfa(e.target.value)
  }

  const [btnsEnabled, setBtnsEnabled] = useState(false)

  if (mfa && !btnsEnabled) {
    setBtnsEnabled(true)
    forwardMessageToMainAppFromPopup({
      enablePrimaryButton: true,
      screen: 'mfa',
    })
  } else if (!mfa && btnsEnabled) {
    setBtnsEnabled(false)
    forwardMessageToMainAppFromPopup({
      enablePrimaryButton: false,
      screen: 'mfa',
    })
  }

  const contentRef = useRef(null)

  useEffect(() => {
    let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight

    const message = {
      height: `${clientHeight}px`,
      width: '352px',
    }

    forwardMessageToMainAppFromPopup(message)
  }, [])

  return (
    <Div ref={contentRef}>
      <form>
        <h1>MFA answer</h1>
        <p>text:</p>
        <input type="text" onChange={handlemfachange} value={mfa} />
      </form>

      <button ref={btnRef} style={{ marginTop: '20px'}} type="button" onClick={handleClick}>
        Connect
      </button>
    </Div>
  );
}

export default MFA