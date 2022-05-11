import { useEffect } from 'react';
import { db } from './FirebaseConfig';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContextProvider';

export const useHistory = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    window.api.recieve('historyReply', async (historyItem) => {
      var timestamp = new Timestamp().now();
      var historyRef = doc(db, `users/${user.uid}/history/${timestamp}`);
      await setDoc(historyRef, historyItem[0]);
    });
  }, [user]);
}