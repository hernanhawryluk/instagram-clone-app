import { useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  increment,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useUploadComment = (post, currentUser) => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadComment = async (value) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const postRef = doc(db, "users", post.owner_email, "posts", post.id);
        const snapshot = await getDoc(postRef);

        if (snapshot.exists()) {
          const newComment = {
            email: currentUser.email,
            profile_picture: currentUser.profile_picture,
            username: currentUser.username,
            comment: value,
            createdAt: Timestamp.now(),
            likes_by_users: "",
          };

          await updateDoc(postRef, {
            comments: arrayUnion(newComment),
          });

          if (post.owner_email !== currentUser.email) {
            const ownerRef = doc(db, "users", post.owner_email);
            await updateDoc(ownerRef, {
              event_notification: increment(1),
            });
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    uploadComment,
    isLoading,
  };
};

export default useUploadComment;
