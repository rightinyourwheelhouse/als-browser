import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import SearchBar from './SearchBar';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { RefreshIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/outline';
import { MinusSmIcon } from '@heroicons/react/outline';
import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/outline';

const Toolbar = ({ onFocusChange }) => {
	const handleGoBack = () => {
		window.api.send('goBack');
	};

	const handleGoForward = () => {
		window.api.send('goForward');
	};

	const handleRefresh = () => {
		window.api.send('refresh');
	};

	const handleClose = () => {
		window.api.send('close');
	};

	const handleMinimize = () => {
		window.api.send('minimize');
	};

	const handleDashboard = () => {
		window.api.send('toggleDashboard');
	};

	const handleAdjustSize = () => {
		window.api.send('adjustSize');
	};

	window.api.recieve('ToggleTheDashboard', () => {
		onFocusChange(Dashboard);
	});

	return (
		<>
			<div className="drop-shadow-browser draggable w-full">
				<div className="flex h-20 items-center justify-between bg-slate-100 pl-4 pr-4">
					<div className="flex cursor-pointer flex-row gap-4">
						<div
							onClick={handleGoBack}
							className="group flex h-14 w-14  items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
						>
							<ArrowLeftIcon className="h-9 w-9 group-hover:text-white" />
						</div>

						<div
							onClick={handleGoForward}
							className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
						>
							<ArrowRightIcon className="h-9 w-9 group-hover:text-white" />
						</div>
					</div>

					<div className="flex flex-row items-center gap-4">
						<div
							onClick={handleRefresh}
							className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
						>
							<RefreshIcon className="h-9 w-9 group-hover:text-white" />
						</div>
						<SearchBar onFocusChange={onFocusChange} />
						<div
							onClick={handleDashboard}
							className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
						>
							<HomeIcon className="h-9 w-9 group-hover:text-white" />
						</div>
					</div>

					<div className="flex flex-row gap-2">
						<div
							onClick={handleMinimize}
							className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
						>
							<MinusSmIcon className="h-9 w-9 group-hover:text-white" />
						</div>
						<div
							onClick={handleAdjustSize}
							className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
						>
							<ArrowsExpandIcon className="h-8 w-8 group-hover:text-white" />
						</div>
						<div
							onClick={handleClose}
							className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-light transition duration-300 ease-in-out hover:bg-dark-gray"
						>
							<XIcon className="h-9 w-9 group-hover:text-white" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Toolbar;
