// import { ipcRenderer } from 'electron';
import React, { useState, useRef } from 'react';
import OnFocus from '../Dashboard/OnFocus';
import onType from '../Dashboard/OnType';
import Dashboard from '../Dashboard/Dashboard';

const SearchBar = ({ onFocusChange }) => {
	const [input, setInput] = useState('');

	const inputRef = useRef();

	const components = {
		dashboard: Dashboard,
		onFocus: OnFocus,
		onType: onType,
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		inputRef.current.blur();
		window.api.send('searchURL', input);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				className="h-14 w-96 rounded-full  pl-4 text-center drop-shadow-light placeholder:text-center"
				onInput={(e) => {
					setInput(e.target.value);
					if (e.target.value.length > 0) {
						onFocusChange(components.onType);
					} else {
						onFocusChange(components.onFocus);
					}
				}}
				onFocus={() => onFocusChange(components.onFocus)}
				onBlur={() => onFocusChange(components.dashboard)}
				placeholder="Typ een website om te zoeken"
			></input>
		</form>
	);
};

export default SearchBar;
