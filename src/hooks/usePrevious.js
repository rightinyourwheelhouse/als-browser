import { useRef, useEffect } from 'react';

export default function usePrevious(value) {
	let ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}
