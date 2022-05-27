import React from 'react';

const Title = ({ children, className }) => {
	return <h1 className={`font-mulish text-3xl font-bold ${className}`}>{children}</h1>;
};

export default Title;
