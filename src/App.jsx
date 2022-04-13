import React, { useState } from 'react';
import './css/App.css';

const App = () => {
	const [input, setInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		window.api.send('toMain', input);
	};
	return (
		<>
			<div className="h-20 bg-slate-400 flex justify-center items-center">
				<form onSubmit={handleSubmit}>
					<input
						className="h-10 w-96 pl-4 rounded-xl"
						onInput={(e) => setInput(e.target.value)}
						placeholder="Typ een website om te zoeken"
					></input>
				</form>
			</div>
		</>
	);
};

export default App;
