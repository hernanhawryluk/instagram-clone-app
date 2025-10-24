import { useUserContext } from "../contexts/UserContext";
import { doc, writeBatch, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../services/firebase";

const useHandleFollow = () => {
  const { currentUser } = useUserContext();

  const handleFollow = async (userEmail) => {
    try {
      const batch = writeBatch(db);

      const userRef = doc(db, "users", userEmail);
      const currentUserRef = doc(db, "users", currentUser.email);

      const isFollowingRequest =
        currentUser.following_request?.includes(userEmail);

      if (!isFollowingRequest) {
        batch.update(userRef, {
          followers_request: arrayUnion(currentUser.email),
        });
        batch.update(currentUserRef, {
          following_request: arrayUnion(userEmail),
        });
      } else {
        batch.update(userRef, {
          followers_request: arrayRemove(currentUser.email),
        });
        batch.update(currentUserRef, {
          following_request: arrayRemove(userEmail),
        });
      }

      await batch.commit();
      console.log("Follow request updated successfully");
    } catch (error) {
      console.error("Error updating follow requests:", error);
    }
  };

  return { handleFollow };
};

export default useHandleFollow;
