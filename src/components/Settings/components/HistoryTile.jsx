import React from 'react';

const HistoryTile = (historyItem) => {
  return (
    <div className='flex justify-between'>
      <p>{new Date(historyItem.historyItem.visitTime).getHours()}:{new Date(historyItem.historyItem.visitTime).getMinutes()} </p>
    </div>
  )
}

export default HistoryTile;