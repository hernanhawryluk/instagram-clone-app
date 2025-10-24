import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchRequests = ({ user }) => {
  const [loader, setLoader] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.followers_request || user.followers_request.length < 1) {
      setRequests([]);
      return;
    }

    if (!loader) {
      setLoader(true);

      const usersCollection = collection(db, "users");

      const q = query(
        usersCollection,
        where("__name__", "in", user.followers_request)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setRequests(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setLoader(false);
        },
        (error) => {
          console.log(error);
          setLoader(false);
        }
      );

      return () => unsubscribe();
    }
  }, [user?.followers_request]);

  return {
    requests,
    loader,
  };
};

export default useFetchRequests;
