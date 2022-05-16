import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
// import { HiOutlineSelector, HiCheck } from 'react-icons/hi';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Button from '../Button';

const feedbackOptions = [
	{ id: 1, type: 'Algemeen' },
	{ id: 2, type: 'Probleem rapporteren' },
	{ id: 3, type: 'Feature-aanvraag' },
];

const FeedbackSetting = () => {
	const [selectedOption, setSelectedOption] = useState(feedbackOptions[0]);

	return (
		<div>
			<div id="alertMessage" className="absolute top-24 right-4 rounded border-2 border-green-700 bg-[#59ff92] p-2 invisible">
				<p>Uw feedback is succesvol verzonden</p>
			</div>
			<h1 className="mt-8 mb-[2.65rem] font-mulish text-3xl font-bold">Feedback geven</h1>
			<label htmlFor="typeSelector">Selecteer type feedback:</label>
			<br />
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					document.getElementById('alertMessage').classList.remove('invisible');
					setTimeout(() => {
						document.getElementById('alertMessage').classList.add('invisible');
					}, 5000);
				}}
			>
				<div className="absolute">
					<div className="relative">
						<Listbox value={selectedOption} onChange={setSelectedOption}>
							<Listbox.Button className="my-3 flex min-w-[25ch] cursor-default justify-between rounded-lg bg-gray-200 py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
								<span className="block truncate">{selectedOption.type}</span>
								<span className="pointer-events-none flex items-center pr-2">
									<SelectorIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
								</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="mt-1 max-h-60 max-w-[25ch] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{feedbackOptions.map((option) => (
										<Listbox.Option
											key={option.id}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active ? 'bg-[#cbd5e1] text-[#475569]' : 'text-gray-900'
												}`
											}
											value={option}
										>
											{({ selected }) => (
												<>
													<span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
														{option.type}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#475569]">
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</Listbox>
					</div>
				</div>
				<textarea
					name="feedback"
					id="feedback"
					cols="60"
					rows="5"
					className="mt-16 rounded border border-black"
				></textarea>
				<div className="mt-2">
					<Button>Verzenden</Button>
				</div>
			</form>
		</div>
	);
};

export default FeedbackSetting;
