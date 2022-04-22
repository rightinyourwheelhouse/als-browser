import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import SearchBar from './SearchBar';
import ToolbarIcon from './ToolbarIcon.jsx';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { RefreshIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/outline';
import { MinusSmIcon } from '@heroicons/react/outline';
import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/outline';

const Toolbar = ({ onFocusChange }) => {
	const handleGoBack = () => {
		console.log('click');
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
						<ToolbarIcon onClick={handleGoBack}>
							<ArrowLeftIcon />
						</ToolbarIcon>

						<ToolbarIcon onClick={handleGoForward}>
							<ArrowRightIcon />
						</ToolbarIcon>
					</div>

					<div className="flex flex-row items-center gap-4">
						<ToolbarIcon onClick={handleRefresh}>
							<RefreshIcon />
						</ToolbarIcon>

						<SearchBar onFocusChange={onFocusChange} />

						<ToolbarIcon onClick={handleDashboard}>
							<HomeIcon />
						</ToolbarIcon>
					</div>

					<div className="flex flex-row gap-2">
						<ToolbarIcon onClick={handleMinimize}>
							<MinusSmIcon />
						</ToolbarIcon>

						<ToolbarIcon onClick={handleAdjustSize}>
							<ArrowsExpandIcon />
						</ToolbarIcon>

						<ToolbarIcon onClick={handleClose}>
							<XIcon />
						</ToolbarIcon>
					</div>
				</div>
			</div>
		</>
	);
};

export default Toolbar;
