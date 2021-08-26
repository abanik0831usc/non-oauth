import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";

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
    console.log('whats navigate: ', navigate)
    navigate && btnRef.current.click()
  }, [navigate, setNavigate])

  const [isPassed, setIsPassed] = useState()

  const handleInputChange = () => {
    setIsPassed(prevState => !prevState)
  }

  forwardMessageToMainAppFromPopup({
    enablePrimaryButton: isPassed,
    screen: 'recaptchaScreen',
  })

  return (
    <Div>
      <label><p>Recaptcha Screen</p></label>
      <label>
        click recaptcha
        <input
          name="recaptcha"
          type="checkbox"
          checked={isPassed}
          onChange={handleInputChange} />
      </label>
      <button ref={btnRef} style={{ marginTop: '20px'}} type="button" onClick={handleClick}>
        Continue
      </button>
    </Div>
  );
}

export default Recaptcha