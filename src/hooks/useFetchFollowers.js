import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchFollowers = ({ user }) => {
  const [loader, setLoader] = useState(false);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (user.followers.length < 1) {
      setFollowers([]);
      return;
    }

    if (!loader) {
      setLoader(true);
      try {
        const q = query(
          collection(db, "users"),
          where(documentId(), "in", user.followers)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          setFollowers(snapshot.docs.map((doc) => doc.data()));
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  }, [user.followers]);

  return {
    followers,
  };
};

export default useFetchFollowers;
