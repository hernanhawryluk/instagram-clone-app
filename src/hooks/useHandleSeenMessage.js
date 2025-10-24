import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const useHandleSeenMessage = () => {
  const handleSeenMessage = async (user, currentUser) => {
    try {
      const chatDocRef = doc(
        db,
        "users",
        currentUser.email,
        "chat",
        user.email
      );
      await updateDoc(chatDocRef, {
        status: "seen",
      });
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  return {
    handleSeenMessage,
  };
};

export default useHandleSeenMessage;
