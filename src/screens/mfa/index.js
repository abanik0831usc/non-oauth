import React, { useEffect, useRef } from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

function MFA({navigateProps}) {
  const [navigate, setNavigate] = navigateProps
  const history = useHistory()

  const handleClick = () => {
    history.push('/connecting')
  }

  const btnRef = useRef(null)

  useEffect(() => {
    setNavigate(false)
    navigate && btnRef.current.click()
  }, [navigate, setNavigate])

  return (
    <Div>
      <form>
        <h1>MFA answer</h1>
        <p>text:</p>
        <input type="text" />
      </form>

      <button ref={btnRef} style={{ marginTop: '20px'}} type="button" onClick={handleClick}>
        Connect
      </button>
    </Div>
  );
}

export default MFA