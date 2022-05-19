import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ToolbarIcon from './ToolbarIcon.jsx';

import { useLocation, useNavigate } from 'react-router-dom';

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

const Toolbar = () => {
	const [logo, setLogo] = useState(LogoBrainWeb);
	const [webviewState, setWebviewState] = useState(undefined);

	let navigate = useNavigate();
	let location = useLocation();

	let params = new URLSearchParams(location.search);

	useEffect(() => {
		const listener = document.addEventListener('click', () => window.api.send('getWebviewState'));
		window.api.recieve('getWebviewStateReply', (isOpen) => {
			setWebviewState(...isOpen);
		});

		return () => {
			window.api.removeAllListeners('getWebviewStateReply');
			document.removeEventListener('click', listener);
		};
	}, []);

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
		if (params.get('search')) {
			navigate('/');
		} else if (location.pathname === '/settings/extension') {
			navigate('/');
		} else {
			window.api.send('toggleWebview', true);
		}
	};

	const handleAdjustSize = () => {
		window.api.send('adjustSize');
	};

	const handleExtensionToggle = () => {
		if (location.pathname === '/settings/extension') {
			window.api.send('toggleWebview', true);
		} else {
			navigate('/settings/extension');
			window.api.send('toggleWebview', false);
		}
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

					<ToolbarIcon onClick={handleDashboard}>
						{webviewState || (!webviewState && params.get('search')) || location.pathname !== '/' ? (
							<HomeIcon />
						) : (
							<GlobeAltIcon />
						)}
					</ToolbarIcon>

					<SearchBar />

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
