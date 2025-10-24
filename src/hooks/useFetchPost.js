import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchPost = (item) => {
  const [isLoading, setIsLoading] = useState(false);
  const [onSnapshotData, setOnSnapshotData] = useState({});
  const [timeToReplaceData, setTimeToReplaceData] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      const postDocRef = doc(db, "users", item.owner_email, "posts", item.id);

      const unsubscribe = onSnapshot(postDocRef, (snapshot) => {
        setOnSnapshotData({ ...snapshot.data(), id: snapshot.id });
        setTimeToReplaceData(true);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  }, [item.owner_email, item.id]);

  return {
    onSnapshotData,
    timeToReplaceData,
    isLoading,
  };
};

export default useFetchPost;
