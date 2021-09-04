import React, { createContext, useState } from "react";

export const ContainerContext = createContext('')

export default function AppContainer({ children }) {
	const [iframeScreenStackSize, setIframeScreenStackSize] = useState(0)

	const value = [iframeScreenStackSize, setIframeScreenStackSize]
	return (
		<ContainerContext.Provider value={value}>
			{children}
		</ContainerContext.Provider>
	)
}