import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const useHandleCommentDelete = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentDelete = async (
    targetIndex,
    allComments,
    userId,
    postId
  ) => {
    setIsLoading(true);
    try {
      const updatedValues = [...allComments];
      updatedValues.splice(targetIndex, 1);

      const postRef = doc(db, "users", userId, "posts", postId);
      await updateDoc(postRef, {
        comments: updatedValues,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCommentDelete, isLoading };
};

export default useHandleCommentDelete;
