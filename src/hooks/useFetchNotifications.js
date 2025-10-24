import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchRequests = ({ user }) => {
  const [loader, setLoader] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!loader) {
      setLoader(true);
      try {
        const notificationsRef = collection(
          db,
          "users",
          user.email,
          "notifications"
        );

        const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
          setNotifications(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setLoader(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
  }, [user.email]);

  return {
    notifications,
  };
};

export default useFetchRequests;
