import { useEffect, useState, useCallback } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFindUsers = ({ currentUser, searchKey }) => {
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const beginSearch = useCallback(() => {
    const q = query(
      collection(db, "users"),
      where("username", "!=", currentUser.username)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc, index) => ({
        id: index,
        ...doc.data(),
      }));
      setUsers(data);
    });

    return unsubscribe;
  }, [currentUser?.username]);

  useEffect(() => {
    if (!searchKey) {
      setSearchResult([]);
      return;
    }
    const data = users.filter((user) => {
      const keyLower = searchKey.toLowerCase();
      return (
        user.username.toLowerCase().includes(keyLower) ||
        user.email.toLowerCase().includes(keyLower) ||
        user.name.toLowerCase().includes(keyLower)
      );
    });
    setSearchResult(data);
  }, [searchKey, users]);

  return {
    beginSearch,
    users,
    searchResult,
  };
};

export default useFindUsers;
