export function addiframeEventListener() {
    const eventMethod = window.addEventListener
        ? 'addEventListener'
        : 'attachEvent'
    const eventer = window[eventMethod]

    // if addEventListener doesn't exist fallback to `attachEvent`
    // attachEvent prefix starts with `on`
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'

    const allowedUrls = [
        'https://static-fdpwidgets.intuitcdn.net',
        'https://creditkarmacdn-a.akamaihd.net',
        'https://creditkarmacdn-a.akamaihd.net/',
    ]

    // Listen to message from intuit-fdp-auth-redirect-client
    eventer(
        messageEvent,
        e => {
            // this will be removed once we have our params
            if (allowedUrls.includes(e.origin)) {
                const data = e.data || {}
                const logs = data.infoLog || 'no logs found'
                const type = data.type || 'info'
                // feLoggingOIL({ message: logs }, type)
            }
        },
        false
    )
}

export const forwardMessageToMainAppFromPopup = (idxMessage) => {
    if (typeof message !== 'string') {
        idxMessage = JSON.stringify(idxMessage);
    }

    window.parent.postMessage({ idxMessage }, '*')
}

export const receiveMessageFromMainAppToPopup = (setState) => {
    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    const event = window[eventMethod]

    // if addEventListener doesn't exist fallback to `attachEvent`
    // attachEvent prefix starts with `on`
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'

    const allowedUrls = [
        'https://static-fdpwidgets.intuitcdn.net',
        'https://creditkarmacdn-a.akamaihd.net',
        'https://creditkarmacdn-a.akamaihd.net/',
    ]

    // Listen to message from intuit-fdp-auth-redirect-client
    event(
      messageEvent,
      (e) => handlePostMessage(e, setState),
      false
    )
}


export function removeIframeEventListener() {
    const eventMethod = window.removeEventListener
      ? 'removeEventListener'
      : 'detachEvent'
    const event = window[eventMethod]

    const messageEvent = eventMethod === 'detachEvent' ? 'onmessage' : 'message'

    event(messageEvent, handlePostMessage, false)
}

const handlePostMessage = (e, setState) => {
    if (e.data.idxMessage && e.origin !== 'http://localhost:3000') {
        const data = JSON.parse(e.data.idxMessage)
        console.log('get the data: ', data)
        setState(true)
    }
}
