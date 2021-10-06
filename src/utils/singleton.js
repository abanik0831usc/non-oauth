import  { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
const api = { async getMe() { return { name: 'test' }; } };

const init = {};

const useUriImpl = () => {
	const params = new URLSearchParams(document.location.search.substring(1))
	const themeInfo = params.get('theme');
	const isLaunchPoint = params.get('isAggregatorScreenFirstInWidgets') === 'true'
	const url = params.get('url')
	const displayFooter = typeof params.get('shouldDisplayIntuitFooter') === 'string' ? params.get('shouldDisplayIntuitFooter') === 'true' : false

	return {
		themeInfo,
		isLaunchPoint,
		url,
		displayFooter,
	}
};

export const useUriInfo = singletonHook(init, useUriImpl);
