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
		history.push('/connecting')
	}

	const btnRef = useRef(null)

	useEffect(() => {
		setNavigate(false)
		navigate === 'forward' && btnRef.current.click()
		navigate === 'back' && history.goBack()
	}, [navigate, setNavigate])

	const [isPassed, setIsPassed] = useState()

	const handleInputChange = () => {
		setIsPassed(prevState => !prevState)
	}

	useEffect(() => {
		forwardMessageToMainAppFromPopup({
			enablePrimaryButton: true,
			screen: 'error',
		})
	}, [isPassed])

	return (
		<Div>
			<label><p>Error Screen</p></label>
			<p>
				something went wrong :(
			</p>
			<button ref={btnRef} style={{ marginTop: '20px'}} type="button" onClick={handleClick}>
				Continue
			</button>
		</Div>
	);
}

export default Recaptcha