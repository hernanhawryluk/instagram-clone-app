import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const useHandleCommentLike = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentLike = async (
    singleComment,
    targetIndex,
    allComments,
    userId,
    postId,
    currentUser
  ) => {
    setIsLoading(true);
    try {
      const userEmail = currentUser.email;
      const currentLikes = singleComment.likes_by_users || [];
      const likedAlready = currentLikes.includes(userEmail);

      const updatedValues = [...allComments];

      if (likedAlready) {
        updatedValues[targetIndex].likes_by_users = currentLikes.filter(
          (email) => email !== userEmail
        );
      } else {
        updatedValues[targetIndex].likes_by_users = [
          ...currentLikes,
          userEmail,
        ];
      }

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

  return { handleCommentLike, isLoading };
};

export default useHandleCommentLike;
