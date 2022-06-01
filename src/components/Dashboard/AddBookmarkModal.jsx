import React, { useState } from 'react';

import { Formik } from 'formik';
import TextInputGroup from '../TextInputGroup';
import useDerivedStateFromProps from '../../hooks/useDerivedStateFromProps';

const AddBookmarkModal = ({ setAddBookmark, currentBookmark, handleAddBookmark }) => {
	const [bookmark, setBookmark] = useDerivedStateFromProps(currentBookmark);
	const [result, setResult] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		let result;

		if (bookmark.url !== currentBookmark.url) {
			result = handleAddBookmark({ ...bookmark, createdAt: new Date().toLocaleString() });
		} else {
			result = handleAddBookmark(currentBookmark);
		}

		if (result.type === 'success') {
			setAddBookmark(false);
		} else {
			setResult(result.message);
		}
	};

	return (
		<div className="absolute z-50 flex h-full w-full items-center justify-center bg-slate-800/25 backdrop-blur-sm">
			<div className="w-96 rounded-md bg-slate-600 p-4">
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-xl font-bold text-white">Bladwijzer toevoegen</h1>
					<button
						className="rounded-md border-2 border-white py-1 px-3 text-white transition duration-300 ease-in-out hover:bg-white hover:text-slate-600"
						onClick={() => setAddBookmark(false)}
					>
						Sluiten
					</button>
				</div>
				{bookmark && (
					<Formik>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<TextInputGroup
									textColor="text-white"
									type="input"
									value={bookmark.title}
									onChange={(e) => setBookmark({ title: e.target.value, url: bookmark.url })}
									name="title"
									placeholder="Naam"
									label="Naam"
								/>

								<TextInputGroup
									textColor="text-white"
									type="input"
									name="url"
									value={bookmark.url}
									onChange={(e) => setBookmark({ title: bookmark.title, url: e.target.value })}
									placeholder="website URL"
									label="Website URL"
								/>
							</div>
							{result && <p className="max-w-max rounded-md bg-red-600 px-3 py-2 text-white">{result}</p>}

							<div className="mt-6 flex items-center justify-end">
								<button type="submit" className="rounded-md border-2 border-white bg-white py-1 px-4 text-slate-800">
									Bewaar
								</button>
							</div>
						</form>
					</Formik>
				)}
			</div>
		</div>
	);
};

export default AddBookmarkModal;
