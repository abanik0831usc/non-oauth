import React, { useEffect, useRef } from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";

const Div = styled.div`
  padding: 20px;
`

function Recaptcha({navigateProps}) {
  const [navigate, setNavigate] = navigateProps
  const history = useHistory()

  const handleClick = () => {
    history.push('/mfa')
  }

  const btnRef = useRef(null)

  useEffect(() => {
    setNavigate(false)
    navigate && btnRef.current.click()
  }, [navigate, setNavigate])

  return (
    <Div>
      <label><p>Recaptcha Screen</p></label>

      <button style={{ marginTop: '20px'}} type="button" onClick={handleClick}>
        Continue
      </button>
    </Div>
  );
}

export default Recaptcha