import React from 'react';
import ExtensionSetting from './components/ExtensionSetting';
import FeedbackSetting from './components/FeedbackSetting';
import PasswordSetting from './components/PasswordSetting';

import { Tab } from '@headlessui/react';
import AccountSetting from './components/AccountSetting';
import HistorySetting from './components/HistorySetting';
import AboutSetting from './components/AboutSetting';
import Title from '../Typography/Title';

import { AnnotationIcon } from '@heroicons/react/outline';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const Settings = () => {
	const tabs = {
		'Feedback': [
			{
				id: 1,
				component: FeedbackSetting,
				icon: AnnotationIcon,
			},
		],
		'Account': [
			{
				id: 2,
				component: AccountSetting,
				icon: '5h ago',
			},
		],
		'Wachtwoorden': [
			{
				id: 3,
				component: PasswordSetting,
				icon: '5h ago',
			},
		],
		'Extensie': [
			{
				id: 4,
				component: ExtensionSetting,
				icon: '5h ago',
			},
		],
		'Geschiedenis': [
			{
				id: 5,
				component: HistorySetting,
				icon: '5h ago',
			},
		],
		'Over Brainweb': [
			{
				id: 6,
				component: AboutSetting,
				icon: '5h ago',
			},
		],
	};
	return (
		<>
			<div className="flex h-full w-full flex-row">
				<Tab.Group>
					<Tab.List className="z-10 flex h-full w-96 flex-col gap-4 bg-slate-100 shadow-2xl">
						<Title className="my-8 text-center">Instellingen</Title>
						{Object.keys(tabs).map((tabItem) => (
							<Tab
								key={tabItem}
								className={({ selected }) =>
									classNames(
										'text-dark-grey w-full rounded-br-full rounded-tr-full py-2.5 pl-8 text-left text-lg font-light',
										selected ? 'bg-white font-bold drop-shadow-light ' : '',
									)
								}
							>
								<div className="fex-row flex">{tabItem}</div>
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="z-0 w-full">
						{Object.values(tabs).map((components) =>
							components.map((component, index) => (
								<Tab.Panel key={index} className={classNames('z-0 h-full w-full outline-0')}>
									<component.component />
								</Tab.Panel>
							)),
						)}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
};

export default Settings;
