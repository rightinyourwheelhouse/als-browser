import { useRef, useCallback } from 'react';

export default function useImmutableCallback(callback) {
	let callbackRef = useRef();

	callbackRef.current = callback;

	return useCallback(
		function (...args) {
			return callbackRef.current(...args);
		},
		[callbackRef],
	);
}