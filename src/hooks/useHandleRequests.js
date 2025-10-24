import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useHandleRequests = ({ currentUser, user }) => {
  const handleRequests = async (accept) => {
    try {
      const userRef = doc(db, "users", user.email);
      const currentUserRef = doc(db, "users", currentUser.email);

      await updateDoc(userRef, {
        following_request: arrayRemove(currentUser.email),
        ...(accept && { following: arrayUnion(currentUser.email) }),
      });

      await updateDoc(currentUserRef, {
        followers_request: arrayRemove(user.email),
        ...(accept && { followers: arrayUnion(user.email) }),
      });

      if (accept) {
        await updateDoc(userRef, {
          event_notification: increment(1),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleRequests,
  };
};

export default useHandleRequests;
