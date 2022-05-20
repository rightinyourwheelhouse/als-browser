import React, { useEffect, useState } from 'react';

import { useAuth } from '../../../../contexts/AuthContextProvider';
import { db } from '../../../../utils/FirebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import { DataGrid, nlNL } from '@mui/x-data-grid';

import Button from '../Button';

const HistorySetting = () => {
	const { user } = useAuth();

	const [historyItems, setHistoryItems] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);

	const columns = [
		{ field: 'time', headerName: 'Tijdstip', type: 'string', width: 90 },
		{ field: 'hostname', type: 'string', width: 150 },
	];

	const handleDelete = () => {
		selectionModel.forEach(async (item) => {
			await deleteDoc(doc(db, 'users', `${user.uid}/history`, item.toString()));
		});
		setHistoryItems(historyItems.filter((visitedPage) => !selectionModel.includes(visitedPage.id)));
	};

	useEffect(() => {
		const fetchData = async () => {
			let urls = [];
			const history = await getDocs(collection(db, `users/${user.uid}/history/`));
			history.forEach((doc) => {
				const data = doc.data();
				const date = new Date(data.visitTime);
				const hours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
				const minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
				const pushed = {
					id: doc.id,
					time: hours + ':' + minutes,
					hostname: data.hostname,
				};
				urls.push(pushed);
			});
			setHistoryItems(urls);
		};
		if (user) fetchData();
	}, [user]);

	return (
		<div className='mx-3'>
			<div className='h-[calc(100vh-6.5rem)] mt-3'>
        <DataGrid
          localeText={nlNL.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          rows={historyItems}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection
          disableSelectionOnClick
          initialState={{
            sorting: {
              sortModel: [{ field: 'time', sort: 'desc' }],
            },
          }}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          sx={{
            '& .MuiDataGrid-cell:hover': {
              color: 'accent.main',
              backgroundColor: 'light',
            },
          }}
        />
      </div>
			{selectionModel.length <= 0 ? (
				''
			) : (
				<div className="mt-2">
					<Button onClick={handleDelete} type="delete">
						{selectionModel.length === historyItems.length ? 'Verwijder alle data' : 'Verwijder geselecteerde data'}
					</Button>
				</div>
			)}
		</div>
	);
};

export default HistorySetting;
