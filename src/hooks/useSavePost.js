import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../services/firebase";

const useSavePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const savePost = async (post, currentUser) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userRef = doc(db, "users", currentUser.email);
      if (currentUser.saved_posts.includes(post.id)) {
        await updateDoc(userRef, {
          saved_posts: arrayRemove(post.id),
        });
      } else {
        await updateDoc(userRef, {
          saved_posts: arrayUnion(post.id),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { savePost };
};

export default useSavePost;
