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

export const forwardMessageToMainAppFromPopup = (message) => {
    if (typeof message !== 'string') {
        message = JSON.stringify(message);
    }

    window.parent.postMessage(message, '*')
}