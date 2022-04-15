// import { ipcRenderer } from 'electron';
import React, { useState, useEffect, useRef } from 'react';
import styles from './searchbar.module.css';

const SearchBar = () => {
	const [input, setInput] = useState('');

	const inputRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		window.api.send('searchURL', input);
	};

	const { api } = window;
	useEffect(() => {
		// ipcRenderer.on becomes api.recieve
		api.recieve('searchURL-reply', () => {
			inputRef.current.blur();
		});
	});

	return (
		<form onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				className={styles.toolbar_searchinput}
				onInput={(e) => setInput(e.target.value)}
				placeholder="Typ een website om te zoeken"
			></input>
		</form>
	);
};

export default SearchBar;
