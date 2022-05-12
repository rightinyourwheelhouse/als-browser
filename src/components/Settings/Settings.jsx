import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import ExtensionSetting from './components/Pages/ExtensionSetting';
import FeedbackSetting from './components/Pages/FeedbackSetting';
import PasswordSetting from './components/Pages/PasswordSetting';

import AccountSetting from './components/Pages/AccountSetting';
import HistorySetting from './components/Pages/HistorySetting';
import AboutSetting from './components/Pages/AboutSetting';
import Title from '../Typography/Title';

import { AnnotationIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/outline';
import { PuzzleIcon } from '@heroicons/react/outline';
import { BookOpenIcon } from '@heroicons/react/outline';
import { InformationCircleIcon } from '@heroicons/react/outline';

import { db } from '../../utils/FirebaseConfig';
import { useAuth } from '../../contexts/AuthContextProvider';

const Settings = () => {
	const { user, auth } = useAuth();
	const [device, setDevice] = useState('');
	const [deviceSpecification, setDeviceSpecification] = useState('');
	const [hasDeviceSpecification, setHasDeviceSpecification] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		const getUserDevice = async () => {
			if (user) {
				const userDoc = doc(db, 'users', user.uid);
				const userData = await getDoc(userDoc);
				setDevice(userData.data().device);

				if (userData.data().device === 'Andere') {
					setHasDeviceSpecification(true);
					setDeviceSpecification(userData.data().deviceSpecification);
				}
			}
		};

		getUserDevice();
	}, [user]);

	const tabs = [
		{
			tabName: 'Feedback',
			link: 'feedback',
			component: FeedbackSetting,
			icon: AnnotationIcon,
		},

		{
			tabName: 'Account',
			link: 'account',
			component: AccountSetting,
			icon: UserIcon,
		},

		{
			tabName: 'Wachtwoorden',
			component: PasswordSetting,
			link: 'passwords',
			icon: LockClosedIcon,
		},

		{
			tabName: 'Extensie',
			link: 'extension',
			component: ExtensionSetting,
			icon: PuzzleIcon,
		},

		{
			tabName: 'Geschiedenis',
			link: 'history',
			component: HistorySetting,
			icon: BookOpenIcon,
		},

		{
			tabName: 'Over Brainweb',
			link: 'about',
			component: AboutSetting,
			icon: InformationCircleIcon,
		},
	];

	const login = () => {
		navigate('/settings/account');
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			return;
		}
	};

	return (
		<div className="grid grid-cols-[minmax(12rem,16rem),1fr] gap-4">
			<div className="mi z-10 flex flex-col gap-4 bg-slate-100 drop-shadow-2xl">
				<Title className="my-8 text-center">Instellingen</Title>
				{tabs.map((tab, index) => (
					<NavLink
						className={({ isActive }) => {
							const classes =
								'text-dark-grey w-full rounded-br-full rounded-tr-full p-2 text-left text-lg font-light hover:bg-white';
							return isActive ? `bg-white font-bold outline-none drop-shadow-light ${classes}` : classes;
						}}
						to={`/settings/${tab.link}`}
						key={index}
					>
						<div className="ml-4 flex items-center gap-3">
							<tab.icon className="h-6 w-6 stroke-2" />
							<p>{tab.tabName}</p>
						</div>
					</NavLink>
				))}

				{user ? (
					<div className="flex h-full flex-col justify-end px-4 pb-8">
						<button className="mt-10 h-10 w-full rounded-lg bg-red-500 text-white" onClick={logout}>
							Uitloggen
						</button>
					</div>
				) : (
					<div className="flex h-full flex-col justify-end px-4 pb-8">
						<button className="mt-10 h-10 w-full rounded-lg bg-slate-500 text-white" onClick={login}>
							Inloggen
						</button>
					</div>
				)}
			</div>
			<div className="">
				<Routes>
					<Route path="feedback" element={<FeedbackSetting />} />
					<Route
						path="account"
						element={
							<AccountSetting
								device={device}
								deviceSpecification={deviceSpecification}
								hasDeviceSpecification={hasDeviceSpecification}
								setHasDeviceSpecification={setHasDeviceSpecification}
							/>
						}
					/>
					<Route path="passwords" element={<PasswordSetting />} />
					<Route path="extension" element={<ExtensionSetting />} />
					<Route path="history" element={<HistorySetting />} />
					<Route path="about" element={<AboutSetting />} />
				</Routes>
			</div>
		</div>
	);
};

export default Settings;
