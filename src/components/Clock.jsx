import React, { useState, useEffect } from 'react';

const options = {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
};

const Clock = () => {
	const [time, setTime] = useState(new Date().toLocaleDateString('nl-BE', options));

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date().toLocaleDateString('nl-BE', options)), 1000);

		return () => clearInterval(interval);
	}, []);

	return <div>{time}</div>;
};

export default Clock;
