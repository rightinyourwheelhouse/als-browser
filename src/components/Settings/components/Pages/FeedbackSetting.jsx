import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Button from '../Button';

const feedbackOptions = [
	{ id: 1, type: 'Algemeen' },
	{ id: 2, type: 'Probleem rapporteren' },
	{ id: 3, type: 'Feature-aanvraag' },
];

const FeedbackSetting = () => {
	return (
		<div className="h-[calc(100vh-5rem)]">
			<iframe
				className="clickup-embed clickup-dynamic-height"
				src="https://forms.clickup.com/24323508/f/q69dm-29381/B9D37296WIKIQ99ME2"
				width="100%"
				height="100%"
			></iframe>
		</div>
	);
};

export default FeedbackSetting;
