import React from 'react';

import { Formik, Field } from 'formik';
import TextInputGroup from '../TextInputGroup';

import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';

const AddBookmark = ({ setAddBookmark, user, setBookmarksUpdated }) => {
	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setSubmitting(true);
			// add bookmark to firebase db collection
			const bookmarkRef = doc(db, `users/${user.uid}/bookmarks/${values.name}`);
			// check if bookmark already exists
			getDoc(bookmarkRef).then((docSnap) => {
				if (docSnap.exists) {
					// collection already exists

					const bookmarkData = {
						title: values.name,
						url: values.url,
						// favicon: values.url + '',
						createdAt: new Date().toLocaleString(),
					};
					// bookmark does not exist
					// add bookmark to collection
					setDoc(bookmarkRef, bookmarkData).then(() => {
						window.api.send('alert-message-bookmark', {
							message: 'Bladwijzer toegevoegd',
							type: 'success',
						});
					});

					setBookmarksUpdated(true);
					setAddBookmark(false);
				}
			});

			setSubmitting(false);
		} catch (error) {
			return;
		}
	};

	return (
		<div className="absolute z-50 flex h-full w-full items-center justify-center bg-slate-800/25 backdrop-blur-sm">
			<div className="w-96 rounded-md bg-slate-600 p-4">
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-xl font-bold text-white">Bladwijzer toevoegen</h1>
					<button
						className="rounded-md border-2 border-white py-1 px-3 text-white "
						onClick={() => {
							setAddBookmark(false);
						}}
					>
						Sluiten
					</button>
				</div>
				<Formik
					initialValues={{
						name: '',
						url: '',
					}}
					onSubmit={handleSubmit}
				>
					{({ handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className="">
							<div className="mb-4">
								<Field
									textColor="text-white"
									type="input"
									as={TextInputGroup}
									name="name"
									placeholder="Naam"
									label="Naam"
								/>

								<Field
									textColor="text-white"
									type="input"
									as={TextInputGroup}
									name="url"
									placeholder="website URL"
									label="Website URL"
								/>
							</div>

							<div className="mt-6 flex items-center justify-end">
								<button
									type="submit"
									className="rounded-md border-2 border-white bg-white py-1 px-4 text-slate-800"
									disabled={isSubmitting}
								>
									Bewaar
								</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AddBookmark;
