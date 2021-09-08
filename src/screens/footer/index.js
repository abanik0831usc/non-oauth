import React, {useContext, useState} from "react";
import {Button} from "../../components/Button";
import { useHistory } from "react-router-dom";
import { ContainerContext } from "../../Context";
import {forwardMessageToMainAppFromPopup} from "../../utils/iframe";

export default function Footer({ background, fontColor, currentScreen, screenToNavigate, iframeData, isAggregatorScreenFirstInWidgets }) {
	const history = useHistory()

	const [iframeScreenStackSize, setIframeScreenStackSize] = useContext(ContainerContext)

	const shouldShowBackBtn = !(isAggregatorScreenFirstInWidgets && (currentScreen === 'authentication' || currentScreen === 'error'))

	const handleBackClick = () => {
		let stackSize

		if (currentScreen === 'error' || currentScreen === 'authentication') {
			stackSize = 0
		} else {
			stackSize = iframeScreenStackSize - 1
		}

		setIframeScreenStackSize(stackSize)

		const idxMessage = {
			currentScreen,
			btnClicked: 'back',
			iframeScreenStackSize,
		}

		forwardMessageToMainAppFromPopup(idxMessage)

		if (currentScreen === 'mfa') {
			return history.push('/')
		}

		if (!(currentScreen === 'error' || currentScreen === 'authentication')) {
			history.goBack()
		}
	}

	const handleContinueClick = () => {
		const idxMessage = {
			screenToNavigate,
			currentScreen,
			btnClicked: 'forward',
		}

		if (screenToNavigate === 'connecting') {
			setIframeScreenStackSize(1)
		} else {
			setIframeScreenStackSize(iframeScreenStackSize + 1)
		}

		// iframeScreenStackSize
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
				transform: 'translate(-54%, -50%)'
			}}>
				<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
					{shouldShowBackBtn && <Button label={'Back'} backgroundColor={background} color={fontColor} onClick={handleBackClick} />}
					<Button label={iframeData.primaryButtonLabel || 'Continue'} backgroundColor={background} color={fontColor} primary={true} onClick={handleContinueClick} disabled={!iframeData.enablePrimaryButton} />
				</div>
			</div>
		</div>
	)
}