import { useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useHandleLike = () => {
  const [loader, setLoader] = useState(false);

  const handlePostLike = async (post, currentUser) => {
    if (loader) return;
    setLoader(true);

    const currentLikeStatus = !post.likes_by_users.includes(currentUser.email);

    try {
      const postRef = doc(db, "users", post.owner_email, "posts", post.id);
      const userRef = doc(db, "users", post.owner_email);

      await updateDoc(postRef, {
        likes_by_users: currentLikeStatus
          ? arrayUnion(currentUser.email)
          : arrayRemove(currentUser.email),
        new_likes: currentLikeStatus
          ? [currentUser.username, currentUser.profile_picture]
          : [],
      });

      await updateDoc(userRef, {
        event_notification: currentLikeStatus ? increment(1) : increment(-1),
      });
    } catch (error) {
      console.error("Error updating post like:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleStoryLike = async (story, currentUser) => {
    if (loader) return;
    setLoader(true);

    const currentLikeStatus = !story.likes_by_users.includes(currentUser.email);

    try {
      const storyRef = doc(db, "users", story.owner_email, "stories", story.id);

      await updateDoc(storyRef, {
        likes_by_users: currentLikeStatus
          ? arrayUnion(currentUser.email)
          : arrayRemove(currentUser.email),
      });
    } catch (error) {
      console.error("Error updating story like:", error);
    } finally {
      setLoader(false);
    }
  };

  return {
    handlePostLike,
    handleStoryLike,
  };
};

export default useHandleLike;
