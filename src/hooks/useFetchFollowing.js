import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchFollowing = ({ user }) => {
  const [loader, setLoader] = useState(false);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (user.following.length < 1) {
      setFollowing([]);
      return;
    }

    if (!loader) {
      setLoader(true);
      try {
        const q = query(
          collection(db, "users"),
          where(documentId(), "in", user.following)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          setFollowing(snapshot.docs.map((doc) => doc.data()));
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  }, [user.following]);

  return {
    following,
  };
};

export default useFetchFollowing;
