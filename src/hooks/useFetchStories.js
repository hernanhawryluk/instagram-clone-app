import { useState, useEffect } from "react";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedStories, setUpdatedStories] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);

      const unsubscribe = onSnapshot(
        collectionGroup(db, "stories"),
        (snapshot) => {
          setStories(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          setUpdatedStories((prev) => prev + 1);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, []);

  return {
    stories,
    updatedStories,
  };
};

export default useFetchStories;
