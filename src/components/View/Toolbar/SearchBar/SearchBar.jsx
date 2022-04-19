// import { ipcRenderer } from 'electron';
import React, { useState, useRef } from 'react';
import styles from './searchbar.module.css';

const SearchBar = ({ onFocusChange }) => {
	const [input, setInput] = useState('');

	const inputRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		inputRef.current.blur();
		window.api.send('searchURL', input);
	};

	const handleFocus = (bool) => {
		onFocusChange(bool);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				className={styles.toolbar_searchinput}
				onInput={(e) => setInput(e.target.value)}
				onFocus={() => handleFocus(true)}
				onBlur={() => handleFocus(false)}
				placeholder="Typ een website om te zoeken"
			></input>
		</form>
	);
};

export default SearchBar;
