import React, { useState } from 'react';
import classNames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

const FAQTile = ({ title, children, type }) => {
	const [isOpen, setIsOpen] = useState(false);

	let tileClassNames = classNames('relative rounded-xl my-5 h-min max-h-[8rem] overflow-hidden p-5 shadow', {
		'bg-green-200': type === 'important',
		'bg-red-200': type === 'bug',
		'bg-yellow-200': type === 'warning',
		'h-min max-h-32 overflow-hidden': !isOpen,
		'overflow-visible max-h-fit': isOpen,
	});
	let fadeClassNames = classNames('absolute top-[50%] left-0 h-1/2 w-full bg-gradient-to-t', {
		'from-green-200': type === 'important',
		'from-red-200': type === 'bug',
		'from-yellow-200': type === 'warning',
		'from-white': !type,
		'hidden': isOpen,
	});

	return (
		<div className={tileClassNames}>
			<div className={fadeClassNames}></div>
			<div className="flex items-start justify-between">
				<h2 className="mb-2 text-xl font-bold">{title}</h2>
				{isOpen ? (
					<button
						onClick={() => {
							setIsOpen(false);
						}}
					>
						<ChevronUpIcon className="h-6 w-6 text-gray-600" />
					</button>
				) : (
					<button
						onClick={() => {
							setIsOpen(true);
						}}
					>
						<ChevronDownIcon className="h-6 w-6 text-gray-600" />
					</button>
				)}
			</div>
			<p>{children}</p>
		</div>
	);
};

export default FAQTile;
