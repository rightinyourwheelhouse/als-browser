import React, { useState, useRef, useEffect } from 'react';
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
		inputRef.current.select();

		if (input.length === 0) {
			navigate('/');
		} else {
			navigate(`/?search=${input}`);
		}
		window.api.send('searchBarFocus', bool);
	};

	const handleOnChange = (e) => {
		setInput(e.target.value);

		if (e.target.value.length > 0) {
			navigate(`/?search=${e.target.value}`);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		window.api.recieve('focusSearchBarRadialUiReply', () => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		});
		window.api.recieve('historyReply', (url) => {
			url = url[0];
			const { hostname, pathname } = url;

			if (typeof url === 'object') {
				setInput(hostname + pathname);
			} else {
				setInput(url);
			}
		});

		return () => {
			window.api.removeAllListeners('focusSearchBarRadialUiReply');
			window.api.removeAllListeners('historyReply');
		};
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<input
				id="search-bar"
				ref={inputRef}
				value={input}
				className="hover:drop-shadow-browser h-14 w-96 rounded-full pl-4 text-center drop-shadow-light transition duration-300 ease-in-out placeholder:text-center focus:outline-none focus:ring focus:ring-dark-blue"
				onInput={(e) => handleOnChange(e)}
				onFocus={() => handleOnFocus(true)}
				placeholder="Typ een website om te zoeken"
			></input>
		</form>
	);
};

export default SearchBar;
