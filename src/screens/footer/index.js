import React, {useContext, useState} from "react";
import {Button} from "../../components/Button";
import { useHistory } from "react-router-dom";
import { ContainerContext } from "../../Context";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";

export default function Footer({ background, fontColor, currentScreen, screenToNavigate, iframeData, isAuthScreenFirstInStack }) {
	const history = useHistory()

	const [iframeScreenStackSize, setIframeScreenStackSize] = useContext(ContainerContext)

	const shouldShowBackBtn = !(isAuthScreenFirstInStack && (currentScreen === 'authentication' || currentScreen === 'error'))

	console.log('mh:: ', isAuthScreenFirstInStack)
	console.log('mh:: ', shouldShowBackBtn)
	const handleBackClick = () => {
		const idxMessage = {
			currentScreen,
		}

		setIframeScreenStackSize(iframeScreenStackSize - 1)

		forwardMessageToMainAppFromPopup(idxMessage)

		if (currentScreen === 'mfa') {
			return history.push('/')
		}

		if (currentScreen !== 'error' || currentScreen === 'authentication') {
			history.goBack()
		}
	}

	const handleContinueClick = () => {
		const idxMessage = {
			screenToNavigate,
			currentScreen,
		}

		if (screenToNavigate === 'connecting') {
			setIframeScreenStackSize(1)
		} else {
			setIframeScreenStackSize(iframeScreenStackSize + 1)
		}

		forwardMessageToMainAppFromPopup(idxMessage)

		// console.log('data from Intuit to aggregator on primary(continue) button click: ', idxMessage)
		// postIframeMessageToAggregator(idxMessage)
		if (screenToNavigate) {
			history.push(`/${screenToNavigate}`)
		}
	}

	return (
		<div>
			<div style={{
				flex: '1 1 auto',
				marginTop: 0,
				borderTop: '1px #dcdcdc solid',
				paddingTop: '20px',
				width: '94%',
				position: 'absolute',
				bottom: '0',
				left: '50%',
				transform: 'translate(-50%, -50%)'
			}}>
				<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
					{/*{(iframeScreenStackSize !== 0 || currentScreen === 'error') && shouldShowBackBtn && <Button label={'Back'} backgroundColor={background} color={fontColor} onClick={handleBackClick} />}*/}
					{shouldShowBackBtn && <Button label={'Back'} backgroundColor={background} color={fontColor} onClick={handleBackClick} />}
					<Button label={iframeData.primaryButtonLabel || 'Continue'} backgroundColor={background} color={fontColor} primary={true} onClick={handleContinueClick} disabled={!iframeData.enablePrimaryButton} />
				</div>
			</div>
		</div>
	)
}