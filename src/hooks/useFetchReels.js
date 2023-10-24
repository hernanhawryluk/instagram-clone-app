import { useState, useEffect } from 'react'
import firebase from "firebase/compat";

const useFetchReels = () => {
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
        const unsubscribe = firebase
          .firestore()
          .collectionGroup("reels")
          .onSnapshot((snapshot) => {
            const videos = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setVideos(videos);
          });
    
        return () => unsubscribe;
      }, []);

    return { 
        videos
    }
}

export default useFetchReels