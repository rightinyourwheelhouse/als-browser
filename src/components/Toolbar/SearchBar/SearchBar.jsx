import React, { useState } from 'react';
import styles from './searchbar.module.css';

const SearchBar = () => {
	const [input, setInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		window.api.send('searchURL', input);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				className={styles.toolbar_searchinput}
				onInput={(e) => setInput(e.target.value)}
				placeholder="Typ een website om te zoeken"
			></input>
		</form>
	);
};

export default SearchBar;
