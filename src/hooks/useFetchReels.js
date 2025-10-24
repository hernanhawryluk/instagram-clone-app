import { useState, useEffect } from "react";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchReels = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const reelsCollection = collectionGroup(db, "reels");

    const unsubscribe = onSnapshot(reelsCollection, (snapshot) => {
      const videos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVideos(videos);
    });

    return () => unsubscribe();
  }, []);

  return { videos };
};

export default useFetchReels;
