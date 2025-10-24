import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchLikes = ({ likesByEmail }) => {
  const [loader, setLoader] = useState(false);
  const [likesByUsers, setLikesByUsers] = useState([]);

  useEffect(() => {
    if (likesByEmail.length < 1) {
      setLikesByUsers([]);
      return;
    }

    if (!loader) {
      setLoader(true);
      try {
        const q = query(
          collection(db, "users"),
          where(documentId(), "in", likesByEmail)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          setLikesByUsers(snapshot.docs.map((doc) => doc.data()));
          setLoader(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
  }, [likesByEmail]);

  return {
    likesByUsers,
    loader,
  };
};

export default useFetchLikes;
