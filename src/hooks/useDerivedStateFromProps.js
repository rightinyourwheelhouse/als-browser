import { useState } from 'react';
import usePrevious from './usePrevious';

export default function useDerivedStateFromProps(propsValue) {
	let previousProps = usePrevious(propsValue);
	let [stateValue, setStateValue] = useState(propsValue);

	if (previousProps !== propsValue && stateValue !== propsValue) {
		setStateValue(propsValue);
	}

	return [stateValue, setStateValue];
}
