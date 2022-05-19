import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import SearchBar from './SearchBar';
import ToolbarIcon from './ToolbarIcon.jsx';

import { useNavigate, useLocation } from 'react-router-dom';

import LogoBrainWeb from '/assets/img/logo-brainweb.png';
import LogoBrainWebWhite from '/assets/img/logo-brainweb-white.png';

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	RefreshIcon,
	HomeIcon,
	MinusSmIcon,
	ArrowsExpandIcon,
	XIcon,
	GlobeAltIcon,
} from '@heroicons/react/outline';

const Toolbar = ({ onFocusChange }) => {
	const [dashboard, setDashboard] = useState(true);
	const [logo, setLogo] = useState(LogoBrainWeb);

	let navigate = useNavigate();
	const location = useLocation();

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
		navigate('/');
		setDashboard(!dashboard);
		if (location.pathname === '/') {
			window.api.send('toggleDashboard', true);
		} else {
			window.api.send('toggleDashboard', null);
		}
	};

	const handleAdjustSize = () => {
		window.api.send('adjustSize');
	};

	useEffect(() => {
		window.api.recieve('ToggleTheDashboard', () => {
			onFocusChange(Dashboard);
		});

		return () => window.api.removeAllListeners('ToggleTheDashboard');
	}, [onFocusChange]);

	const handleExtensionToggle = () => {
		navigate('/settings/extension');
		window.api.send('toggleExtension');
	};

	return (
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

					<ToolbarIcon onClick={handleDashboard}>{dashboard ? <HomeIcon /> : <GlobeAltIcon />}</ToolbarIcon>

					<SearchBar onFocusChange={onFocusChange} />

					<ToolbarIcon
						onClick={handleExtensionToggle}
						onMouseEnter={() => setLogo(LogoBrainWebWhite)}
						onMouseLeave={() => setLogo(LogoBrainWeb)}
					>
						<img src={logo} alt="" />
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
	);
};

export default Toolbar;
