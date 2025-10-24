import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchContactList = () => {
  const { currentUser } = useUserContext();
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    if (!currentUser?.email) return;

    const chatRef = collection(db, "users", currentUser.email, "chat");

    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      const data = snapshot.docs.map((doc, index) => ({
        id: index,
        ...doc.data(),
      }));
      setChatUsers(data);
    });

    return () => unsubscribe();
  }, [currentUser?.email]);

  return { chatUsers };
};

export default useFetchContactList;
