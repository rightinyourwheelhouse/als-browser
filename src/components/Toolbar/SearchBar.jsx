import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const [input, setInput] = useState('');

	const inputRef = useRef();
	let navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		inputRef.current.blur();
		window.api.send('searchURL', input);
	};

	const handleOnFocus = (bool) => {
		window.api.send('searchBarFocus', bool);
	};

	const handleOnChange = (e) => {
		setInput(e.target.value);

		if (e.target.value.length > 0) {
			navigate('/on-type');
		} else {
			navigate('/');
		}
	};

	// window.api.recieve('loadURLResponse', (url) => {
	// 	if (url.length <= 0) {
	// 		setCurrentURL('Typ een website om te zoeken');
	// 	} else {
	// 		setCurrentURL(url[0]);
	// 	}
	// });

	return (
		<form onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				className="hover:drop-shadow-browser h-14 w-96 rounded-full pl-4 text-center drop-shadow-light transition duration-300 ease-in-out placeholder:text-center"
				onInput={(e) => handleOnChange(e)}
				onFocus={() => handleOnFocus(true)}
				onBlur={() => handleOnFocus(false)}
				placeholder="Typ een website om te zoeken"
			></input>
		</form>
	);
};

export default SearchBar;
