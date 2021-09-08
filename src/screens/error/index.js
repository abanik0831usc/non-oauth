import React, {useContext, useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";
import Header from "../Header";
import Footer from "../footer";
import {ContainerContext} from "../../Context";

const Div = styled.div`
  padding: 0;
`

function Recaptcha({iframeScreenStackSize, navigateProps, shouldDisplayIntuitFooter = false, shouldDisplayHeader = false, background, fontColor, isAggregatorScreenFirstInWidgets }) {
	const [navigate, setNavigate] = navigateProps
	const history = useHistory()

	const [iframeData, setIframeData] = useState({ enablePrimaryButton: true, primaryButtonLabel: 'Escape' })
	const [, setIframeScreenStackSize] = useContext(ContainerContext)
	const handleClick = () => {
		history.push('/connecting')
	}

	const contentRef = useRef(null)

	useEffect(() => {
		setIframeScreenStackSize(0)
		let clientHeight = contentRef && contentRef.current && contentRef.current.clientHeight
		let clientWidth = contentRef && contentRef.current && contentRef.current.clientWidth

		const message = {
			height: `${clientHeight}px`,
			width: clientWidth > 860 ? '860px' : `${clientWidth}px`,
			currentScreen: 'error',
			enablePrimaryButton: true,
			code: '103',
			description: 'invalid password',
			otherDetails: 'share all other error reasons',
			primaryButtonLabel: 'More Info',
			errorRemediable: false,
			iframeScreenStackSize: 0,
		}
		forwardMessageToMainAppFromPopup(message)
	}, [])

	return (
		<Div ref={contentRef}>
			<div className="iframeWrapper" style={{ position: 'relative', width: '100%', border: 'solid 1px transparent', borderRadius: '2px' }}>
				{shouldDisplayHeader && <Header />}
				<div style={{ marginBottom: '110px' }}>
					<h4>Error Screen</h4>

					<label>something went wrong!</label>

				</div>
				{!shouldDisplayIntuitFooter && <Footer background={background} fontColor={fontColor} iframeData={iframeData} currentScreen="error" isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} />}
			</div>
		</Div>
	)
}

export default Recaptcha
