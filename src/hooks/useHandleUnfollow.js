import { useState } from "react";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../services/firebase";

const useHandleUnfollow = ({ currentUser, user }) => {
  const [loader, setLoader] = useState(false);

  const handleUnfollow = async () => {
    if (loader) return;

    setLoader(true);
    try {
      const currentUserRef = doc(db, "users", currentUser.email);
      const userRef = doc(db, "users", user.email);

      await updateDoc(currentUserRef, {
        following: arrayRemove(user.email),
      });

      await updateDoc(userRef, {
        followers: arrayRemove(currentUser.email),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return {
    handleUnfollow,
    loader,
  };
};

export default useHandleUnfollow;
