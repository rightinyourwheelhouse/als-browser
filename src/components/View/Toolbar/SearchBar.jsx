// import { ipcRenderer } from 'electron';
import React, { useState, useRef } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import OnType from '../Dashboard/OnType';

const SearchBar = ({ onFocusChange }) => {
	const [input, setInput] = useState('');

	const inputRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		inputRef.current.blur();
		window.api.send('searchURL', input);
	};

	const handleOnFocus = (bool) => {
		window.api.send('searchBarFocus', bool);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				className="hover:drop-shadow-browser h-14 w-96 rounded-full pl-4 text-center drop-shadow-light transition duration-300 ease-in-out placeholder:text-center"
				onInput={(e) => {
					setInput(e.target.value);
					if (e.target.value.length > 0) {
						onFocusChange(OnType);
					} else {
						onFocusChange(Dashboard);
					}
				}}
				onFocus={() => handleOnFocus(true)}
				onBlur={() => handleOnFocus(false)}
				placeholder="Typ een website om te zoeken"
			></input>
		</form>
	);
};

export default SearchBar;
